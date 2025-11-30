// lib/api/home.ts
import { Products, HeroSlide, Banner, Category } from "@/interface";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

/**
 * Fetch all homepage data in parallel
 */
export async function getHomePageData() {
  try {
    // Fetch all data in parallel for better performance
    const [heroRes, bannersRes, categoriesRes, productsRes] = await Promise.all([
      fetch(`${BASE_URL}/api/hero`),
      fetch(`${BASE_URL}/api/banners`),
      fetch(`${BASE_URL}/api/categories`),
      fetch(`${BASE_URL}/api/products`),
    ]);

    // Parse all responses
    const [heroData, bannersData, categoriesData, productsData] = await Promise.all([
      heroRes.json(),
      bannersRes.json(),
      categoriesRes.json(),
      productsRes.json(),
    ]);

    const allProducts: Products[] = productsData.products || [];
    const featuredProducts = allProducts.filter((p: Products) => p.badge).slice(0, 8);

    return {
      heroSlides: heroData.slides || [],
      banners: bannersData.banners || [],
      categories: categoriesData.categories || [],
      featuredProducts,
      allProducts,
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return {
      heroSlides: [],
      banners: [],
      categories: [],
      featuredProducts: [],
      allProducts: [],
    };
  }
}

/**
 * Fetch hero slides only
 */
export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/hero`);
    const data = await res.json();
    return data.slides || [];
  } catch (error) {
    console.error("Error fetching hero slides:", error);
    return [];
  }
}

/**
 * Fetch banners only
 */
export async function getBanners(): Promise<Banner[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/banners`);
    const data = await res.json();
    return data.banners || [];
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
}

/**
 * Fetch categories only
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/categories`);
    const data = await res.json();
    return data.categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}