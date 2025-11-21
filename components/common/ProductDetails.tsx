import { GetStaticPropsContext } from "next";
import { getAllProducts, getProductBySlug, getProductsByCategory, product } from "@/lib/store";
import { Product } from "@/interface";

interface Props {
  product: Product;
}

export default function ProductDetailPage({ product }: Props) {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Image */}
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[450px] object-cover rounded-lg shadow"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold">{product.title}</h1>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-3xl font-bold text-blue-600">₦{product.price}</span>
            {product.oldPrice && (
              <span className="text-gray-500 line-through text-lg">
                ₦{product.oldPrice}
              </span>
            )}
          </div>

          <p className="mt-5 text-gray-700 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6">
            <p className="text-sm text-gray-600">
              Category: <span className="font-semibold">{product.category}</span>
            </p>
            <p className="text-sm text-gray-600">
              Availability:
              <span className={`font-semibold ml-1 ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

// Generate paths for each product
export async function getStaticPaths() {
  const products = getAllProducts();

  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  return { paths, fallback: false };
}

// Fetch single product
export async function getStaticProps(context: GetStaticPropsContext) {
  const slug = context.params?.slug as string;
  const product = getProductBySlug(slug);

  return {
    props: {
      product,
    },
  };
}
