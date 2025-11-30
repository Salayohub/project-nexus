// pages/api/paystack/verify.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { reference } = req.query;

  if (!reference) {
    return res.status(400).json({ status: "error", message: "Missing payment reference" });
  }

  try {
    const verifyResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );

    const data = await verifyResponse.json();

    if (!data.status) {
      return res.status(400).json({ status: "error",  message: data.message });
    }

    // TODO: save order to DB, clear cart, send email, etc.

    // Redirect to success page
      return res.status(200).json({ status: "success", message: "Payment verified successfully" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Verification failed" });
  }
}
