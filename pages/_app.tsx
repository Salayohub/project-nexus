import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import { ThemeProvider } from "@/contexts/ThemeContext";
import Layout from "@/components/layout/Layout";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { CartProvider } from "@/contexts/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
       <CartProvider>
        <WishlistProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </WishlistProvider>
         </CartProvider>
  );
}
