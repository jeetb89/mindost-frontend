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
          content: "You are a language detection expert. Analyze the text and respond with a JSON object containing: detectedLanguage (string), isHinglish (boolean). Example: {\"detectedLanguage\": \"hindi\", \"isHinglish\": true}"
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0.3,
    });

    const content = response.choices[0].message.content || "{}";
    return NextResponse.json(JSON.parse(content));
  } catch (error: any) {
    console.error('Error in detect-language route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 