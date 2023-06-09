"use client"
import { systemPrompt } from "@/common/prompts";
import { useState } from "react";

interface ChatMessage {
  content: string;
  role: "user" | "assistant" | "system"
}

const initialMessage: ChatMessage = {
  role: "assistant",
  content: "Onpas tänään viileä päivä..."
}


const Chat = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([initialMessage])
  const [prompt, setPrompt] = useState<string>('')

  const sendPrompt = async () => {
    const newChats: ChatMessage[] = [...chatHistory, {content: prompt, role: "user"}]
    const sysPrompt: ChatMessage = {
      role: "system",
      content: systemPrompt
    }
    const params =  {
      "model": "gpt-3.5-turbo",
      "messages": [sysPrompt, ...newChats]
    }
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      method: "POST",
      body: JSON.stringify(params),
    })
    const { choices } = await res.json()
    const response = choices[0].message
    const newMsg: ChatMessage = {role: response.role, content: response.content}
    setChatHistory([...newChats, newMsg])
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
    <div className="flex flex-col gap-4 p-6">
      <div className="flex flex-col gap-4 py-12">
        {chatHistory.map((message: ChatMessage) =>
          <div
            className={message.role === "user" ? "text-left" : "text-right"}
            key={message.content}>
            {message.content}
          </div>
        )}
      </div>
      <form onSubmit={submitPrompt}>
        <input
          type="text"
          value={prompt}
          onChange={handleTyping}
          className="border"
        />
      </form>
    </div>
  )
}

export default Chat