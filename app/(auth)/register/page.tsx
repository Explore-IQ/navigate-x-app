'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const schema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Enter a valid email address'),
    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must include at least one uppercase letter')
      .regex(/[0-9]/, 'Must include at least one number'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterForm = z.infer<typeof schema>;

interface FieldProps {
  label: string;
  id: string;
  icon: React.ElementType;
  error?: string;
  hint?: string;
  [key: string]: unknown;
}

function Field({ label, id, icon: Icon, error, hint, ...props }: FieldProps) {
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
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          aria-invalid={!!error}
          className={cn(
            'h-11 pl-10 rounded-xl border-gray-200 bg-white focus-visible:ring-[#FF6B00]/30 focus-visible:border-[#FF6B00] text-[#1A1040]',
            error && 'border-[#E8445A] focus-visible:ring-[#E8445A]/30 focus-visible:border-[#E8445A]'
          )}
          {...(props as React.ComponentProps<'input'>)}
        />
      </div>
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-gray-400">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-[#E8445A]">
          {error}
        </p>
      )}
    </div>
  );
}

const CONTAINER_VARIANTS = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({ resolver: zodResolver(schema) });

  async function onSubmit(data: RegisterForm) {
    try {
      // TODO: wire up registration API call
      await new Promise((r) => setTimeout(r, 1200));
      console.log(data);
      toast.success('Account created! Welcome to TourIndia.');
    } catch {
      toast.error('Could not create account. Please try again.');
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF9F0] flex">
      {/* Left panel — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          animate="show"
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <motion.div variants={ITEM_VARIANTS}>
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
          </motion.div>

          <motion.div variants={ITEM_VARIANTS}>
            <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[#1A1040] mb-1">
              Create account
            </h1>
            <p className="text-sm text-gray-500 mb-8">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-[#FF6B00] font-medium hover:underline cursor-pointer"
              >
                Sign in
              </Link>
            </p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
            <motion.div variants={ITEM_VARIANTS}>
              <Field
                label="Full name"
                id="name"
                icon={User}
                type="text"
                placeholder="Priya Sharma"
                autoComplete="name"
                error={errors.name?.message}
                {...register('name')}
              />
            </motion.div>

            <motion.div variants={ITEM_VARIANTS}>
              <Field
                label="Email address"
                id="email"
                icon={Mail}
                type="email"
                placeholder="priya@example.com"
                autoComplete="email"
                error={errors.email?.message}
                {...register('email')}
              />
            </motion.div>

            <motion.div variants={ITEM_VARIANTS}>
              <Field
                label="Mobile number"
                id="phone"
                icon={Phone}
                type="tel"
                inputMode="numeric"
                placeholder="9876543210"
                autoComplete="tel"
                hint="Indian mobile number (10 digits)"
                error={errors.phone?.message}
                {...register('phone')}
              />
            </motion.div>

            <motion.div variants={ITEM_VARIANTS}>
              <Field
                label="Password"
                id="password"
                icon={Lock}
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                hint="Min 8 chars, one uppercase, one number"
                error={errors.password?.message}
                {...register('password')}
              />
            </motion.div>

            <motion.div variants={ITEM_VARIANTS}>
              <Field
                label="Confirm password"
                id="confirmPassword"
                icon={Lock}
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />
            </motion.div>

            <motion.div variants={ITEM_VARIANTS} className="mt-1">
              <Button
                type="submit"
                disabled={isSubmitting}
                aria-label="Create your TourIndia account"
                className="w-full h-12 rounded-xl bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-semibold border-0 shadow-md shadow-[#FF6B00]/20 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" aria-hidden="true" />
                    Creating account…
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          <motion.p
            variants={ITEM_VARIANTS}
            className="text-center text-xs text-gray-400 mt-6"
          >
            By creating an account you agree to our{' '}
            <Link href="/terms" className="underline cursor-pointer">Terms</Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline cursor-pointer">Privacy Policy</Link>.
          </motion.p>
        </motion.div>
      </div>

      {/* Right panel — decorative */}
      <div
        aria-hidden="true"
        className="hidden lg:flex lg:w-1/2 bg-[#1A1040] flex-col justify-center items-center p-16 relative overflow-hidden"
      >
        <div className="absolute top-[-10%] left-[-10%] w-80 h-80 rounded-full bg-[#FFB800]/15 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 rounded-full bg-[#FF6B00]/20 blur-[80px]" />
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#FFB800] flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-8 h-8 text-white" aria-hidden="true" />
          </div>
          <h2 className="font-[family-name:var(--font-poppins)] text-4xl font-bold text-white mb-4">
            Start exploring<br />India today.
          </h2>
          <p className="text-white/60 max-w-xs leading-relaxed mb-8">
            Get personalised destination picks, live crowd alerts, AI-powered trip planning, and seamless bookings.
          </p>
          <ul className="flex flex-col gap-3 text-left" aria-label="Benefits of joining">
            {[
              'Free account — no credit card needed',
              'Personalised recommendations',
              'Real-time crowd & queue alerts',
              'AI trip planner',
            ].map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-sm text-white/70">
                <span
                  className="w-5 h-5 rounded-full bg-[#1B7A4A] flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
