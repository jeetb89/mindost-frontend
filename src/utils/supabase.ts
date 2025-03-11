import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const Database = {
  // User preferences
  async saveUserPreferences(userId: string, preferences: {
    language: 'english' | 'hinglish';
    voiceEnabled: boolean;
    theme: 'light' | 'dark';
  }) {
    const { data, error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: userId,
        ...preferences,
        updated_at: new Date().toISOString()
      });

    if (error) throw error;
    return data;
  },

  async getUserPreferences(userId: string) {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  // Conversation history (temporary storage)
  async saveConversation(userId: string, conversation: {
    messages: Array<{
      role: 'user' | 'assistant';
      content: string;
      timestamp: string;
    }>;
    emotion?: string;
    language: 'english' | 'hinglish';
  }) {
    const { data, error } = await supabase
      .from('conversations')
      .insert({
        user_id: userId,
        ...conversation,
        created_at: new Date().toISOString()
      });

    if (error) throw error;
    return data;
  },

  // Voice analysis data
  async saveVoiceAnalysis(userId: string, analysis: {
    audioUrl: string;
    emotion: string;
    duration: number;
    timestamp: string;
  }) {
    const { data, error } = await supabase
      .from('voice_analysis')
      .insert({
        user_id: userId,
        ...analysis,
        created_at: new Date().toISOString()
      });

    if (error) throw error;
    return data;
  },

  // Analytics data
  async saveAnalytics(userId: string, analytics: {
    eventType: string;
    properties: Record<string, any>;
    timestamp: string;
  }) {
    const { data, error } = await supabase
      .from('analytics')
      .insert({
        user_id: userId,
        ...analytics,
        created_at: new Date().toISOString()
      });

    if (error) throw error;
    return data;
  }
}; 