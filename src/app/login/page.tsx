'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ClientOnly from '@/components/ClientOnly';
import { TypeAnimation } from 'react-type-animation';
import { POST } from '../api/login/route';


function LoginContent() {
  const { user, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    setMounted(true);
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await POST(email, password);
      // const data = await response.json();
      // if (data.error) {
      //   setError(data.error);
      //   return;
      // }
      // setToken(data.token);
      // router.push('/');
      console.log(response);
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
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
      <div className="w-1/2 h-full bg-white/80 rounded-lg p-6 space-y-4 text-center text-l font-bold text-yellow-400 flex items-center justify-center">
          <SideText />
      </div>
      <div className="max-w-md w-full">
        <section>
          <div className="flex flex-col items-center justify-center">
              <div className="w-full bg-white rounded-lg p-6 space-y-4">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                      Sign in to your account
                  </h1>
                  <form className="space-y-4" onSubmit={handleSubmit}>
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
                      <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input 
                              id="remember" 
                              type="checkbox" 
                              checked={rememberMe}
                              onChange={(e) => setRememberMe(e.target.checked)}
                              className="w-4 h-4 rounded border-gray-300 bg-white text-blue-500 focus:ring-blue-500" 
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
                          </div>
                          <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                      </div>
                      <div className="space-y-3 ">
                        <div className="flex flex-row gap-4">
                        <button 
                          type="submit" 
                          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                          onClick={handleLogin}
                        >
                          Sign in
                        </button>
                        <button 
                          type="submit"
                          onClick={() => router.push('/signUp')} 
                          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                        >
                          Sign up
                        </button>
                        </div>
                        <button
                          type="button"
                          onClick={signInWithGoogle}
                          className="w-full py-2 px-4 bg-[#5865F2] hover:bg-[#4752c4] text-white font-medium rounded-md transition-colors"
                        >
                          Sign in with Google
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

export const SideText = () => {
  return (
    <TypeAnimation
      sequence={[
        'Mind Dost\n\n',
        1000, 
        'Mind Dost\n\nYour AI Companion',
        1000,
        'Mind Dost\n\nYour AI Companion\nthat helps you to improve your life',
        1000,
        'Mind Dost\n\nYour AI Companion\nthat helps you to improve your life\nand make your life easier',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ 
        fontSize: '3em', 
        display: 'inline-block',
        whiteSpace: 'pre-line',
        lineHeight: '1.5',
        textAlign: 'center'
      }}
      repeat={Infinity}
    />
  );
};