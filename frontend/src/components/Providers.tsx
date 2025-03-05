'use client';

import { AuthProvider } from '@/context/AuthContext';
import ClientOnly from './ClientOnly';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClientOnly>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ClientOnly>
  );
} 