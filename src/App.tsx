import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Chat from './components/Chat';
import Voice from './components/Voice';
import Landing from './components/Landing';
// import SessionHistory from './components/SessionHistory';
import Settings from './components/Settings';
import { Therapists } from './components/Therapists';
import TherapistsProfile from './components/ui/TherapistsProfile';
// import SideNavBar from './components/SideNav';
// import SessionDetails from './components/SessionDetails';
import Payment from './components/Payment';
import DoctorsSignUp from './components/ui/DoctorsSignUp';
import DoctorProfile from './components/DoctorProfile';
import DoctorProfileView from './components/DoctorProfileView';
import DoctorDashboard from './components/DoctorDashboard';
import DoctorBookings from './components/DoctorBookings';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-white">
          <Header />
          {/* <SideNavBar/> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/voice" element={<Voice />} />
            <Route path="/therapists" element={<Therapists />} />
            {/* <Route path="/session-history" element={<SessionHistory />} /> */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/therapists/:id" element={<TherapistsProfile />} />
            <Route path="/doctor-signup" element={<DoctorsSignUp />} />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
            <Route path="/doctor-profile/:id" element={<DoctorProfileView />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor-bookings" element={<DoctorBookings />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
