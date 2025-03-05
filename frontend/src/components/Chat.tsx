'use client';

import { useState, useRef, useEffect } from 'react';
import { MicrophoneIcon, XMarkIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import { getChatResponse } from '@/services/openai';
import { useRouter } from 'next/navigation';
import ConfirmDialog from './ConfirmDialog';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const initialMessage = {
  id: 'initial',
  text: "hey there! it's good to have you here. how are you feeling today? or better yet—what's been on your mind lately? no rush, we can ease into this however you'd like.",
  isUser: false,
};

export default function Chat() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll effect
  useEffect(() => {
    if (mounted) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSend = async () => {
    if (inputValue.trim() && !isLoading) {
      const userMessage = inputValue.trim();
      setInputValue('');
      setIsLoading(true);

      // Add user message to chat
      const newUserMessage = {
        id: `user-${Date.now()}`,
        text: userMessage,
        isUser: true,
      };
      setMessages(prev => [...prev, newUserMessage]);

      try {
        // Convert messages to the format expected by OpenAI
        const chatHistory = messages.map(msg => ({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.text
        }));

        // Get AI response
        const aiResponse = await getChatResponse([
          ...chatHistory,
          { role: 'user', content: userMessage }
        ]);

        // Add AI response to chat
        setMessages(prev => [...prev, {
          id: `ai-${Date.now()}`,
          text: aiResponse || "I apologize, but I am unable to respond at the moment.",
          isUser: false,
        }]);
      } catch (error) {
        console.error('Error:', error);
        setMessages(prev => [...prev, {
          id: `error-${Date.now()}`,
          text: "I apologize, but I encountered an error. Please try again.",
          isUser: false,
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceClick = () => {
    router.push('/voice');
  };

  const handleExit = () => {
    setIsExitDialogOpen(true);
  };

  const handleExitConfirm = () => {
    router.push('/');
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            {!message.isUser && (
              <div className="w-8 h-8 rounded-full bg-yellow-400 mr-3 flex-shrink-0" />
            )}
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isUser
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-yellow-400 mr-3 flex-shrink-0" />
            <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Control buttons row */}
          <div className="flex justify-between mb-2">
            <div className="flex space-x-2">
              <button
                onClick={handleVoiceClick}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <MicrophoneIcon className="w-5 h-5" />
              </button>
              <button
                onClick={handleExit}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Input field */}
          <div className="relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="type your message..."
              className="w-full pr-12 py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none text-gray-900 placeholder-gray-500"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="absolute right-2 bottom-2 p-2 rounded-full bg-yellow-400 text-gray-900 hover:bg-yellow-500 transition-colors disabled:opacity-50"
            >
              <ArrowUpIcon className="w-5 h-5" />
            </button>
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
  );
} 