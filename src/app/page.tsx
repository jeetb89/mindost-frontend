'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

function HomeContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative isolate">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8 lg:py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your AI Therapy Companion
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Experience compassionate and understanding conversations with MindDost, your AI-powered mental health companion.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/chat"
              className="rounded-md bg-yellow-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            >
              Start Chatting
            </Link>
            <Link href="/voice" className="text-sm font-semibold leading-6 text-gray-900">
              Try Voice Chat <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return <HomeContent />;
}
