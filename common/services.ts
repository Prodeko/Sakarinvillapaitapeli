import { ChatList} from '../common/types'

/**export
* Utility function for calling the OpenAI streaming endpoint
* @param params parameters for the chat completion
* @param apiKey OpenAI api key
* @returns

const fetchChatResponse = async (
 params: ChatList,
 apiKey: string,
) => {
 const res = await fetch("https://api.openai.com/v1/chat/completions", {
   headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${apiKey}`,
   },
   method: "POST",
   body: JSON.stringify(params),
 })
 return res
}
*/
export async function fetchChatResponse(params: ChatList) {
  const res = await fetch('/api/chat', {
      method: 'POST',
      headers:
        {'Content-Type': 'application/json'},
      body:
        JSON.stringify(params),
    });

    if (!res.ok) console.error(res);
    
    return res.json();
}