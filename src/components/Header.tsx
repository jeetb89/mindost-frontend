'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-gray-900">MindDost</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              href="/"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === '/' ? 'bg-yellow-50 text-yellow-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            <Link
              href="/chat"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === '/chat' ? 'bg-yellow-50 text-yellow-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Chat
            </Link>
            <Link
              href="/voice"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === '/voice' ? 'bg-yellow-50 text-yellow-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Voice
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                href="/"
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  pathname === '/' ? 'bg-yellow-50 text-yellow-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/chat"
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  pathname === '/chat' ? 'bg-yellow-50 text-yellow-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Chat
              </Link>
              <Link
                href="/voice"
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  pathname === '/voice' ? 'bg-yellow-50 text-yellow-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Voice
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 