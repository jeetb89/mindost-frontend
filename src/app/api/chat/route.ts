import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { NinniPersona } from '@/utils/ninniPersona';
import { ResponseCache } from '@/utils/responseCache';
import { RateLimit } from '@/utils/rateLimit';
import { headers } from 'next/headers';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { messages, userIp, isFirstMessage = false } = await request.json();
    
    // Check rate limit
    if (!await RateLimit.check(userIp)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    // Get the user's message (last message in the array)
    const userMessage = messages[messages.length - 1].content;
    
    // Format messages with Ninni's persona
    const { messages: formattedMessages, detectedLanguage } = 
      await NinniPersona.formatUserMessage(userMessage, isFirstMessage);

    // Try to get cached response (skip cache for first message to ensure dynamic greeting)
    if (!isFirstMessage) {
      const cacheKey = JSON.stringify(formattedMessages);
      const cachedResponse = ResponseCache.get(cacheKey);
      if (cachedResponse) {
        return NextResponse.json({
          content: cachedResponse,
          detectedLanguage
        });
      }
    }

    // Get chat completion
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 150,
      presence_penalty: 0.6,
      frequency_penalty: 0.3,
    });

    const response = completion.choices[0].message;

    // Cache the response (skip caching first message)
    if (!isFirstMessage) {
      const cacheKey = JSON.stringify(formattedMessages);
      ResponseCache.set(cacheKey, response.content || '');
    }

    // Get the host from headers
    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

    // Get emotion analysis with absolute URL
    const emotionResponse = await fetch(`${protocol}://${host}/api/analyze-emotion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: userMessage })
    });
    
    const { emotion } = await emotionResponse.json();

    return NextResponse.json({
      content: response.content,
      detectedLanguage,
      detectedEmotion: emotion
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to get chat response' },
      { status: 500 }
    );
  }
} 