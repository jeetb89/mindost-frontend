import { useState, useEffect } from 'react';
import axios from 'axios';

interface BookingStepProps {
  doctorId: string;
  startTime: string;
  endTime: string;
  sessionType: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const API_URL = import.meta.env.VITE_API_URL;

export default function BookingSteps({ doctorId, startTime, endTime, sessionType }: BookingStepProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayNow = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to make a booking');
        return;
      }

      // Create order
      const orderResponse = await axios.post(
        `${API_URL}/api/bookings/create-order`,
        {
          doctorId,
          startTime,
          endTime,
          sessionType
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const orderData = orderResponse.data;

      // Initialize Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Mindost",
        description: "Therapy Session Booking",
        order_id: orderData.id,
        handler: async (response: any) => {
          try {
            // Verify payment
            const verifyResponse = await axios.post(
              `${API_URL}/api/bookings/verify-payment`,
              {
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                bookingId: orderData.bookingId
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              }
            );

            if (verifyResponse.data.success) {
              alert('Payment successful! Your booking is confirmed.');
              // You can add navigation or other success actions here
            } else {
              setError('Payment verification failed');
            }
          } catch (err: any) {
            setError(err.response?.data?.message || 'Payment verification failed');
          }
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9999999999"
        },
        notes: {
          address: "Mindost Office"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <button
        onClick={handlePayNow}
        disabled={loading}
        className={`px-6 py-2 rounded-lg text-white font-semibold ${
          loading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
} 