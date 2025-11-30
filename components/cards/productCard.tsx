// components/cards/productCard.tsx
import React from "react";
import Link from "next/link";
import { Products } from "@/interface";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { ProductCardProps } from "@/interface";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    alert(`${product.title} added to cart`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="bg-white rounded-lg border hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <Link href={`/products/${product.slug}`} className="block relative">
        {product.badge && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
            {product.badge}
          </span>
        )}
        
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-2 right-2 p-2 rounded-full z-10 transition-all ${
            isInWishlist(product.id)
              ? "bg-red-500 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
          aria-label="Add to wishlist"
        >
          <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
        </button>

        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link
          href={`/products/${product.slug}`}
          className="font-semibold hover:text-blue-600 transition-colors block mb-2"
        >
          {product.title}
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-blue-600">
            ₦{product.price.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₦{product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 hover:text-amber-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;