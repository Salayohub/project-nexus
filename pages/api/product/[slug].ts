// pages/api/product/[slug].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getProductBySlug } from "@/lib/store";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { slug } = req.query;
    
    console.log("API /api/product/[slug] called with slug:", slug); // Debug log

    if (!slug || typeof slug !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid slug parameter",
      });
    }

    const product = getProductBySlug(slug);
    
    console.log("Product found:", product ? "Yes" : "No"); // Debug log

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
  } catch (error) {
    console.error("Error in /api/product/[slug]:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}