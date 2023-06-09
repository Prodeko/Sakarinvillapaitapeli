'use client'
import { generateSystemPrompt } from '@/common/prompts'
import {
  FAKE_LAG_AFTER_CHAT_LIMIT_HARD_CAP_MS,
  MAX_CHAT_LENGTH,
  WINNING_MESSAGE,
} from '@/utils/constants'
import { useState } from 'react'

interface ChatMessage {
  content: string
  role: 'user' | 'assistant' | 'system'
}

const initialMessage: ChatMessage = {
  role: 'assistant',
  content: 'Onpas tänään viileä päivä...',
}

const Chat = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    initialMessage,
  ])
  const [prompt, setPrompt] = useState<string>('')
  const [isWon, setIsWon] = useState(false)
  const [loading, setLoading] = useState(false)

  const sendPrompt = async () => {
    setLoading(true)
    const sysPrompt: ChatMessage = {
      role: 'system',
      content: generateSystemPrompt(),
    }

    // Hard limit chat length
    if (chatHistory.length >= MAX_CHAT_LENGTH) {
      const winningMessage: ChatMessage = {
        content: WINNING_MESSAGE,
        role: 'system',
      }
      setTimeout(() => {
        setChatHistory([...chatHistory, winningMessage])
        setIsWon(true)
      }, FAKE_LAG_AFTER_CHAT_LIMIT_HARD_CAP_MS)
      return
    }

    const newChats: ChatMessage[] = [
      ...chatHistory,
      { content: prompt, role: 'user' },
    ]
    const params = {
      model: 'gpt-3.5-turbo',
      messages: [sysPrompt, ...newChats],
    }
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      method: 'POST',
      body: JSON.stringify(params),
    })
    const { choices } = await res.json()
    const response = choices[0].message
    const newMsg: ChatMessage = {
      role: response.role,
      content: response.content,
    }
    setChatHistory([...newChats, newMsg])
    setLoading(false)
  }

  const handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setPrompt(event.target.value)
  }

  const submitPrompt = (event: any) => {
    event.preventDefault()
    setPrompt('')
    sendPrompt()
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex flex-col gap-4 py-24">
        {chatHistory.map((message: ChatMessage) => (
          <div key={message.content}>
            {message.role === 'user' ? (
              <div className="flex flex-row text-left gap-4">
                <p className="font-bold">Sinä</p>
                <p className="flex-grow">{message.content}</p>
              </div>
            ) : (
              <div className="flex flex-row text-left gap-4">
                <p className="flex-grow">{message.content}</p>
                <p className="font-bold">Sakari</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {loading && (
        <p>Sakari pohtii...</p>
      )}
      <form onSubmit={submitPrompt}>
        <input
          type="text"
          value={prompt}
          onChange={handleTyping}
          className="border w-full"
        />
      </form>
    </div>
  )
}

export default Chat
