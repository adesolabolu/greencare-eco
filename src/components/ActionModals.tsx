import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowUpRight,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  Sprout,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { InitiativeItem, ProblemCardItem } from '../data/greencareData';
import { SafeImage } from './SafeImage';

interface InitiativeModalProps {
  initiative: InitiativeItem | null;
  isJoined: boolean;
  pledgeOptions: number[];
  pledgeUnit: string;
  onClose: () => void;
  onJoinInitiative: (id: string, unitsPledged: number) => void;
}

export const InitiativeModal: React.FC<InitiativeModalProps> = ({
  initiative,
  isJoined,
  pledgeOptions,
  pledgeUnit,
  onClose,
  onJoinInitiative,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [unitsToPledge, setUnitsToPledge] = useState(pledgeOptions[0] || 5);
  const [error, setError] = useState('');

  useEffect(() => {
    setUnitsToPledge(pledgeOptions[0] || 5);
  }, [pledgeOptions, initiative]);

  if (!initiative) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.includes('@')) {
      setError('Please enter your name and a valid email address.');
      return;
    }
    setError('');
    onJoinInitiative(initiative.id, unitsToPledge);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[32px] max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-56 w-full shrink-0">
          <SafeImage
            src={initiative.image}
            alt={initiative.title}
            fallbackTheme={initiative.fallbackTheme}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/90 text-gray-900 flex items-center justify-center hover:bg-brand-lime transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs text-brand-lime font-medium mb-1">
              <span>{initiative.category}</span>
              <span aria-hidden="true">·</span>
              <span>{initiative.tags.join(' · ')}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {initiative.title}
            </h3>
          </div>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-3 gap-4 py-3 px-4 rounded-2xl bg-neutral-surface border border-gray-100 text-xs">
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-4 h-4 text-gray-900 shrink-0" />
              <div>
                <p className="text-gray-400">Schedule</p>
                <p className="font-semibold text-gray-900 font-mono tabular-nums">
                  {initiative.date}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-4 h-4 text-gray-900 shrink-0" />
              <div>
                <p className="text-gray-400">Corridor</p>
                <p className="font-semibold text-gray-900 truncate max-w-[140px]">
                  {initiative.location}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Users className="w-4 h-4 text-gray-900 shrink-0" />
              <div>
                <p className="text-gray-400">Active Scale</p>
                <p className="font-semibold text-gray-900 font-mono tabular-nums">
                  {initiative.participants.toLocaleString()} {initiative.participantUnit}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">
              Deployment Specifications &amp; Field Protocol
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {initiative.summary}
            </p>
            <ul className="space-y-2">
              {initiative.highlights.map((item, idx) => (
                <li
                  key={idx}
                  className="text-xs sm:text-sm text-gray-700 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {isJoined ? (
            <div className="rounded-2xl bg-brand-lime/40 border border-brand-lime p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-900 text-brand-lime flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Slot confirmed for {initiative.title}!
                  </p>
                  <p className="text-xs text-gray-700">
                    Our regional operations desk has sent your onboarding brief.
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full bg-gray-900 text-white text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="border-t border-gray-100 pt-5 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-900">
                  Book Slot / Reserve Capacity
                </h4>
                <span className="text-xs text-gray-500 font-mono tabular-nums">
                  Target: {initiative.targetGoal}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name or business name"
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-gray-900"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Work email address"
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-gray-900"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-surface p-3 rounded-xl">
                <span className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
                  <Sprout className="w-4 h-4 text-emerald-700" />
                  Select capacity / unit allocation:
                </span>
                <div className="flex items-center gap-1.5">
                  {pledgeOptions.map((count) => (
                    <button
                      type="button"
                      key={count}
                      onClick={() => setUnitsToPledge(count)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono tabular-nums transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        unitsToPledge === count
                          ? 'bg-brand-lime text-gray-900'
                          : 'bg-white border border-gray-200 text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      +{count} {pledgeUnit}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-full text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer whitespace-nowrap shrink-0"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                >
                  Confirm Booking
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

interface ProblemModalProps {
  problem: ProblemCardItem | null;
  currency: '₦' | '$';
  amounts: number[];
  brandName: string;
  onClose: () => void;
  onSupportProblem: (problemTitle: string, amount: number) => void;
}

export const ProblemModal: React.FC<ProblemModalProps> = ({
  problem,
  currency,
  amounts,
  brandName,
  onClose,
  onSupportProblem,
}) => {
  const [selectedGrant, setSelectedGrant] = useState(amounts[1] || amounts[0]);
  const [pledged, setPledged] = useState(false);

  useEffect(() => {
    setSelectedGrant(amounts[1] || amounts[0]);
    setPledged(false);
  }, [problem, amounts]);

  if (!problem) return null;

  const handlePledge = () => {
    onSupportProblem(problem.title, selectedGrant);
    setPledged(true);
  };

  const formatAmt = (val: number) => {
    if (currency === '₦' && val >= 1000) {
      return `₦${(val / 1000).toLocaleString()}k`;
    }
    return `${currency}${val.toLocaleString()}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[32px] max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-60 w-full shrink-0">
          <SafeImage
            src={problem.image}
            alt={problem.title}
            fallbackTheme={problem.fallbackTheme}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Close problem brief"
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/90 text-gray-900 flex items-center justify-center hover:bg-brand-lime transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs text-brand-lime font-medium mb-1">
              <span>{problem.kicker}</span>
              {problem.secondaryTag && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{problem.secondaryTag}</span>
                </>
              )}
            </div>
            <h3 className="text-3xl font-semibold tracking-tight">{problem.title}</h3>
          </div>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-surface border border-gray-100">
            <div>
              <span className="text-3xl font-bold text-gray-900 font-mono tabular-nums">
                {problem.statValue}
              </span>
              <p className="text-xs text-gray-600 mt-0.5">{problem.statUnit}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs text-gray-500 mb-1">
                2026 Rollout Execution Progress
              </p>
              <div className="w-44 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-900 rounded-full"
                  style={{ width: `${problem.fundedPercentage}%` }}
                />
              </div>
              <p className="text-xs font-semibold text-gray-900 mt-1 font-mono tabular-nums">
                {problem.fundedPercentage}% of annual target deployed
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900">
              Market &amp; Infrastructure Assessment
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">{problem.overview}</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-900">Core Bottlenecks</h4>
            <ul className="space-y-1.5">
              {problem.rootCauses.map((cause, i) => (
                <li key={i} className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-900 shrink-0" />
                  <span>{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-brand-lime/35 border border-brand-lime/80 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
              <ShieldCheck className="w-4 h-4" />
              <span>{brandName} Direct Field Solution</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
              {problem.greenCareResponse}
            </p>
          </div>

          {pledged ? (
            <div className="p-4 rounded-2xl bg-gray-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-lime shrink-0" />
                <span className="text-xs sm:text-sm font-medium">
                  Confirmed! Your {formatAmt(selectedGrant)} commitment has been logged
                  toward solving {problem.title}.
                </span>
              </div>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-full bg-brand-lime text-gray-900 text-xs font-bold cursor-pointer whitespace-nowrap shrink-0"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-gray-600">
                  Simulate deployment commitment:
                </span>
                {amounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setSelectedGrant(amt)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold font-mono tabular-nums transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      selectedGrant === amt
                        ? 'bg-gray-900 text-white'
                        : 'bg-neutral-surface text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {formatAmt(amt)}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handlePledge}
                className="px-5 py-2.5 rounded-full bg-brand-lime text-gray-900 text-xs font-bold hover:brightness-95 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
              >
                Back Solution ({formatAmt(selectedGrant)})
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface ContactModalProps {
  isOpen: boolean;
  brandName: string;
  topics: [string, string, string];
  initialTopic?: string;
  onClose: () => void;
  onSuccessSubmit: (name: string, topic: string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  brandName,
  topics,
  initialTopic,
  onClose,
  onSuccessSubmit,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(initialTopic || topics[0]);
  const [region, setRegion] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialTopic) {
      setTopic(initialTopic);
    } else {
      setTopic(topics[0]);
    }
  }, [initialTopic, topics]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.includes('@')) {
      setError('Please provide your name and a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
    onSuccessSubmit(fullName, topic);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setFullName('');
    setEmail('');
    setMessage('');
    setError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={resetAndClose}
    >
      <div
        className="bg-white rounded-[32px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-medium text-gray-500">
              {brandName} Operations Desk
            </span>
            <h3 className="text-2xl font-semibold text-gray-900">
              Connect With Our Team
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            aria-label="Close contact dialog"
            className="w-9 h-9 rounded-full bg-neutral-surface text-gray-700 flex items-center justify-center hover:bg-brand-lime hover:text-gray-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-brand-lime text-gray-900 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900">
              Request Received, {fullName}!
            </h4>
            <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
              Our regional coordinator for{' '}
              <span className="font-semibold text-gray-900">{topic}</span> will
              reach out to <span className="font-mono text-xs">{email}</span>{' '}
              within 24 hours.
            </p>
            <button
              onClick={resetAndClose}
              className="px-6 py-2.5 rounded-full bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Return to {brandName}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Select inquiry type:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {topics.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setTopic(item)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium transition-colors cursor-pointer truncate ${
                      topic === item
                        ? 'bg-brand-lime text-gray-900 font-semibold'
                        : 'bg-neutral-surface text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Full Name / Company
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Chidi Okonkwo"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="chidi@company.ng"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                State / City Location
              </label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="e.g., Lekki Lagos, Wuse Abuja, Kaduna, Port Harcourt"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Project Requirements or Notes
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your load capacity, farm acreage, or partnership goals..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-gray-900 resize-none"
              />
            </div>

            {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={resetAndClose}
                className="px-4 py-2.5 rounded-full text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer whitespace-nowrap shrink-0"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                Submit Request
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
