"use client";

import Link from "next/link";
import { Category } from "@/lib/types";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="block border rounded-xl shadow-sm hover:shadow-md transition bg-white dark:bg-gray-900 dark:border-gray-700"
    >
      {/* Category Image */}
      <div className="relative w-full aspect-square overflow-hidden rounded-t-xl">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover hover:scale-105 transition"
        />
      </div>

      {/* Name */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {category.name}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
