# Authentication & Authorization Guide

All authentication and authorization in this application is handled exclusively by **Clerk**. No other authentication methods should be implemented.

## Core Requirements

1. **Clerk is the single source of truth** for all user authentication
2. **Protected routes** must require users to be logged in
3. **Logged-in users** accessing the homepage should be redirected to `/dashboard`
4. **Sign in and sign up** modals must be used exclusively (never full-page flows)

## Protected Routes

### Dashboard Page (`/dashboard`)

The `/dashboard` page is a protected route and must enforce authentication.

**Implementation:**

```typescript
// app/dashboard/page.tsx
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
    <div>
      {/* Dashboard content */}
    </div>
  );
}
```

**Alternative: Server-side protection**

For stricter protection at the server level, use middleware or check in layouts:

```typescript
// app/(protected)/layout.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  return children;
}
```

## Homepage Redirect

### Logged-in Users Accessing Homepage

When a logged-in user visits the homepage (`/`), they must be automatically redirected to `/dashboard`.

**Implementation:**

```typescript
// app/page.tsx
'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import PublicLanding from '@/components/PublicLanding';

export default function HomePage() {
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

  return <PublicLanding />;
}
```

## Sign In & Sign Up Modals

All authentication UI (sign in and sign up) must use Clerk modals, never full-page flows.

**Implementation:**

Use the `<SignInButton>` and `<SignUpButton>` components from Clerk:

```typescript
// Example component
import { SignInButton, SignUpButton } from '@clerk/nextjs';

export function AuthButtons() {
  return (
    <div className="flex gap-4">
      <SignInButton mode="modal" />
      <SignUpButton mode="modal" />
    </div>
  );
}
```

**Modal Configuration:**

Ensure modals are configured in your Clerk instance with the following behavior:
- Opens as a modal overlay
- May be dismissed by the user
- Closes automatically after successful authentication
- Redirects to the dashboard after sign up completion

**In `app/layout.tsx`:**

```typescript
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

## User Context

Use the `useAuth()` hook to access user information in client components:

```typescript
'use client';

import { useAuth, useUser } from '@clerk/nextjs';

export function UserProfile() {
  const { userId, isLoaded } = useAuth();
  const { user } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!userId) return <div>Not logged in</div>;

  return (
    <div>
      <p>ID: {userId}</p>
      <p>Email: {user?.emailAddresses[0]?.emailAddress}</p>
    </div>
  );
}
```

## Session Management

Clerk handles session management automatically. Sessions persist across page refreshes and browser restarts (until the user signs out).

**Signing out:**

Use Clerk's `<SignOutButton>` component:

```typescript
import { SignOutButton } from '@clerk/nextjs';

export function LogoutButton() {
  return <SignOutButton redirectUrl="/" />;
}
```

Redirect the user to the homepage or sign-in page after logout.

## Important Rules

- ❌ **Do NOT** implement custom authentication
- ❌ **Do NOT** create your own sign in/sign up pages
- ❌ **Do NOT** use full-page authentication flows
- ✅ **DO** use Clerk components exclusively
- ✅ **DO** use modals for all auth UI
- ✅ **DO** check authentication status before rendering protected content
- ✅ **DO** handle loading states to prevent content flashing

## Clerk Environment Variables

Ensure these are configured in `.env.local`:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## References

- [Clerk Authentication Documentation](https://clerk.com/docs)
- [Clerk React Documentation](https://clerk.com/docs/references/react)
- [Clerk Next.js Documentation](https://clerk.com/docs/quickstarts/nextjs)
