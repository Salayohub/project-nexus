// pages/api/products.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getAllProducts } from "@/lib/store";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("API /api/products called"); // Debug log
    
    const products = getAllProducts();
    
    console.log(`Found ${products.length} products`); // Debug log

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error in /api/products:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      products: [],
    });
  }
}