import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import {
  Link2,
  Zap,
  Share2,
  BarChart3,
  Lock,
  Smartphone,
} from 'lucide-react';

interface FeatureProps {
  icon: ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureProps): ReactNode {
  return (
    <div className="flex flex-col items-start space-y-3 p-6 rounded-lg border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900 hover:border-zinc-600 transition-colors dark:bg-zinc-900/50 dark:hover:bg-zinc-900 dark:border-zinc-700 dark:hover:border-zinc-600">
      <div className="p-2 rounded-lg bg-blue-500/10">
        <div className="text-blue-400">{icon}</div>
      </div>
      <h3 className="text-lg font-semibold text-white dark:text-white">
        {title}
      </h3>
      <p className="text-sm text-zinc-400 dark:text-zinc-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export function LandingPage(): ReactNode {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white dark:bg-black dark:text-white">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo/Branding */}
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center p-2 bg-blue-500/10 rounded-full">
              <Link2 className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white dark:text-white">
              Bourhim<span className="text-blue-400">Links</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Create, manage, and share your personalized link hub. Everything in
              one place.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <SignUpButton mode="modal">
              <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                Get Started Free
              </Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button
                variant="outline"
                className="h-12 px-8 border-zinc-600 text-white hover:bg-zinc-900 hover:border-zinc-500 font-semibold rounded-lg transition-colors dark:border-zinc-600 dark:hover:bg-zinc-900"
              >
                Sign In
              </Button>
            </SignInButton>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-12 max-w-md mx-auto">
            <div>
              <div className="text-2xl font-bold text-blue-400">100%</div>
              <p className="text-sm text-zinc-400">Free to Use</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">Unlimited</div>
              <p className="text-sm text-zinc-400">Link Creation</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">Real-time</div>
              <p className="text-sm text-zinc-400">Analytics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-zinc-950 dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white dark:text-white">
              Powerful Features
            </h2>
            <p className="text-lg text-zinc-400 dark:text-zinc-400 max-w-2xl mx-auto">
              Everything you need to create and manage your link ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Link2 className="w-6 h-6" />}
              title="Easy Link Management"
              description="Create, edit, and organize your links with an intuitive interface. Drag and drop to rearrange your link collection."
            />
            <FeatureCard
              icon={<Share2 className="w-6 h-6" />}
              title="One-Click Sharing"
              description="Share your link hub across social media with a simple, memorable URL. No setup required."
            />
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6" />}
              title="Real-time Analytics"
              description="Track clicks, views, and engagement on your links. Understand your audience better."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Lightning Fast"
              description="Optimized for speed. Your links load instantly, providing the best user experience."
            />
            <FeatureCard
              icon={<Lock className="w-6 h-6" />}
              title="Secure & Private"
              description="Your data is encrypted and secure. We take privacy seriously with enterprise-grade security."
            />
            <FeatureCard
              icon={<Smartphone className="w-6 h-6" />}
              title="Mobile Friendly"
              description="Works perfectly on all devices. Your links look great on desktop, tablet, and mobile."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white dark:text-white">
              Ready to get started?
            </h2>
            <p className="text-lg text-zinc-400 dark:text-zinc-400">
              Join thousands of users creating and sharing their link hubs.
              It only takes a minute.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignUpButton mode="modal">
              <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                Create Your Hub
              </Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button
                variant="outline"
                className="h-12 px-8 border-zinc-600 text-white hover:bg-zinc-900 hover:border-zinc-500 font-semibold rounded-lg transition-colors dark:border-zinc-600 dark:hover:bg-zinc-900"
              >
                Already have an account?
              </Button>
            </SignInButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-6 py-8 text-center text-sm text-zinc-500 dark:text-zinc-500">
        <p>
          © {new Date().getFullYear()} BourhimLinks. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
