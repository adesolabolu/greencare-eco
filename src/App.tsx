import React, { useState } from 'react';
import {
  Sun,
  ArrowUpRight,
  ArrowRight,
  Zap,
  Wind,
  Menu,
  X,
  Plus,
  CheckCircle2,
  MapPin,
  BatteryCharging,
  ShieldCheck,
} from 'lucide-react';
import { SafeImage } from './components/SafeImage';
import {
  DIRECTION_PROFILES,
  InitiativeItem,
  ProblemCardItem,
} from './data/greencareData';
import {
  InitiativeModal,
  ProblemModal,
  ContactModal,
} from './components/ActionModals';

const ROLLOUT_PRICING: Record<
  string,
  { monthlyRate: string; hardwareSpec: string; dieselSaved: string }
> = {
  'sme-10kva': {
    monthlyRate: 'From ₦165k / mo',
    hardwareSpec: '10kVA Hybrid · 15kWh LiFePO4 · 12x 550W Panels',
    dieselSaved: 'Saves ~₦380k/mo on fuel',
  },
  'estate-minigrid': {
    monthlyRate: '₦210 / kWh Tariff',
    hardwareSpec: '250kVA–1MW Central Plant · Smart Prepaid Meters',
    dieselSaved: 'Eliminates 10 PM gen curfew',
  },
  'coldchain-hub': {
    monthlyRate: '₦1,500 / crate-day',
    hardwareSpec: '30kVA Three-Phase · Sub-Zero Solar Compressor Array',
    dieselSaved: '40% cheaper than diesel gen',
  },
  'clinic-campus': {
    monthlyRate: '24-Mo Institutional Lease',
    hardwareSpec: '50kVA Medical-Grade Isolation · 60kWh LFP Bank',
    dieselSaved: 'Zero surgery or lab blackouts',
  },
};

export default function App() {
  const profile = DIRECTION_PROFILES.solar;

  // Navigation & Mobile Menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hero Interactive State
  const [heroEmail, setHeroEmail] = useState('');
  const [heroSubscribed, setHeroSubscribed] = useState(false);
  const [heroEmailError, setHeroEmailError] = useState('');
  const [activeHotspotId, setActiveHotspotId] = useState<string>(
    profile.hero.hotspots[0].id
  );
  const [heroCardMode, setHeroCardMode] = useState<'D' | 'B'>('D');

  // Mission Pillars Interactive State
  const [selectedPillarId, setSelectedPillarId] = useState<string | null>(null);

  // Solar Rollouts & Bundles Interactive State
  const [initiativeFilter, setInitiativeFilter] = useState<string>('All');
  const [selectedInitiative, setSelectedInitiative] =
    useState<InitiativeItem | null>(null);
  const [joinedInitiativeIds, setJoinedInitiativeIds] = useState<string[]>([]);
  const [participantBoosts, setParticipantBoosts] = useState<
    Record<string, number>
  >({});

  // Problems Modal State
  const [selectedProblem, setSelectedProblem] =
    useState<ProblemCardItem | null>(null);

  // Live Impact Counter Deltas
  const [stat1Delta, setStat1Delta] = useState<number>(0);
  const [stat2Delta, setStat2Delta] = useState<number>(0);
  const [activeSimulatedKva, setActiveSimulatedKva] = useState<number | null>(
    null
  );

  const [recentPledgeBanner, setRecentPledgeBanner] = useState<string | null>(
    null
  );

  // FAQ Accordion State
  const [openFaqId, setOpenFaqId] = useState<string | null>(
    profile.faqSection.items[0]?.id || null
  );

  // Footer Newsletter State
  const [footerEmail, setFooterEmail] = useState('');
  const [footerSubscribed, setFooterSubscribed] = useState(false);
  const [footerError, setFooterError] = useState('');

  // Contact Modal State
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactInitialTopic, setContactInitialTopic] = useState<string>(
    profile.footer.contactTopics[0]
  );

  const activeHotspot =
    profile.hero.hotspots.find((h) => h.id === activeHotspotId) ||
    profile.hero.hotspots[0];

  const selectedPillar =
    profile.mission.pillars.find((p) => p.id === selectedPillarId) || null;

  const currentRows = profile.initiativesSection.rows.map((r) => ({
    ...r,
    participants: r.participants + (participantBoosts[r.id] || 0),
  }));

  const filteredInitiatives =
    initiativeFilter === 'All'
      ? currentRows
      : currentRows.filter((item) => item.category === initiativeFilter);

  const handleHeroSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroEmail.trim() || !heroEmail.includes('@')) {
      setHeroEmailError('Please enter a valid work email address.');
      return;
    }
    setHeroEmailError('');
    setHeroSubscribed(true);
    setHeroEmail('');
  };

  const handleFooterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail.trim() || !footerEmail.includes('@')) {
      setFooterError('Please enter a valid email address.');
      return;
    }
    setFooterError('');
    setFooterSubscribed(true);
    setFooterEmail('');
  };

  const handleJoinInitiative = (id: string, unitsPledged: number) => {
    if (!joinedInitiativeIds.includes(id)) {
      setJoinedInitiativeIds((prev) => [...prev, id]);
      setParticipantBoosts((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) + 1,
      }));
    }
    setStat1Delta((prev) => prev + unitsPledged);
    setRecentPledgeBanner(
      `Confirmed installation slot + reserved ${unitsPledged} ${profile.initiativesSection.pledgeUnit} (${profile.initiativesSection.actionUnitLabel})!`
    );
  };

  const handleSupportProblem = (problemTitle: string, amount: number) => {
    setStat2Delta((prev) => prev + amount);
    setStat1Delta((prev) => prev + 5);
    setRecentPledgeBanner(
      `Committed ₦${amount.toLocaleString()} directly toward solving ${problemTitle}.`
    );
  };

  const handleQuickSimulator = (unitCount: number) => {
    setActiveSimulatedKva(unitCount);
    setStat1Delta((prev) => prev + unitCount);
    setStat2Delta((prev) => prev + unitCount * 450000);
    setRecentPledgeBanner(
      `Simulated +${unitCount} ${profile.impactSection.simulatorUnit} added to the ${profile.brandName} 2026 rollout!`
    );
  };

  const openContactWithTopic = (topic: string) => {
    setContactInitialTopic(topic);
    setContactModalOpen(true);
    setMobileMenuOpen(false);
  };

  const totalStat1 = profile.impactSection.stat1Initial + stat1Delta;
  const totalStat2 = profile.impactSection.stat2Initial + stat2Delta;

  const formatImpactFunds = (val: number, currency: '₦' | '$') => {
    if (val >= 1000000000) {
      return `${currency}${(val / 1000000000).toFixed(2)}B`;
    }
    if (val >= 1000000) {
      return `${currency}${(val / 1000000).toFixed(2)}M`;
    }
    return `${currency}${val.toLocaleString()}`;
  };

  return (
    <div className="bg-white min-h-screen font-sans text-text-primary selection:bg-brand-lime selection:text-black">
      {/* Top Bar Contract: 1-row, 3-zone header (Brand | 5 Nav Links | 1 Primary CTA) */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between gap-8 px-6 py-4 max-w-7xl mx-auto w-full">
          {/* Zone 1: Single brand wordmark */}
          <a
            href="#top"
            className="flex items-center gap-2 font-bold text-xl tracking-tight text-gray-900 whitespace-nowrap shrink-0"
          >
            <Sun className="w-6 h-6 text-gray-900 shrink-0" />
            <span>{profile.brandName}</span>
          </a>

          {/* Zone 2: 5 concise single-line text links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600"
          >
            <a
              href="#top"
              className="text-gray-900 font-semibold hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              Home
            </a>
            <a
              href="#mission"
              className="hover:text-gray-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {profile.navLinks.mission}
            </a>
            <a
              href="#initiatives"
              className="hover:text-gray-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {profile.navLinks.initiatives}
            </a>
            <a
              href="#problems"
              className="hover:text-gray-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {profile.navLinks.problems}
            </a>
            <a
              href="#impact"
              className="hover:text-gray-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {profile.navLinks.impact}
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() =>
                openContactWithTopic(profile.footer.contactTopics[0])
              }
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-brand-lime hover:text-gray-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {profile.navLinks.cta}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              aria-label="Toggle Menu"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-full text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 shadow-lg py-4 px-6 flex flex-col gap-3">
            <a
              href="#top"
              onClick={() => setMobileMenuOpen(false)}
              className="font-medium text-gray-900 py-1"
            >
              Home
            </a>
            <a
              href="#mission"
              onClick={() => setMobileMenuOpen(false)}
              className="font-medium text-gray-600 hover:text-gray-900 py-1"
            >
              {profile.navLinks.mission}
            </a>
            <a
              href="#initiatives"
              onClick={() => setMobileMenuOpen(false)}
              className="font-medium text-gray-600 hover:text-gray-900 py-1"
            >
              {profile.navLinks.initiatives}
            </a>
            <a
              href="#problems"
              onClick={() => setMobileMenuOpen(false)}
              className="font-medium text-gray-600 hover:text-gray-900 py-1"
            >
              {profile.navLinks.problems}
            </a>
            <a
              href="#impact"
              onClick={() => setMobileMenuOpen(false)}
              className="font-medium text-gray-600 hover:text-gray-900 py-1"
            >
              {profile.navLinks.impact}
            </a>
            <button
              type="button"
              onClick={() =>
                openContactWithTopic(profile.footer.contactTopics[0])
              }
              className="w-full text-center px-5 py-2.5 rounded-full bg-brand-lime text-gray-900 font-semibold mt-1 cursor-pointer"
            >
              {profile.navLinks.cta}
            </button>
          </div>
        )}
      </header>

      <main id="top">
        {/* Hero Split Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Card - Lime Green */}
          <div className="lg:col-span-5 bg-brand-lime rounded-[40px] p-6 sm:p-10 flex flex-col justify-between min-h-[500px] lg:h-[580px] relative overflow-hidden">
            {/* Decorative branding top right */}
            <div className="flex items-center justify-end gap-2 text-xs font-semibold opacity-80 text-gray-900">
              <Sun className="w-4 h-4 text-gray-900" />
              <span>{profile.brandGroupLabel}</span>
            </div>

            <div className="my-auto py-6">
              <h1 className="text-4xl sm:text-5xl font-medium leading-[1.12] tracking-tight text-gray-900 text-balance">
                {profile.hero.line1Prefix}{' '}
                <a
                  href="#initiatives"
                  aria-label="Explore active solar deployments"
                  className="inline-flex items-center justify-center border-2 border-gray-900 rounded-full p-1.5 mx-1 align-middle hover:bg-gray-900 hover:text-brand-lime transition-colors"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </a>{' '}
                {profile.hero.line1Suffix} <br />
                {profile.hero.line2Prefix}{' '}
                <span className="underline decoration-2 decoration-gray-900 underline-offset-4">
                  {profile.hero.line2Underline}
                </span>
                <br />
                {profile.hero.line3}
              </h1>
            </div>

            <div className="space-y-4">
              {heroSubscribed ? (
                <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-3.5 px-5 flex items-center justify-between max-w-md border border-white">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Added to {profile.brandName} Audit Queue!</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHeroSubscribed(false)}
                    className="text-xs text-gray-600 underline hover:text-gray-900 ml-2 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Reset
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleHeroSubscribe}
                  className="space-y-1.5 max-w-md"
                >
                  <div className="bg-white/55 backdrop-blur-sm rounded-full p-1.5 pl-5 flex items-center justify-between focus-within:bg-white/80 transition-colors">
                    <input
                      type="email"
                      value={heroEmail}
                      onChange={(e) => setHeroEmail(e.target.value)}
                      placeholder={profile.hero.inputPlaceholder}
                      aria-label={profile.hero.inputPlaceholder}
                      className="bg-transparent border-none outline-none text-sm placeholder-gray-700 w-full text-gray-900 pr-2"
                    />
                    <button
                      type="submit"
                      className="bg-gray-900 text-white hover:bg-gray-800 px-6 py-2.5 rounded-full text-sm font-bold shadow-sm transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>{profile.hero.ctaButton}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  {heroEmailError && (
                    <p className="text-xs text-red-800 font-medium pl-4">
                      {heroEmailError}
                    </p>
                  )}
                </form>
              )}

              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <SafeImage
                    src={profile.hero.badgeAvatar}
                    alt="Field Lead"
                    fallbackTheme="avatar1"
                    className="w-10 h-10 rounded-full border-2 border-brand-lime object-cover"
                  />
                  <SafeImage
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Operations Partner"
                    fallbackTheme="avatar2"
                    className="w-10 h-10 rounded-full border-2 border-brand-lime object-cover"
                  />
                  <SafeImage
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Regional Coordinator"
                    fallbackTheme="avatar3"
                    className="w-10 h-10 rounded-full border-2 border-brand-lime object-cover"
                  />
                </div>
                <p className="text-xs font-medium text-gray-800 max-w-[185px] leading-tight">
                  <span className="font-mono font-bold tabular-nums">
                    {profile.hero.memberStat}
                  </span>{' '}
                  {profile.hero.memberLabel}
                </p>
              </div>
            </div>
          </div>

          {/* Right Card - Hero Visual with Interactive Map Hotspots */}
          <div className="lg:col-span-7 bg-gray-100 rounded-[40px] relative overflow-hidden min-h-[500px] lg:h-[580px] group">
            <SafeImage
              src={profile.hero.heroImage}
              alt={profile.brandName}
              fallbackTheme={profile.hero.heroFallback}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 pointer-events-none" />

            {/* Top-left Team Badge (Interactive Button) */}
            <button
              type="button"
              onClick={() =>
                openContactWithTopic(profile.footer.contactTopics[0])
              }
              className="absolute top-6 left-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg flex items-center gap-3 max-w-xs hover:scale-[1.02] transition-transform text-left cursor-pointer"
            >
              <SafeImage
                src={profile.hero.badgeAvatar}
                fallbackTheme="avatar4"
                className="w-10 h-10 rounded-xl object-cover shrink-0"
                alt={profile.hero.badgeTopSubtitle}
              />
              <div className="pr-2">
                <p className="text-xs font-bold text-gray-900 whitespace-nowrap">
                  {profile.hero.badgeTopTitle}
                </p>
                <p className="text-[11px] text-gray-500 tracking-wide whitespace-nowrap">
                  {profile.hero.badgeTopSubtitle}
                </p>
              </div>
              <div className="ml-auto bg-brand-lime w-8 h-8 rounded-full flex items-center justify-center text-gray-900 shrink-0">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </button>

            {/* Top-right Cycle Hotspot Button */}
            <button
              type="button"
              onClick={() => {
                const nextSpot =
                  profile.hero.hotspots.find((h) => h.id !== activeHotspot.id) ||
                  profile.hero.hotspots[0];
                setActiveHotspotId(nextSpot.id);
              }}
              title="Switch active regional hub"
              className="absolute top-6 right-6 w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur rounded-full flex items-center justify-center text-white transition-colors cursor-pointer border border-white/20"
            >
              <Zap className="w-5 h-5 text-brand-lime" />
            </button>

            {/* Floating Map Hotspot Markers */}
            {profile.hero.hotspots.map((spot, idx) => {
              const isSelected = spot.id === activeHotspot.id;
              return (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() => setActiveHotspotId(spot.id)}
                  className={`absolute ${spot.positionClass} px-3.5 py-1.5 rounded-full text-xs font-bold shadow-lg transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                    spot.variant === 'lime'
                      ? 'bg-[#D9F99D] text-gray-900'
                      : 'bg-white text-gray-900'
                  } ${
                    isSelected
                      ? 'ring-2 ring-gray-900 scale-105'
                      : 'opacity-90 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  {idx === 0 ? (
                    <Zap className="w-3.5 h-3.5 text-gray-900 shrink-0" />
                  ) : (
                    <Wind className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                  )}
                  <span>{spot.label}</span>
                </button>
              );
            })}

            {/* Bottom-Right Interactive Field Report Card */}
            <div className="absolute bottom-6 left-6 sm:left-auto sm:right-6 bg-white p-4 sm:p-5 rounded-3xl shadow-xl max-w-xs w-auto">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex -space-x-2 items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-900 text-brand-lime border-2 border-white flex items-center justify-center text-[10px] font-bold">
                    {profile.hero.bottomCardCode}
                  </div>
                  <SafeImage
                    src={profile.hero.badgeAvatar}
                    fallbackTheme="avatar2"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    alt="Field Lead"
                  />
                  <span className="pl-3 text-[11px] font-semibold text-gray-700 truncate max-w-[130px]">
                    {activeHotspot.region}
                  </span>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setHeroCardMode('D')}
                    title="View Field Metrics"
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors cursor-pointer ${
                      heroCardMode === 'D'
                        ? 'bg-brand-lime text-gray-900 border border-brand-lime'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    D
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroCardMode('B')}
                    title="View Mission Brief"
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors cursor-pointer ${
                      heroCardMode === 'B'
                        ? 'bg-[#111827] text-white border border-[#111827]'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    B
                  </button>
                </div>
              </div>

              {heroCardMode === 'D' ? (
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[11px] font-medium text-gray-500">
                      {activeHotspot.metricLabel}
                    </span>
                    <span className="text-sm font-bold text-gray-900 font-mono tabular-nums">
                      {activeHotspot.metricValue}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {activeHotspot.summary}
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {profile.hero.bottomCardBrief} Operating at{' '}
                    <span className="font-mono text-[11px] text-gray-900">
                      {activeHotspot.coordinates}
                    </span>{' '}
                    with{' '}
                    <span className="font-semibold text-gray-900 font-mono tabular-nums">
                      {activeHotspot.volunteersActive}
                    </span>{' '}
                    {activeHotspot.volunteerUnitLabel}.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Live Feedback Banner when user pledges or books */}
        {recentPledgeBanner && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-2">
            <div className="bg-brand-lime/60 border border-brand-lime rounded-2xl px-5 py-3.5 flex items-center justify-between text-xs sm:text-sm text-gray-900 shadow-sm">
              <div className="flex items-center gap-2.5 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-gray-900 shrink-0" />
                <span>{recentPledgeBanner}</span>
              </div>
              <button
                type="button"
                onClick={() => setRecentPledgeBanner(null)}
                className="text-xs font-bold text-gray-700 hover:text-gray-900 cursor-pointer ml-4"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Mission Section */}
        <section
          id="mission"
          className="py-20 px-4 text-center max-w-4xl mx-auto relative"
        >
          <div>
            <SafeImage
              src={profile.mission.decoImageLeft}
              fallbackTheme="ocean"
              className="absolute top-6 left-4 lg:left-[-80px] w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg hidden md:block"
              alt="Lagos rooftop solar array"
            />
            <SafeImage
              src={profile.mission.decoImageRight}
              fallbackTheme="forest"
              className="absolute bottom-10 right-4 lg:right-[-60px] w-12 h-12 rounded-full object-cover border-4 border-white shadow-lg hidden md:block"
              alt="Commercial battery storage"
            />

            <h2 className="text-3xl md:text-5xl font-medium text-gray-900 mb-6 tracking-tight text-balance">
              {profile.mission.headingLine1}
              <br />
              {profile.mission.headingLine2}
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed text-base">
              {profile.mission.subheading}
            </p>

            <div className="flex items-center justify-center gap-4">
              <a
                href="#initiatives"
                className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors shadow-sm inline-flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <span>{profile.mission.primaryBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() =>
                  setSelectedPillarId((prev) => (prev ? null : 'we'))
                }
                className="px-6 py-3 rounded-full border border-gray-200 text-sm font-semibold text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {selectedPillarId
                  ? 'Hide Breakdown'
                  : profile.mission.secondaryBtn}
              </button>
            </div>
          </div>
        </section>

        {/* 4-Tile Interactive Visual Strip */}
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-32 md:h-40">
            <button
              type="button"
              onClick={() =>
                setSelectedPillarId(selectedPillarId === 'we' ? null : 'we')
              }
              className={`bg-neutral-surface border border-gray-200/70 rounded-[32px] flex items-center justify-center text-2xl font-medium shadow-sm hover:shadow-md transition-all text-gray-900 cursor-pointer ${
                selectedPillarId === 'we' ? 'ring-2 ring-gray-900' : ''
              }`}
            >
              {profile.mission.stripWords[0]}
            </button>

            <button
              type="button"
              onClick={() =>
                setSelectedPillarId(
                  selectedPillarId === 'protect' ? null : 'protect'
                )
              }
              className={`relative rounded-[32px] overflow-hidden flex items-center justify-center group cursor-pointer ${
                selectedPillarId === 'protect' ? 'ring-2 ring-gray-900' : ''
              }`}
            >
              <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30 transition-colors z-10" />
              <SafeImage
                src={profile.mission.stripImage2}
                fallbackTheme="glacier"
                className="absolute inset-0 w-full h-full object-cover"
                alt={profile.mission.stripWords[1]}
              />
              <span className="relative z-20 text-white text-2xl font-medium">
                {profile.mission.stripWords[1]}
              </span>
            </button>

            <button
              type="button"
              aria-label="Explore our field execution methodology"
              onClick={() =>
                setSelectedPillarId(
                  selectedPillarId === 'action' ? null : 'action'
                )
              }
              className={`bg-brand-lime rounded-[32px] flex items-center justify-center shadow-sm hover:shadow-md transition-all cursor-pointer group ${
                selectedPillarId === 'action' ? 'ring-2 ring-gray-900' : ''
              }`}
            >
              <ArrowRight className="text-gray-900 w-12 h-12 group-hover:translate-x-2 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() =>
                setSelectedPillarId(
                  selectedPillarId === 'nature' ? null : 'nature'
                )
              }
              className={`relative rounded-[32px] overflow-hidden flex items-center justify-center group cursor-pointer ${
                selectedPillarId === 'nature' ? 'ring-2 ring-gray-900' : ''
              }`}
            >
              <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30 transition-colors z-10" />
              <SafeImage
                src={profile.mission.stripImage4}
                fallbackTheme="forest"
                className="absolute inset-0 w-full h-full object-cover"
                alt={profile.mission.stripWords[2]}
              />
              <span className="relative z-20 text-white text-2xl font-medium">
                {profile.mission.stripWords[2]}
              </span>
            </button>
          </div>

          {/* Expandable Pillar Detail Panel */}
          {selectedPillar && (
            <div className="mt-4 bg-neutral-surface border border-gray-200 rounded-[28px] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <span>{selectedPillar.subtitle}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-gray-900 font-semibold font-mono tabular-nums">
                    {selectedPillar.metric}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedPillar.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {selectedPillar.description}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {profile.mission.pillars.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPillarId(p.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      p.id === selectedPillar.id
                        ? 'bg-gray-900 text-white'
                        : 'bg-white border border-gray-200 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {p.word}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Redesigned High-Impact Solar Rollouts & Bundles Section */}
        <section
          id="initiatives"
          className="max-w-7xl mx-auto px-4 pb-24 relative"
        >
          <div className="bg-neutral-surface border border-gray-200/80 rounded-[40px] p-6 sm:p-10 lg:p-12">
            {/* Section Header & Filter Tabs */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 pb-8 border-b border-gray-200">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                  <BatteryCharging className="w-4 h-4 text-gray-900" />
                  <span>2026 Pay-Small-Small &amp; Commercial Mini-Grid Packages</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-semibold tracking-tight text-gray-900">
                  {profile.initiativesSection.heading}
                </h3>
                <p className="text-sm text-gray-600 max-w-xl">
                  {profile.initiativesSection.subheading}
                </p>
              </div>

              {/* Interactive Category Filter Controls */}
              <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-gray-200 shadow-2xs self-start lg:self-auto">
                {profile.initiativesSection.categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setInitiativeFilter(cat)}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      initiativeFilter === cat
                        ? 'bg-gray-900 text-brand-lime shadow-xs'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Structured Deployment Rows */}
            <div className="divide-y divide-gray-200/80">
              {filteredInitiatives.map((row, index) => {
                const isJoined = joinedInitiativeIds.includes(row.id);
                const pricingMeta = ROLLOUT_PRICING[row.id] || {
                  monthlyRate: 'Custom Lease',
                  hardwareSpec: row.tags.join(' · '),
                  dieselSaved: 'Verified uptime',
                };

                return (
                  <div
                    key={row.id}
                    onClick={() => setSelectedInitiative(row)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedInitiative(row);
                      }
                    }}
                    className="group py-6 sm:py-7 first:pt-7 last:pb-2 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center hover:bg-white rounded-3xl px-4 -mx-4 transition-all cursor-pointer"
                  >
                    {/* Col 1–5: Index + Visual Thumbnail + Package Title + Cities */}
                    <div className="lg:col-span-5 flex items-center gap-4">
                      <span className="hidden sm:inline-block text-xs font-mono font-semibold text-gray-400 tabular-nums w-6 shrink-0">
                        0{index + 1}
                      </span>
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-gray-200 bg-gray-900">
                        <SafeImage
                          src={row.image}
                          fallbackTheme={row.fallbackTheme}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          alt={row.title}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-lg text-gray-900 group-hover:text-black">
                            {row.title}
                          </h4>
                          {isJoined && (
                            <span className="text-xs font-semibold text-emerald-700 whitespace-nowrap shrink-0">
                              · Slot Booked
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-1 truncate">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="truncate">{row.location}</span>
                        </p>
                      </div>
                    </div>

                    {/* Col 6–9: Hardware Specs & Proof Metrics */}
                    <div className="lg:col-span-4 space-y-1">
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">
                        {pricingMeta.hardwareSpec}
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                        <span className="font-mono font-semibold text-gray-700 tabular-nums">
                          {row.participants.toLocaleString()} {row.participantUnit}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="text-emerald-800 font-medium">
                          {pricingMeta.dieselSaved}
                        </span>
                      </div>
                    </div>

                    {/* Col 10–12: Lease Rate, Batch Date & Interactive CTA */}
                    <div className="lg:col-span-3 flex items-center justify-between lg:justify-end gap-4 pt-2 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                      <div className="lg:text-right">
                        <p className="text-sm font-bold text-gray-900 font-mono tabular-nums">
                          {pricingMeta.monthlyRate}
                        </p>
                        <p className="text-xs text-gray-500 font-mono tabular-nums">
                          Next batch: {row.date}
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-900 group-hover:bg-brand-lime group-hover:border-brand-lime transition-colors whitespace-nowrap shrink-0 shadow-2xs">
                        <span>Book Slot</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Trust Bar inside Rollout Card */}
            <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gray-900 shrink-0" />
                <span>
                  All packages include COREN-certified installation, 5-year
                  inverter &amp; LFP battery warranty, and 48-hour Lagos/Abuja
                  dispatch.
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  openContactWithTopic(profile.footer.contactTopics[0])
                }
                className="font-bold text-gray-900 underline underline-offset-4 hover:opacity-75 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Need a custom load calculation? Request Site Audit →
              </button>
            </div>
          </div>
        </section>

        {/* Fixed High-Contrast 4 Problem Cards Grid */}
        <section id="problems" className="max-w-7xl mx-auto px-4 pb-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">
                Why 14,500+ Nigerian Businesses Switched to SunGrid
              </p>
              <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
                The 4 Power Bottlenecks We Eliminate
              </h3>
            </div>
            <p className="text-xs text-gray-500">
              Click any card to view our technical engineering solution
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {profile.problemsSection.cards.map((card) => (
              <div
                key={card.id}
                onClick={() => setSelectedProblem(card)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProblem(card);
                  }
                }}
                className="relative h-[430px] rounded-[32px] overflow-hidden group cursor-pointer shadow-md border border-gray-900/10"
              >
                <SafeImage
                  src={card.image}
                  fallbackTheme={card.fallbackTheme}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt={card.title}
                />
                {/* Deep multi-stop dark scrim at top and bottom so white text has >7:1 contrast on all backgrounds */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/35 to-gray-950/95" />

                {/* Top Header Row: Crisp Pure White Kicker (No low-contrast yellow text on bright backgrounds) */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between gap-2">
                  <div className="text-xs font-semibold text-white tracking-wide drop-shadow-xs truncate">
                    <span>{card.kicker}</span>
                    {card.secondaryTag && (
                      <>
                        <span aria-hidden="true" className="mx-1.5 text-white/60">
                          ·
                        </span>
                        <span className="text-white/90 font-normal">
                          {card.secondaryTag}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="w-9 h-9 bg-black/45 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/25 group-hover:bg-brand-lime group-hover:text-gray-900 group-hover:border-brand-lime transition-colors shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Content Stack: High-contrast White Stat + Title + Action Button */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-end">
                  <div className="border-b border-white/20 pb-3 mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-white font-mono tabular-nums tracking-tight">
                        {card.statValue}
                      </span>
                      <span className="text-xs font-medium text-brand-lime">
                        verified metric
                      </span>
                    </div>
                    <p className="text-xs font-medium text-white/90 mt-0.5 leading-snug">
                      {card.statUnit}
                    </p>
                  </div>

                  <h4 className="text-2xl text-white font-semibold mb-4 leading-tight">
                    {card.title}
                  </h4>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProblem(card);
                    }}
                    className="w-full bg-white/15 backdrop-blur-md border border-white/30 text-white py-3 rounded-full text-xs font-bold group-hover:bg-brand-lime group-hover:text-gray-900 group-hover:border-brand-lime transition-all flex items-center justify-between px-6 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>{profile.problemsSection.buttonLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Impact in Numbers Section */}
        <section id="impact" className="max-w-7xl mx-auto px-4 pb-24">
          <div className="bg-[#111827] rounded-[40px] p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            {/* Subtle Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-lime opacity-5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
              <div className="lg:col-span-3">
                <h3 className="text-3xl font-semibold text-white mb-3 tracking-tight">
                  {profile.impactSection.headingLine1}
                  <br />
                  {profile.impactSection.headingLine2}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {profile.impactSection.description}
                </p>
              </div>

              <div className="lg:col-span-3 lg:border-l lg:border-white/10 lg:pl-8 flex flex-col">
                <span className="text-5xl xl:text-6xl font-bold text-brand-lime mb-2 font-mono tabular-nums tracking-tight">
                  {(totalStat1 / 1000).toFixed(1)}
                  {profile.impactSection.stat1Suffix}
                </span>
                <span className="text-white font-semibold text-lg">
                  {profile.impactSection.stat1Label}
                </span>
                <span className="text-xs text-gray-400 mt-1 font-mono tabular-nums">
                  {totalStat1.toLocaleString()} {profile.impactSection.stat1Sub}
                </span>
              </div>

              <div className="lg:col-span-3 lg:border-l lg:border-white/10 lg:pl-8 flex flex-col">
                <span className="text-5xl xl:text-6xl font-bold text-brand-lime mb-2 font-mono tabular-nums tracking-tight">
                  {formatImpactFunds(
                    totalStat2,
                    profile.impactSection.stat2Currency
                  )}
                </span>
                <span className="text-white font-semibold text-lg">
                  {profile.impactSection.stat2Label}
                </span>
                <span className="text-xs text-gray-400 mt-1">
                  {profile.impactSection.stat2Sub}
                </span>
              </div>

              <div className="lg:col-span-3 lg:border-l lg:border-white/10 lg:pl-8 flex flex-col">
                <span className="text-5xl xl:text-6xl font-bold text-brand-lime mb-2 font-mono tabular-nums tracking-tight">
                  {profile.impactSection.stat3Value}
                </span>
                <span className="text-white font-semibold text-lg">
                  {profile.impactSection.stat3Label}
                </span>
                <span className="text-xs text-gray-400 mt-1">
                  {profile.impactSection.stat3Sub}
                </span>
              </div>
            </div>

            {/* Interactive Capacity / Impact Simulator Bar */}
            <div className="relative z-10 mt-12 pt-8 border-t border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-left">
                <div className="w-9 h-9 rounded-full bg-brand-lime/15 flex items-center justify-center text-brand-lime shrink-0">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {profile.impactSection.simulatorPrompt}
                  </p>
                  <p className="text-xs text-gray-400">
                    Click a system size below to preview cumulative grid &amp;
                    diesel savings impact
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                {profile.impactSection.simulatorOptions.map((count) => {
                  const isLastClicked = activeSimulatedKva === count;
                  return (
                    <button
                      key={count}
                      type="button"
                      onClick={() => handleQuickSimulator(count)}
                      className={`px-4 py-2.5 rounded-full text-xs font-bold font-mono tabular-nums transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        isLastClicked
                          ? 'bg-brand-lime text-gray-900 shadow-sm'
                          : 'bg-white/10 hover:bg-brand-lime text-white hover:text-gray-900 border border-white/10'
                      }`}
                    >
                      +{count} {profile.impactSection.simulatorUnit}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto px-4 pb-24" id="faq">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
              {profile.faqSection.heading}
            </h2>
            <p className="text-gray-500">{profile.faqSection.subheading}</p>
          </div>

          <div className="space-y-4">
            {profile.faqSection.items.map((item) => {
              const isOpen = openFaqId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-neutral-surface rounded-[24px] p-1 transition-all border border-gray-100"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaqId((prev) => (prev === item.id ? null : item.id))
                    }
                    aria-expanded={isOpen}
                    className="w-full flex justify-between items-center p-5 text-left cursor-pointer text-lg font-medium text-gray-900 group"
                  >
                    <span>{item.question}</span>
                    <span
                      className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-900 transition-transform duration-200 shrink-0 group-hover:bg-brand-lime ${
                        isOpen ? 'rotate-45 bg-brand-lime' : ''
                      }`}
                    >
                      <Plus className="w-5 h-5" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-6 text-gray-600 leading-relaxed text-sm sm:text-base">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-neutral-surface rounded-[40px] p-8 md:p-16 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
            <span className="text-xs font-medium text-gray-500 tracking-wide">
              {profile.footer.tag}
            </span>

            <div className="flex-1 w-full md:max-w-2xl md:ml-auto">
              <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-6 max-w-lg md:ml-auto md:text-right text-balance">
                {profile.footer.subscribeHeading}
              </h3>

              {footerSubscribed ? (
                <div className="flex items-center justify-end gap-2 text-sm font-semibold text-emerald-800 py-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    Subscribed to the {profile.brandName} monthly brief!
                  </span>
                </div>
              ) : (
                <form onSubmit={handleFooterSubscribe}>
                  <div className="flex items-center gap-2 border-b border-gray-300 pb-2 focus-within:border-gray-900 transition-colors">
                    <input
                      type="email"
                      value={footerEmail}
                      onChange={(e) => setFooterEmail(e.target.value)}
                      placeholder="Email address"
                      aria-label="Email address for newsletter"
                      className="flex-1 bg-transparent outline-none text-sm py-2 text-gray-900"
                    />
                    <button
                      type="submit"
                      className="text-xs font-bold tracking-wider flex items-center gap-2 hover:opacity-70 text-gray-900 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>Subscribe</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {footerError && (
                    <p className="text-xs text-red-600 mt-1.5">{footerError}</p>
                  )}
                </form>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 border-t border-gray-200 pt-8 gap-4">
            <p>{profile.footer.copyright}</p>
            <a
              href="#top"
              className="flex items-center gap-2 font-bold text-gray-900"
            >
              <Sun className="w-4 h-4 text-gray-900" />
              <span>{profile.brandName}</span>
            </a>
            <div className="flex flex-wrap justify-center gap-6">
              {profile.footer.contactTopics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => openContactWithTopic(topic)}
                  className="hover:text-gray-900 transition-colors cursor-pointer"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <InitiativeModal
        initiative={selectedInitiative}
        isJoined={
          selectedInitiative
            ? joinedInitiativeIds.includes(selectedInitiative.id)
            : false
        }
        pledgeOptions={profile.initiativesSection.pledgeOptions}
        pledgeUnit={profile.initiativesSection.pledgeUnit}
        onClose={() => setSelectedInitiative(null)}
        onJoinInitiative={handleJoinInitiative}
      />

      <ProblemModal
        problem={selectedProblem}
        currency={profile.problemsSection.allocationCurrency}
        amounts={profile.problemsSection.allocationAmounts}
        brandName={profile.brandName}
        onClose={() => setSelectedProblem(null)}
        onSupportProblem={handleSupportProblem}
      />

      <ContactModal
        isOpen={contactModalOpen}
        brandName={profile.brandName}
        topics={profile.footer.contactTopics}
        initialTopic={contactInitialTopic}
        onClose={() => setContactModalOpen(false)}
        onSuccessSubmit={(name, topic) => {
          setRecentPledgeBanner(
            `Thank you ${name}! Your ${topic} inquiry has been logged with the ${profile.brandName} team.`
          );
        }}
      />
    </div>
  );
}
