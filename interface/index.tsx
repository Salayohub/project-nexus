

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
export interface Products {
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
  product: Products;
  onAddToCart?: (product: Products) => void;
  onAddToWishlist?: (product: Products) => void;
}

export interface CategoryCardProps {
  category: Category;
}

export interface ProductDetailPageProps {
  product: Products;
  relatedProducts?: RelatedProduct[];
}

export interface RelatedProduct {
  id: string;
  title: string;
  slug: string;
  image: string;
  price: number;
  category?: string;
  rating?: number;
}

export interface ProductCardProps {
  product: Products;
  onAddToCart?: (product: Products) => void;
  onAddToWishlist?: (product: Products) => void;
}

export interface SingleProductPageProps {
  product: Products | null;
  error?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}
