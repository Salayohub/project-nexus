// lib/api/home.ts
import { Products, HeroSlide, Banner, Category } from "@/interface";

// ✅ CORRECT - Dynamic base URL for Vercel
const getBaseUrl = () => {
  // On Vercel, use the deployment URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // On localhost
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  
  // Fallback
  return "http://localhost:3000";
};

const BASE_URL = getBaseUrl();

/**
 * Fetch all homepage data in parallel
 */
export async function getHomePageData() {
  try {
    console.log("Fetching from BASE_URL:", BASE_URL); // Debug log
    
    // Fetch all data in parallel for better performance
    const [heroRes, bannersRes, categoriesRes, productsRes] = await Promise.all([
      fetch(`${BASE_URL}/api/hero`, { cache: 'no-store' }),
      fetch(`${BASE_URL}/api/banners`, { cache: 'no-store' }),
      fetch(`${BASE_URL}/api/categories`, { cache: 'no-store' }),
      fetch(`${BASE_URL}/api/products`, { cache: 'no-store' }),
    ]);

    // Check if all requests succeeded
    if (!heroRes.ok || !bannersRes.ok || !categoriesRes.ok || !productsRes.ok) {
      console.error("API fetch failed:", {
        hero: heroRes.status,
        banners: bannersRes.status,
        categories: categoriesRes.status,
        products: productsRes.status,
      });
    }

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