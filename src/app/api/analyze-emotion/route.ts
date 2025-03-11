import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Return one word for the emotion in the text: happy, sad, angry, anxious, or neutral."
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0.3,
      max_tokens: 10,
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