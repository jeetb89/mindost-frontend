import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StarIcon, UserGroupIcon, ClockIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface DoctorProfile {
  _id: string;
  name: string;
  specialization: string;
  image: string;
  experience: string;
  description: string;
  pricing: {
    originalPrice: number;
    discountedPrice: number;
    currency: string;
  };
  rating: {
    score: number;
    totalStars: number;
  };
  expertise: string[];
  languages: string[];
  thoughtsOnCounseling: string;
  philosophy: string;
  availability: string[];
}

const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 24 24"
  >
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
  </svg>
);

const BookingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 24 24"
  >
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
  </svg>
);

const ProfileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 24 24"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
  </svg>
);

function NavItem({
  label,
  onClick,
  className,
  icon,
}: {
  label: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalSessions: 0,
    upcomingSessions: 0
  });

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        
        if (!token || !userData._id) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`${API_URL}/api/doctors/${userData._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProfile(response.data);
        
        // Fetch statistics
        const statsResponse = await axios.get(`${API_URL}/api/doctors/${userData._id}/stats`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setStats(statsResponse.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, API_URL]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Profile not found</h2>
        <button
          onClick={() => navigate('/doctor-profile')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Create Profile
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">Doctor Portal</h2>
        </div>
        <nav className="mt-4">
          <NavItem
            label="Dashboard"
            icon={<DashboardIcon />}
            className="text-gray-700 hover:bg-gray-100"
            onClick={() => navigate('/doctor-dashboard')}
          />
          <NavItem
            label="Bookings"
            icon={<BookingsIcon />}
            className="text-gray-700 hover:bg-gray-100"
            onClick={() => navigate('/doctor-bookings')}
          />
          <NavItem
            label="Profile"
            icon={<ProfileIcon />}
            className="text-gray-700 hover:bg-gray-100"
            onClick={() => navigate('/doctor-profile')}
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Profile Header */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-6">
              <img
                src={profile.image || 'https://via.placeholder.com/150'}
                alt={profile.name}
                className="h-24 w-24 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                <p className="text-gray-600">{profile.specialization}</p>
                <div className="flex items-center mt-2">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 text-gray-600">{profile.rating.score} / {profile.rating.totalStars}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <UserGroupIcon className="h-8 w-8 text-indigo-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Total Patients</h3>
                  <p className="text-3xl font-semibold text-indigo-600">{stats.totalPatients}</p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <ClockIcon className="h-8 w-8 text-indigo-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Total Sessions</h3>
                  <p className="text-3xl font-semibold text-indigo-600">{stats.totalSessions}</p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <CalendarIcon className="h-8 w-8 text-indigo-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Upcoming Sessions</h3>
                  <p className="text-3xl font-semibold text-indigo-600">{stats.upcomingSessions}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 