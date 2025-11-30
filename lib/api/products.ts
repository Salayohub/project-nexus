// lib/api/products.ts
import { Products } from "@/interface";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

/**
 * Fetch all products
 */
export async function getAllProducts(): Promise<Products[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/products`);
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

/**
 * Fetch single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Products | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/product/${slug}`);
    const data = await res.json();
    return data.success ? data.product : null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

/**
 * Fetch products by category
 */
export async function getProductsByCategory(category: string): Promise<Products[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/products?category=${category}`);
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

/**
 * Fetch featured products
 */
export async function getFeaturedProducts(limit: number = 8): Promise<Products[]> {
  try {
    const allProducts = await getAllProducts();
    return allProducts.filter((p) => p.badge).slice(0, limit);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}