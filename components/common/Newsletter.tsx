import { NewsletterProps } from "@/interface";
import { useState } from "react";



const bgStyles = {
  blue: "bg-blue-600 text-white",
  dark: "bg-gray-900 text-white",
  light: "bg-gray-100 text-gray-900",
};

const Newsletter: React.FC<NewsletterProps> = ({
  title = "Subscribe to Our Newsletter",
  subtitle = "Get the latest updates on new products and upcoming sales",
  apiUrl = "/api/newsletter",
  buttonText = "Subscribe",
  variant = "blue",
}) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubscribe = async () => {
    if (!email) return;

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className={`${bgStyles[variant]} py-16`}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{subtitle}</p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 bg-amber-50 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            onClick={handleSubscribe}
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-100 transition-colors"
          >
            {buttonText}
          </button>
        </div>

        {/* Status Messages */}
        {status === "success" && (
          <p className="mt-4 text-green-300">Subscribed successfully!</p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-300">Something went wrong. Try again.</p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
