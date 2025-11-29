// pages/index.tsx
import { GetServerSideProps } from "next";
import HeroSection from "@/components/home/HeroSection";
import BannerSection from "@/components/home/BannerSection";
import CategoriesSection from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { HeroSlide, Banner, Category, Products } from "@/interface";

interface HomePageProps {
  heroSlides: HeroSlide[];
  banners: Banner[];
  categories: Category[];
  featuredProducts: Products[];
}

export default function HomePage({
  heroSlides,
  banners,
  categories,
  featuredProducts,
}: HomePageProps) {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection slides={heroSlides} />

      {/* Categories */}
      <CategoriesSection categories={categories} />

   

      {/* Featured Products */}
      <FeaturedProducts products={featuredProducts} />

      {/* Newsletter Section (Optional) */}
         {/* Banner Section */}
      <BannerSection banners={banners} />
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-6">
            Get the latest updates on new products and upcoming sales
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Fetch Hero Slides
    const heroRes = await fetch(`${baseUrl}/api/hero`);
    const heroData = await heroRes.json();

    // Fetch Banners
    const bannersRes = await fetch(`${baseUrl}/api/banners`);
    const bannersData = await bannersRes.json();

    // Fetch Categories (you can create an API for this too)
    const categoriesRes = await fetch(`${baseUrl}/api/categories`);
    const categoriesData = await categoriesRes.json();

    // Fetch Featured Products
    const productsRes = await fetch(`${baseUrl}/api/products`);
    const productsData = await productsRes.json();
    const featuredProducts = productsData.products?.filter((p: Products) => p.badge).slice(0, 8) || [];

    return {
      props: {
        heroSlides: heroData.slides || [],
        banners: bannersData.banners || [],
        categories: categoriesData.categories || [],
        featuredProducts,
      },
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return {
      props: {
        heroSlides: [],
        banners: [],
        categories: [],
        featuredProducts: [],
      },
    };
  }
};