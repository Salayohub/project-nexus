// pages/api/categories.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getCategories } from "@/lib/store";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("=== /api/categories called ===");
    
    const categories = getCategories();
    console.log("Categories fetched:", categories.length);

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("Error in /api/categories:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      categories: [],
    });
  }
}