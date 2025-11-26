# 🛍️ Mimi Store - Modern E-Commerce Platform

A full-featured, responsive e-commerce web application built with Next.js, TypeScript, and Tailwind CSS. Mimi Store offers a seamless shopping experience with dynamic product listings, cart management, wishlist functionality, and a complete checkout process.

![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🏠 Homepage
- **Dynamic Hero Slider** - Auto-rotating hero section with smooth transitions
- **Category Grid** - Browse products by categories
- **Featured Products** - Showcase special and trending items
- **Promotional Banners** - Eye-catching promotional sections
- **Newsletter Subscription** - Email capture for marketing

### 🛒 Shopping Experience
- **Product Listing** - Grid layout with filtering options
- **Product Details** - Comprehensive product information with image gallery
- **Related Products** - Smart product recommendations
- **Customer Reviews** - Rating and review system with local storage
- **Add to Cart** - Instant cart updates with quantity management
- **Wishlist** - Save favorite products for later

### 🛍️ Cart & Checkout
- **Shopping Cart** - Full cart management (add, remove, update quantities)
- **Cart Count Badge** - Real-time cart item count in header
- **Wishlist Badge** - Live wishlist count indicator
- **Checkout Flow** - Multi-step checkout with form validation
- **Order Summary** - Clear breakdown of costs and shipping
- **Multiple Payment Methods** - Card, Bank Transfer, Cash on Delivery

### 🎨 UI/UX
- **Responsive Design** - Mobile-first approach, works on all devices
- **Dark Mode Ready** - Prepared for dark theme implementation
- **Smooth Animations** - Subtle transitions and hover effects
- **Loading States** - User-friendly loading indicators
- **Error Handling** - Graceful error messages and fallbacks

### 🔧 Technical Features
- **SEO Optimized** - Server-side rendering with Next.js
- **Dynamic Routing** - Product pages with slug-based URLs
- **Context API** - Global state management for cart and wishlist
- **Local Storage** - Persistent cart and wishlist data
- **TypeScript** - Full type safety across the application
- **API Routes** - RESTful API endpoints for data fetching

## 📁 Project Structure

```
mimi-store/
├── pages/
│   ├── api/
│   │   ├── products.ts              # All products endpoint
│   │   ├── product/
│   │   │   └── [slug].ts            # Single product by slug
│   │   ├── hero.ts                  # Hero slider data
│   │   ├── banners.ts               # Promotional banners
│   │   └── categories.ts            # Product categories
│   ├── products/
│   │   ├── index.tsx                # Products listing page
│   │   └── [slug].tsx               # Single product page
│   ├── cart/
│   │   └── index.tsx                # Shopping cart page
│   ├── checkout/
│   │   └── index.tsx                # Checkout page
│   ├── wishlist/
│   │   └── index.tsx                # Wishlist page
│   ├── index.tsx                    # Homepage
│   └── _app.tsx                     # App wrapper with providers
├── components/
│   ├── layout/
│   │   ├── Layout.tsx               # Main layout wrapper
│   │   ├── Header.tsx               # Navigation header
│   │   └── Footer.tsx               # Footer component
│   ├── home/
│   │   ├── HeroSection.tsx          # Hero slider
│   │   ├── BannerSection.tsx        # Promotional banners
│   │   ├── Categories.tsx           # Category grid
│   │   └── FeaturedProducts.tsx     # Featured items
│   ├── cards/
│   │   └── productCard.tsx          # Product card component
│   └── common/
│       └── ProductDetails.tsx       # Product detail view
├── context/
│   ├── CartContext.tsx              # Cart state management
│   └── WishlistContext.tsx          # Wishlist state management
├── lib/
│   └── store.ts                     # Data store & helper functions
├── styles/
│   └── globals.css                  # Global styles
├── interface.ts                     # TypeScript interfaces
├── .env.local                       # Environment variables
├── next.config.js                   # Next.js configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
└── package.json                     # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/mimi-store.git
cd mimi-store
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🔨 Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📝 Usage Guide

### Adding New Products

Edit `lib/store.ts` and add products to the `PRODUCTS` array:

```typescript
{
  id: "5",
  title: "New Product",
  slug: "new-product",
  price: 15000,
  oldPrice: 20000,
  image: "https://example.com/image.jpg",
  description: "Product description here...",
  category: "Electronics",
  inStock: true,
  badge: "New",
  rating: 4.5,
}
```

### Customizing Hero Slides

Edit `lib/store.ts` to modify the `HERO_SLIDES` array:

```typescript
{
  id: "4",
  title: "Your Custom Title",
  subtitle: "Subtitle Here",
  description: "Description text...",
  image: "https://example.com/hero.jpg",
  buttonText: "Shop Now",
  buttonLink: "/products",
  bgColor: "#4F46E5",
}
```

### Adding Banners

Modify the `BANNERS` array in `lib/store.ts`:

```typescript
{
  id: "4",
  title: "New Banner",
  description: "Banner description",
  image: "https://example.com/banner.jpg",
  link: "/products?category=YourCategory",
  badge: "Hot",
  position: "center",
}
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#DC2626',
        // Add your custom colors
      }
    }
  }
}
```

### Logo & Branding

Update the logo in `components/layout/Header.tsx`:

```typescript
<Link href="/" className="text-2xl font-bold text-blue-600">
  Mimi Store
</Link>
```

## 🌐 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | Get all products |
| `/api/product/[slug]` | GET | Get single product by slug |
| `/api/hero` | GET | Get hero slider data |
| `/api/banners` | GET | Get promotional banners |
| `/api/categories` | GET | Get product categories |

### Example API Response

**GET /api/products**
```json
{
  "success": true,
  "products": [
    {
      "id": "1",
      "title": "Wireless Headphones",
      "slug": "wireless-headphones",
      "price": 25000,
      "image": "https://...",
      "category": "Electronics",
      "inStock": true
    }
  ]
}
```

## 🧩 State Management

### Cart Context

```typescript
import { useCart } from "@/context/CartContext";

function MyComponent() {
  const { cart, addToCart, removeFromCart, cartCount, cartTotal } = useCart();
  
  // Use cart methods
  addToCart(product, quantity);
  removeFromCart(productId);
}
```

### Wishlist Context

```typescript
import { useWishlist } from "@/context/WishlistContext";

function MyComponent() {
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  // Use wishlist methods
  addToWishlist(product);
  removeFromWishlist(productId);
}
```

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (min-width: 640px) { /* sm */ }

/* Tablet */
@media (min-width: 768px) { /* md */ }

/* Desktop */
@media (min-width: 1024px) { /* lg */ }

/* Large Desktop */
@media (min-width: 1280px) { /* xl */ }
```

## 🐛 Troubleshooting

### Cart not persisting
- Check browser localStorage is enabled
- Clear localStorage: `localStorage.clear()` in console

### Images not loading
- Verify image URLs are accessible
- Check CORS settings if using external images

### API 404 errors
- Ensure API files are in correct directories
- Restart dev server after adding new API routes

### TypeScript errors
- Run `npm run type-check` to see all type errors
- Check `interface.ts` for proper type definitions

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_BASE_URL` | Base URL for API calls | Yes |

## 📦 Dependencies

### Core
- **next** - React framework with SSR
- **react** - UI library
- **react-dom** - React DOM renderer
- **typescript** - Type safety

### UI & Styling
- **tailwindcss** - Utility-first CSS framework
- **lucide-react** - Icon library

### Dev Dependencies
- **@types/node** - Node.js type definitions
- **@types/react** - React type definitions
- **eslint** - Code linting
- **autoprefixer** - CSS vendor prefixes
- **postcss** - CSS transformations

## 🚧 Roadmap

### Planned Features
- [ ] User authentication & accounts
- [ ] Order history & tracking
- [ ] Product search functionality
- [ ] Advanced filtering & sorting
- [ ] Payment gateway integration (Paystack, Flutterwave)
- [ ] Admin dashboard
- [ ] Product inventory management
- [ ] Email notifications
- [ ] Social media sharing
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Product comparison
- [ ] Customer support chat

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for all new files
- Follow ESLint rules
- Write meaningful commit messages
- Add comments for complex logic

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGithub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Lucide for beautiful icons
- Unsplash for placeholder images

## 📞 Support

For support, email support@mimistore.com or open an issue on GitHub.

## 🌟 Show Your Support

Give a ⭐️ if you like this project!

---

**Made with ❤️ by Mimi Store Team**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/mimi-store)