import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TypeAnimation } from 'react-type-animation';

export default function Signup() {
  const { user, signup, verifyOtp, completeSignup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

  useEffect(() => {
    if (user) navigate('/landing');
  }, [user, navigate]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await signup(name, email, password);
      
      setShowOtpInput(true);
    } catch (error: any) {
      setError(error.message);
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const isVerified = await verifyOtp(email, otp);
      if (isVerified) {
        await completeSignup(name, email, password);
        // navigate('/landing');
      }
    } catch (error: any) {
      setError(error.message);
      console.error('OTP verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">MinDost</h1>
      <h2 className="text-2xl font-semibold text-gray-800">ready when you are</h2>
      <p className="text-gray-500 mb-6">your safe space, one convo at a time</p>
      
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        {!showOtpInput ? (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded-md bg-white border border-gray-300 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Please enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded-md bg-white border border-gray-300 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Please enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded-md bg-white border border-gray-300 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-white text-gray-900 border border-gray-500 py-1 rounded-md font-medium hover:border-gray-300"
              disabled={isLoading}
            >
              {isLoading ? 'Sending OTP...' : 'Sign up'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpVerification} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
              <input
                type="text"
                name="otp"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 rounded-md bg-white border border-gray-300 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter the OTP sent to your email"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-white text-gray-900 border border-gray-500 py-1 rounded-md font-medium hover:border-gray-300"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}
        
        <div className="text-sm text-center mt-4">
          <a onClick={() => navigate('/login')} className="text-gray-600 hover:text-gray-400 cursor-pointer">Already have an account? Log in</a>
        </div>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t"></div>
          <span className="px-3 text-gray-500">or</span>
          <div className="flex-grow border-t"></div>
        </div>

        <button
          onClick={() => navigate('/login')}
          className="w-full bg-white text-gray-900 border border-gray-500 py-1 rounded-md font-medium flex items-center justify-center hover:border-gray-300"
        >
          <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1">
            <title>Google-color</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Color-" transform="translate(-401.000000, -860.000000)">
                <g id="Google" transform="translate(401.000000, 860.000000)">
                  <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"></path>
                  <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"></path>
                  <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"></path>
                  <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"></path>
                </g>
              </g>
            </g>
          </svg>
          Sign in with Google
        </button>
      </div>

      <div className="fixed bottom-4 text-xs text-gray-600">
        we use cookies (yummy) to enhance your experience and improve our services.
        <a href="#" className="text-blue-600 hover:underline ml-1">manage preferences</a>
      </div>
      <div className="fixed bottom-4 right-4 space-x-2">
        <button className="text-xs bg-gray-800 text-white px-4 py-1 rounded-md">reject all</button>
        <button className="text-xs bg-black text-white px-4 py-1 rounded-md">accept all</button>
      </div>
    </div>
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
        1000,
      ]}
      wrapper="span"
      speed={50}
      style={{
        fontSize: '3em',
        display: 'inline-block',
        whiteSpace: 'pre-line',
        lineHeight: '1.5',
        textAlign: 'center',
      }}
      repeat={Infinity}
    />
  );
}; 