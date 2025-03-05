import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const THERAPY_SYSTEM_PROMPT = `You are MindDost, an advanced AI therapist with expertise in:
- Cognitive Behavioral Therapy (CBT)
- Mindfulness techniques
- Emotional support and validation
- Multi-cultural counseling
- Crisis intervention

Your approach:
1. Listen actively and validate emotions
2. Identify cognitive patterns and emotional triggers
3. Offer practical CBT techniques and mindfulness exercises
4. Provide culturally sensitive support
5. Maintain professional boundaries while being warm and empathetic
6. Give clear, actionable suggestions when appropriate
7. Recognize crisis situations and provide appropriate resources

Remember:
- Always maintain confidentiality
- Be non-judgmental and empathetic
- Adapt your language style to match the user
- Focus on emotional support and practical solutions
- Use appropriate therapeutic techniques based on the situation

Safety:
- If you detect serious crisis or self-harm risks, provide emergency resources
- Clarify that you're an AI and recommend professional help when needed
- Never give medical advice or diagnoses`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // Add system message if not present
    if (!messages.some(msg => msg.role === 'system')) {
      messages.unshift({ role: 'system', content: THERAPY_SYSTEM_PROMPT });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0].message;

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to get chat response' },
      { status: 500 }
    );
  }
} 