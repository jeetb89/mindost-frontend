import { ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Chat from "./components/Chat";
import Voice from "./components/Voice";
import Landing from "./components/Landing";
import SessionHistory from "./components/Session";
import Settings from "./components/Settings";
import { Therapists } from "./components/Therapists";
import TherapistsProfile from "./components/ui/TherapistsProfile";
import Layout from "./components/Layout";
import Payment from './components/Payment';
import DoctorsSignUp from './components/ui/DoctorsSignUp';
import DoctorProfile from './components/DoctorProfile';
import DoctorProfileView from './components/DoctorProfileView';
import DoctorDashboard from './components/DoctorDashboard';
import DoctorBookings from './components/DoctorBookings';
import UserBookings from './components/UserBookings';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-white">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/doctor-signup" element={<DoctorsSignUp />} />

            {/* Authenticated routes with sidebar */}
            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route path="/landing" element={<Landing />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/voice" element={<Voice />} />
              <Route path="/therapists" element={<Therapists />} />
              <Route path="/session" element={<SessionHistory />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/bookings" element={<UserBookings />} />
              <Route path="/therapist-profile/:id" element={<TherapistsProfile />} />
              <Route path="/therapists/:id" element={<TherapistsProfile />} />
            </Route>

            {/* Authenticated routes without sidebar */}
            <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            <Route path="/doctor-profile" element={<ProtectedRoute><DoctorProfile /></ProtectedRoute>} />
            <Route path="/doctor-profile/:id" element={<DoctorProfileView />} />
            <Route path="/doctor-dashboard" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
            <Route path="/doctor-bookings" element={<ProtectedRoute><DoctorBookings /></ProtectedRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
