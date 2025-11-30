// pages/products/[slug].tsx
import { GetServerSideProps } from "next";
import ProductDetailsPage from "@/components/common/ProductDetails";
import { Products } from "@/interface";
import { getProductBySlug } from "@/lib/api";


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
  const product = await getProductBySlug(params?.slug as string);
  return { props: { product } };
};