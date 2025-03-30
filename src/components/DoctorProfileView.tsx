import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StarIcon } from '@heroicons/react/24/solid';

interface DoctorProfile {
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

export default function DoctorProfileView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/api/doctors/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Error fetching profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, API_URL]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Profile not found</h2>
          <button
            onClick={() => navigate('/landing')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center">
              <img
                src={profile.image}
                alt={profile.name}
                className="h-24 w-24 rounded-full"
              />
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                <p className="text-lg text-gray-600">{profile.specialization}</p>
                <div className="mt-2 flex items-center">
                  <div className="flex items-center">
                    {[...Array(profile.rating.totalStars)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${
                          i < profile.rating.score
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    ({profile.rating.score})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Experience</dt>
                <dd className="mt-1 text-sm text-gray-900">{profile.experience}</dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900">{profile.description}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Expertise</dt>
                <dd className="mt-1">
                  <div className="flex flex-wrap gap-2">
                    {profile.expertise.map((item, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Languages</dt>
                <dd className="mt-1">
                  <div className="flex flex-wrap gap-2">
                    {profile.languages.map((item, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Thoughts on Counseling</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {profile.thoughtsOnCounseling}
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Philosophy</dt>
                <dd className="mt-1 text-sm text-gray-900">{profile.philosophy}</dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Availability</dt>
                <dd className="mt-1">
                  <div className="flex flex-wrap gap-2">
                    {profile?.availability?.map((time, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Pricing</dt>
                <dd className="mt-1">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{profile.pricing.discountedPrice}
                    </span>
                    {profile.pricing.originalPrice > profile.pricing.discountedPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ₹{profile.pricing.originalPrice}
                      </span>
                    )}
                  </div>
                </dd>
              </div>
            </dl>
          </div>

          {/* Actions */}
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              onClick={() => navigate(`/book-appointment/${id}`)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 