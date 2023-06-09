"use client"
import { Props } from "next/script";
import { ChangeEvent, FormEventHandler, useState } from "react";

interface chatMessage {
  message: string;
  sender: "Sinä" | "Botti"
}


const Chat = () => {
  const [chatHistory, setChatHistory] = useState<chatMessage[]>([])
  const [prompt, setPrompt] = useState<string>('')
  
  const handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setPrompt(event.target.value)
  }

  const submitPrompt = (event: any) => {
    event.preventDefault()
    setChatHistory(chatHistory.concat({message: prompt, sender: "Sinä"}))
    setPrompt('')
  }

  return(
    <>
      <div className="flex flex-col">
        {chatHistory.map((message: chatMessage) =>
          <div
            className={message.sender == "Sinä" ? "self-start" : "self-end"}
            key={message.message}>
            {message.sender}: {message.message}
          </div>
        )}
      </div>
      <form onSubmit={submitPrompt}>
        <input
          type="text"
          value={prompt}
          onChange={handleTyping}
        />
      </form>
    </>
  )
}

export default Chat