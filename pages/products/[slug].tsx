// pages/products/[slug].tsx
import { GetServerSideProps } from "next";
import ProductDetailsPage from "@/components/common/ProductDetails";
import { Products } from "@/interface";


interface Props {
  product: Products | null;
  error?: string;
  slug?: string;
}

export default function SingleProductPage({ product, error, slug }: Props) {
  if (error || !product) {
    return (
      
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              {error || "Product not found"}
            </h1>
            <p className="text-gray-600 mb-6">
              {slug ? `The product "${slug}" could not be found.` : "Invalid product."}
            </p>
            
              href="/products"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            
              Browse All Products
           
          </div>
        </div>
     
    );
  }

  return (
    <div>
      <ProductDetailsPage product={product} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug;

  console.log("SSR: Fetching product with slug:", slug); // Debug log

  if (!slug || typeof slug !== "string") {
    return {
      props: {
        product: null,
        error: "Invalid product slug",
        slug: slug || "unknown",
      },
    };
  }

  try {
    // Use absolute URL for server-side fetching
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const url = `${baseUrl}/api/product/${slug}`;
    
    console.log("SSR: Fetching from URL:", url); // Debug log
    
    const res = await fetch(url);
    
    console.log("SSR: Response status:", res.status); // Debug log
    
    if (!res.ok) {
      return {
        props: {
          product: null,
          error: `Product not found`,
          slug,
        },
      };
    }

    const data = await res.json();
    
    console.log("SSR: Data received:", data); // Debug log

    return {
      props: {
        product: data.success ? data.product : null,
        error: data.success ? null : data.message,
        slug,
      },
    };
  } catch (error) {
    console.error("SSR: Error fetching product:", error);
    return {
      props: {
        product: null,
        error: "Failed to load product",
        slug,
      },
    };
  }
};