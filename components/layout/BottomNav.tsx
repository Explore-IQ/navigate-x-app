'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Clock, Navigation, ParkingSquare, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const BOTTOM_NAV_ITEMS = [
  { label: 'Discover', href: '/discover', icon: Compass },
  { label: 'Queues', href: '/queues', icon: Clock },
  { label: 'Traffic', href: '/traffic', icon: Navigation },
  { label: 'Parking', href: '/parking', icon: ParkingSquare },
  { label: 'Profile', href: '/profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Bottom navigation"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-[#3E4A4F]/10 safe-area-pb"
    >
      <ul className="flex items-center justify-around h-16 px-2">
        {BOTTOM_NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-label={label}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex flex-col items-center gap-1 py-2 rounded-xl transition-colors duration-200 cursor-pointer',
                  'min-h-[44px] min-w-[44px] mx-auto w-full',
                  active ? 'text-[#4F8A65]' : 'text-[#3E4A4F]/40 hover:text-[#3E4A4F]/70'
                )}
              >
                <Icon
                  className={cn('w-5 h-5', active && 'drop-shadow-[0_0_6px_rgba(79,138,101,0.5)]')}
                  aria-hidden="true"
                />
                <span className="text-[10px] font-medium leading-none">{label}</span>
                {active && (
                  <span className="absolute -bottom-0 w-6 h-0.5 rounded-full bg-[#4F8A65]" aria-hidden="true" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
