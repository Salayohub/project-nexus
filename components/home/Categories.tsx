// components/home/Categories.tsx
import React from "react";
import Link from "next/link";
import { Category } from "@/interface";

interface CategoriesSectionProps {
  categories: Category[];
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
        <p className="text-gray-600">Browse our wide range of products</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.slug}`}
            className="group bg-white rounded-lg border hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600">
                {category.productCount} products
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;