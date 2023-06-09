"use client"
import { Props } from "next/script";
import { ChangeEvent, FormEventHandler, useState } from "react";

interface ChatMessage {
  message: string;
  role: "user" | "assistant" | "system"
}


const Chat = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [prompt, setPrompt] = useState<string>('')

  const sendPrompt = async () => {
    const params =  {
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": "Moi, miten menee?"}]
    }
    const apiKey = process.env.OPENAI_API_KEY
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      method: "POST",
      body: JSON.stringify(params),
    })
    const { messages } = await res.json()
    console.log(messages)
  }
  
  const handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setPrompt(event.target.value)
  }

  const submitPrompt = (event: any) => {
    event.preventDefault()
    setChatHistory(chats => [...chats, {message: prompt, role: "user"}])
    setPrompt('')
  }

  return(
    <>
      <div className="flex flex-col">
        {chatHistory.map((message: ChatMessage) =>
          <div
            className={message.role === "user" ? "self-start" : "self-end"}
            key={message.message}>
            {message.role}: {message.message}
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
    </>
  )
}

export default Chat