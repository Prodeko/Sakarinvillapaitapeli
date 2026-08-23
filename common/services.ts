import { ChatList } from '../common/types'

/**
 * Posts the chat payload to this app's own /api/chat route, which forwards it
 * to the configured provider server-side so the API key never reaches the browser.
 */
export async function fetchChatResponse(params: ChatList) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })

  if (!res.ok) console.error(res)

  return res.json()
}
