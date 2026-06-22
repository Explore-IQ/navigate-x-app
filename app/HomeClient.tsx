'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroBackground = dynamic(
  () => import('@/components/3d/HeroBackground').then(m => ({ default: m.HeroBackgroundCanvas })),
  { ssr: false }
);
import { useRef, useState } from 'react';
import {
  Search, MapPin, Users, Map, Zap, ChevronDown,
  ArrowRight, Navigation, Compass, Camera,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

/* ─── Image constants ──────────────────────────────────────────────────────── */
const CDN = 'https://res.cloudinary.com/duajyized/image/upload';
const Q   = 'f_auto,q_auto';

const HERO_IMG = `${CDN}/${Q},w_1920/v1781095104/subash-matheswaran-OFpmoFFc63c-unsplash_r1uudy.jpg`;

const DESTINATIONS = [
  {
    id: 1,
    src: `${CDN}/${Q},w_800,h_1000,c_fill,g_auto/v1781095107/david-samraj-JaSI5XDzsL8-unsplash_rvoigk.jpg`,
    name: 'Temples of the South',
    location: 'Tamil Nadu',
    category: 'Spiritual',
    href: '/discover?category=temples',
    wide: false,
  },
  {
    id: 2,
    src: `${CDN}/${Q},w_800,h_1000,c_fill,g_auto/v1781095107/aravind-thangaraj-7Ko8TpWTdTE-unsplash_kk6yow.jpg`,
    name: 'Hill Stations',
    location: 'Western Ghats',
    category: 'Nature',
    href: '/discover?category=hills',
    wide: false,
  },
  {
    id: 3,
    src: `${CDN}/${Q},w_1200,h_700,c_fill,g_auto/v1781095106/wouter-naert-dwg12DlR2Mk-unsplash_zvvbi1.jpg`,
    name: 'Coastal Wonders',
    location: 'Kerala & Goa',
    category: 'Coastal',
    href: '/discover?category=beaches',
    wide: true,
  },
  {
    id: 4,
    src: `${CDN}/${Q},w_1200,h_700,c_fill,g_auto/v1781095105/siby-QXIBCvvA_jc-unsplash_kqvkbb.jpg`,
    name: 'Sacred Pilgrimage Routes',
    location: 'Uttarakhand',
    category: 'Pilgrimage',
    href: '/discover?category=pilgrimage',
    wide: true,
  },
  {
    id: 5,
    src: `${CDN}/${Q},w_800,h_1000,c_fill,g_auto/v1781095105/subhadeep-dishant-Cs-hI1if4lU-unsplash_z0ul1j.jpg`,
    name: 'Golden Heritage',
    location: 'Rajasthan',
    category: 'Heritage',
    href: '/discover?category=heritage',
    wide: false,
  },
  {
    id: 6,
    src: `${CDN}/${Q},w_800,h_1000,c_fill,g_auto/v1781095104/subash-matheswaran-OFpmoFFc63c-unsplash_r1uudy.jpg`,
    name: 'Backwater Trails',
    location: 'Kerala',
    category: 'Scenic',
    href: '/discover?category=backwaters',
    wide: false,
  },
];

const GALLERY_IMGS = [
  `${CDN}/${Q},w_500,h_340,c_fill,g_auto/v1781095115/vaisakh-satheesan-US4m1uJSco4-unsplash_jfvgyc.jpg`,
  `${CDN}/${Q},w_500,h_340,c_fill,g_auto/v1781095107/david-samraj-JaSI5XDzsL8-unsplash_rvoigk.jpg`,
  `${CDN}/${Q},w_500,h_340,c_fill,g_auto/v1781095107/aravind-thangaraj-7Ko8TpWTdTE-unsplash_kk6yow.jpg`,
  `${CDN}/${Q},w_500,h_340,c_fill,g_auto/v1781095106/wouter-naert-dwg12DlR2Mk-unsplash_zvvbi1.jpg`,
  `${CDN}/${Q},w_500,h_340,c_fill,g_auto/v1781095105/siby-QXIBCvvA_jc-unsplash_kqvkbb.jpg`,
  `${CDN}/${Q},w_500,h_340,c_fill,g_auto/v1781095105/subhadeep-dishant-Cs-hI1if4lU-unsplash_z0ul1j.jpg`,
  `${CDN}/${Q},w_500,h_340,c_fill,g_auto/v1781095104/subash-matheswaran-OFpmoFFc63c-unsplash_r1uudy.jpg`,
];

const CATEGORIES = ['Temples', 'Hill Stations', 'Beaches', 'Wildlife', 'Heritage', 'Festivals'];

const FEATURES = [
  { icon: Map,        title: 'Live Crowd Maps',      desc: 'Real-time density — always know the best time to visit.',  color: '#6CB6E4' },
  { icon: Zap,        title: 'Instant Queue Slots',  desc: 'Book timed entry for top attractions in seconds.',          color: '#EBA86B' },
  { icon: Navigation, title: 'AI Trip Planner',      desc: 'Budget + days → personalised itinerary in moments.',        color: '#4F8A65' },
  { icon: Camera,     title: 'Discover Hidden Gems', desc: 'Curated spots beyond the usual tourist trail.',             color: '#F2E3C6' },
];

const STATS = [
  { value: '5,000+', label: 'Destinations',     accent: '#6CB6E4' },
  { value: '2M+',    label: 'Happy Travellers', accent: '#EBA86B' },
  { value: '28',     label: 'States Covered',   accent: '#4F8A65' },
  { value: '4.8★',   label: 'Avg Rating',       accent: '#F2E3C6' },
];

/* ─── Framer Motion variants ───────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } },
};

/* ─── DestinationCard ──────────────────────────────────────────────────────── */
interface DestCardProps {
  src: string; name: string; location: string; category: string; href: string; wide: boolean; idx: number;
}

function DestinationCard({ src, name, location, category, href, wide, idx }: DestCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.55, delay: idx * 0.07 }}
      className={`relative overflow-hidden rounded-2xl group cursor-pointer ${wide ? 'md:col-span-2' : ''}`}
      style={{ aspectRatio: wide ? '16/9' : '3/4' }}
    >
      <Image
        src={src}
        fill
        sizes={wide ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 50vw, 33vw'}
        className="object-cover transition-transform duration-700 group-hover:scale-108 will-change-transform"
        alt={`${name} — ${location}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

      <div className="absolute top-4 left-4">
        <span className="rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-medium text-white">
          {category}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-xs font-medium text-[#EBA86B] uppercase tracking-widest mb-1 flex items-center gap-1">
          <MapPin className="w-3 h-3" aria-hidden="true" /> {location}
        </p>
        <h3 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-white leading-snug">
          {name}
        </h3>
        <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            href={href}
            className="flex items-center gap-1.5 text-sm text-white/90 hover:text-[#6CB6E4] transition-colors"
            aria-label={`Explore ${name}`}
          >
            Explore <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main component ───────────────────────────────────────────────────────── */
export function HomeClient() {
  const heroRef = useRef<HTMLElement>(null);
  const [query, setQuery] = useState('');

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgY      = useTransform(scrollYProgress, [0, 1], ['0%',  '25%']);
  const textY     = useTransform(scrollYProgress, [0, 1], ['0%',  '15%']);

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#1a3a4a]"
        aria-label="Hero — Explore India"
      >
        <div className="absolute inset-0 pointer-events-none motion-reduce:hidden" aria-hidden="true">
          <HeroBackground />
        </div>

        <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110 opacity-40">
          <Image src={HERO_IMG} fill priority quality={90} sizes="100vw" className="object-cover" alt="" />
        </motion.div>

        <div
          className="absolute inset-0 bg-gradient-to-br from-[#0F2027]/85 via-[#203A43]/65 to-[#0F2027]/55 pointer-events-none"
          aria-hidden="true"
        />

        {/* Bottom fade — seamless into dark stats */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0F2027] to-transparent pointer-events-none"
          aria-hidden="true"
        />

        <motion.div
          style={{ y: textY }}
          className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-24"
        >
          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-3xl">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-[#EBA86B]/40 bg-[#EBA86B]/10 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-[#EBA86B] mb-6"
            >
              <Compass className="w-3.5 h-3.5" aria-hidden="true" />
              5,000+ destinations across Incredible India
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-[family-name:var(--font-poppins)] text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.02] tracking-tight mb-6"
            >
              Discover the<br />
              <span className="text-[#6CB6E4] drop-shadow-[0_2px_32px_rgba(108,182,228,0.6)]">
                Soul of India
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-xl text-white/70 max-w-xl leading-relaxed mb-10"
            >
              Sacred temples, misty hill stations, golden deserts and turquoise coasts —
              all with live crowd info, instant bookings and AI-powered planning.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 max-w-2xl mb-8">
              <label htmlFor="hero-search" className="sr-only">Search destinations</label>
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" aria-hidden="true" />
                <input
                  id="hero-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Where do you want to go?"
                  className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#6CB6E4] focus:border-transparent text-base transition-all duration-200"
                />
              </div>
              <Button
                asChild
                className="h-14 px-8 rounded-2xl bg-[#4F8A65] hover:bg-[#4F8A65]/90 text-white font-semibold text-base border-0 shadow-lg shadow-[#4F8A65]/25 cursor-pointer transition-all duration-200 shrink-0"
                aria-label="Search destinations"
              >
                <Link href={query ? `/discover?q=${encodeURIComponent(query)}` : '/discover'}>
                  Explore Now
                </Link>
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-2" role="list" aria-label="Browse by category">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  href={`/discover?category=${encodeURIComponent(cat.toLowerCase())}`}
                  role="listitem"
                  className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 text-sm text-white/80 hover:bg-white/20 hover:border-[#6CB6E4]/50 hover:text-white transition-all duration-200 cursor-pointer"
                >
                  {cat}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/45 cursor-default"
          aria-hidden="true"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* ── STATS STRIP — DARK OCEAN ────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#1a3a4a] py-14 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {STATS.map(({ value, label, accent }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-2 pt-5 border-t-2 text-center"
              style={{ borderColor: accent }}
            >
              <span
                className="font-[family-name:var(--font-poppins)] text-3xl md:text-4xl font-extrabold"
                style={{ color: accent }}
              >
                {value}
              </span>
              <span className="text-sm font-medium text-white/45 uppercase tracking-wide">{label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── DESTINATIONS GRID ───────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0D1A14] via-[#0F1F18] to-[#091520] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-10 bg-[#EBA86B]" aria-hidden="true" />
                <span className="text-xs font-semibold text-[#EBA86B] uppercase tracking-widest">
                  Explore destinations
                </span>
              </div>
              <h2 className="font-[family-name:var(--font-poppins)] text-3xl md:text-5xl font-bold text-white leading-tight">
                Where will you<br className="hidden md:block" /> go next?
              </h2>
            </div>
            <Button
              asChild
              variant="outline"
              className="self-start md:self-auto border-white/25 text-white bg-transparent hover:bg-white/10 hover:border-white/40 rounded-full px-6 cursor-pointer transition-all duration-200"
              aria-label="View all destinations"
            >
              <Link href="/discover" className="flex items-center gap-2">
                View all <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>

          {/* Row 1 */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4"
          >
            {DESTINATIONS.slice(0, 2).map((d, i) => (
              <DestinationCard key={d.id} {...d} idx={i} />
            ))}
            <div className="hidden md:block row-span-2">
              <DestinationCard {...DESTINATIONS[4]} idx={4} />
            </div>
          </motion.div>

          {/* Row 2 */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4"
          >
            <div className="col-span-2">
              <DestinationCard {...DESTINATIONS[2]} idx={2} />
            </div>
            <div className="block md:hidden">
              <DestinationCard {...DESTINATIONS[4]} idx={4} />
            </div>
          </motion.div>

          {/* Row 3 */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            <div className="col-span-2">
              <DestinationCard {...DESTINATIONS[3]} idx={3} />
            </div>
            <DestinationCard {...DESTINATIONS[5]} idx={5} />
          </motion.div>
        </div>
      </section>

      {/* ── GALLERY STRIP — DARK IMMERSIVE ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#091520] py-16" aria-label="Photo gallery">
        <div className="text-center mb-12 px-4">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10 bg-[#6CB6E4]/60" aria-hidden="true" />
            <span className="text-xs font-semibold text-[#6CB6E4] uppercase tracking-widest">
              Through the lens
            </span>
            <div className="h-px w-10 bg-[#6CB6E4]/60" aria-hidden="true" />
          </div>
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl md:text-4xl font-bold text-white">
            India in every{' '}
            <span className="text-[#6CB6E4] drop-shadow-[0_2px_20px_rgba(108,182,228,0.5)]">frame</span>
          </h2>
        </div>

        <div className="relative overflow-hidden" aria-hidden="true">
          {/* Left edge fade */}
          <div className="absolute left-0 inset-y-0 w-28 bg-gradient-to-r from-[#091520] to-transparent z-10 pointer-events-none" />
          {/* Right edge fade */}
          <div className="absolute right-0 inset-y-0 w-28 bg-gradient-to-l from-[#091520] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-4 marquee-track w-max">
            {[...GALLERY_IMGS, ...GALLERY_IMGS].map((src, i) => (
              <div
                key={i}
                className="relative flex-none w-72 h-48 rounded-2xl overflow-hidden ring-1 ring-white/10 hover:ring-[#6CB6E4]/40 shadow-lg hover:shadow-[0_8px_32px_rgba(108,182,228,0.2)] transition-all duration-400"
              >
                <Image
                  src={src}
                  fill
                  sizes="288px"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES — DARK GLOWING CARDS ───────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#091520] via-[#0F2027] to-[#1a2a35] py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-10 bg-[#4F8A65]/60" aria-hidden="true" />
              <span className="text-xs font-semibold text-[#4F8A65] uppercase tracking-widest">
                Why TourIndia
              </span>
              <div className="h-px w-10 bg-[#4F8A65]/60" aria-hidden="true" />
            </div>
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl md:text-5xl font-bold text-white mb-4">
              Travel smarter,{' '}
              <span className="text-[#4F8A65] drop-shadow-[0_2px_20px_rgba(79,138,101,0.5)]">not harder</span>
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-base">
              Everything you need for a seamless Indian travel experience — all in one platform.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5"
          >
            {FEATURES.map(({ icon: Icon, title, desc, color }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="rounded-2xl p-7 border border-white/8 bg-white/4 backdrop-blur-sm hover:bg-white/8 hover:border-white/20 hover:-translate-y-2 transition-all duration-300 cursor-default group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${color}22`, boxShadow: `0 0 0 1px ${color}30` }}
                  aria-hidden="true"
                >
                  <Icon className="w-5 h-5 transition-colors duration-300" style={{ color }} aria-hidden="true" />
                </div>
                <h3 className="font-[family-name:var(--font-poppins)] text-base font-bold text-white mb-2 leading-snug">
                  {title}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed">{desc}</p>
                <div
                  className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA — DARK CINEMATIC ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-32 px-4 bg-[#0F2027]">
        {/* Scenic photo — vivid at 40% over dark base */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={`${CDN}/${Q},w_1600/v1781095105/siby-QXIBCvvA_jc-unsplash_kqvkbb.jpg`}
            fill
            sizes="100vw"
            className="object-cover opacity-40"
            alt=""
          />
        </div>
        {/* Dark gradient overlay — keep deep ocean feel */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#0F2027]/85 via-[#203A43]/65 to-[#0F2027]/80 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Dark glass card */}
            <div className="bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl px-8 py-14 shadow-2xl shadow-black/50">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#4F8A65]/35 bg-[#4F8A65]/12 px-4 py-1.5 text-xs font-medium text-[#4F8A65] mb-6">
                <Users className="w-3.5 h-3.5" aria-hidden="true" />
                Join 2M+ travellers already exploring India
              </span>
              <h2 className="font-[family-name:var(--font-poppins)] text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
                Your next adventure<br />
                <span className="text-[#6CB6E4] drop-shadow-[0_2px_24px_rgba(108,182,228,0.5)]">starts here</span>
              </h2>
              <p className="text-white/55 mb-10 max-w-md mx-auto leading-relaxed">
                Create a free account and unlock personalised recommendations, AI trip planning,
                and live crowd alerts for every destination.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  asChild
                  className="h-13 px-8 rounded-full bg-[#4F8A65] hover:bg-[#4F8A65]/90 text-white font-semibold border-0 shadow-lg shadow-[#4F8A65]/30 cursor-pointer transition-all duration-200"
                  aria-label="Get started for free"
                >
                  <Link href="/register">Get started — it&apos;s free</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-13 px-8 rounded-full border-white/25 text-white bg-transparent hover:bg-white/10 hover:border-white/40 cursor-pointer transition-all duration-200"
                  aria-label="Explore destinations without signing up"
                >
                  <Link href="/discover">Browse destinations</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
