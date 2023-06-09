import { NextResponse } from 'next/server'
import { fetchChatResponse } from '@/common/services'
import type { ChatList } from '../../common/types'
 
export async function GET(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY
  const { messages } = req.body as ChatList
  const res = await fetchChatResponse(messages, apiKey)
  const data = await res.json()
 
  return NextResponse.json({ data })
}