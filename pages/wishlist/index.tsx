
// pages/wishlist/index.tsx
import React from "react";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item: any) => {
    addToCart(
      {
        id: item.id,
        title: item.title,
        slug: item.slug,
        price: item.price,
        image: item.image,
        description: "",
        category: "",
        inStock: true,
      },
      1
    );
    removeFromWishlist(item.id);
    alert(`${item.title} moved to cart`);
  };

  if (wishlist.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <Heart size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">
              Save items you love to your wishlist.
            </p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          My Wishlist ({wishlist.length} items)
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border p-4">
              <Link href={`/products/${item.slug}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              </Link>

              <Link
                href={`/products/${item.slug}`}
                className="font-semibold hover:text-blue-600 transition-colors block mb-2"
              >
                {item.title}
              </Link>

              

              <div className="flex gap-2">
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>

                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="px-3 py-2 border rounded-md text-red-600 hover:bg-red-50 transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
   
  );
}