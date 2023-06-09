import Image from 'next/image'
import next from '../public/next.svg'
import Chat from '../components/Chat'

export default function Home() {
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
  return (
    <div className='w-full h-full flex'>
        <div className='flex flex-row w-full'>
          <Image
              className="flex flex-grow"
              src="/../public/Sakari.png"
              alt="Sakke"
              width={600}
              height={100}
              priority
            />
            <div className='flex flex-grow-0'>
              <h1>Sakarin villapaitapeli</h1>
              <Chat />
            </div>
        </div>
    </div>
  )
}