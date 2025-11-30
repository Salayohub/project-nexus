import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-gray-300 px-6 py-10">
      {/* GRID MAIN SECTION */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT SECTION */}
        <div className="space-y-8">
          {/* Logo + Contact */}
          <div>
            <h2 className="text-3xl font-bold text-amber-500">MiMi Store</h2>

            <div className="mt-4 space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <MapPin size={18} />
                49B Philips Avenue VI, Lagos
              </p>

              <p className="flex items-center gap-2">
                <Phone size={18} />
                +234 813 123 4567
              </p>

              <p className="flex items-center gap-2">
                <Mail size={18} />
                admin@mimi.com
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <Facebook className="cursor-pointer hover:text-white" />
              <Twitter className="cursor-pointer hover:text-white" />
              <Instagram className="cursor-pointer hover:text-white" />
            </div>
          </div>

          {/* Subscribe Form */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-amber-500">Subscribe to our Newsletter</h3>
            <p className="text-sm">
              Get the latest updates on new products and upcoming sales.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded bg-gray-800 text-gray-300 border border-gray-700"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION – IMPORTANT LINKS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-semibold text-amber-500 mb-3">Categories</h4>
            <ul className="space-y-2">
              <li><Link href="/products" className="hover:text-white">Electronics</Link></li>
              <li><Link href="/products" className="hover:text-white">Phone & accessories</Link></li>
              <li><Link href="/products" className="hover:text-white">Camera</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-amber-500 mb-3 ">Top Brands</h4>
            <ul className="space-y-2">
              <li><Link href="/products" className="hover:text-white">Samsung</Link></li>
              <li><Link href="/products" className="hover:text-white">Iphone</Link></li>
              <li><Link href="/products" className="hover:text-white">LG smart tv</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-amber-500 mb-3">Important Links</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white">About Us</Link></li>
              <li><Link href="/about" className="hover:text-white">FAQs</Link></li>
              <li><Link href="#" className="hover:text-white">Support</Link></li>
            </ul>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700 mt-10 pt-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm">
          <p>© {new Date().getFullYear()} MiMi Store. All rights reserved.</p>

          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
            <Link href="#" className="hover:text-white">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
