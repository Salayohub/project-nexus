// components/home/FeaturedProducts.tsx
import React from "react";
import ProductCard from "@/components/cards/productCard";
import { Products } from "@/interface";

interface FeaturedProductsProps {
  products: Products[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-gray-50">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
        <p className="text-gray-600">Check out our handpicked selection</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;