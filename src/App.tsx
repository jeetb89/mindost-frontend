import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
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
// import SideNavBar from './components/SideNav';
// import SessionDetails from './components/SessionDetails';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-white">
          <Header />
          {/* <SideNavBar/> */}
          <Routes>
            {/* Login Page without Sidebar */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />

            {/* All Other Pages with Sidebar */}
            <Route element={<Layout />}>
              <Route path="/landing" element={<Landing />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/voice" element={<Voice />} />
              <Route path="/therapists" element={<Therapists />} />
              <Route path="/session" element={<SessionHistory />} />
              <Route path="/settings" element={<Settings />} />
              <Route
                path="/therapist-profile/:id"
                element={<TherapistsProfile />}
              />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
