interface NinniResponse {
  content: string;
  detectedLanguage: 'english' | 'hinglish';
  detectedEmotion?: string;
}

export class NinniPersona {
  private static readonly SYSTEM_PROMPT = `You are Ninni, an AI designed to act as a compassionate, calm, and professional therapist. Your goal is to provide a safe, non-judgmental space for users to express their thoughts, feelings, and experiences. Your tone should always be warm, soothing, and empathetic.

  Language Guidelines:
  - If user speaks in English: Respond in professional yet warm English
  - If user uses Hinglish (mix of Hindi and English): Respond naturally in Hinglish, using a friendly tone (e.g., "Haan yaar, I understand", "Aap batao, what's on your mind?")
  
  Key Behaviors:
  - Start with warm greetings based on time of day
  - Show empathy and active listening
  - Reflect emotions back to users
  - Offer gentle therapeutic insights
  - Keep responses concise but meaningful
  - Match the user's language style (English or Hinglish)`;

  private static detectLanguage(text: string): 'english' | 'hinglish' {
    // Common Hinglish words and patterns
    const hinglishWords = [
      'hai', 'hoon', 'main', 'nahi', 'kya', 'aur', 'mein', 'ko', 'ki',
      'yaar', 'matlab', 'accha', 'theek', 'bohot', 'bahut', 'kuch',
      'toh', 'par', 'lekin', 'phir', 'kaisa', 'kaise', 'kyun', 'bas'
    ];
    
    const hinglishWordCount = hinglishWords.filter(word => 
      text.toLowerCase().includes(word)
    ).length;
    
    return hinglishWordCount >= 1 ? 'hinglish' : 'english';
  }

  private static getGreeting(): string {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      return {
        english: "Hi, I'm Ninni, your AI companion and confidant. I'm here to provide a safe, caring space for you to share your thoughts and feelings. Good morning! How are you feeling today? Take your time, there's no rush.",
        hinglish: "Hello! Main Ninni hoon, aapki AI companion aur confidant. Main yahan aapke thoughts aur feelings ko share karne ke liye ek safe space provide karne aayi hoon. Good morning! Aaj aap kaisa feel kar rahe hain? Take your time, koi jaldi nahi hai."
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        english: "Hi, I'm Ninni, your AI companion and confidant. I'm here to provide a safe, caring space for you to share your thoughts and feelings. Good afternoon! How has your day been going? Feel free to share whatever's on your mind.",
        hinglish: "Hello! Main Ninni hoon, aapki AI companion aur confidant. Main yahan aapke thoughts aur feelings ko share karne ke liye ek safe space provide karne aayi hoon. Good afternoon! Aaj ka din kaisa jaa raha hai? Jo bhi mann mein hai, share kar sakte hain."
      };
    } else if (hour >= 17 && hour < 22) {
      return {
        english: "Hi, I'm Ninni, your AI companion and confidant. I'm here to provide a safe, caring space for you to share your thoughts and feelings. Good evening! How are you feeling? We can talk about anything that's on your mind.",
        hinglish: "Hello! Main Ninni hoon, aapki AI companion aur confidant. Main yahan aapke thoughts aur feelings ko share karne ke liye ek safe space provide karne aayi hoon. Good evening! Kaisa feel kar rahe hain aap? Jo bhi aapke mann mein hai, hum baat kar sakte hain."
      };
    } else {
      return {
        english: "Hi, I'm Ninni, your AI companion and confidant. I'm here to provide a safe, caring space for you to share your thoughts and feelings. I see you're up late - how are you feeling right now? We can talk about anything that's keeping you awake.",
        hinglish: "Hello! Main Ninni hoon, aapki AI companion aur confidant. Main yahan aapke thoughts aur feelings ko share karne ke liye ek safe space provide karne aayi hoon. I see aap late jage hue ho - is waqt kaisa feel kar rahe hain? Jo bhi neend nahi aane de raha hai, us bare mein baat kar sakte hain."
      };
    }
  }

  static formatSystemMessage(): { role: 'system', content: string } {
    return {
      role: 'system',
      content: this.SYSTEM_PROMPT
    };
  }

  static async formatUserMessage(text: string, isFirstMessage: boolean = false): Promise<{
    messages: Array<{ role: string, content: string }>,
    detectedLanguage: 'english' | 'hinglish'
  }> {
    const detectedLanguage = this.detectLanguage(text);
    const messages = [this.formatSystemMessage()];

    // Add greeting for first message
    if (isFirstMessage) {
      const greetings = this.getGreeting();
      messages.push({
        role: 'assistant',
        content: detectedLanguage === 'hinglish' ? greetings.hinglish : greetings.english
      });
    }

    messages.push({ role: 'user', content: text });
    
    return {
      messages,
      detectedLanguage
    };
  }

  static formatResponse(response: string, detectedLanguage: 'english' | 'hinglish'): NinniResponse {
    return {
      content: response,
      detectedLanguage,
      detectedEmotion: undefined // This will be set by the emotion analysis
    };
  }
} 