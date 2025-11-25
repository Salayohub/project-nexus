import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { ProductCardProps } from "../../interface";

export default function ProductCard({ product, onAddToCart, onAddToWishlist }: ProductCardProps) {
  const [wishlist, setWishlist] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the Link
    setWishlist(!wishlist);
    onAddToWishlist?.(product);
  };

  const isOutOfStock = product.inStock === false; // adjust based on your product model

  return (
    <div className="border rounded-lg shadow-sm bg-white hover:shadow-md transition flex flex-col relative">

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        className={`absolute top-2 right-2 p-2 rounded-full bg-white shadow-md transition ${
          wishlist ? "text-red-500" : "text-gray-600"
        } z-10`}
      >
        <Heart size={20} />
      </button>

      {/* Main Clickable Area (Image, Title, Add to Cart) */}
      <Link
        href={isOutOfStock ? "#" : `/products/${product.slug}`}
        className={`relative flex flex-col ${isOutOfStock ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
      >
        {/* Image + Badge */}
        <div className="relative w-full">
          {product.badge && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
              {product.badge}
            </span>
          )}
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="w-full h-56 sm:h-64 md:h-72 object-cover rounded-t-lg"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col grow">
          {/* Title */}
          <h3 className="text-lg font-semibold text-amber-500 hover:underline">
            {product.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>

          {/* Price */}
          <div className="mt-3 flex items-center gap-2">
            <span className="font-bold text-xl text-blue-600">
              ₦{product.price.toLocaleString()}
            </span>
            {product.oldPrice && (
              <span className="line-through text-gray-400 text-sm">
                ₦{product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Spacer */}
          <div className="grow"></div>

          {/* Add to Cart */}
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent navigating to product page on click
              onAddToCart?.(product);
            }}
            disabled={isOutOfStock}
            className={`mt-4 w-full flex items-center justify-center gap-2 px-3 py-3 text-white rounded-lg transition ${
              isOutOfStock ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <ShoppingCart size={18} />
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </Link>
    </div>
  );
}
