// pages/products/[slug].tsx
import { GetServerSideProps } from "next";
import ProductDetailsPage from "@/components/common/ProductDetails";
import { Product } from "@/interface";
import { SingleProductPageProps } from "@/interface";


export default function SingleProductPage({ product,error }: SingleProductPageProps) {
  if (!product || error)
    return (
     <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="p-6 text-center text-red-600 font-semibold">
            {error || "Product not found."}
          </p>
        </div>
    );

  return <ProductDetailsPage product={product} />;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${slug}`);
  const data = await res.json();

  return {
    props: {
      product: data.success ? data.product : null,
    },
  };
};
