// pages/api/banners.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getBanners } from "@/lib/store";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("=== /api/banners called ===");
    
    const banners = getBanners();
    console.log("Banners fetched:", banners.length);

    res.status(200).json({
      success: true,
      banners,
    });
  } catch (error) {
    console.error("Error in /api/banners:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      banners: [],
    });
  }
}