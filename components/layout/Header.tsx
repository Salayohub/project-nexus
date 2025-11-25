import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ShoppingCart, Heart, Menu, X, Search, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
// import ThemeToggle from "../ buttons/ThemeToggle";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <header className="w-full shadow-md sticky top-0 z-50 border bg-white">
      {/* -------------------- LAYER 1: TOP BAR -------------------- */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold text-amber-500">
          MiMi Store
        </Link>

        {/* SEARCH BAR */}
        <div className="hidden md:flex w-1/2">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        {/* ICONS */}
        <div className="flex items-center gap-4">

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Wishlist"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Icon */}
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block"
            aria-label="User account"
          >
            <User size={20} />
          </button>

          {/* Mobile Search Icon */}
          <button className="md:hidden text-gray-600">
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* -------------------- LAYER 2: BLUE NAVBAR -------------------- */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

          {/* HAMBURGER - MOBILE */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* LEFT SPACING (20%) — ONLY DESKTOP */}
          <div className="hidden md:block w-[20%]" />

          {/* DESKTOP NAV MENU */}
          <nav className="hidden md:flex gap-8 text-white w-[50%] justify-center font-medium">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          {/* LOGIN/REGISTER (30%) */}
          <div className="hidden md:flex w-[30%] justify-end">
            <Link
              href="/auth/login"
              className="px-5 py-2 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-100"
            >
              Login / Register
            </Link>
          </div>
        </div>
      </div>

      {/* -------------------- MOBILE SLIDE MENU -------------------- */}
      {isMenuOpen && (
        <nav className="md:hidden py-4 border-t bg-white">
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="px-4 py-2 hover:bg-gray-100 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/products"
              className="px-4 py-2 hover:bg-gray-100 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>

            <Link
              href="/about"
              className="px-4 py-2 hover:bg-gray-100 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>

            <Link
              href="/contact"
              className="px-4 py-2 hover:bg-gray-100 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="mt-6">
              <Link
                href="/auth/login"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg block text-center"
              >
                Login / Register
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
