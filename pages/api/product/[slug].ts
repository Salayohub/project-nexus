// pages/api/product/[slug].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getProductBySlug } from "@/lib/store";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({
      success: false,
      message: "Invalid slug parameter",
    });
  }

  const product = getProductBySlug(slug);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  return res.status(200).json({
    success: true,
    product,
  });
}