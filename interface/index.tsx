

// export type Theme = "light" | "dark";

// export default interface ThemeContextType {
//   theme: Theme;
//   toggleTheme: () => void;
// }

export interface ReactComponentProps {
  children: React.ReactNode;
}

export interface ThemeProvider{
  children: React.ReactNode;
}

// Product Type
export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating?: number;
  category?: string;
  inStock: boolean;
  badge?: string; // e.g. "New", "Hot"
  description?: string;
}

// Category Type
export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}