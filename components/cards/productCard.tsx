// import Link from "next/link";
// import { Product } from "../../interface";

// interface Props {
//   product: Product;
// }

// export default function ProductCard({ product }: Props) {
//   return (
//     <div className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition">
//       <Link href={`/product/${product.slug}`}>

//         <div className="relative">
//           {product.badge && (
//             <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
//               {product.badge}
//             </span>
//           )}

//           <img
//             src={product.image}
//             alt={product.title}
//             className="w-full h-48 object-cover rounded-md"
//           />
//         </div>

//         <h3 className="mt-3 text-lg font-semibold">{product.title}</h3>

//         <p className="text-gray-600 text-sm mt-1 line-clamp-2">
//           {product.description}
//         </p>

//         <div className="mt-3 flex items-center gap-2">
//           <span className="font-bold text-xl text-blue-600">₦{product.price}</span>
//           {product.oldPrice && (
//             <span className="text-gray-400 line-through text-sm">
//               ₦{product.oldPrice}
//             </span>
//           )}
//         </div>

//       </Link>
//     </div>
//   );
// }



import Link from "next/link";
import { Product } from "../../interface";
import { ShoppingCart, Heart } from "lucide-react";
import { ProductCardProps } from "@/interface";



const ProductCard = ({ product, onAddToCart, onAddToWishlist }: ProductCardProps) => {
  return (
    <div
      className="group border rounded-xl shadow-sm hover:shadow-md transition bg-white"
    >
      {/* Image */}
      <Link href={`/product/${product.slug}`}>
        <div className="relative w-full .aspect\-[4/5] overflow-hidden rounded-t-xl">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />

          {/* Badge (optional) */}
          {product.badge && (
            <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded">
              {product.badge}
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">

        {/* Title */}
        <Link
          href={`/product/${product.slug}`}
          className="font-semibold text-gray-800 "
        >
          {product.title}
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-blue-600 ">
            ₦{product.price.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span className="line-through text-gray-500 text-sm">
              ₦{product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Cart + Wishlist */}
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={() => onAddToCart?.(product)}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>

          <button
            onClick={() => onAddToWishlist?.(product)}
            className="p-2 rounded-full border text-gray-600 hover:bg-gray-200 
           "
          >
            <Heart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

