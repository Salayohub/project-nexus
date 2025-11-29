// pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  try {
    // Add your authentication logic here
    // Example: Check against database
    // const user = await authenticateUser(email, password);

    // For demo purposes
    if (email && password) {
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          email: email,
          name: "User Name",
          token: "demo_token_123",
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}