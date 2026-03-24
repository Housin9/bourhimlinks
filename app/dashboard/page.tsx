'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/');
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!userId) {
    return null;
  }

  return (
    <div className="flex-1 bg-black text-white">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-zinc-400">Manage your links here</p>
      </div>
    </div>
  );
}
