import { createClient } from "@supabase/supabase-js"

async function testConnection() {
  console.log("Testing Supabase connection...")

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase URL or service role key in environment variables")
    return
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Test the connection by making a simple query
    const { data, error } = await supabase.from("projects").select("id").limit(1)

    if (error) {
      console.error("Error connecting to Supabase:", error.message)
      return
    }

    console.log("Successfully connected to Supabase!")
    console.log("Test query result:", data)

    // Test auth
    console.log("\nTesting auth functionality...")
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers()

    if (authError) {
      console.error("Error testing auth:", authError.message)
      return
    }

    console.log("Auth is working correctly!")
    console.log(`Found ${authData.users.length} users in the system`)
  } catch (err) {
    console.error("Unexpected error:", err)
  }
}

testConnection()
