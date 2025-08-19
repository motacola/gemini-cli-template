import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { Database } from "../types/supabase"
import { cookies } from "next/headers"

// Create a Supabase client for server-side operations
export const createClient = (cookieStore = cookies()) => {
  const supabaseUrl = process.env.SUPABASE_URL || "https://example.supabase.co"
  const supabaseKey = process.env.SUPABASE_ANON_KEY || "your-anon-key"

  return createSupabaseClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
  })
}

// For backward compatibility
export const createServerClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL || "https://example.supabase.co"
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "your-service-role-key"

  return createSupabaseClient<Database>(supabaseUrl, supabaseKey)
}
