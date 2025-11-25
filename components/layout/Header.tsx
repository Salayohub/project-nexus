import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, Heart } from "lucide-react";
// import ThemeToggle from "../ buttons/ThemeToggle";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white">
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
          <Link href="/wishlist" className="text-amber-500">
            <Heart size={22} />
          </Link>

          <Link href="/cart" className="text-amber-500">
            <ShoppingCart size={22} />
          </Link>

          {/* LIGHT/DARK MODE TOGGLE */}
         ProductCard 

          {/* MOBILE SEARCH ICON (OPTIONAL ADDITION) */}
          <button className="md:hidden text-gray-600">
            <svg width="22" height="22" fill="none" stroke="currentColor"></svg>
          </button>
        </div>
      </div>

      {/* -------------------- LAYER 2: BLUE NAVBAR -------------------- */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

          {/* HAMBURGER - MOBILE */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={26} />
          </button>

          {/* LEFT SPACING (20%) — ONLY DESKTOP */}
          <div className="hidden md:block w-[20%]" />

          {/* NAVBAR (50%) - DESKTOP ONLY */}
          <nav className="hidden md:flex w-[50%] justify-center gap-8 text-white font-medium">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/about">About Us</Link>
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
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">

          {/* Backdrop */}
          <div
            className="flex-1 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />

          {/* Slide-out Menu */}
          <div className="w-[70%] sm:w-[40%] md:hidden bg-white  h-full p-6 shadow-xl transition-all">

            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="mb-6 text-white"
            >
              <X size={26} />
            </button>

            {/* Mobile Menu Links */}
            <nav className="flex flex-col gap-6 text-lg">
              <Link href="/">Home</Link>
              <Link href="/products">Shop</Link>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact Us</Link>

              <div className="mt-10">
                <Link
                  href="/auth/login"
                  className="px-5 py-2 bg-white text-blue-700 rounded-lg block text-center"
                >
                  Login / Register
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
