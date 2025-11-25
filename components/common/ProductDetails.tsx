// components/common/ProductDetails.tsx

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Products, Review } from "@/interface";
import ProductCard from "../cards/productCard";
import { ShoppingCart, Heart } from "lucide-react";

const ProductDetailsPage: React.FC<{ product: Products }> = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.image);
  const [related, setRelated] = useState<Products[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [qty, setQty] = useState(1);

  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description"
  );

  const shortDescription = useMemo(() => {
    const text = product.description?.trim() ?? "";
    const idx = text.indexOf(".");
    return idx === -1 ? text : text.slice(0, idx + 1);
  }, [product.description]);

  /** Load related products */
  useEffect(() => {
    setLoadingRelated(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const items: Products[] = data.products ?? [];
        const rel = items
          .filter(
            (p) => p.category === product.category && p.slug !== product.slug
          )
          .slice(0, 4);

        setRelated(rel);
      })
      .catch(() => setRelated([]))
      .finally(() => setLoadingRelated(false));
  }, [product.slug, product.category]);

  /** Load reviews */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`nexus_reviews_${product.id}`);
      if (raw) {
        setReviews(JSON.parse(raw));
      } else {
        setReviews([
          {
            id: "r1",
            name: "Ada",
            rating: 5,
            comment: "Excellent product!",
            date: "2025-05-01",
          },
        ]);
      }
    } catch {
      setReviews([]);
    }
  }, [product.id]);

  /** Add to cart */
  const addToCart = () => {
    const row = localStorage.getItem("nexus_cart");
    const cart = row ? JSON.parse(row) : [];

    const existing = cart.find((c: any) => c.id === product.id);
    if (existing) existing.quantity += qty;
    else
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: qty,
        image: product.image,
        slug: product.slug,
      });

    localStorage.setItem("nexus_cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  /** Add to wishlist */
  const addWishlist = () => {
    const raw = localStorage.getItem("nexus_wishlist");
    const list = raw ? JSON.parse(raw) : [];

    if (!list.find((i: any) => i.id === product.id)) {
      list.push({
        id: product.id,
        title: product.title,
        image: product.image,
        slug: product.slug,
      });
      localStorage.setItem("nexus_wishlist", JSON.stringify(list));
      alert("Added to wishlist");
    } else {
      alert("Already in wishlist");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/">Home</Link> /{" "}
        <Link href="/products">Products</Link> /{" "}
        <span className="text-gray-700">{product.title}</span>
      </nav>

      {/* --------------------------------------------------- */}
      {/* 🟦 GRID LAYER 1: Product Display */}
      {/* --------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT: Image + thumbnails */}
        <div>
          <div className="w-full aspect-square bg-white border rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src={mainImage}
              className="object-contain w-full h-full"
              alt={product.title}
            />
          </div>

          {/* 3 thumbnails */}
          <div className="flex gap-3 mt-4">
            {[product.image, product.image2, product.image3]
              .filter(Boolean)
              .slice(0, 3)
              .map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(img!)}
                  className={`w-20 h-20 border rounded overflow-hidden ${
                    img === mainImage ? "border-blue-500" : "border-gray-300"
                  }`}
                >
                  <img src={img!} className="w-full h-full object-cover" />
                </button>
              ))}
          </div>
        </div>

        {/* RIGHT: Title, price, description, cart */}
        <div className="flex flex-col gap-4">

          <h1 className="text-3xl font-bold">{product.title}</h1>

          <p className="text-gray-600">{shortDescription}</p>

          <div className="flex items-center gap-4 text-2xl font-bold text-blue-600">
            ₦{product.price.toLocaleString()}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <ShoppingCart size={18} />
            <span>{product.inStock ? "In stock" : "Out of stock"}</span>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3 mt-4">
            <div className="flex border rounded">
              <button
                className="px-3 py-2"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="px-4 py-2">{qty}</span>
              <button className="px-3 py-2" onClick={() => setQty(qty + 1)}>
                +
              </button>
            </div>

            <button
              onClick={addToCart}
              disabled={!product.inStock}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
            >
              Add to cart
            </button>

            <button
              onClick={addWishlist}
              className="px-4 py-3 border rounded-lg flex items-center gap-2"
            >
              <Heart size={18} /> Save
            </button>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------- */}
      {/* 🟦 GRID LAYER 2: Description + Reviews (Tabs) */}
      {/* --------------------------------------------------- */}
      <div className="mt-12">

        {/* TAB BUTTONS */}
        <div className="flex gap-6 border-b pb-2 mb-6">
          <button
            className={`text-lg font-semibold ${
              activeTab === "description" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>

          <button
            className={`text-lg font-semibold ${
              activeTab === "reviews" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        {/* TAB CONTENT */}
        {activeTab === "description" && (
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {product.description}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r.id} className="border rounded p-4">
                <div className="flex justify-between">
                  <strong>{r.name}</strong>
                  <span className="text-sm text-gray-500">{r.date}</span>
                </div>
                <div className="text-yellow-500">{"★".repeat(r.rating)}</div>
                <p className="mt-2">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --------------------------------------------------- */}
      {/* 🟦 GRID LAYER 3: Related Products */}
      {/* --------------------------------------------------- */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>

        {loadingRelated ? (
          <p>Loading...</p>
        ) : related.length === 0 ? (
          <p className="text-gray-600">No related products found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
