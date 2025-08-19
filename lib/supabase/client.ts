import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { Database } from "../types/supabase"

// Make sure these environment variables are available on the client side
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://example.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key"

// Create a single instance for the client
const supabase = createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey)

// Export the client instance
export default supabase

// Export a function to create a client (for compatibility)
export const createClient = () => {
  return supabase
}
