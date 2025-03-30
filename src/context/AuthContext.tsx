import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../lib/axios';
// import { useNavigate } from 'react-router-dom';

interface User {
  accessToken: string;
  name: string;
  email: string;
  userIdType: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  login: (username: string, password: string,userIdType:string) => Promise<void>;
  signup: (name: string, email: string, password: string,userIdType:string) => Promise<boolean>;
  sendOtp: (email: string) => Promise<boolean>;
  verifyOtp: (email: string, otp: string) => Promise<boolean>;
  completeSignup: (name: string, email: string, password: string,userIdType:string) => Promise<void>;
  profileDetails: (params: Record<string, string>) => Promise<void>;
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
  profileDetails: async () => {}
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string,userIdType:string) => {
    try {
      const { data } = await api.post('/api/auth/login', { 
        email: username, 
        password,
        userIdType: userIdType 
      });
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Create user data object
      const userData = {
        _id: data.user._id,
        accessToken: data.token,
        name: data.user.username,
        email: data.user.email,
        userIdType: data.user.userType,
      };

      // First set the user state
      setUser(userData);

      // Then store in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', data.token);
      sessionStorage.setItem('id', data.user._id);

      // Log the stored data to verify
      console.log('Stored user data:', JSON.parse(localStorage.getItem('user') || 'null'));
      console.log('Stored token:', localStorage.getItem('token'));
      console.log('Stored id:', sessionStorage.getItem('id'));
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.response?.status === 404) {
        throw new Error('Login endpoint not found. Please check if the backend server is running.');
      }
      throw new Error(error.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  const sendOtp = async (email: string): Promise<boolean> => {
    try {
      const { data } = await api.post('/api/auth/send-otp', { email });
      if (data.error) {
        throw new Error(data.error);
      }
      return true;
    } catch (error: any) {
      console.error('Send OTP error:', error);
      throw new Error(error.response?.data?.error || 'Failed to send OTP. Please try again.');
    }
  };
  
  const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
    try {
      const { data } = await api.post('/api/auth/verify-otp', { email, otp });
      if (data.error) {
        throw new Error(data.error);
      }
      return true;
    } catch (error: any) {
      console.error('Verify OTP error:', error);
      throw new Error(error.response?.data?.error || 'Invalid OTP. Please try again.');
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      // First send OTP
      await sendOtp(email);
      
      // Note: The actual signup will be handled by the component after OTP verification
      // This function now just validates the input
      if (!name || !email || !password) {
        throw new Error('Please fill in all fields');
      }
      
      // Return true to indicate the signup process can continue
      return true;
    } catch (error: any) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const completeSignup = async (username: string, email: string, password: string,userIdType:string) => {
    try {
      const res = await api.post('/api/auth/signup', {
        username,
        email,
        password,
        userIdType: userIdType
      });

      if (res.data?.error) {
        throw new Error(res.data.error);
      }

      let stringifiedData =JSON.parse(res?.config?.data);

      const userData = {
        // _id: res?.data?.user._id,
        accessToken: res?.data?.token,
        name: stringifiedData?.username,
        email: stringifiedData?.email,
        userIdType: 'user',
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData?. accessToken);
    } catch (error: any) {
      console.error('Complete signup error:', error);
      if (error.response?.status === 404) {
        throw new Error('Signup endpoint not found. Please check if the backend server is running.');
      }
      throw new Error(error.response?.data?.error || 'Signup failed. Please try again.');
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Redirect to the backend's Google OAuth endpoint
      window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  };

  const profileDetails = async (params: Record<string, string>) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const res = await api.get(`/api/auth/profile?${queryString}`);
      
      sessionStorage.setItem("id", res.data?._id);
      localStorage.setItem("user", JSON.stringify(res.data));
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