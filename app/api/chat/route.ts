import { NextResponse } from 'next/server';
import { CHAT_COMPLETIONS_URL } from '../../../utils/constants';

export async function POST(req: Request) {

  const r = await req.json();

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'GEMINI_API_KEY is not configured. Add it to .env.local (see .env.example).' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(CHAT_COMPLETIONS_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      method: "POST",
      body: JSON.stringify(r)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Chat API error:', response.status, errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error fetching chat response:', error);
    return NextResponse.json({ error: 'Failed to fetch chat response' }, { status: 500 });
  }
}
