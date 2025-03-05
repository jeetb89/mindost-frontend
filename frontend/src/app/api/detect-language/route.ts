import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const LANGUAGE_PROMPT = `Analyze the language of the following text and return a JSON object with two properties:
1. "detectedLanguage": The primary language (e.g., "english", "hindi")
2. "isHinglish": A boolean indicating if the text is Hinglish (mix of Hindi and English)

Return ONLY the JSON object, nothing else.`;

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
        { role: 'system', content: LANGUAGE_PROMPT },
        { role: 'user', content: text }
      ],
      temperature: 0.3,
      max_tokens: 50,
    });

    const result = completion.choices[0].message.content;
    let languageInfo;
    
    try {
      languageInfo = JSON.parse(result || '{"detectedLanguage": "english", "isHinglish": false}');
    } catch {
      languageInfo = { detectedLanguage: 'english', isHinglish: false };
    }

    return NextResponse.json(languageInfo);
  } catch (error) {
    console.error('Error in language detection API:', error);
    return NextResponse.json(
      { error: 'Failed to detect language' },
      { status: 500 }
    );
  }
} 