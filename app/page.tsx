'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

export default function Home() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && userId) {
      router.push('/dashboard');
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded || userId) {
    return null;
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen">
      <main className="flex flex-col items-center justify-center text-center gap-8 px-6 py-16 max-w-2xl">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">
            Bourhim Links
          </p>
          <h1 className="text-5xl font-bold tracking-tight text-white">
            BourhimLinks
          </h1>
          <p className="text-xl text-zinc-400">
            Create and share your links with ease
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <SignInButton mode="modal">
            <button className="h-12 px-6 rounded-lg bg-white text-black font-medium transition-colors hover:bg-zinc-100">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="h-12 px-6 rounded-lg border-2 border-zinc-600 text-white font-medium transition-colors hover:border-zinc-400 hover:bg-zinc-900">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </main>
    </div>
  );
}
