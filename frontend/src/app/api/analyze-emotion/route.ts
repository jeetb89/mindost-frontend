import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const EMOTION_PROMPT = `Analyze the emotional content of the following text and return a single word representing the primary emotion (e.g., happy, sad, angry, anxious, neutral, etc.). Consider both explicit emotional statements and implicit emotional cues. Return ONLY the emotion word, nothing else.`;

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'No text provided' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: 'system', content: EMOTION_PROMPT },
        { role: 'user', content: text }
      ],
      temperature: 0.3,
      max_tokens: 50,
    });

    const emotion = completion.choices[0].message.content?.toLowerCase().trim() || 'neutral';

    return NextResponse.json({ emotion });
  } catch (error) {
    console.error('Error in emotion analysis API:', error);
    return NextResponse.json(
      { error: 'Failed to analyze emotion' },
      { status: 500 }
    );
  }
} 