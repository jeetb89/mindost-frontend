import { useState, useEffect } from 'react';
import axios from 'axios';

interface Booking {
  _id: string;
  userId: string;
  doctorId: string | null;
  startTime: string;
  endTime: string;
  status: string;
  sessionType: string;
  razorpayOrderId: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  count: number;
  data: Booking[];
}

const API_URL = import.meta.env.VITE_API_URL;

export default function UserBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = localStorage.getItem('token');

        if (!user._id || !token) {
          setError('Please login to view your bookings');
          setLoading(false);
          return;
        }

        const response = await axios.get<ApiResponse>(
          `${API_URL}/api/bookings/user/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.data.success) {
          setBookings(response.data.data);
        } else {
          setError('Failed to fetch bookings');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{error}</p>
          <p className="mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 flex flex-col w-full ">
      <h1 className="text-2xl font-bold mb-6 ml-10 mt-10 text-black">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No bookings found</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 h-[50vh] ml-10 mr-10 overflow-y-auto">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Session Booking</h3>
                  <p className="text-gray-600">{booking.sessionType}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  booking.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800'
                    : booking.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {booking.status}
                </span>
              </div>
              
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Date:</span>{' '}
                  {new Date(booking.startTime).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Time:</span>{' '}
                  {new Date(booking.startTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })} - {new Date(booking.endTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Amount:</span>{' '}
                  ₹{booking.amount}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Order ID:</span>{' '}
                  {booking.razorpayOrderId}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 