'use client'
import { generateSystemPrompt } from '@/common/prompts'
import { checkIfMessageContainsWinningToken } from '@/utils/checkIfMessageContainsWinningToken'
import {
  CHAT_MODEL,
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

const Chat = ({
  isWon,
  setIsWon,
}: {
  isWon: boolean
  setIsWon: (newState: boolean) => void
}) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    initialMessage,
  ])
  const [prompt, setPrompt] = useState<string>('')
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
        setLoading(false)
      }, FAKE_LAG_AFTER_CHAT_LIMIT_HARD_CAP_MS)
      return
    }

    const newChats: ChatMessage[] = [
      ...chatHistory,
      { content: prompt, role: 'user' },
    ]
    const params = {
      model: CHAT_MODEL,
      messages: [sysPrompt, ...newChats],
    }

    try {
      const res = await fetch('/api/chat', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
        method: 'POST',
      }).then(res => res.json())

      const message = res?.choices?.[0]?.message

      if (!message?.content) {
        // Surface the failure instead of leaving the UI stuck on "Sakari pohtii...".
        // Gemini returns errors wrapped in an array, so unwrap that first.
        const payload = Array.isArray(res) ? res[0] : res
        const raw = payload?.error?.message ?? payload?.error
        const detail =
          typeof raw === 'string' && raw ? raw : 'tuntematon virhe'
        setChatHistory([
          ...newChats,
          {
            role: 'assistant',
            content: `[Sakari ei saanut yhteyttä: ${detail}]`,
          },
        ])
        return
      }

      const newMsg: ChatMessage = {
        role: 'assistant',
        content: message.content,
      }

      setIsWon(checkIfMessageContainsWinningToken(newMsg.content))
      setChatHistory([...newChats, newMsg])
    } catch (error) {
      console.error('Chat request failed:', error)
      setChatHistory([
        ...newChats,
        { role: 'assistant', content: '[Sakari ei saanut yhteyttä palvelimeen]' },
      ])
    } finally {
      setLoading(false)
    }
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

  return(
    <div className="flex flex-col gap-4 p-6 md:bg-gradient-to-l md:bg-slate-100 md:bg-opacity-50 bg-gradient-to-b from-indigo-300">
      <div className="flex flex-col gap-4 py-24">
        {chatHistory.map((message: ChatMessage, index: number) => (
          <div key={index}>
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
      {loading && <p>Sakari pohtii...</p>}
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
