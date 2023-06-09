interface ChatMessage {
    role: "user" | "assistant" | "system",
    content: string
}

interface ChatList {
    messages: Array<ChatMessage>
}

export type {ChatMessage, ChatList}