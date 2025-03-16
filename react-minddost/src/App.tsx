import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Chat from './components/Chat';
import Voice from './components/Voice';
import Landing from './components/Landing';
import SessionHistory from './components/Session';
import Settings from './components/Settings';
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-white">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Landing" element={<Landing />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/voice" element={<Voice />} />
            <Route path="/session" element={<SessionHistory />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
