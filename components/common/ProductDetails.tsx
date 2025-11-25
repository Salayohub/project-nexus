import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Product } from "@/interface";
import ProductCard from "../cards/productCard";
import { ShoppingCart, Heart } from "lucide-react";

import { Review } from "@/interface";

const ProductDetailsPage: React.FC<{ product: Product }> = ({ product }) => {
  const [mainImage, setMainImage] = useState<string>(product.image);
  const [related, setRelated] = useState<Product[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [qty, setQty] = useState<number>(1);
  const shortDescription = useMemo(() => {
    // Option C: use first sentence (up to first period).
    const desc = product.description?.trim() ?? "";
    const idx = desc.indexOf(".");
    return idx === -1 ? desc : desc.slice(0, idx + 1);
  }, [product.description]);

  // Simple localStorage cart helper — replace with context when ready
  const addToCart = (p: Product, quantity = 1) => {
    try {
      const raw = localStorage.getItem("nexus_cart");
      const cart = raw ? JSON.parse(raw) as any[] : [];
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
      // small visual feedback (alert) — you can replace with toast
      alert(`${p.title} added to cart (${quantity})`);
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  const addToWishlist = (p: Product) => {
    try {
      const raw = localStorage.getItem("nexus_wishlist");
      const list = raw ? JSON.parse(raw) as any[] : [];
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
      .then((r) => r.json())
      .then((data) => {
        const items: Product[] = data?.products ?? [];
        const relatedItems = items
          .filter((it) => it.slug !== product.slug && it.category === product.category)
          .slice(0, 4);
        setRelated(relatedItems);
      })
      .catch((e) => {
        console.error("Failed to load related", e);
      })
      .finally(() => setLoadingRelated(false));
  }, [product.slug, product.category]);

  useEffect(() => {
    // load reviews from localStorage (or placeholder)
    const raw = localStorage.getItem(`nexus_reviews_${product.id}`);
    if (raw) {
      setReviews(JSON.parse(raw) as Review[]);
    } else {
      // placeholder reviews (you can replace or fetch real ones)
      setReviews([
        { id: "r1", name: "Ada", rating: 5, comment: "Excellent product. Highly recommend!", date: "2025-05-01" },
        { id: "r2", name: "Bayo", rating: 4, comment: "Good value for money.", date: "2025-06-10" },
      ]);
    }
  }, [product.id]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-600 mb-4">
        <Link href="/">Home</Link> /{" "}
        <Link href={`/products`}>Products</Link> /{" "}
        <Link href={`/products?category=${product.category}`}>{product.category}</Link> /{" "}
        <span className="text-gray-800">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: gallery & thumbnails */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border dark:bg-gray-900 dark:border-gray-700 p-4">
            <div className="w-full aspect-4/3 overflow-hidden rounded-md mb-4">
              <img
                src={mainImage}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* thumbnails (simple) */}
            <div className="flex gap-3">
              {/* If you later add images[] to product, map them. For now we only have one image. */}
              {[product.image].map((src, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(src)}
                  className="w-20 h-20 rounded-md overflow-hidden border"
                >
                  <img src={src} className="w-full h-full object-cover" alt={`${product.title} ${i}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Related products (mobile under gallery) */}
          <div className="mt-6 lg:hidden">
            <h3 className="text-lg font-semibold mb-3">Related</h3>
            {loadingRelated ? (
              <p>Loading...</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {related.map((r) => (
                  <ProductCard key={r.id} product={r} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center column: title, price, short desc, CTA */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 dark:border-gray-700 rounded-lg border p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

                {/* Short description under title */}
                <p className="text-gray-600 mb-4">{shortDescription}</p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="text-2xl font-extrabold text-blue-600">₦{product.price.toLocaleString()}</div>
                  {product.oldPrice && (
                    <div className="text-sm line-through text-gray-500">₦{product.oldPrice.toLocaleString()}</div>
                  )}
                  {product.badge && (
                    <div className="px-2 py-1 bg-red-500 text-white text-sm rounded">{product.badge}</div>
                  )}
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <ShoppingCart size={18} />
                    <span className="text-sm">{product.inStock ? "In stock" : "Out of stock"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart size={18} />
                    <span className="text-sm">Wishlist</span>
                  </div>
                </div>

                {/* Quantity + CTA */}
                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  <div className="flex items-center gap-2 border rounded">
                    <button
                      className="px-3 py-1"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <div className="px-4">{qty}</div>
                    <button
                      className="px-3 py-1"
                      onClick={() => setQty((q) => q + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => addToCart(product, qty)}
                    className="px-5 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
                  >
                    Add to cart
                  </button>

                  <button
                    onClick={() => addToWishlist(product)}
                    className="px-4 py-2 border rounded-md"
                  >
                    Save
                  </button>
                </div>
              </div>

              {/* short meta on the right (on large screens) */}
              <div className="hidden md:flex flex-col gap-3 items-end">
                <div className="text-sm text-gray-600">Category: <Link href={`/products?category=${product.category}`} className="text-blue-600">{product.category}</Link></div>
                <div className="text-sm text-gray-600">Rating: {product.rating ?? "—"}</div>
                <div className="text-sm text-gray-600">SKU: {product.id}</div>
              </div>
            </div>

            {/* Description & Reviews — side-by-side on large screens, stacked on small */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Description */}
              <section className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line">{product.description}</p>
              </section>

              {/* Reviews */}
              <section className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                <h3 className="text-lg font-semibold mb-3">Reviews ({reviews.length})</h3>

                {reviews.length === 0 ? (
                  <p className="text-gray-600">No reviews yet. Be the first to review this product.</p>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((r) => (
                      <div key={r.id} className="border rounded p-3 bg-white dark:bg-gray-900">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">{r.name}</div>
                          <div className="text-sm text-gray-500">{r.date}</div>
                        </div>
                        <div className="text-sm text-yellow-500">{"★".repeat(Math.round(r.rating))}</div>
                        <div className="text-gray-700 mt-2">{r.comment}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Simple review form (stores locally) */}
                <ReviewForm productId={product.id} onNewReview={(rv) => setReviews((s) => [rv, ...s])} />
              </section>
            </div>

            {/* Related products (desktop) */}
            <div className="mt-8 hidden lg:block">
              <h3 className="text-xl font-semibold mb-4">Related products</h3>
              {loadingRelated ? (
                <p>Loading related products...</p>
              ) : related.length === 0 ? (
                <p className="text-gray-600">No related products found.</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {related.map((r) => (
                    <ProductCard key={r.id} product={r} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
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
    // Save to localStorage
    const raw = localStorage.getItem(`nexus_reviews_${productId}`);
    const existing: Review[] = raw ? JSON.parse(raw) : [];
    existing.unshift(newReview);
    localStorage.setItem(`nexus_reviews_${productId}`, JSON.stringify(existing));
    onNewReview(newReview);
    // Reset form
    setName("");
    setRating(5);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <h4 className="text-md font-semibold mb-3">Leave a Review</h4>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border rounded px-3 py-2"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
          rows={4}
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Submit Review
      </button>
    </form>
  );
}

export default ProductDetailsPage;