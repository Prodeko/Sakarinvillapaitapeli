import { NextResponse } from 'next/server';
import { ChatList } from '../../../common/types'; // Adjust path according to your structure

export async function POST(req: Request) {

  const r = await req.json();
  console.log(r)
  
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API key is not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        method: "POST",
        body: JSON.stringify(r)
      }
    )
    
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData)
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    console.log(data)
    return NextResponse.json(data);
  
  } catch (error) {
    console.error('Error fetching chat response:', error);
    return NextResponse.json({ error: 'Failed to fetch chat response' }, { status: 500 });
  }
}