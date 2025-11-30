// pages/payment-success.tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PaymentSuccess() {
  const router = useRouter();
  const { reference } = router.query;
  const [status, setStatus] = useState("Verifying payment...");

  useEffect(() => {
    if (!reference) return;

    const verifyPayment = async () => {
      try {
        const res = await fetch(`/api/paystack/verify?reference=${reference}`);
        const data = await res.json();
        if (data.status === "success") {
          setStatus("Payment Successful! Thank you for your order.");
        } else {
          setStatus("Payment verification failed.");
        }
      } catch {
        setStatus("Payment verification failed.");
      }
    };

    verifyPayment();
  }, [reference]);

  return (
    <div className="p-12 text-center">
      <h1 className="text-3xl font-bold">{status}</h1>
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => router.push("/")}
      >
        Continue Shopping
      </button>
    </div>
  );
}
