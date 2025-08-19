import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import OpenAI from "openai"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const openaiApiKey = process.env.OPENAI_API_KEY || ""

const supabase = createClient(supabaseUrl, supabaseKey)

const openai = new OpenAI({ apiKey: openaiApiKey })

export async function POST(req: NextRequest) {
  // Check authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    console.error("Authentication error:", authError?.message)
    return NextResponse.json({ error: "Unauthorized - Please log in to use the chat feature" }, { status: 401 })
  }

  try {
    const { message, conversationId } = await req.json()

    let convId = conversationId
    if (!convId) {
      const { data: convData, error: convError } = await supabase
        .from("chat_conversations")
        .insert({ user_id: user.id })
        .select("id")
        .single()

      if (convError || !convData) {
        console.error("Error creating conversation:", convError?.message)
        return NextResponse.json(
          { error: "Failed to create conversation" },
          { status: 500 },
        )
      }

      convId = convData.id
    }

    await supabase.from("chat_messages").insert({
      conversation_id: convId,
      role: "user",
      content: message,
    })

    // Add user context to the message processing
    const userContext = {
      userId: user.id,
      email: user.email,
      // Add any other relevant user info
    }

    const prompt = `You are a helpful AI assistant. The user is: ${userContext.email}. Answer the question as accurately as possible.\n\n${message}`

    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 200,
      temperature: 0.7,
      n: 1,
      stop: ["\n"],
    })

    const aiResponse = completion.choices[0].text

    await supabase.from("chat_messages").insert({
      conversation_id: convId,
      role: "assistant",
      content: aiResponse,
    })

    return NextResponse.json({ response: aiResponse, conversationId: convId })
  } catch (error: any) {
    console.error("Error processing request:", error)

    if (error.response) {
      console.error("OpenAI API error:", error.response.status, error.response.data)
      return NextResponse.json(
        { error: `OpenAI API Error: ${error.response.status} - ${error.response.data}` },
        { status: 500 },
      )
    } else if (error.message === "Unauthorized - Please log in to use the chat feature") {
      return NextResponse.json({ error: "Unauthorized - Please log in to use the chat feature" }, { status: 401 })
    } else {
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
  }
}
