import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an emotion detection expert. Analyze the emotional content of the text and respond with a single word representing the primary emotion (e.g., 'happy', 'sad', 'angry', 'anxious', 'neutral', etc.)."
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0.3,
    });

    const emotion = response.choices[0].message.content?.toLowerCase().trim() || 'neutral';

    return NextResponse.json({ emotion });
  } catch (error: any) {
    console.error('Error in analyze-emotion route:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
} 