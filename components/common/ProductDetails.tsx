// components/common/ProductDetails.tsx

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Products } from "@/interface";
import ProductCard from "../cards/productCard";
import { ShoppingCart, Heart } from "lucide-react";
import { Review } from "@/interface";

const ProductDetailsPage: React.FC<{ product: Products }> = ({ product }) => {
  const [mainImage, setMainImage] = useState<string>(product.image);
  const [related, setRelated] = useState<Products[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [qty, setQty] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

  const shortDescription = useMemo(() => {
    const desc = product.description?.trim() ?? "";
    const idx = desc.indexOf(".");
    return idx === -1 ? desc : desc.slice(0, idx + 1);
  }, [product.description]);

  // Simple localStorage cart helper
  const addToCart = (p: Products, quantity = 1) => {
    try {
      const raw = localStorage.getItem("nexus_cart");
      const cart = raw ? (JSON.parse(raw) as any[]) : [];
      const existingIndex = cart.findIndex((c) => c.id === p.id);
      if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
      } else {
        cart.push({
          id: p.id,
          title: p.title,
          price: p.price,
          image: p.image,
          quantity,
          slug: p.slug,
        });
      }
      localStorage.setItem("nexus_cart", JSON.stringify(cart));
      alert(`${p.title} added to cart (${quantity})`);
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  const addToWishlist = (p: Products) => {
    try {
      const raw = localStorage.getItem("nexus_wishlist");
      const list = raw ? (JSON.parse(raw) as any[]) : [];
      if (!list.find((i) => i.id === p.id)) {
        list.push({ id: p.id, title: p.title, slug: p.slug, image: p.image });
        localStorage.setItem("nexus_wishlist", JSON.stringify(list));
        alert(`${p.title} added to wishlist`);
      } else {
        alert(`${p.title} is already in wishlist`);
      }
    } catch (err) {
      console.error("Wishlist failed", err);
    }
  };

  useEffect(() => {
    // load related products by category
    setLoadingRelated(true);
    fetch("/api/products")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((data) => {
        const items: Products[] = Array.isArray(data)
          ? data
          : data?.products ?? [];
        const relatedItems = items
          .filter(
            (it) => it.slug !== product.slug && it.category === product.category
          )
          .slice(0, 4);
        setRelated(relatedItems);
      })
      .catch((e) => {
        console.error("Failed to load related", e);
        setRelated([]);
      })
      .finally(() => setLoadingRelated(false));
  }, [product.slug, product.category]);

  useEffect(() => {
    // load reviews from localStorage
    try {
      const raw = localStorage.getItem(`nexus_reviews_${product.id}`);
      if (raw) {
        setReviews(JSON.parse(raw) as Review[]);
      } else {
        // placeholder reviews
        setReviews([
          {
            id: "r1",
            name: "Ada",
            rating: 5,
            comment: "Excellent product. Highly recommend!",
            date: "2025-05-01",
          },
          {
            id: "r2",
            name: "Bayo",
            rating: 4,
            comment: "Good value for money.",
            date: "2025-06-10",
          },
        ]);
      }
    } catch (err) {
      console.error("Failed to load reviews", err);
      setReviews([]);
    }
  }, [product.id]);

  useEffect(() => {
  // reset states when product changes
  setMainImage(product.image);
  setQty(1);
}, [product]);

useEffect(() => {
  setReviews([]);
  setRelated([]);
  setMainImage(product.image);
  setQty(1);
}, [product]);




  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/products" className="hover:text-blue-600">
          Products
        </Link>{" "}
        /{" "}
        <Link
          href={`/products?category=${product.category}`}
          className="hover:text-blue-600"
        >
          {product.category}
        </Link>{" "}
        / <span className="text-gray-800 font-medium">{product.title}</span>
      </nav>

      {/* GRID LAYER 1: Image Gallery + Product Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
        {/* Section 1: Image Gallery with Thumbnails */}
        <div className="flex flex-col">
          <div className="bg-white rounded-lg border p-4 mb-4">
            <div className="w-full aspect-square overflow-hidden rounded-md">
              <img
                src={mainImage}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 justify-center lg:justify-start">
            {[product.image].map((src, i) => (
              <button
                key={i}
                onClick={() => setMainImage(src)}
                className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                  mainImage === src
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <img
                  src={src}
                  className="w-full h-full object-cover"
                  alt={`${product.title} thumbnail ${i + 1}`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Product Info (Title, Price, CTA) */}
        <div className="flex flex-col">
          <div className="bg-white rounded-lg border p-6">
            {/* Title */}
            <h1 className="text-2xl lg:text-3xl font-bold mb-3">
              {product.title}
            </h1>

            {/* Short Description */}
            <p className="text-gray-600 mb-4 text-sm lg:text-base">
              {shortDescription}
            </p>

            {/* Price Section */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <div className="text-3xl font-extrabold text-blue-600">
                ₦{product.price.toLocaleString()}
              </div>
              {product.oldPrice && (
                <div className="text-lg line-through text-gray-500">
                  ₦{product.oldPrice.toLocaleString()}
                </div>
              )}
              {product.badge && (
                <div className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              <ShoppingCart size={20} className="text-gray-600" />
              <span
                className={`text-sm font-medium ${
                  product.inStock ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Meta Info */}
            <div className="flex flex-col gap-2 mb-6 text-sm text-gray-600 border-t border-b py-3">
              <div>
                <span className="font-medium">Category:</span>{" "}
                <Link
                  href={`/products?category=${product.category}`}
                  className="text-blue-600 hover:underline"
                >
                  {product.category}
                </Link>
              </div>
              <div>
                <span className="font-medium">Rating:</span>{" "}
                <span className="text-yellow-500">
                  {product.rating ? `★ ${product.rating}` : "—"}
                </span>
              </div>
              <div>
                <span className="font-medium">SKU:</span> {product.id}
              </div>
            </div>

            {/* Quantity + Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border rounded-md overflow-hidden">
                <button
                  className="px-4 py-3 hover:bg-gray-100 transition-colors"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <div className="px-6 py-3 font-semibold border-x">{qty}</div>
                <button
                  className="px-4 py-3 hover:bg-gray-100 transition-colors"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(product, qty)}
                disabled={!product.inStock}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => addToWishlist(product)}
                className="px-4 py-3 border rounded-md hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart size={20} />
                <span className="hidden sm:inline">Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* GRID LAYER 2: Description & Reviews (Tabbed) */}
      <div className="mb-8">
        <div className="bg-white rounded-lg border overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("description")}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === "description"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === "reviews"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              Reviews ({reviews.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "description" ? (
              <div>
                <h3 className="text-xl font-bold mb-4">Product Description</h3>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {product.description}
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold mb-4">
                  Customer Reviews ({reviews.length})
                </h3>

                {reviews.length === 0 ? (
                  <p className="text-gray-600 mb-6">
                    No reviews yet. Be the first to review this product.
                  </p>
                ) : (
                  <div className="space-y-4 mb-8 max-h-96 overflow-y-auto">
                    {reviews.map((r) => (
                      <div
                        key={r.id}
                        className="border rounded-lg p-4 bg-gray-50"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-semibold text-gray-800">
                            {r.name}
                          </div>
                          <div className="text-sm text-gray-500">{r.date}</div>
                        </div>
                        <div className="text-yellow-500 mb-2">
                          {"★".repeat(Math.round(r.rating))}
                          {"☆".repeat(5 - Math.round(r.rating))}
                        </div>
                        <p className="text-gray-700">{r.comment}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Review Form */}
                <ReviewForm
                  productId={product.id}
                  onNewReview={(rv) => setReviews((s) => [rv, ...s])}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* GRID LAYER 3: Related Products */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Related Products</h3>
        {loadingRelated ? (
          <p className="text-center py-8 text-gray-500">
            Loading related products...
          </p>
        ) : related.length === 0 ? (
          <p className="text-center py-8 text-gray-500">
            No related products found.
          </p>
        ) : (
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
  {related.map((r) => (
    <div
      key={r.id}
      className="transition-transform duration-300 hover:scale-105 hover:animate-pulse"
    >
      <ProductCard product={r} />
    </div>
  ))}
</div>

        )}
      </div>
    </div>
  );
};

interface ReviewFormProps {
  productId: string;
  onNewReview: (review: Review) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onNewReview }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: Review = {
      id: `r_${Date.now()}`,
      name,
      rating,
      comment,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      // Save to localStorage
      const raw = localStorage.getItem(`nexus_reviews_${productId}`);
      const existing: Review[] = raw ? JSON.parse(raw) : [];
      existing.unshift(newReview);
      localStorage.setItem(
        `nexus_reviews_${productId}`,
        JSON.stringify(existing)
      );
      onNewReview(newReview);

      // Reset form
      setName("");
      setRating(5);
      setComment("");
      alert("Review submitted successfully!");
    } catch (err) {
      console.error("Failed to save review", err);
      alert("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="border-t pt-6">
      <h4 className="text-lg font-semibold mb-4">Leave a Review</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Share your experience with this product..."
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ProductDetailsPage;