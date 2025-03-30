import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { CheckIcon } from '@heroicons/react/24/outline';

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

export default function DoctorProfile() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<DoctorProfile>({
    _id: JSON.parse(localStorage.getItem('user') || '{}')._id || '',
    name: '',
    specialization: '',
    image: '',
    experience: '',
    description: '',
    pricing: {
      originalPrice: 0,
      discountedPrice: 0,
      currency: 'INR'
    },
    rating: {
      score: 0,
      totalStars: 5
    },
    expertise: [],
    languages: [],
    thoughtsOnCounseling: '',
    philosophy: '',
    availability: []
  });

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    console.log('User data from localStorage:', userData);
    
    if (!token) {
      navigate('/login');
      return;
    }

    // Check if doctor profile exists
  
  }, [navigate, API_URL]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof DoctorProfile] as Record<string, any>),
          [child]: value
        }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayInput = (e: React.KeyboardEvent<HTMLInputElement>, field: 'expertise' | 'languages' | 'availability') => {
    const value = (e.target as HTMLInputElement).value;
    if (e.key === 'Enter' && value.trim()) {
      e.preventDefault();
      setProfile(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()]
      }));
      (e.target as HTMLInputElement).value = '';
    }
  };

  const removeArrayItem = (field: 'expertise' | 'languages' | 'availability', index: number) => {
    setProfile(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/api/doctors`, profile, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data) {
        alert('Profile saved successfully!');
        navigate('/landing');
      }
    } catch (error: any) {
      console.error('Error saving profile:', error);
      alert(error.response?.data?.message || 'Error saving profile');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: 'Basic Information',
      fields: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Specialization</label>
            <input
              type="text"
              name="specialization"
              value={profile.specialization}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Experience</label>
            <input
              type="text"
              name="experience"
              value={profile.experience}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Image URL</label>
            <input
              type="text"
              name="image"
              value={profile.image}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900"
            />
          </div>
        </div>
      )
    },
    {
      title: 'Pricing & Rating',
      fields: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Original Price</label>
            <input
              type="number"
              name="pricing.originalPrice"
              value={profile.pricing.originalPrice}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Discounted Price</label>
            <input
              type="number"
              name="pricing.discountedPrice"
              value={profile.pricing.discountedPrice}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rating Score</label>
            <input
              type="number"
              name="rating.score"
              value={profile.rating.score}
              onChange={handleInputChange}
              step="0.1"
              min="0"
              max="5"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900"
            />
          </div>
        </div>
      )
    },
    {
      title: 'Expertise & Languages',
      fields: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Expertise (Press Enter to add)</label>
            <input
              type="text"
              onKeyPress={(e) => handleArrayInput(e, 'expertise')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.expertise.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeArrayItem('expertise', index)}
                    className="ml-1 text-indigo-600 hover:text-indigo-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Languages (Press Enter to add)</label>
            <input
              type="text"
              onKeyPress={(e) => handleArrayInput(e, 'languages')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.languages.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeArrayItem('languages', index)}
                    className="ml-1 text-indigo-600 hover:text-indigo-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Philosophy & Availability',
      fields: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Thoughts on Counseling</label>
            <textarea
              name="thoughtsOnCounseling"
              value={profile.thoughtsOnCounseling}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Philosophy</label>
            <textarea
              name="philosophy"
              value={profile.philosophy}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Availability (Press Enter to add)</label>
            <input
              type="text"
              onKeyPress={(e) => handleArrayInput(e, 'availability')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {profile?.availability?.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeArrayItem('availability', index)}
                    className="ml-1 text-indigo-600 hover:text-indigo-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Doctor Profile Setup
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Complete your profile to start helping others
          </p>
        </div>

        <div className="mt-8">
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index < steps.length - 1 ? 'flex-1' : ''
                }`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentStep > index
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 ${
                      currentStep > index ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {steps[currentStep - 1].title}
            </h3>
            {steps[currentStep - 1].fields}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Previous
            </button>
            {currentStep === steps.length ? (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(prev => Math.min(steps.length, prev + 1))}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 