// lib/api/auth.ts
import { LoginFormData, SignupFormData, AuthResponse } from "@/interface";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

/**
 * Login user
 */
export async function loginUser(credentials: LoginFormData): Promise<AuthResponse> {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "An error occurred. Please try again.",
    };
  }
}

/**
 * Register user
 */
export async function registerUser(userData: SignupFormData): Promise<AuthResponse> {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Signup error:", error);
    return {
      success: false,
      message: "An error occurred. Please try again.",
    };
  }
}