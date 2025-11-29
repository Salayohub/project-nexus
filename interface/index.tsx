

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
  productCount?: number;
  

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

// cart ||checkout ||wishlist section 

export interface CartItem {
  id: string;
  title: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  title: string;
  slug: string;
  image: string;
  price: number;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  paymentMethod: "card" | "transfer" | "cash";
}

// NEW: Hero Section Interface
export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  bgColor?: string;
}

// NEW: Banner Interface
export interface Banner {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  badge?: string;
  position: "left" | "right" | "center";
}

export interface CategoriesSectionProps {
  categories: Category[];
}

export interface HeroSectionProps {
  slides: HeroSlide[];
  
}

export interface aboutUs{
  
}

// / ==================== AUTH INTERFACES ====================

// Login Form Data
export interface LoginFormData {
  email: string;
  password: string;
}

// Signup Form Data
export interface SignupFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

// Password Strength
export interface PasswordStrength {
  strength: "Weak" | "Medium" | "Strong" | "";
  color: string;
  width: string;
}

// User Data
export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  token?: string;
  createdAt?: string;
}

// Auth Response
export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
}

// ==================== CONTACT FORM INTERFACE ====================
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// ==================== API RESPONSE INTERFACES ====================
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface ProductsApiResponse {
  success: boolean;
  products: Products[];
  total?: number;
}

export interface SingleProductApiResponse {
  success: boolean;
  product: Products | null;
}

// ==================== ORDER INTERFACE ====================
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  shippingFee: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: "card" | "transfer" | "cash";
  createdAt: string;
  updatedAt: string;
}