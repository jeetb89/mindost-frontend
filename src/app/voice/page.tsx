'use client';

import { useState, useEffect } from 'react';
import { MicrophoneIcon, StopIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { startRecording, stopRecording, synthesizeSpeech } from '@/services/speech';
import { getChatResponse } from '@/services/openai';
import { analyzeEmotion } from '@/services/languageProcessing';
import { useRouter } from 'next/navigation';
import ClientOnly from '@/components/ClientOnly';
import dynamic from 'next/dynamic';

// Dynamically import ConfirmDialog with no SSR
const ConfirmDialog = dynamic(() => import('@/components/ConfirmDialog'), {
  ssr: false,
});

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface EmotionInfo {
  emotion: string;
}

export default function VoicePage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emotionInfo, setEmotionInfo] = useState<EmotionInfo | null>(null);
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);

  const handleTranscriptionComplete = async (text: string) => {
    if (!text.trim()) {
      setError('No speech detected. Please try again.');
      return;
    }

    setError(null);
    // Add user message to chat
    const userMessage = { role: 'user' as const, content: text };
    setMessages(prev => [...prev, userMessage]);

    try {
      setIsProcessing(true);
      // Get response from OpenAI
      const aiResponse = await getChatResponse([
        ...messages,
        userMessage
      ]);

      if (!aiResponse) {
        throw new Error('No response from AI');
      }

      // Add AI response to chat
      const assistantMessage = { role: 'assistant' as const, content: aiResponse };
      setMessages(prev => [...prev, assistantMessage]);

      // Analyze emotion for visualization
      const emotion = await analyzeEmotion(text);
      setEmotionInfo(emotion);

      // Convert AI response to speech
      await synthesizeSpeech(aiResponse);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while processing your request. Please try again.');
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSpeechError = (error: string) => {
    console.error('Speech recognition error:', error);
    setError(error);
    setIsRecording(false);
    setIsProcessing(false);
  };

  const handleStartRecording = async () => {
    try {
      await startRecording(handleTranscriptionComplete, handleSpeechError);
      setIsRecording(true);
      setError(null);
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
      setError('Could not start recording. Please check your microphone permissions.');
    }
  };

  const handleStopRecording = () => {
    stopRecording();
    setIsRecording(false);
  };

  const handleExit = () => {
    setIsExitDialogOpen(true);
  };

  const handleExitConfirm = () => {
    if (isRecording) {
      stopRecording();
    }
    router.push('/');
  };

  useEffect(() => {
    return () => {
      if (isRecording) {
        stopRecording();
      }
    };
  }, [isRecording]);

  return (
    <ClientOnly>
      <div className="relative isolate min-h-[calc(100vh-4rem)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-sm min-h-[calc(100vh-8rem)] flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-2xl font-semibold text-gray-900">Voice Chat</h1>
              <p className="mt-1 text-sm text-gray-500">Talk to your AI companion through voice</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mx-6 mt-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-md">
                <p>{error}</p>
              </div>
            )}

            {/* Emotion Info */}
            {emotionInfo && (
              <div className="mx-6 mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700 rounded-md">
                <p className="font-medium">Detected Emotion: {emotionInfo.emotion}</p>
              </div>
            )}

            {/* Conversation History */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {messages.length === 0 && !isRecording && !isProcessing && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-500">
                    <MicrophoneIcon className="h-12 w-12 mx-auto mb-4" />
                    <p className="text-lg font-medium">Start a voice conversation</p>
                    <p className="text-sm">Click the microphone button below to begin</p>
                  </div>
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-yellow-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-gray-100 text-gray-900">
                    Processing your message...
                  </div>
                </div>
              )}
            </div>

            {/* Voice Controls */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                    disabled={isProcessing}
                    className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white transition-colors ${
                      isRecording
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-yellow-600 hover:bg-yellow-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50`}
                  >
                    {isRecording ? (
                      <>
                        <StopIcon className="h-6 w-6 mr-2" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <MicrophoneIcon className="h-6 w-6 mr-2" />
                        Start Recording
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleExit}
                    className="inline-flex items-center p-3 border border-transparent text-base font-medium rounded-full shadow-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                {isProcessing && (
                  <p className="text-sm text-gray-500">Processing your message...</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Exit Confirmation Dialog */}
        <ConfirmDialog
          isOpen={isExitDialogOpen}
          onClose={() => setIsExitDialogOpen(false)}
          onConfirm={handleExitConfirm}
          title="want to end the session?"
          message="no worries you can continue anytime"
        />
      </div>
    </ClientOnly>
  );
} 