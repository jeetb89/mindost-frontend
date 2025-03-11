import posthog from 'posthog-js';

// Initialize PostHog
if (typeof window !== 'undefined') {
  posthog.init(
    process.env.NEXT_PUBLIC_POSTHOG_KEY || '',
    {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.opt_out_capturing();
      }
    }
  );
}

export const Analytics = {
  // Track user events
  trackEvent: (eventName: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      posthog.capture(eventName, properties);
    }
  },

  // Track user identification
  identifyUser: (userId: string, traits?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      posthog.identify(userId, traits);
    }
  },

  // Track page views
  trackPageView: (pageName: string) => {
    if (typeof window !== 'undefined') {
      posthog.capture('$pageview', { page_name: pageName });
    }
  },

  // Track conversation events
  trackConversation: (properties: {
    messageType: 'text' | 'voice';
    language: 'english' | 'hinglish';
    emotion?: string;
    duration?: number;
  }) => {
    if (typeof window !== 'undefined') {
      posthog.capture('conversation_event', properties);
    }
  },

  // Track error events
  trackError: (error: Error, context?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      posthog.capture('error_event', {
        error_message: error.message,
        error_stack: error.stack,
        ...context
      });
    }
  }
}; 