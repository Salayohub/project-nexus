// pages/products/index.tsx
import { useEffect, useState } from "react";
import ProductCard from "@/components/cards/productCard";
import { Products } from "@/interface";


export default function ProductsPage() {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log("Fetching products..."); // Debug log
        
        const res = await fetch("/api/products");
        
        console.log("Response status:", res.status); // Debug log
        
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        
        const data = await res.json();
        
        console.log("Data received:", data); // Debug log
        
        // Handle different response structures
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error("Unexpected API response:", data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
        setError("Failed to load products. Please refresh the page.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
     
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="p-6 text-center">Loading products...</p>
        </div>
     
    );
  }

  if (error) {
    return (
      
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="p-6 text-center text-red-600">{error}</p>
          <div className="text-center">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      
    );
  }

  return (
    
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">All Products ({products.length})</h2>
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No products available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: Products) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    
  );
}