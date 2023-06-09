"use client"
import { Props } from "next/script";
import { ChangeEvent, FormEventHandler, useState } from "react";

interface ChatMessage {
  content: string;
  role: "user" | "assistant" | "system"
}


const Chat = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [prompt, setPrompt] = useState<string>('')

  const sendPrompt = async () => {
    const newChats: ChatMessage[] = [...chatHistory, {content: prompt, role: "user"}]
    const params =  {
      "model": "gpt-3.5-turbo",
      "messages": newChats
    }
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
    console.log("apiKey", apiKey)
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