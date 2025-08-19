export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          job_title: string | null
          hourly_rate: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          job_title?: string | null
          hourly_rate?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          job_title?: string | null
          hourly_rate?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          client_id: string | null
          name: string
          description: string | null
          budget: number | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id?: string | null
          name: string
          description?: string | null
          budget?: number | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string | null
          name?: string
          description?: string | null
          budget?: number | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      timesheet_entries: {
        Row: {
          id: string
          user_id: string
          project_id: string | null
          description: string
          hours: number
          date: string
          billable: boolean
          ai_processed: boolean
          original_input: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_id?: string | null
          description: string
          hours: number
          date: string
          billable?: boolean
          ai_processed?: boolean
          original_input?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          project_id?: string | null
          description?: string
          hours?: number
          date?: string
          billable?: boolean
          ai_processed?: boolean
          original_input?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      chat_conversations: {
        Row: {
          id: string
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          conversation_id: string
          role: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          role: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          role?: string
          content?: string
          created_at?: string
        }
      }
    }
  }
}
