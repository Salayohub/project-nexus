import Link from "next/link";
import ThemeToggle from "../ buttons/ThemeToggle";

const Header = () => {
  return (
    <header className="w-full border-b bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-4">
        
        <Link href="/" className="text-xl font-bold dark:text-white">
          MiMi Store
        </Link>

        <nav className="flex gap-6 text-gray-600 dark:text-gray-300">
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
