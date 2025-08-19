"use server"

import { cookies } from "next/headers"
import { logger } from "@/lib/logger"

// Mock user credentials
const MOCK_USER = {
  email: "chrisbelgrave@gmail.com",
  password: "123456",
  id: "mock-user-id",
  name: "Chris Belgrave",
}

// Session cookie name
const SESSION_COOKIE_NAME = "mock_session"

// Session expiry (7 days)
const SESSION_EXPIRY = 7 * 24 * 60 * 60 * 1000

/**
 * Mock login function
 */
export async function mockLogin(email: string, password: string) {
  try {
    // Check if credentials match
    if (email !== MOCK_USER.email || password !== MOCK_USER.password) {
      return { success: false, error: "Invalid email or password" }
    }

    // Create session
    const session = {
      user: {
        id: MOCK_USER.id,
        email: MOCK_USER.email,
        name: MOCK_USER.name,
      },
      expires: new Date(Date.now() + SESSION_EXPIRY).toISOString(),
    }

    // Set session cookie
    cookies().set({
      name: SESSION_COOKIE_NAME,
      value: JSON.stringify(session),
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: SESSION_EXPIRY / 1000, // Convert to seconds
    })

    return { success: true }
  } catch (error) {
    logger.error("Mock login error", error as Error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

/**
 * Mock logout function
 */
export async function mockLogout() {
  try {
    // Delete session cookie
    cookies().delete(SESSION_COOKIE_NAME)
    return { success: true }
  } catch (error) {
    logger.error("Mock logout error", error as Error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

/**
 * Mock get session function
 */
export async function mockGetSession() {
  try {
    // Get session cookie
    const sessionCookie = cookies().get(SESSION_COOKIE_NAME)

    if (!sessionCookie?.value) {
      return null
    }

    // Parse session
    const session = JSON.parse(sessionCookie.value)

    // Check if session is expired
    if (new Date(session.expires) < new Date()) {
      cookies().delete(SESSION_COOKIE_NAME)
      return null
    }

    return session
  } catch (error) {
    logger.error("Mock get session error", error as Error)
    return null
  }
}

/**
 * Mock is authenticated function
 */
export async function mockIsAuthenticated() {
  try {
    const session = await mockGetSession()
    return !!session
  } catch (error) {
    logger.error("Mock is authenticated error", error as Error)
    return false
  }
}
