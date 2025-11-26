// pages/api/hero.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getHeroSlides } from "@/lib/store";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("=== /api/hero called ===");
    
    const slides = getHeroSlides();
    console.log("Hero slides fetched:", slides.length);

    res.status(200).json({
      success: true,
      slides,
    });
  } catch (error) {
    console.error("Error in /api/hero:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      slides: [],
    });
  }
}