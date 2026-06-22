import type { Metadata } from 'next';
import { Geist, Geist_Mono, Poppins } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/sonner';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Tourism Mobility Platform — Explore India',
  description:
    "Discover, navigate, and experience India's most breathtaking destinations. Real-time crowd info, slot bookings, AI trip planning.",
  keywords: ['tourism', 'India', 'travel', 'destinations', 'booking', 'crowd management'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#F7FAFB] font-sans antialiased">
        <Providers>
          {children}
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
