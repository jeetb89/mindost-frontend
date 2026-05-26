import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../lib/axios';

interface User {
  _id: string;
  name: string;
  email: string;
  userIdType: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  login: (username: string, password: string, userIdType: string) => Promise<void>;
  signup: (name: string, email: string, password: string, userIdType: string) => Promise<boolean>;
  sendOtp: (email: string) => Promise<boolean>;
  verifyOtp: (email: string, otp: string) => Promise<boolean>;
  completeSignup: (name: string, email: string, password: string, userIdType: string) => Promise<void>;
  profileDetails: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  login: async () => {},
  signup: async () => false,
  sendOtp: async () => false,
  verifyOtp: async () => false,
  completeSignup: async () => {},
  profileDetails: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        // Normalise legacy shape that stored accessToken inside user object
        const { accessToken: _unused, ...rest } = parsed;
        setUser(rest as User);
      } catch {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string, userIdType: string) => {
    try {
      const { data } = await api.post('/api/auth/login', {
        email: username,
        password,
        userIdType,
      });

      if (data.error) throw new Error(data.error);

      const userData: User = {
        _id: data.user._id,
        name: data.user.username,
        email: data.user.email,
        userIdType: data.user.userType,
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', data.token);
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Login endpoint not found. Please check if the backend server is running.');
      }
      throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const sendOtp = async (email: string): Promise<boolean> => {
    try {
      const { data } = await api.post('/api/auth/send-otp', { email });
      if (data.error) throw new Error(data.error);
      return true;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to send OTP. Please try again.');
    }
  };

  const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
    try {
      const { data } = await api.post('/api/auth/verify-otp', { email, otp });
      if (data.error) throw new Error(data.error);
      return true;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Invalid OTP. Please try again.');
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      if (!name || !email || !password) throw new Error('Please fill in all fields');
      await sendOtp(email);
      return true;
    } catch (error: any) {
      throw error;
    }
  };

  const completeSignup = async (username: string, email: string, password: string, userIdType: string) => {
    try {
      const { data } = await api.post('/api/auth/signup', { username, email, password, userIdType });

      if (data.error) throw new Error(data.error);

      const userData: User = {
        _id: data.user._id,
        name: data.user.username,
        email: data.user.email,
        userIdType: data.user.userType,
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', data.token);
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Signup endpoint not found. Please check if the backend server is running.');
      }
      throw new Error(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  const signInWithGoogle = async () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    sessionStorage.removeItem('id');
  };

  const profileDetails = async () => {
    try {
      const { data } = await api.get('/api/auth/profile');
      const userData: User = {
        _id: data._id,
        name: data.username,
        email: data.email,
        userIdType: data.userType,
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Profile details error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signInWithGoogle,
      signOut,
      login,
      signup,
      sendOtp,
      verifyOtp,
      completeSignup,
      profileDetails,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
