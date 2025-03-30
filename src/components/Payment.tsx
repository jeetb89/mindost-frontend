import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

interface PricingPlan {
  name: string;
  price: number;
  sessionDuration: number;
  sessionsLimit: number;
  features: string[];
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'free',
    price: 0,
    sessionDuration: 10,
    sessionsLimit: 3,
    features: [
      '10 minutes session duration',
      '3 free sessions',
      'Basic chat support'
    ]
  },
  {
    name: 'basic',
    price: 149,
    sessionDuration: 10,
    sessionsLimit: 1,
    features: [
      '10 minutes session duration',
      'Priority chat support',
      'Session recording',
      'Post session summary'
    ]
  },
  {
    name: 'pro',
    price: 349,
    sessionDuration: 20,
    sessionsLimit: 1,
    features: [
      '20 minutes session duration',
      'Priority chat support',
      'Session recording',
      'Post session summary',
      'Personalized action plan',
      'Follow-up support'
    ]
  }
];

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const initializeRazorpay = (orderId: string, amount: number, planName: string) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay Key ID
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "MindDost",
      description: `${planName} Plan Subscription`,
      order_id: orderId,
      handler: async (response: any) => {
        try {
          // Verify payment on your backend
          const verifyResponse = await axios.post(`${API_URL}/api/payments/verify`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          });

          if (verifyResponse.data.success) {
            // Update user's subscription status
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            await axios.post(`${API_URL}/api/users/update-subscription`, {
              userId: user._id,
              plan: planName
            }, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });

            alert('Payment successful! Your subscription has been activated.');
            window.location.reload();
          }
        } catch (error) {
          console.error('Payment verification failed:', error);
          alert('Payment verification failed. Please contact support.');
        }
      },
      prefill: {
        name: "User Name",
        email: "user@example.com",
        contact: "9999999999"
      },
      notes: {
        plan: planName
      },
      theme: {
        color: "#4F46E5"
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handleSubscribe = async (planName: string, price: number) => {
    try {
      setLoading(true);
      setSelectedPlan(planName);

      if (planName === 'free') {
        // Handle free plan subscription
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        await axios.post(`${API_URL}/api/users/update-subscription`, {
          userId: user._id,
          plan: 'free'
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        alert('Free plan activated successfully!');
        window.location.reload();
        return;
      }

      // Create order on your backend
      const response = await axios.post(`${API_URL}/api/payments/create-order`, {
        amount: price,
        currency: "INR"
      });

      if (response.data.orderId) {
        initializeRazorpay(response.data.orderId, price, planName);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Select the perfect plan for your mental wellness journey
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 ${
                selectedPlan === plan.name
                  ? 'ring-2 ring-indigo-500'
                  : ''
              }`}
            >
              <div className="p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 capitalize">
                  {plan.name}
                </h3>
                <p className="mt-4 text-sm text-gray-500">
                  {plan.sessionDuration} minutes per session
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ₹{plan.price}
                  </span>
                  <span className="text-base font-medium text-gray-500">
                    /session
                  </span>
                </p>
                <button
                  onClick={() => handleSubscribe(plan.name, plan.price)}
                  disabled={loading}
                  className={`mt-8 block w-full py-2 px-4 border border-transparent rounded-md text-center font-medium ${
                    plan.name === 'free'
                      ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Processing...' : plan.name === 'free' ? 'Get Started' : 'Subscribe'}
                </button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h4 className="text-sm font-medium text-gray-900 tracking-wide uppercase">
                  What's included
                </h4>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <CheckIcon
                        className="flex-shrink-0 h-5 w-5 text-green-500"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <p className="text-base text-gray-500">
            All plans include secure payment processing and 24/7 customer support
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Need a custom plan?{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 