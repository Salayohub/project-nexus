# Nexus E-commerce Project

## Project Overview

**Nexus** is a modern, scalable, and responsive e-commerce web application built using **Next.js**, **TypeScript**, and **Tailwind CSS**. The project is designed with a clean architecture to support maintainability, scalability, and high performance.

Key features of Nexus include:

* Dynamic product listing and filtering by category
* SEO-friendly URLs using **slug-based routing** for products
* Dark mode and light mode toggle
* Modular, reusable components (cards, buttons, layout, forms)
* Fully responsive design with mobile-first approach
* Product, hero, and banner sections fetched dynamically via API routes (`pages/api`)
* Global state management using **Context API**
* Shopping cart and wishlist functionality

---

## Project Structure

The project follows a **modular folder structure** for maintainability and scalability:

```
/nexus
│
├─ /components             # Reusable UI components
│   ├─ /button             # PrimaryButton, IconButton
│   ├─ /auth               # Login, Register components
│   ├─ /cards              # ProductCard, CategoryCard
│   ├─ /common             # Shared components (Loader, Pagination, etc.)
│   └─ /layout             # Header, Footer, ThemeToggle, Navbar
│
├─ /constants              # Global constants (routes, config, etc.)
│
├─ /contexts               # React Context API for global state
│   └─ themeContext.tsx    # Light/Dark theme context
│
├─ /interfaces             # TypeScript interfaces and types
│
├─ /lib                    # Business logic, data store
│   └─ store.ts            # Product and category store, helper functions
│
├─ /pages                  # Next.js pages (Pages Router)
│   ├─ /api                # API routes for dynamic data fetching
│   ├─ /products           # Dynamic product pages ([slug].tsx)
│   ├─ about.tsx
│   ├─ contact.tsx
│   ├─ cart.tsx
│   ├─ checkout.tsx
│   ├─ index.tsx
│   ├─ _app.tsx
│   └─ _document.tsx
│
├─ /public                 # Public assets (images, fonts, icons)
│
├─ /styles                 # Global styles
│   ├─ utilities           # Tailwind utility overrides
│
├─ next-env.d.ts            # Next.js TypeScript environment types
├─ next.config.js           # Next.js configuration
├─ package.json
├─ postcss.config.mjs
├─ tsconfig.json
└─ README.md
```

---

## Key Technologies

| Technology                   | Purpose                                             |
| ---------------------------- | --------------------------------------------------- |
| **Next.js**                  | Server-side rendering, routing, SEO optimization    |
| **TypeScript**               | Strong typing, maintainable code, type safety       |
| **Tailwind CSS**             | Utility-first CSS for responsive, scalable design   |
| **React Context API**        | Global state management (theme, cart, wishlist)     |
| **Lucide Icons**             | Modern SVG icons for UI elements                    |
| **Slug Routing**             | SEO-friendly URLs for products and categories       |
| **API Routes (`pages/api`)** | Dynamic fetching of products, hero section, banners |

---

## Features

### 1. Dynamic Product Pages

* Products are fetched dynamically using **API routes** (`pages/api/products.ts`)
* Each product has a **slug** for SEO-friendly URLs:

  ```
  /products/wireless-bluetooth-headphones
  ```
* Product details, images, price, rating, and badges (New/Hot) are displayed dynamically

### 2. Category Filtering

* Products can be filtered by category (`Electronics`, `Fashion`, `Home & Kitchen`)
* `getProductsByCategory` helper function in `store.ts` supports dynamic filtering

### 3. Hero & Banner Sections

* Hero section and promotional banners are fetched dynamically through API routes
* Configurable for quick updates without changing code

### 4. Dark Mode / Light Mode

* Global **ThemeContext** handles theme switching
* Dark mode is fully compatible with Tailwind CSS
* User preference is persisted in **localStorage**

### 5. Responsive Layout

* **Two-layer header**:

  * **Layer 1 (white):** Logo, search bar, cart, wishlist, theme toggle
  * **Layer 2 (blue):** Navbar (desktop) / Hamburger menu (mobile) with full-screen side menu
* Footer is fully responsive and matches the modern e-commerce standard

### 6. Reusable Components

* **ProductCard** and **CategoryCard**: Reusable, typed with TypeScript
* **PrimaryButton** and **IconButton**: Customizable, consistent styling
* Components follow **atomic design principles** for scalability

### 7. Cart & Wishlist

* Cart and wishlist icons available in header
* Cart items can be added dynamically via `onAddToCart` handlers
* Wishlist allows easy product saving

### 8. SEO & Performance

* Slug-based routing for SEO-friendly URLs
* SSR (Server-Side Rendering) where needed for better indexing
* Image optimization using Next.js `<Image />` component can be integrated

---

## Getting Started

### Prerequisites

* Node.js v18+
* npm or yarn
* Tailwind CSS configured

### Installation

```bash
# Clone repository
git clone https://github.com/your-username/nexus.git
cd nexus

# Install dependencies
npm install

# Run development server
npm run dev
```

### Folder Conventions

* **components/** → UI elements
* **contexts/** → React Context for theme and cart
* **lib/store.ts** → Product and category data with helper functions
* **pages/** → Next.js pages and API routes
* **public/** → Images, icons, static assets
* **styles/** → Tailwind CSS global and utility classes

---

## Example Usage

### Fetching Products by Category

```ts
import { getProductsByCategory } from "@/lib/store";

const electronicsProducts = getProductsByCategory("electronics");
```

### Rendering a Product Card

```tsx
import ProductCard from "@/components/cards/ProductCard";
import { Product } from "@/lib/types";

const product: Product = { /* product object from store */ };

<ProductCard
  product={product}
  onAddToCart={(product) => console.log("Added to cart", product)}
  onAddToWishlist={(product) => console.log("Added to wishlist", product)}
/>
```

---

## Best Practices Followed

* **TypeScript** for strong typing
* **Atomic component design** for scalability
* **Tailwind CSS** for utility-first responsive design
* **Slug routing** for SEO optimization
* **Context API** for global state (theme, cart, wishlist)
* **API routes** for dynamic data fetching
* Fully **responsive** header, footer, and product listing


---

## Future Enhancements

* Integrate **Next.js Image Optimization** for faster load times
* Add **real backend API** (Next.js API routes currently use static store)
* Implement **user authentication** (JWT or OAuth)
* Add **payment gateway integration** (Stripe, Paystack, PayPal)
* Include **pagination and infinite scrolling** for product lists
* Implement **server-side filtering & sorting**
* Reusable **buttons, cards, and icons**
* Dark mode implemented with **user preference persistence**


---
