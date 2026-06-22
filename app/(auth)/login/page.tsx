'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Mail, Lock, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginForm = z.infer<typeof schema>;

interface FieldProps {
  label: string;
  id: string;
  icon: React.ElementType;
  error?: string;
  [key: string]: unknown;
}

function Field({ label, id, icon: Icon, error, ...props }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[#1A1040]">
        {label}
      </label>
      <div className="relative">
        <Icon
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          aria-hidden="true"
        />
        <Input
          id={id}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          className={cn(
            'h-11 pl-10 rounded-xl border-gray-200 bg-white focus-visible:ring-[#FF6B00]/30 focus-visible:border-[#FF6B00] text-[#1A1040]',
            error && 'border-[#E8445A] focus-visible:ring-[#E8445A]/30 focus-visible:border-[#E8445A]'
          )}
          {...(props as React.ComponentProps<'input'>)}
        />
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-[#E8445A]">
          {error}
        </p>
      )}
    </div>
  );
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(schema) });

  async function onSubmit(data: LoginForm) {
    try {
      // TODO: wire up next-auth signIn
      await new Promise((r) => setTimeout(r, 1000));
      console.log(data);
      toast.success('Signed in successfully!');
    } catch {
      toast.error('Invalid email or password. Please try again.');
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF9F0] flex">
      {/* Left panel — decorative */}
      <div
        aria-hidden="true"
        className="hidden lg:flex lg:w-1/2 bg-[#1A1040] flex-col justify-center items-center p-16 relative overflow-hidden"
      >
        <div className="absolute top-[-10%] right-[-10%] w-80 h-80 rounded-full bg-[#FF6B00]/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 rounded-full bg-[#FFB800]/15 blur-[80px]" />
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FF6B00] flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-8 h-8 text-white" aria-hidden="true" />
          </div>
          <h2 className="font-[family-name:var(--font-poppins)] text-4xl font-bold text-white mb-4">
            Welcome back,<br />explorer.
          </h2>
          <p className="text-white/60 max-w-xs leading-relaxed">
            Sign in to access your saved trips, bookings, live crowd alerts, and personalised recommendations.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <Link
            href="/"
            className="lg:hidden flex items-center gap-2 mb-8 cursor-pointer"
            aria-label="TourIndia — home"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FF6B00] flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <span className="font-[family-name:var(--font-poppins)] font-bold text-[#1A1040] text-lg">
              Tour<span className="text-[#FF6B00]">India</span>
            </span>
          </Link>

          <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[#1A1040] mb-1">
            Sign in
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="text-[#FF6B00] font-medium hover:underline cursor-pointer"
            >
              Create one free
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
            <Field
              label="Email address"
              id="email"
              icon={Mail}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />
            <Field
              label="Password"
              id="password"
              icon={Lock}
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register('password')}
            />

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-xs text-[#FF6B00] hover:underline cursor-pointer"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              aria-label="Sign in to your account"
              className="h-12 rounded-xl bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-semibold border-0 shadow-md shadow-[#FF6B00]/20 cursor-pointer mt-1 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" aria-hidden="true" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-8">
            By continuing you agree to our{' '}
            <Link href="/terms" className="underline cursor-pointer">Terms</Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline cursor-pointer">Privacy Policy</Link>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
