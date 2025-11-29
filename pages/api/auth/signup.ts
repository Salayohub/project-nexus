// pages/api/auth/signup.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { fullName, email, phone, password } = req.body;

  try {
    // Add your signup logic here
    // Example: Create user in database
    // const user = await createUser({ fullName, email, phone, password });

    // Check if user already exists
    // const existingUser = await findUserByEmail(email);
    // if (existingUser) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Email already registered",
    //   });
    // }

    // For demo purposes
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        id: "user_123",
        fullName,
        email,
        phone,
        token: "demo_token_123",
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}