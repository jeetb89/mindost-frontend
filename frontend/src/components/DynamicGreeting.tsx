import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

const greetings = [
  "hope your day is going great!",
  "you're taking a brave step forward!",
  "it's wonderful to see you here!",
  "remember, you're not alone in this journey!",
  "taking care of your mental health is a sign of strength!",
  "we're here to support you every step of the way!",
  "your well-being matters, and we're glad you're here!",
  "each conversation is a step towards better mental health!",
];

const timeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

export default function DynamicGreeting() {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    const greeting = `${timeBasedGreeting()}${user?.name ? `, ${user.name}` : ''}, ${greetings[Math.floor(Math.random() * greetings.length)]}`;
    let index = 0;
    
    if (isTyping) {
      const interval = setInterval(() => {
        if (index < greeting.length) {
          setText((prev) => prev + greeting.charAt(index));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(interval);
          
          // Reset after 5 seconds and choose a new greeting
          setTimeout(() => {
            setText('');
            setIsTyping(true);
          }, 5000);
        }
      }, 50); // Adjust typing speed here (milliseconds)

      return () => clearInterval(interval);
    }
  }, [isTyping, user]);

  return (
    <div className="bg-purple-100 px-4 py-2 rounded-lg">
      <h2 className="text-xl font-medium text-purple-900 min-h-[2rem]">
        {text}
        {isTyping && <span className="animate-blink">|</span>}
      </h2>
    </div>
  );
} 