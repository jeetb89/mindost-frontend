import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

interface Message {
  role: string;
  content: string;
  _id: string;
  timestamp: string;
}

interface Session {
  _id: string;
  userId: string;
  status: string;
  messages: Message[];
  startTime: string;
  summary: {
    mainTopics: string[];
    keyInsights: string[];
    recommendedActions: string[];
  };
}

export default function SessionHistory() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null); // For storing the selected session for the popup
  const [isModalOpen, setIsModalOpen] = useState(false); 
const API_URL = import.meta.env.VITE_API_URL; 
  const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M12.03125 1.5a1 1 0 00-.539062.138672l-9.5 5.587891a1 1 0 101.007812 1.726562V20a1 1 0 001 1h16a1 1 0 001-1V8.953125a1 1 0 101.007812-1.726562l-9.5-5.587891A1 1 0 0012.03125 1.5zM12 3.660156l7 4.117188V19h-3v-7a1 1 0 00-1-1H9a1 1 0 00-1 1v7H5V7.777344l7-4.117188zM10 13h4v6h-4v-6z" />
    </svg>
  );

  const ProfileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
    </svg>
  );

  const SessionHistoryIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 8V12L14.5 14.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  const FeedbackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
    </svg>
  );

  const TherapistIcon = () => (
    <svg 
      fill="#000000" 
      className="w-5 h-5" 
      version="1.1" 
      id="Capa_1" 
      xmlns="http://www.w3.org/2000/svg" 
      xmlnsXlink="http://www.w3.org/1999/xlink" 
      viewBox="0 0 449.412 449.412" 
      xmlSpace="preserve"
    >
      <path d="M382.635,124.312l-20.171-15.946c-2.793-2.208-6.547-2.764-9.859-1.463l-26.769,10.518V75.109c0-3.058-1.399-5.948-3.798-7.845l-20.171-15.946c-2.793-2.208-6.548-2.764-9.859-1.463l-26.926,10.58v-34.49c0-3.059-1.399-5.948-3.799-7.845L241.112,2.155c-2.791-2.207-6.546-2.764-9.858-1.463l-40.583,15.945c-3.826,1.504-6.343,5.196-6.343,9.308v34.51l-26.978-10.6c-3.312-1.301-7.066-0.744-9.858,1.463L127.32,67.265c-2.398,1.896-3.798,4.786-3.798,7.845V117.4l-26.715-10.497c-3.313-1.301-7.067-0.745-9.858,1.463l-20.172,15.946c-2.398,1.896-3.798,4.787-3.798,7.845v181.76c0,0.099,0.012,0.194,0.015,0.292c0.178,32.55,11.751,63.063,33.406,87.28c27.235,30.456,68.408,47.923,112.962,47.923c36.694,0,72.453-11.214,103.41-32.43c30.115-20.64,53.253-49.688,65.148-81.792c8.101-21.858,8.512-35.594,8.512-56.195V132.157C386.433,129.1,385.033,126.209,382.635,124.312z"/>
    </svg>
  );

  const SettingsIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3" stroke="#1C274C" strokeWidth="1.5"/>
      <path d="M3.66122 10.6392C4.13377 10.9361 4.43782 11.4419 4.43782 11.9999C4.43781 12.558 4.13376 13.0638 3.66122 13.3607C3.33966 13.5627 3.13248 13.7242 2.98508 13.9163C2.66217 14.3372 2.51966 14.869 2.5889 15.3949C2.64082 15.7893 2.87379 16.1928 3.33973 16.9999C3.80568 17.8069 4.03865 18.2104 4.35426 18.4526C4.77508 18.7755 5.30694 18.918 5.83284 18.8488C6.07287 18.8172 6.31628 18.7185 6.65196 18.5411C7.14544 18.2803 7.73558 18.2699 8.21895 18.549C8.70227 18.8281 8.98827 19.3443 9.00912 19.902C9.02332 20.2815 9.05958 20.5417 9.15224 20.7654C9.35523 21.2554 9.74458 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8478 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.9021C15.0117 19.3443 15.2977 18.8281 15.7811 18.549C16.2644 18.27 16.8545 18.2804 17.3479 18.5412C17.6837 18.7186 17.9271 18.8173 18.1671 18.8489C18.693 18.9182 19.2249 18.7756 19.6457 18.4527C19.9613 18.2106 20.1943 17.807 20.6603 17C20.8677 16.6407 21.029 16.3614 21.1486 16.1272" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  const LogoutIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.3531 21.8897 19.1752 21.9862 17 21.9983M9.00195 17C9.01406 19.175 9.11051 20.3529 9.87889 21.1213C10.5202 21.7626 11.4467 21.9359 13 21.9827" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  const handleLogout = () => {
    try {
      localStorage.clear();
      navigate('/login');
      window.location.reload();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleGetHistory = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await axios.post(
        `${API_URL}/api/sessions/history`,
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setSessions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching session history:', error);
      setError('Failed to load session history');
      setLoading(false);
    }
  };

  const handleViewDetails = (session: Session) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSession(null);
  };

  useEffect(() => {
    handleGetHistory();
  }, []);

  function NavItem({ label, onClick, className, icon }: { 
    label: string; 
    onClick?: () => void | Promise<void>; 
    className?: string;
    icon?: React.ReactNode;
  }) {
    return (
      <button onClick={onClick} className={`flex items-center text-gray-700 hover:text-black space-x-2 p-2 ${className || ''}`}>
        {icon && <span className="w-5 h-5">{icon}</span>}
        <span>{label}</span>
      </button>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-1/10 min-w-[200px] bg-white border-r flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-switzer font-semibold mb-6 text-gray-900 text-center">MindDost</h1>
          <nav className="space-y-1">
            <NavItem 
              label="home" 
              className="font-satoshi bg-white text-gray-900 w-full hover:cursor-pointer hover:border-gray-400" 
              onClick={() => navigate('/Landing')}
              icon={<HomeIcon />}
            />
            <NavItem 
              label="profile" 
              className="font-satoshi bg-white text-gray-900 w-full hover:cursor-pointer hover:border-gray-400" 
              onClick={() => navigate('/Landing')} 
              icon={<ProfileIcon />} 
            />
            <NavItem 
              label="session history" 
              className="font-satoshi bg-white text-gray-900 w-full hover:cursor-pointer hover:border-gray-400" 
              onClick={() => navigate('/session')} 
              icon={<SessionHistoryIcon />}
            />
            <NavItem 
              label="feedback" 
              className="font-satoshi bg-white text-gray-900 w-full hover:cursor-pointer hover:border-gray-400" 
              onClick={() => navigate('/Landing')}
              icon={<FeedbackIcon />}
            />
            <NavItem 
              label="therapist" 
              className="font-satoshi bg-white text-gray-900 w-full hover:cursor-pointer hover:border-gray-400" 
              onClick={() => navigate('/Landing')} 
              icon={<TherapistIcon />}
            />
          </nav>
        </div>
        <div>
          <NavItem 
            label="settings" 
            className="font-satoshi bg-white text-gray-900 w-full hover:cursor-pointer hover:border-gray-400" 
            onClick={() => navigate('/Landing')} 
            icon={<SettingsIcon />}
          />
          <NavItem 
            label="log out" 
            className="font-satoshi bg-white text-gray-900 w-full hover:cursor-pointer hover:border-gray-400" 
            onClick={handleLogout}
            icon={<LogoutIcon />} 
          />
          <div className="mt-4">
            <div className="text-sm flex justify-between font-satoshi">
              <span className="px-2 py-1 rounded border border-gray-400 text-gray-900 bg-white">free</span>
              <span className="px-2 py-1 rounded text-gray-900 bg-white">1/3 sessions</span>
            </div>
            <div className="h-2 bg-gray-300 w-full rounded overflow-hidden mt-2">
              <div className="h-full bg-black w-1/3"></div>
            </div>
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-switzer font-semibold py-2 mt-2 rounded">
              upgrade
            </button>
          </div>
        </div>
      </aside>

      

      {/* Main Content */}
      <div className="flex-1 p-8 ml-10">
        <h2 className="text-3xl font-bold text-gray-800">Past Sessions</h2>
        <p className="text-gray-500">Your previous sessions</p>

        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center mt-4">{error}</div>
        ) : (
          <ScrollArea className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto scrollbar-hide">
            {sessions.map((session) => (
              <Card key={session._id} className="p-5 bg-white shadow rounded-lg border border-gray-200 mb-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg text-gray-900">Session {session._id.slice(-4)}</h3>
                  <span className="text-xs text-gray-500">
                    {new Date(session.startTime).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                {session.messages.length > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p className="font-medium mb-1">Last message:</p>
                    <p className="italic">
                      "{session.messages[session.messages.length - 1].content}"
                    </p>
                  </div>
                )}

                {session.summary && (session.summary.mainTopics.length > 0 || 
                                     session.summary.keyInsights.length > 0 || 
                                     session.summary.recommendedActions.length > 0) && (
                  <div className="mt-3 text-sm">
                    {session.summary.mainTopics.length > 0 && (
                      <p className="text-gray-600">Topics: {session.summary.mainTopics.join(', ')}</p>
                    )}
                    {session.summary.keyInsights.length > 0 && (
                      <p className="text-gray-600 mt-1">Insights: {session.summary.keyInsights.join(', ')}</p>
                    )}
                  </div>
                )}

                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => handleViewDetails(session)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    View Details →
                  </button>
                </div>
              </Card>
            ))}
          </ScrollArea>
        )}

        {isModalOpen && selectedSession && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-lg font-semibold mb-3">Session Details</h3>
              <p className="font-medium">Date: {new Date(selectedSession.startTime).toLocaleDateString()}</p>

              <div className="mt-4">
                <h4 className="font-semibold">Summary:</h4>
                <div className="mt-2">
                  {selectedSession.summary.mainTopics.length > 0 ||
                  selectedSession.summary.keyInsights.length > 0 ||
                  selectedSession.summary.recommendedActions.length > 0 ? (
                    <div>
                      {selectedSession.summary.mainTopics.length > 0 && (
                        <p className="text-gray-600">Topics: {selectedSession.summary.mainTopics.join(', ')}</p>
                      )}
                      {selectedSession.summary.keyInsights.length > 0 && (
                        <p className="text-gray-600 mt-1">Insights: {selectedSession.summary.keyInsights.join(', ')}</p>
                      )}
                      {selectedSession.summary.recommendedActions.length > 0 && (
                        <p className="text-gray-600 mt-1">Recommended Actions: {selectedSession.summary.recommendedActions.join(', ')}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500">No summary available</p>
                  )}
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button onClick={closeModal} className="bg-blue-500 text-white">
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
                {/* Upgrade Section */}
                <div className="mt-6 p-5 bg-yellow-100 flex justify-center items-center text-center rounded-lg border border-yellow-300">
          <p className="text-gray-700">Monthly limit reached. Upgrade for more.</p>
          <Button className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg">
            Upgrade
          </Button>
        </div>
      </div>
    </div>
  )
}