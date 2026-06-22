import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { HomeClient } from './HomeClient';

export const metadata: Metadata = {
  title: 'TourIndia — Discover Incredible India',
  description:
    "Explore 5,000+ destinations across India. Live crowd maps, instant slot bookings, AI trip planning, and seamless travel — all in one platform.",
  openGraph: {
    title: 'TourIndia — Discover Incredible India',
    description: 'Explore sacred temples, hill stations, beaches, and hidden gems across India.',
    images: [
      {
        url: 'https://res.cloudinary.com/duajyized/image/upload/f_auto,q_auto,w_1200,h_630,c_fill,g_auto/v1781095115/vaisakh-satheesan-US4m1uJSco4-unsplash_jfvgyc.jpg',
        width: 1200,
        height: 630,
        alt: 'Discover Incredible India',
      },
    ],
  },
};

// SSR shell — metadata stays server-side; HomeClient handles all interactivity
export default function HomePage() {
  return (
    <>
      <Navbar />
      <HomeClient />
    </>
  );
}
