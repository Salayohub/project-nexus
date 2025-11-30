// pages/index.tsx
import { GetServerSideProps } from "next";
import { useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import BannerSection from "@/components/home/BannerSection";
import CategoriesSection from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import {  Products,} from "@/interface";
import ProductCard from "@/components/cards/productCard";
import { HomePageProps } from "@/interface";
import { ChevronDown } from "lucide-react";
import Newsletter from "@/components/common/Newsletter";


export default function HomePage({
  heroSlides,
  banners,
  categories,
  featuredProducts,
   allProducts,

}: HomePageProps) {

   const [visibleProducts, setVisibleProducts] = useState(8);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Determine how many products to show based on screen size
  const getInitialProductCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 6; // Small screen
      return 8; // Medium and large screens
    }
    return 8;
  };

  const getLoadMoreCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 6; // Small: load 6 more
      if (window.innerWidth < 1024) return 4; // Medium: load 4 more (2 rows)
      return 4; // Large: load 4 more (1 row)
    }
    return 4;
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    
    setTimeout(() => {
      const loadCount = getLoadMoreCount();
      setVisibleProducts((prev) => Math.min(prev + loadCount, allProducts.length));
      setIsLoadingMore(false);
    }, 500);
  };

  const displayedProducts = allProducts.slice(0, visibleProducts);
  const hasMore = visibleProducts < allProducts.length;


  return (
    <div>
      {/* Hero Section */}
      <HeroSection slides={heroSlides} />

      {/* Categories */}
      <CategoriesSection categories={categories} />

   {/* All Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">All Products</h2>
          <p className="text-gray-600">
            Browse our complete collection of quality products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
            >
              {isLoadingMore ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Loading...
                </>
              ) : (
                <>
                  Load More Products
                  <ChevronDown size={20} />
                </>
              )}
            </button>
            <p className="text-sm text-gray-500 mt-3">
              Showing {visibleProducts} of {allProducts.length} products
            </p>
          </div>
        )}

        {/* All Products Loaded Message */}
        {!hasMore && allProducts.length > 0 && (
          <div className="mt-12 text-center">
            <div className="inline-block px-6 py-3 bg-gray-100 rounded-lg">
              <p className="text-gray-600 font-medium">
                ✨ You've seen all {allProducts.length} products
              </p>
            </div>
          </div>
        )}
      </section>

       {/* Newsletter Section (Optional) */}
         {/* Banner Section */}
      <BannerSection banners={banners} />
   
 {/* Featured Products */}
      <FeaturedProducts products={featuredProducts} />
      
     
     <Newsletter
        title="Join Our Deals Mailing List"
        subtitle="Exclusive discounts delivered to your inbox"
        apiUrl="/api/newsletter"
        buttonText="Join Now"
        variant="blue"
      />
    

     

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

    // Fetch Categories
    const categoriesRes = await fetch(`${baseUrl}/api/categories`);
    const categoriesData = await categoriesRes.json();

    // Fetch All Products
    const productsRes = await fetch(`${baseUrl}/api/products`);
    const productsData = await productsRes.json();
    const allProducts = productsData.products || [];

    // Get Featured Products (products with badges)
    const featuredProducts = allProducts.filter((p: Products) => p.badge).slice(0, 8);

    return {
      props: {
        heroSlides: heroData.slides || [],
        banners: bannersData.banners || [],
        categories: categoriesData.categories || [],
        featuredProducts,
        allProducts,
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
        allProducts: [],
      },
    };
  }
};