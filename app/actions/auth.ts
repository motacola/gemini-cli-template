"use server"
import { mockLogin, mockLogout, mockGetSession } from "./mock-auth"

// Login action
export async function login(prevState: any, formData: { email: string; password: string }) {
  try {
    const { email, password } = formData

    // Validate inputs
    if (!email || !password) {
      return {
        error: "Email and password are required",
        success: false,
      }
    }

    // Call mock login function
    const result = await mockLogin(email, password)

    if (!result.success) {
      return {
        error: result.error || "Invalid credentials",
        success: false,
      }
    }

    // Return success and redirect URL
    return {
      success: true,
      redirectTo: "/dashboard",
    }
  } catch (error) {
    console.error("Server login error", error)
    return {
      error: "An unexpected error occurred",
      success: false,
    }
  }
}

// Logout action
export async function logout() {
  try {
    await mockLogout()
    return { success: true }
  } catch (error) {
    console.error("Logout error", error)
    return { success: false, error: "Failed to log out" }
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  try {
    const session = await mockGetSession()
    return !!session
  } catch (error) {
    console.error("Auth check error", error)
    return false
  }
}

// Get current user session
export async function getSession() {
  try {
    return await mockGetSession()
  } catch (error) {
    console.error("Get session error", error)
    return null
  }
}
