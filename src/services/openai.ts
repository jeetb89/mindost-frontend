import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { detectLanguage, analyzeEmotion, getResponseLanguage, LANGUAGE_PROMPTS } from './languageProcessing';

// Define supported languages type
type SupportedLanguage = keyof typeof LANGUAGE_PROMPTS;

// Define supported voices type
type OpenAIVoice = 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';

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

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Add sleep utility function
const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export async function getChatResponse(messages: Message[]): Promise<string> {
  try {
    // Start minimum processing timer
    const processingTimer = sleep(1000); // 1 second minimum processing time

    // Analyze the last user message for language and emotion
    const lastUserMessage = messages[messages.length - 1].content;
    const [languageInfo, emotionInfo] = await Promise.all([
      detectLanguage(lastUserMessage),
      analyzeEmotion(lastUserMessage)
    ]);

    // Determine response language and ensure it's a supported language
    const detectedLanguage = getResponseLanguage(languageInfo.detectedLanguage, languageInfo.isHinglish);
    const responseLanguage = (detectedLanguage in LANGUAGE_PROMPTS) ? detectedLanguage as SupportedLanguage : 'english';
    
    // Get response from OpenAI
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('Failed to get chat response');
    }

    const data = await response.json();
    
    // Wait for minimum processing time
    await processingTimer;

    return data.content || "I apologize, but I am unable to respond at the moment.";
  } catch (error) {
    console.error('Error in getChatResponse:', error);
    throw error;
  }
}

// Speech-to-text using Whisper API
export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  try {
    // Start minimum processing timer
    const processingTimer = sleep(1000);

    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('type', 'transcribe');

    const response = await fetch('/api/speech', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to transcribe audio');
    }

    const data = await response.json();
    
    // Wait for minimum processing time
    await processingTimer;
    
    return data.text;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw error;
  }
}

// Text-to-speech using OpenAI TTS
export async function synthesizeSpeech(text: string, voice: OpenAIVoice = 'alloy'): Promise<void> {
  try {
    // Start minimum processing timer
    const processingTimer = sleep(1000);

    const formData = new FormData();
    formData.append('text', text);
    formData.append('type', 'synthesize');
    formData.append('voice', voice);

    const response = await fetch('/api/speech', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to synthesize speech');
    }

    const arrayBuffer = await response.arrayBuffer();
    
    // Wait for minimum processing time
    await processingTimer;
    
    const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    
    return new Promise((resolve, reject) => {
      audio.onended = () => {
        URL.revokeObjectURL(url);
        resolve();
      };
      audio.onerror = reject;
      audio.play();
    });
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    throw error;
  }
} 