'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ClientOnly from '@/components/ClientOnly';
import { SideText } from '../login/page';


function LoginContent() {
  const { user, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleDemoAccess = () => {
    router.push('/');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password, rememberMe });
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="h-screen flex flex-direction-row items-center justify-center bg-white px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="w-1/2 h-full bg-white/80 rounded-lg p-6 space-y-4 text-center text-xl font-bold text-yellow-400 flex items-center justify-center">
          <SideText />
      </div>
      <div className="max-w-md w-full">
        <section>
          <div className="flex flex-col items-center justify-center">
              <div className="w-full bg-white rounded-lg p-6 space-y-4">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                      Sign Up for Account
                  </h1>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Your name</label>
                          <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 rounded-md bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                            placeholder="Please enter your email" 
                            required 
                          />
                      </div>
                      <div>
                          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Your email</label>
                          <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 rounded-md bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                            placeholder="Please enter your email" 
                            required 
                          />
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                          <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 rounded-md bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                            placeholder="••••••••" 
                            required 
                          />
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">ConfirmPassword</label>
                          <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 rounded-md bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                            placeholder="••••••••" 
                            required 
                          />
                      </div>
                      <div className="space-y-3 ">
                    
                        <button 
                          type="submit"
                          onClick={() => router.push('/signUp')} 
                          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                        >
                          Sign up
                        </button>
                        <button
                          type="button"
                          onClick={handleDemoAccess}
                          className="w-full py-2 px-4 bg-transparent border border-[#5865F2] text-[#5865F2] hover:bg-[#5865F2]/10 font-medium rounded-md transition-colors"
                        >
                          Try Demo Version
                        </button>
                      </div>
                  </form>
              </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <ClientOnly>
      <LoginContent />
    </ClientOnly>
  );
} 
