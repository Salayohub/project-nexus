import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white">
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
