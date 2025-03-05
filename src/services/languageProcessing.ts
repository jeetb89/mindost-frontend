export interface LanguageInfo {
  detectedLanguage: string;
  isHinglish: boolean;
}

export interface EmotionInfo {
  emotion: string;
}

export const LANGUAGE_PROMPTS = {
  english: {
    systemPrompt: "Respond in English with a warm, empathetic tone.",
    voice: "alloy" as const
  },
  hindi: {
    systemPrompt: "हिंदी में जवाब दें, सहानुभूतिपूर्ण लहजे में।",
    voice: "nova" as const
  }
};

// Add sleep utility function
const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export async function detectLanguage(text: string): Promise<LanguageInfo> {
  try {
    // Start minimum processing timer
    const processingTimer = sleep(1000);

    const response = await fetch('/api/detect-language', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Failed to detect language');
    }

    const data = await response.json();
    
    // Wait for minimum processing time
    await processingTimer;
    
    return data;
  } catch (error) {
    console.error('Error detecting language:', error);
    // Default to English if language detection fails
    return {
      detectedLanguage: 'english',
      isHinglish: false
    };
  }
}

export async function analyzeEmotion(text: string): Promise<EmotionInfo> {
  try {
    // Start minimum processing timer
    const processingTimer = sleep(1000);

    const response = await fetch('/api/analyze-emotion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze emotion');
    }

    const data = await response.json();
    
    // Wait for minimum processing time
    await processingTimer;
    
    return { emotion: data.emotion || 'neutral' };
  } catch (error) {
    console.error('Error analyzing emotion:', error);
    return { emotion: 'neutral' };
  }
}

export function getResponseLanguage(detectedLanguage: string, isHinglish: boolean): string {
  if (isHinglish || detectedLanguage === 'hindi') {
    return 'hindi';
  }
  return 'english';
} 