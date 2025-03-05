'use client';

import dynamic from 'next/dynamic';

const Chat = dynamic(() => import('@/components/Chat'), { ssr: false });

export default function ChatPage() {
  return (
    <div className="relative isolate">
      <div className="mx-auto max-w-7xl h-[calc(100vh-4rem)]">
        <Chat />
      </div>
    </div>
  );
} 