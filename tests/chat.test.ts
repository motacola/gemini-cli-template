import { describe, it, expect, vi } from 'vitest'
import { NextRequest } from 'next/server'

const mockGetUser = vi.fn()
const mockFrom = vi.fn(() => ({
  insert: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  single: vi.fn(() => ({ data: { id: 'conv1' }, error: null })),
}))
vi.mock('@supabase/supabase-js', () => {
  return { createClient: vi.fn(() => ({ auth: { getUser: mockGetUser }, from: mockFrom })) }
})

vi.mock('openai', () => {
  return {
    default: vi.fn(() => ({
      completions: {
        create: vi.fn(() => Promise.resolve({
          choices: [{ text: 'hello' }],
        })),
      },
    })),
  }
})

const buildRequest = (body: any) => {
  return new NextRequest(
    new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
  )
}

describe('chat route', () => {
  it('returns 401 if unauthenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: null })
    const { POST } = await import('../app/api/chat/route')
    const res = await POST(buildRequest({ message: 'hi' }))
    expect(res.status).toBe(401)
  })

  it('returns response when authenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: '1', email: 'a@b.c' } }, error: null })
    const { POST } = await import('../app/api/chat/route')
    const res = await POST(buildRequest({ message: 'hi' }))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.response).toBe('hello')
    expect(json.conversationId).toBeDefined()
  })
})
