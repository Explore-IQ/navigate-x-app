'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Search, Globe, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Discover', href: '/discover' },
  { label: 'Queues', href: '/queues' },
  { label: 'Traffic', href: '/traffic' },
  { label: 'Parking', href: '/parking' },
  { label: 'Trips', href: '/trips' },
  { label: 'Bookings', href: '/bookings/hotel' },
];

interface NavLinkProps {
  href: string;
  label: string;
  active: boolean;
  transparent: boolean;
  onClick?: () => void;
}

function NavLink({ href, label, active, transparent, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'relative text-sm font-medium transition-colors duration-200 cursor-pointer',
        'after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:rounded-full after:transition-all after:duration-200',
        transparent
          ? active
            ? 'text-[#6CB6E4] after:w-full after:bg-[#6CB6E4]'
            : 'text-white/80 hover:text-white after:w-0 hover:after:w-full after:bg-white/50'
          : active
            ? 'text-[#4F8A65] after:w-full after:bg-[#4F8A65]'
            : 'text-[#3E4A4F]/70 hover:text-[#3E4A4F] after:w-0 hover:after:w-full after:bg-[#3E4A4F]/40'
      )}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const isHome = pathname === '/';
  const transparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300',
        transparent
          ? 'bg-black/20 backdrop-blur-sm border-b border-white/10'
          : 'bg-white/90 backdrop-blur-lg border-b border-[#3E4A4F]/10 shadow-sm'
      )}
    >
      <nav
        className="h-full max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer group"
          aria-label="Tourism Platform — home"
        >
          <div
            className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300',
              transparent
                ? 'bg-[#6CB6E4]/80 group-hover:bg-[#6CB6E4]'
                : 'bg-[#4F8A65] group-hover:bg-[#4F8A65]/80'
            )}
          >
            <MapPin className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          <span
            className={cn(
              'font-[family-name:var(--font-poppins)] font-bold text-lg leading-none transition-colors duration-300',
              transparent ? 'text-white' : 'text-[#3E4A4F]'
            )}
          >
            Tour
            <span className={transparent ? 'text-[#6CB6E4]' : 'text-[#4F8A65]'}>India</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={pathname.startsWith(link.href)}
              transparent={transparent}
            />
          ))}
        </div>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            aria-label="Search destinations"
            className={cn(
              'w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-200 cursor-pointer',
              transparent
                ? 'text-white/70 hover:text-white hover:bg-white/10'
                : 'text-[#3E4A4F]/60 hover:text-[#3E4A4F] hover:bg-[#3E4A4F]/8'
            )}
          >
            <Search className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            aria-label="Change language"
            className={cn(
              'w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-200 cursor-pointer',
              transparent
                ? 'text-white/70 hover:text-white hover:bg-white/10'
                : 'text-[#3E4A4F]/60 hover:text-[#3E4A4F] hover:bg-[#3E4A4F]/8'
            )}
          >
            <Globe className="w-4 h-4" aria-hidden="true" />
          </button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className={cn(
              'cursor-pointer transition-all duration-200',
              transparent
                ? 'border-white/25 text-white bg-transparent hover:bg-white/10 hover:text-white'
                : 'border-[#3E4A4F]/20 text-[#3E4A4F] bg-transparent hover:bg-[#3E4A4F]/8 hover:text-[#3E4A4F]'
            )}
          >
            <Link href="/login">Sign in</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-[#4F8A65] hover:bg-[#4F8A65]/90 text-white border-0 cursor-pointer shadow-sm"
          >
            <Link href="/register">Get Started</Link>
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className={cn(
                'md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-200 cursor-pointer',
                transparent
                  ? 'text-white/80 hover:text-white hover:bg-white/10'
                  : 'text-[#3E4A4F]/70 hover:text-[#3E4A4F] hover:bg-[#3E4A4F]/8'
              )}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-white border-[#3E4A4F]/10 p-0">
            <div className="flex flex-col h-full px-6 py-8 gap-2">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 mb-6 cursor-pointer"
                aria-label="Tourism Platform — home"
              >
                <div className="w-8 h-8 rounded-lg bg-[#4F8A65] flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" aria-hidden="true" />
                </div>
                <span className="font-[family-name:var(--font-poppins)] font-bold text-[#3E4A4F] text-lg">
                  Tour<span className="text-[#4F8A65]">India</span>
                </span>
              </Link>
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  active={pathname.startsWith(link.href)}
                  transparent={false}
                  onClick={() => setMobileOpen(false)}
                />
              ))}
              <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-[#3E4A4F]/10">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-[#3E4A4F]/20 text-[#3E4A4F] bg-transparent hover:bg-[#3E4A4F]/8 cursor-pointer"
                >
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    Sign in
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-[#4F8A65] hover:bg-[#4F8A65]/90 text-white border-0 cursor-pointer"
                >
                  <Link href="/register" onClick={() => setMobileOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
