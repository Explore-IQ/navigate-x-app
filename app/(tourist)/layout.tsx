import { Navbar } from '@/components/layout/Navbar';
import { BottomNav } from '@/components/layout/BottomNav';

export default function TouristLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {/* pt-16 for fixed Navbar, pb-20 md:pb-0 for mobile BottomNav */}
      <main className="pt-16 pb-20 md:pb-0 min-h-screen bg-[#FFF9F0]">{children}</main>
      <BottomNav />
    </>
  );
}
