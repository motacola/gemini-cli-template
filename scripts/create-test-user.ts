import { createClient } from "@supabase/supabase-js"

async function createTestUser() {
  console.log("Creating test user...")

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase URL or service role key in environment variables")
    return
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Check if user already exists
    const { data: existingUsers, error: searchError } = await supabase
      .from("auth.users")
      .select("*")
      .eq("email", "test@example.com")
      .limit(1)

    if (searchError) {
      console.error("Error checking for existing user:", searchError.message)
      return
    }

    if (existingUsers && existingUsers.length > 0) {
      console.log("Test user already exists")
      return
    }

    // Create a new user
    const { data, error } = await supabase.auth.admin.createUser({
      email: "test@example.com",
      password: "password123",
      email_confirm: true,
      user_metadata: {
        full_name: "Test User",
      },
    })

    if (error) {
      console.error("Error creating test user:", error.message)
      return
    }

    console.log("Test user created successfully:", data.user.id)
    console.log("Email: test@example.com")
    console.log("Password: password123")
  } catch (err) {
    console.error("Unexpected error:", err)
  }
}

createTestUser()
