// context/WishlistContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { WishlistItem, Products } from "@/interface";

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (product: Products) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    setIsClient(true);
    try {
      const raw = localStorage.getItem("nexus_wishlist");
      if (raw) {
        setWishlist(JSON.parse(raw));
      }
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem("nexus_wishlist", JSON.stringify(wishlist));
      } catch (error) {
        console.error("Failed to save wishlist:", error);
      }
    }
  }, [wishlist, isClient]);

  const addToWishlist = (product: Products) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.find((item) => item.id === product.id)) {
        return prevWishlist; // Already in wishlist
      }
      return [
        ...prevWishlist,
        {
          id: product.id,
          title: product.title,
          slug: product.slug,
          image: product.image,
          price: product.price,
        },
      ];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== productId)
    );
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
};