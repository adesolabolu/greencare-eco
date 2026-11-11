import { FallbackTheme } from '../components/SafeImage';

export type BrandDirectionId = 'solar' | 'agro' | 'conservation';

export interface HotspotItem {
  id: string;
  label: string;
  region: string;
  coordinates: string;
  metricLabel: string;
  metricValue: string;
  summary: string;
  volunteersActive: number;
  volunteerUnitLabel: string;
  positionClass: string;
  variant: 'lime' | 'light';
}

export interface InitiativeItem {
  id: string;
  title: string;
  category: string;
  tags: string[];
  date: string;
  location: string;
  participants: number;
  participantUnit: string;
  targetGoal: string;
  summary: string;
  highlights: string[];
  image: string;
  fallbackTheme: FallbackTheme;
  featured?: boolean;
}

export interface ProblemCardItem {
  id: string;
  title: string;
  kicker: string;
  secondaryTag?: string;
  statValue: string;
  statUnit: string;
  image: string;
  fallbackTheme: FallbackTheme;
  overview: string;
  rootCauses: string[];
  greenCareResponse: string;
  fundedPercentage: number;
}

export interface PillarItem {
  id: string;
  word: string;
  title: string;
  subtitle: string;
  metric: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface DirectionProfile {
  id: BrandDirectionId;
  tabLabel: string;
  tabSubtitle: string;
  brandName: string;
  brandGroupLabel: string;
  navLinks: {
    mission: string;
    initiatives: string;
    problems: string;
    impact: string;
    cta: string;
  };
  hero: {
    line1Prefix: string;
    line1Suffix: string;
    line2Prefix: string;
    line2Underline: string;
    line3: string;
    inputPlaceholder: string;
    ctaButton: string;
    memberStat: string;
    memberLabel: string;
    heroImage: string;
    heroFallback: FallbackTheme;
    badgeTopTitle: string;
    badgeTopSubtitle: string;
    badgeAvatar: string;
    bottomCardCode: string;
    bottomCardBrief: string;
    hotspots: HotspotItem[];
  };
  mission: {
    headingLine1: string;
    headingLine2: string;
    subheading: string;
    primaryBtn: string;
    secondaryBtn: string;
    decoImageLeft: string;
    decoImageRight: string;
    stripWords: [string, string, string]; // Word 1, Word 2 (tile 3 is arrow), Word 4
    stripImage2: string;
    stripImage4: string;
    pillars: PillarItem[];
  };
  initiativesSection: {
    heading: string;
    subheading: string;
    categories: string[];
    col1Label: string;
    col2Label: string;
    col3Label: string;
    actionUnitLabel: string;
    pledgeOptions: number[];
    pledgeUnit: string;
    rows: InitiativeItem[];
  };
  problemsSection: {
    buttonLabel: string;
    allocationCurrency: '₦' | '$';
    allocationAmounts: number[];
    cards: ProblemCardItem[];
  };
  impactSection: {
    headingLine1: string;
    headingLine2: string;
    description: string;
    stat1Initial: number;
    stat1Suffix: string;
    stat1Label: string;
    stat1Sub: string;
    stat2Initial: number;
    stat2Currency: '₦' | '$';
    stat2Label: string;
    stat2Sub: string;
    stat3Value: string;
    stat3Label: string;
    stat3Sub: string;
    simulatorPrompt: string;
    simulatorUnit: string;
    simulatorOptions: number[];
  };
  faqSection: {
    heading: string;
    subheading: string;
    items: FaqItem[];
  };
  footer: {
    tag: string;
    subscribeHeading: string;
    copyright: string;
    contactTopics: [string, string, string];
  };
}

const IMG_SOLAR_HERO = '/src/assets/images/solar_hero_nigeria_1794324655158.jpg';
const IMG_SOLAR_GRID = '/src/assets/images/solar_problem_grid_1794324656632.jpg';
const IMG_AGRO_HERO = '/src/assets/images/agro_hero_nigeria_1794324657033.jpg';
const IMG_AGRO_COLD = '/src/assets/images/agro_problem_coldchain_1794324658472.jpg';
const IMG_NG_ENGINEER = '/src/assets/images/nigeria_field_team_1794324658818.jpg';

export const DIRECTION_PROFILES: Record<BrandDirectionId, DirectionProfile> = {
  solar: {
    id: 'solar',
    tabLabel: '01. Clean Energy & Solar (SunGrid Naija)',
    tabSubtitle: 'Lagos, Abuja, PH & Kano commercial mini-grids + inverter financing',
    brandName: 'SunGrid Naija',
    brandGroupLabel: 'SunGrid Energy Nigeria',
    navLinks: {
      mission: 'Why Solar',
      initiatives: 'Solar Plans',
      problems: 'Grid Issues',
      impact: 'Fuel Savings',
      cta: 'Request Site Audit',
    },
    hero: {
      line1Prefix: 'Powering',
      line1Suffix: 'Homes &',
      line2Prefix: 'Replacing',
      line2Underline: 'Generators',
      line3: 'Across Nigeria.',
      inputPlaceholder: 'Enter your phone or work email',
      ctaButton: 'Get Quote',
      memberStat: '14.5k+',
      memberLabel: 'Nigerian homes, plazas & SMEs running 24/7 solar',
      heroImage: IMG_SOLAR_HERO,
      heroFallback: 'desert',
      badgeTopTitle: 'We & Our',
      badgeTopSubtitle: 'COREN Engineers',
      badgeAvatar: IMG_NG_ENGINEER,
      bottomCardCode: 'SG',
      bottomCardBrief:
        'We deploy lithium-ion solar systems and commercial mini-grids that eliminate diesel and fuel queues.',
      hotspots: [
        {
          id: 'lekki-minigrid',
          label: 'Lekki & VI Mini-Grid',
          region: 'Lagos Island Commercial Corridor',
          coordinates: '6.4474° N, 3.4723° E',
          metricLabel: 'Diesel Saved Monthly',
          metricValue: '185,000 Litres',
          summary:
            '99.8% uptime lithium-iron-phosphate (LFP) hybrid microgrids powering plazas, clinics, and tech hubs.',
          volunteersActive: 64,
          volunteerUnitLabel: 'COREN field engineers',
          positionClass: 'top-1/3 right-6 sm:right-1/4',
          variant: 'lime',
        },
        {
          id: 'abuja-kano-hub',
          label: 'Abuja & Kano Industrial',
          region: 'Wuse II & Sharada Industrial Estate',
          coordinates: '9.0765° N, 7.3986° E',
          metricLabel: 'Peak Solar Output',
          metricValue: '4.2 MWp Active',
          summary:
            'Zero-downtime rooftop solar arrays cutting factory and cold-room power expenses by up to 62%.',
          volunteersActive: 48,
          volunteerUnitLabel: 'maintenance technicians',
          positionClass: 'top-1/2 left-6 sm:left-1/4',
          variant: 'light',
        },
      ],
    },
    mission: {
      headingLine1: "Let's Make Nigeria's Power",
      headingLine2: 'Silent, Clean & 24/7!',
      subheading:
        'We partner with Nigerian estates, commercial plazas, and SMEs to replace noisy petrol and diesel generators with pay-as-you-go solar infrastructure.',
      primaryBtn: 'View Solar Plans',
      secondaryBtn: 'How Financing Works',
      decoImageLeft: IMG_SOLAR_HERO,
      decoImageRight: IMG_SOLAR_GRID,
      stripWords: ['We', 'Power', 'Naija'],
      stripImage2: IMG_SOLAR_HERO,
      stripImage4: IMG_SOLAR_GRID,
      pillars: [
        {
          id: 'we',
          word: 'We',
          title: '01. Nigerian-Engineered Reliability',
          subtitle: 'Built for tropical heat, harmattan dust, and grid surges',
          metric: '5-Year Full Warranty',
          description:
            'Our COREN-certified installation teams design every inverter and battery bank specifically for Nigerian load profiles—including ACs, boreholes, and commercial freezers.',
        },
        {
          id: 'protect',
          word: 'Power',
          title: '02. Zero Generator Fuel Queues',
          subtitle: 'Predictable monthly energy costs lower than diesel spend',
          metric: 'Up to 65% Cost Reduction',
          description:
            'Stop spending hundreds of thousands of Naira every month on adulterated diesel, engine oil changes, and generator repairs.',
        },
        {
          id: 'action',
          word: 'Action',
          title: '03. 48-Hour Installation & Smart Metering',
          subtitle: 'Live mobile telemetry & remote inverter diagnostics',
          metric: '99.8% Verified Uptime',
          description:
            'Track your solar harvest, battery state-of-charge, and Naira savings in real time from our Lagos and Abuja network operations centers.',
        },
        {
          id: 'nature',
          word: 'Naija',
          title: '04. Flexible 12–36 Month Lease-to-Own',
          subtitle: 'No crushing upfront capital required for businesses',
          metric: '₦0 Generator Smoke',
          description:
            'Spread payments over 12 to 36 months using the exact cash flow you already spend on petrol and diesel.',
        },
      ],
    },
    initiativesSection: {
      heading: 'Our solar rollouts & bundles for 2026',
      subheading:
        'Click any deployment package below to inspect technical specs or book an installation slot',
      categories: ['All', 'SME Bundles', 'Estate Grids', 'Cold-Chain', 'Campus'],
      col1Label: 'System / Project',
      col2Label: 'Load Capacity & Coverage',
      col3Label: 'Next Batch',
      actionUnitLabel: 'kVA solar capacity reserved',
      pledgeOptions: [5, 10, 25],
      pledgeUnit: 'kVA',
      rows: [
        {
          id: 'sme-10kva',
          title: 'SME 10kVA Lithium Power Pack',
          category: 'SME Bundles',
          tags: ['silent 24/7 business', '15kWh LFP battery'],
          date: '15/11/26',
          location: 'Ikeja, Surulere, Wuse & Port Harcourt',
          participants: 1840,
          participantUnit: 'SMEs installed',
          targetGoal: '2,500 Commercial Shops',
          summary:
            'Designed for pharmacies, supermarkets, salons, and tech studios—runs 3 inverter ACs, lighting, POS terminals, and deep freezers without generator backup.',
          highlights: [
            '10kVA hybrid pure-sine inverter + 15kWh Grade-A LiFePO4 battery',
            '12x 550W monocrystalline half-cut tier-1 solar panels',
            '18-month pay-small-small financing with 48-hour installation',
          ],
          image: IMG_SOLAR_HERO,
          fallbackTheme: 'desert',
          featured: true,
        },
        {
          id: 'estate-minigrid',
          title: 'Residential Estate Solar Mini-Grid',
          category: 'Estate Grids',
          tags: ['24/7 estate metering', 'zero gen noise curfew'],
          date: '28/11/26',
          location: 'Lekki, Sangotedo, Gwarinpa & Enugu',
          participants: 4200,
          participantUnit: 'homes metered',
          targetGoal: '45 Gated Estates',
          summary:
            'Centralized solar + battery generation plant for gated residential estates, billed transparently via prepaid smart meters alongside DisCo supply.',
          highlights: [
            'Eliminates 10 PM estate generator cut-offs and smoky air',
            'Automated seamless switchover in <10 milliseconds',
            'Dedicated on-site technician and remote IoT load balancing',
          ],
          image: IMG_SOLAR_GRID,
          fallbackTheme: 'emissions',
        },
        {
          id: 'coldchain-hub',
          title: 'Market Cold-Room & Plaza Hub',
          category: 'Cold-Chain',
          tags: ['agro-market cooling', 'pay-per-crate solar'],
          date: '04/12/26',
          location: 'Mile 12, Dawanau Kano & Ariaria Aba',
          participants: 930,
          participantUnit: 'traders subscribed',
          targetGoal: '30 Major Market Clusters',
          summary:
            'Shared solar roof arrays powering market cold-rooms, tailoring clusters, and printing presses at 40% below petrol generator tariffs.',
          highlights: [
            'Prepaid daily or weekly energy vending via USSD & mobile app',
            'Heavy-duty surge protection for industrial motors and compressors',
            'Zero upfront equipment cost for market stall associations',
          ],
          image: IMG_AGRO_COLD,
          fallbackTheme: 'planting',
        },
        {
          id: 'clinic-campus',
          title: 'Hospitals & School Solar Roofs',
          category: 'Campus',
          tags: ['uninterrupted surgery', 'ICT lab power'],
          date: '19/12/26',
          location: 'Ibadan, Benin City, Jos & Kaduna',
          participants: 310,
          participantUnit: 'institutions powered',
          targetGoal: '500 Clinics & Schools',
          summary:
            'Critical-load solar redundancy for maternity wards, diagnostic labs, vaccine cold-chains, and boarding school ICT laboratories.',
          highlights: [
            'Dual-busbar medical-grade isolation for diagnostic imaging',
            '10-year solar panel output guarantee and quarterly wash maintenance',
            'ESG impact reporting for diaspora and corporate sponsors',
          ],
          image: IMG_SOLAR_HERO,
          fallbackTheme: 'education',
        },
      ],
    },
    problemsSection: {
      buttonLabel: 'EXPLORE SOLUTION',
      allocationCurrency: '₦',
      allocationAmounts: [50000, 150000, 500000, 1000000],
      cards: [
        {
          id: 'diesel-cost',
          title: 'Crushing Generator Fuel Spend',
          kicker: 'Energy Bottleneck',
          secondaryTag: '₦1,200+/L Fuel Reality',
          statValue: '₦420k+',
          statUnit: 'average monthly SME spend on diesel & petrol',
          image: IMG_SOLAR_GRID,
          fallbackTheme: 'emissions',
          overview:
            'Nigerian businesses spend up to 40% of their operating revenue buying petrol and diesel, servicing carburetors, and dealing with adulterated fuel that ruins engines.',
          rootCauses: [
            'Volatile pump prices for PMS and Automotive Gas Oil (diesel)',
            'Frequent mechanical breakdowns and costly oil/filter servicing',
            'Fuel theft and meter tampering in commercial generator houses',
          ],
          greenCareResponse:
            'SunGrid replaces fuel-guzzling generators with fixed-monthly lease-to-own lithium solar systems that cost less per month than your current fuel bill.',
          fundedPercentage: 88,
        },
        {
          id: 'grid-collapse',
          title: 'National Grid Outages',
          kicker: 'Infrastructure Deficit',
          statValue: '4,500 MW',
          statUnit: 'grid transmission supply for 220M+ citizens',
          image: IMG_SOLAR_HERO,
          fallbackTheme: 'desert',
          overview:
            'Frequent national grid collapses and transformer faults leave households and factories in darkness for days, halting productivity across all 36 states.',
          rootCauses: [
            'Aging high-voltage transmission lines and overloaded substation transformers',
            'Gas pipeline vandalism and seasonal hydro water-level drops',
            'Estimated crazy billing despite days of zero power supply',
          ],
          greenCareResponse:
            'Our decentralized estate and commercial mini-grids generate power right on your roof with <10ms automatic switchover.',
          fundedPercentage: 81,
        },
        {
          id: 'sme-spoilage',
          title: 'Cold-Chain & Inventory Loss',
          kicker: 'Commercial Risk',
          statValue: '38%',
          statUnit: 'of chilled inventory & work hours lost to blackouts',
          image: IMG_AGRO_COLD,
          fallbackTheme: 'ocean',
          overview:
            'Pharmacies, cold-rooms, restaurants, and supermarkets lose millions of Naira in spoiled vaccines, meat, and dairy whenever overnight generators fail.',
          rootCauses: [
            'Overnight generator shutdowns due to estate noise curfews',
            'Compressor burnouts from low-voltage brownouts and phase failure',
            'High thermal losses in poorly insulated urban market stalls',
          ],
          greenCareResponse:
            'Silent overnight LFP battery banks keep freezers and cold-rooms at sub-zero temperatures all night with zero noise.',
          fundedPercentage: 92,
        },
        {
          id: 'fumes-noise',
          title: 'Generator Fumes & Noise',
          kicker: 'Urban Health Hazard',
          statValue: '85 dB',
          statUnit: 'constant generator noise and toxic carbon monoxide',
          image:
            'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80',
          fallbackTheme: 'forest',
          overview:
            'Millions of "I-better-pass-my-neighbour" and diesel generators fill residential compounds with toxic exhaust fumes, soot, and sleep-disrupting vibration.',
          rootCauses: [
            'Cramped urban compounds with poor exhaust ventilation',
            '24-hour noise fatigue in high-density Lagos, PH, and Onitsha neighbourhoods',
            'Indoor air pollution affecting children and elderly residents',
          ],
          greenCareResponse:
            '100% silent, zero-emission rooftop solar arrays that restore peace and clean air to Nigerian homes and compounds.',
          fundedPercentage: 79,
        },
      ],
    },
    impactSection: {
      headingLine1: 'Our Naija Impact',
      headingLine2: 'in Numbers',
      description:
        'Real-time telemetry from our active solar rooftops and mini-grids across Nigeria.',
      stat1Initial: 14520,
      stat1Suffix: 'k+',
      stat1Label: 'Homes & SMEs Powered',
      stat1Sub: 'verified 24/7 installations',
      stat2Initial: 3840000000,
      stat2Currency: '₦',
      stat2Label: 'Fuel Spend Saved',
      stat2Sub: 'kept in Nigerian businesses',
      stat3Value: '36',
      stat3Label: 'States + FCT Covered',
      stat3Sub: 'Regional hubs in Lagos, Abuja, PH & Kano',
      simulatorPrompt:
        'Simulate adding new solar capacity to the SunGrid Nigeria network:',
      simulatorUnit: 'kVA System',
      simulatorOptions: [5, 15, 50],
    },
    faqSection: {
      heading: 'Questions About Going Solar?',
      subheading:
        'Straight answers on pricing, battery lifespan, AC loads, and lease-to-own plans in Nigeria.',
      items: [
        {
          id: 'ac-load',
          question: 'Can your solar system power my Air Conditioners and borehole pump?',
          answer:
            'Yes! Our 5kVA, 10kVA, and 15kVA lithium systems are engineered with high surge capacity specifically to run inverter ACs, deep freezers, pressing irons, and submersible borehole pumps smoothly.',
          category: 'Technical',
        },
        {
          id: 'financing',
          question: 'How does the "Pay-Small-Small" lease-to-own plan work?',
          answer:
            'You pay a 20% initial deposit, we install your system within 48 hours, and you spread the balance over 12, 24, or 36 monthly payments—usually less than what you currently spend on diesel and petrol every month.',
          category: 'Financing',
        },
        {
          id: 'rainy-season',
          question: 'What happens during heavy July/August rain in Lagos or Port Harcourt?',
          answer:
            'We use high-efficiency monocrystalline half-cut panels that harvest diffuse daylight even under cloudy skies, paired with oversized LiFePO4 battery banks and hybrid smart charging from EKEDC/IKEDC/AEDC or backup sources.',
          category: 'Reliability',
        },
        {
          id: 'warranty',
          question: 'What warranty and maintenance support do you provide?',
          answer:
            'Every SunGrid installation comes with a 5-year comprehensive warranty on inverters and lithium batteries, a 25-year panel output warranty, and 24/7 remote monitoring from our Nigerian engineering desk.',
          category: 'Support',
        },
      ],
    },
    footer: {
      tag: 'Solar Tariff & Load Calculator Dispatch',
      subscribeHeading:
        'Subscribe to get our 2026 Nigeria Solar Load Sizing Guide & SME financing rates.',
      copyright: '©2026 SunGrid Energy Nigeria Ltd. All Rights Reserved.',
      contactTopics: [
        'Home & SME Solar Audit',
        'Estate Mini-Grid Partnership',
        'Installer & Dealer Network',
      ],
    },
  },

  agro: {
    id: 'agro',
    tabLabel: '02. Agribusiness & Food Security (AgroPulse)',
    tabSubtitle: 'Kaduna, Benue, Oyo & Nasarawa mechanized farming + solar cold-chain',
    brandName: 'AgroPulse Naija',
    brandGroupLabel: 'AgroPulse Outgrower Network',
    navLinks: {
      mission: 'Our Model',
      initiatives: 'Crop Cycles',
      problems: 'Food Bottlenecks',
      impact: 'Harvest Yield',
      cta: 'Partner With Us',
    },
    hero: {
      line1Prefix: 'Growing',
      line1Suffix: 'Wealth &',
      line2Prefix: 'Securing',
      line2Underline: "Nigeria's Food",
      line3: 'Future Together.',
      inputPlaceholder: 'Enter your email for harvest briefs',
      ctaButton: 'Join Network',
      memberStat: '85k+',
      memberLabel: 'verified smallholder outgrowers & off-take partners',
      heroImage: IMG_AGRO_HERO,
      heroFallback: 'forest',
      badgeTopTitle: 'We & Our',
      badgeTopSubtitle: 'Field Agronomists',
      badgeAvatar: IMG_NG_ENGINEER,
      bottomCardCode: 'AP',
      bottomCardBrief:
        'We equip Nigerian farmers with drought-resilient seeds, tractor mechanization, and solar cold-storage.',
      hotspots: [
        {
          id: 'kaduna-maize',
          label: 'Kaduna & Kano Grain Belt',
          region: 'Zaria & Kadawa Irrigation Corridor',
          coordinates: '11.0855° N, 7.7199° E',
          metricLabel: 'Dry-Season Yield Boost',
          metricValue: '+210% Tonnage',
          summary:
            'Solar center-pivot irrigation and hybrid maize inputs enabling two full harvests every year without waiting for rain.',
          volunteersActive: 340,
          volunteerUnitLabel: 'extension agronomists',
          positionClass: 'top-1/3 right-6 sm:right-1/4',
          variant: 'lime',
        },
        {
          id: 'benue-oyo-hub',
          label: 'Benue & Oyo Packhouses',
          region: 'Makurdi & Iseyin Agro-Logistics Belt',
          coordinates: '7.7322° N, 8.5391° E',
          metricLabel: 'Post-Harvest Saved',
          metricValue: '42,800 Metric Tons',
          summary:
            'Solar-powered cold rooms and crate packhouses cutting tomato, pepper, and cassava spoilage from 45% down to 4%.',
          volunteersActive: 280,
          volunteerUnitLabel: 'packhouse operators',
          positionClass: 'top-1/2 left-6 sm:left-1/4',
          variant: 'light',
        },
      ],
    },
    mission: {
      headingLine1: "Let's Make Nigerian Farming",
      headingLine2: 'Mechanized & Profitable!',
      subheading:
        'We connect smallholder farmers with tractor fleets, solar irrigation, cold-chain packhouses, and guaranteed off-take contracts from major food processors.',
      primaryBtn: 'Explore Crop Cycles',
      secondaryBtn: 'See Outgrower Model',
      decoImageLeft: IMG_AGRO_HERO,
      decoImageRight: IMG_AGRO_COLD,
      stripWords: ['We', 'Feed', 'Africa'],
      stripImage2: IMG_AGRO_HERO,
      stripImage4: IMG_AGRO_COLD,
      pillars: [
        {
          id: 'we',
          word: 'We',
          title: '01. Biometric-Verified Outgrower Cooperatives',
          subtitle: '85,400+ smallholder farmers across 24 Nigerian states',
          metric: '98.4% Input Recovery Rate',
          description:
            'Every farmer plot is GPS-mapped with soil-health diagnostics, certified high-yield seeds, and extension officers stationed directly in the LGA.',
        },
        {
          id: 'protect',
          word: 'Feed',
          title: '02. Year-Round Solar Irrigation & Mechanization',
          subtitle: 'Ending dependence on unpredictable rainy seasons',
          metric: '2x Annual Harvest Cycles',
          description:
            'We deploy solar water pumps and GPS-tracked tractor fleets so farmers cultivate through both wet and dry seasons with triple the yield per hectare.',
        },
        {
          id: 'action',
          word: 'Action',
          title: '03. Zero-Spoilage Cold-Chain & Storage',
          subtitle: 'Farm-gate solar cold rooms and modern grain silos',
          metric: '45% → 4% Spoilage Drop',
          description:
            'Perishable tomatoes, peppers, and tubers are pre-cooled and crated at our rural packhouses before direct haulage to Lagos, Abuja, and PH markets.',
        },
        {
          id: 'nature',
          word: 'Africa',
          title: '04. Guaranteed Off-Take & Export Grading',
          subtitle: 'Direct supply contracts with FMCGs and export buyers',
          metric: '+68% Net Farmer Income',
          description:
            'By bypassing exploitative middlemen and grading produce to international standards, farmers get paid promptly at fair commodity prices.',
        },
      ],
    },
    initiativesSection: {
      heading: 'Our seasonal crop & agro-hub rollouts for 2026',
      subheading:
        'Select any agricultural program below to view hectare targets, off-take buyers, or join as a partner',
      categories: ['All', 'Irrigation', 'Cold-Chain', 'Mechanization', 'Export'],
      col1Label: 'Program / Value Chain',
      col2Label: 'Corridor & Impact',
      col3Label: 'Cycle Start',
      actionUnitLabel: 'hectares backed',
      pledgeOptions: [5, 20, 50],
      pledgeUnit: 'hectares',
      rows: [
        {
          id: 'dry-season-rice-maize',
          title: 'Dry-Season Solar Irrigated Maize & Rice',
          category: 'Irrigation',
          tags: ['all-year farming', '3.8x yield per hectare'],
          date: '18/11/26',
          location: 'Kaduna, Kebbi, Niger & Nasarawa',
          participants: 14200,
          participantUnit: 'farmers enrolled',
          targetGoal: '45,000 Irrigated Hectares',
          summary:
            'Deploying solar-powered borehole pumps and drip/pivot irrigation across northern river basins so farmers harvest bumper grain crops during the dry harmattan months.',
          highlights: [
            'Drought-tolerant IITA hybrid seed bundles + precision NPK fertilization',
            'Pre-contracted off-take with major Nigerian flour and feed mills',
            'Satellite NDVI crop growth monitoring every 10 days',
          ],
          image: IMG_AGRO_HERO,
          fallbackTheme: 'forest',
          featured: true,
        },
        {
          id: 'tomato-coldchain',
          title: 'Farm-Gate Solar Cold-Storage Packhouses',
          category: 'Cold-Chain',
          tags: ['zero basket rot', 'mile-12 direct express'],
          date: '02/12/26',
          location: 'Kano, Plateau, Oyo & Benue',
          participants: 6850,
          participantUnit: 'horticulturists active',
          targetGoal: '60 Solar Cold-Rooms',
          summary:
            'Replacing woven raffia baskets with stackable plastic crates and 5°C solar walk-in cold rooms that extend fresh tomato and bell pepper shelf life from 3 days to 21 days.',
          highlights: [
            'Pay-per-crate daily cooling fee affordable for rural women cooperatives',
            'Direct refrigerated truck dispatch to Lagos, Abuja, and Onitsha retail chains',
            'Eliminates 45% highway transit crush and heat spoilage',
          ],
          image: IMG_AGRO_COLD,
          fallbackTheme: 'planting',
        },
        {
          id: 'tractor-leasing',
          title: 'On-Demand Tractor & Harvester Fleet',
          category: 'Mechanization',
          tags: ['USSD tractor booking', 'rapid land clearing'],
          date: '14/01/27',
          location: 'Oyo, Kwara, Taraba & Ekiti',
          participants: 9400,
          participantUnit: 'hectares ploughed',
          targetGoal: '250 Tractor Units Active',
          summary:
            'Farmers book ploughing, harrowing, ridging, and combine harvesting via USSD or community agents—slashing land preparation time from 3 weeks to 3 hours.',
          highlights: [
            'IoT GPS telemetry tracking every hectare ploughed in real time',
            'Trained youth tractor operators and mobile field mechanic vans',
            'Bundled with soil pH testing and organic compost enrichment',
          ],
          image: IMG_AGRO_HERO,
          fallbackTheme: 'park',
        },
        {
          id: 'cocoa-sesame-export',
          title: 'Traceable Cocoa, Ginger & Sesame Export Hub',
          category: 'Export',
          tags: ['FX export revenue', 'EUDR deforestation-free'],
          date: '08/02/27',
          location: 'Ondo, Cross River, Kaduna & Jigawa',
          participants: 5120,
          participantUnit: 'export outgrowers',
          targetGoal: '18,000 MT Export Grade',
          summary:
            'Solar-heated fermentation, clean drying tables, and optical sorting lines preparing premium Nigerian cocoa, split ginger, and sesame for European and Asian buyers.',
          highlights: [
            '100% polygon-mapped farms compliant with global traceability standards',
            'Zero-aflatoxin solar tunnel drying and moisture certification',
            'Direct export premium bonuses paid into farmer bank wallets',
          ],
          image: IMG_AGRO_COLD,
          fallbackTheme: 'education',
        },
      ],
    },
    problemsSection: {
      buttonLabel: 'EXPLORE SOLUTION',
      allocationCurrency: '₦',
      allocationAmounts: [50000, 150000, 500000, 1000000],
      cards: [
        {
          id: 'post-harvest-loss',
          title: 'Post-Harvest Crop Spoilage',
          kicker: 'Supply Chain Crisis',
          secondaryTag: '₦3.5T Annual Loss',
          statValue: '45%',
          statUnit: 'of fresh Nigerian produce rots before reaching kitchens',
          image: IMG_AGRO_COLD,
          fallbackTheme: 'planting',
          overview:
            'nearly half of the tomatoes, peppers, plantains, and yams grown by hardworking Nigerian farmers spoil in the sun due to raffia basket crushing, bad roads, and zero farm-gate cold storage.',
          rootCauses: [
            'Lack of pre-cooling packhouses near rural farming clusters',
            'Traditional raffia baskets that crush bottom produce during transit',
            'Multi-day truck breakdowns along North-to-South highway corridors',
          ],
          greenCareResponse:
            'AgroPulse installs solar-powered cold rooms and stackable crate exchange networks right at the farm gate.',
          fundedPercentage: 89,
        },
        {
          id: 'rain-fed-risk',
          title: 'Rain-Fed Farming Vulnerability',
          kicker: 'Climate & Drought Risk',
          statValue: '72%',
          statUnit: 'of Nigerian farmland relies strictly on seasonal rain',
          image: IMG_AGRO_HERO,
          fallbackTheme: 'forest',
          overview:
            'Delayed rains, mid-season dry spells, and sudden river flooding wipe out single-season harvests and drive seasonal food inflation across Nigerian cities.',
          rootCauses: [
            'High cost of diesel water pumps for dry-season irrigation',
            'Unlined earth canals that lose 60% of water to evaporation',
            'Lack of drought-tolerant, early-maturing seed varieties',
          ],
          greenCareResponse:
            'We finance solar borehole pumps and precision drip irrigation so farmers harvest twice a year regardless of rainfall.',
          fundedPercentage: 83,
        },
        {
          id: 'low-mechanization',
          title: 'Manual Hoe & Cutlass Bottleneck',
          kicker: 'Productivity Gap',
          statValue: '0.3 hp',
          statUnit: 'tractor power per hectare vs 2.5 hp global benchmark',
          image:
            'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80',
          fallbackTheme: 'desert',
          overview:
            'Over 80% of land preparation in Nigeria is still done with manual hand hoes, limiting average smallholder plots to under 1.5 hectares and exhausting rural labour.',
          rootCauses: [
            'Prohibitive cost of owning a tractor for individual smallholders',
            'Lack of spare parts and trained mechanics for LGA tractor fleets',
            'Fragmented plots that lack coordinated cooperative scheduling',
          ],
          greenCareResponse:
            'Our cluster-based tractor and harvester booking platform aggregates contiguous farms for affordable mechanized tillage.',
          fundedPercentage: 77,
        },
        {
          id: 'middleman-gap',
          title: 'Farm-Gate Price Exploitation',
          kicker: 'Market Access Gap',
          statValue: '3x',
          statUnit: 'price markup between rural farm-gate and urban retail',
          image:
            'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
          fallbackTheme: 'park',
          overview:
            'Without storage or working capital at harvest time, farmers are forced to sell distress-priced bags to middlemen while urban families still pay record prices for food.',
          rootCauses: [
            'Distress selling at harvest peak due to lack of warehouse receipts',
            'Multiple layers of unstandardized market brokers and levies',
            'Absence of digital weighing scales and transparent commodity pricing',
          ],
          greenCareResponse:
            'We provide electronic warehouse receipt financing and direct off-take contracts with processors and urban bulk buyers.',
          fundedPercentage: 94,
        },
      ],
    },
    impactSection: {
      headingLine1: 'Our Harvest Impact',
      headingLine2: 'in Numbers',
      description:
        'Audited seasonal yields, farmer payouts, and post-harvest recovery across Nigeria.',
      stat1Initial: 85400,
      stat1Suffix: 'k+',
      stat1Label: 'Outgrower Farmers',
      stat1Sub: 'verified across 24 states',
      stat2Initial: 6200000000,
      stat2Currency: '₦',
      stat2Label: 'Harvest Value Financed',
      stat2Sub: 'direct inputs & off-take payouts',
      stat3Value: '180',
      stat3Label: 'Rural Agro-Hubs',
      stat3Sub: 'Solar cold-rooms, silos & tractor bases',
      simulatorPrompt:
        'Simulate backing additional irrigated hectares in our 2026 Dry-Season Cycle:',
      simulatorUnit: 'Hectares',
      simulatorOptions: [5, 20, 100],
    },
    faqSection: {
      heading: 'Questions About AgroPulse?',
      subheading:
        'How smallholder cooperatives, institutional off-takers, and diaspora agro-partners work with us.',
      items: [
        {
          id: 'enroll-coop',
          question: 'How can a farming cooperative in my state join AgroPulse?',
          answer:
            'Registered cooperatives with at least 50 contiguous hectares can apply via our "Partner With Us" button. Our field agronomists conduct a soil and water table audit within 14 days to onboard your cluster for seeds, tractor tillage, and off-take.',
          category: 'Farmers',
        },
        {
          id: 'offtake-buyers',
          question: 'Can food processors, supermarkets, or exporters buy directly from your hubs?',
          answer:
            'Yes. We supply graded, moisture-tested maize, soybean, paddy rice, Sorghum, fresh crated tomatoes, and export-grade cocoa/sesame on forward supply contracts with guaranteed delivery schedules.',
          category: 'Buyers',
        },
        {
          id: 'coldroom-access',
          question: 'How do rural farmers pay for the solar cold-storage packhouses?',
          answer:
            'Farmers and market women pay a small per-crate daily storage fee (no upfront deposit required) and receive clean plastic crates that protect their harvest from farm to urban market.',
          category: 'Cold-Chain',
        },
        {
          id: 'crop-insurance',
          question: 'How do you protect harvests against weather or pest shocks?',
          answer:
            'Every hectare in our network is covered by index-based agricultural insurance, solar supplemental irrigation, and weekly scouting by our resident extension officers.',
          category: 'Risk Management',
        },
      ],
    },
    footer: {
      tag: 'Commodity Price & Harvest Dispatch',
      subscribeHeading:
        'Subscribe to get weekly Nigerian farm-gate commodity briefs & seasonal crop rollout updates.',
      copyright: '©2026 AgroPulse Nigeria Cooperative Ltd. All Rights Reserved.',
      contactTopics: [
        'Register Farmer Cooperative',
        'Bulk Commodity Off-Take',
        'Sponsor Solar Cold-Hub',
      ],
    },
  },

  conservation: {
    id: 'conservation',
    tabLabel: '03. Original GreenCare (Conservation)',
    tabSubtitle: 'Original global reforestation, coastal cleanup & biodiversity template',
    brandName: 'GreenCare',
    brandGroupLabel: 'GreenCare Group',
    navLinks: {
      mission: 'Our Mission',
      initiatives: 'Projects',
      problems: 'Problems',
      impact: 'Contribution',
      cta: 'Contact Us',
    },
    hero: {
      line1Prefix: 'Saving',
      line1Suffix: 'Nature &',
      line2Prefix: 'Fighting',
      line2Underline: 'Climate',
      line3: 'Change Together.',
      inputPlaceholder: 'Enter your e-mail',
      ctaButton: 'Subscribe',
      memberStat: '1.5M+',
      memberLabel: 'members of our charity organization',
      heroImage:
        'https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?q=80&w=2487&auto=format&fit=crop',
      heroFallback: 'desert',
      badgeTopTitle: 'We & Our',
      badgeTopSubtitle: 'Volunteers',
      badgeAvatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100',
      bottomCardCode: 'GC',
      bottomCardBrief:
        'We are an organization dedicated to protecting the environment & nature.',
      hotspots: [
        {
          id: 'ghg-emissions',
          label: 'GHG Emissions',
          region: 'Sub-Saharan Arid Belt',
          coordinates: '23.4162° N, 25.6628° E',
          metricLabel: 'Annual Carbon Captured',
          metricValue: '18,400 tCO2e',
          summary:
            'Drought-resilient acacia corridors stabilizing desertified soil and sequestering atmospheric carbon.',
          volunteersActive: 420,
          volunteerUnitLabel: 'active field volunteers',
          positionClass: 'top-1/3 right-6 sm:right-1/4',
          variant: 'lime',
        },
        {
          id: 'water-pollution',
          label: 'Water Pollution',
          region: 'Coastal Basin & Estuaries',
          coordinates: '14.5994° N, 28.6731° W',
          metricLabel: 'Watershed Filtered',
          metricValue: '64.2M Liters',
          summary:
            'Community-operated bio-filtration wetlands and riverine interceptor booms halting microplastic runoff.',
          volunteersActive: 315,
          volunteerUnitLabel: 'active field volunteers',
          positionClass: 'top-1/2 left-6 sm:left-1/4',
          variant: 'light',
        },
      ],
    },
    mission: {
      headingLine1: "Let's Make Our World",
      headingLine2: 'Cleaner & Greener!',
      subheading:
        'We work with partners & communities to ensure nature thrives and climate change is reversed.',
      primaryBtn: 'View Projects',
      secondaryBtn: 'Learn More',
      decoImageLeft:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=120&h=120',
      decoImageRight:
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=120&h=120',
      stripWords: ['We', 'Protect', 'Nature'],
      stripImage2:
        'https://images.unsplash.com/photo-1505567745926-ba89000d255a?auto=format&fit=crop&w=600&q=80',
      stripImage4:
        'https://images.unsplash.com/photo-1543051932-6ef9fecfbc80?auto=format&fit=crop&w=600&q=80',
      pillars: [
        {
          id: 'we',
          word: 'We',
          title: '01. Community-Led Coalitions',
          subtitle: '1.5M+ active members across 42 countries',
          metric: '94% Local Leadership',
          description:
            'We partner directly with indigenous stewards, municipal agronomists, and neighborhood volunteers so every restoration project has permanent local ownership.',
        },
        {
          id: 'protect',
          word: 'Protect',
          title: '02. Frontline Habitat Defense',
          subtitle: 'Rapid-response conservation & coastal interception',
          metric: '142,000 Hectares Guarded',
          description:
            'From marine plastic barriers to old-growth buffer zones, we protect vulnerable ecosystems before irreversible tipping points are reached.',
        },
        {
          id: 'action',
          word: 'Action',
          title: '03. Measurable Field Execution',
          subtitle: 'Audited quarterly with open satellite verification',
          metric: '100% Public Donation Direct-to-Field',
          description:
            'Every dollar contributed by public donors goes straight into saplings, cleanup vessels, and soil restoration tools.',
        },
        {
          id: 'nature',
          word: 'Nature',
          title: '04. Thriving Biodiversity Corridors',
          subtitle: 'Reconnecting fragmented forests, wetlands, and reefs',
          metric: '50,000+ Native Trees Planted',
          description:
            'We plant strictly native, multi-canopy species engineered by nature to restore groundwater tables and shelter wildlife.',
        },
      ],
    },
    initiativesSection: {
      heading: 'Our initiatives for 2026',
      subheading:
        'Find out what projects we are implementing to protect nature',
      categories: ['All', 'Reforestation', 'Coastal', 'Education', 'Urban'],
      col1Label: 'Title',
      col2Label: 'Focus & Reach',
      col3Label: 'Date',
      actionUnitLabel: 'native saplings pledged',
      pledgeOptions: [5, 15, 50],
      pledgeUnit: 'trees',
      rows: [
        {
          id: 'tree-planting',
          title: 'Tree planting',
          category: 'Reforestation',
          tags: ['green and cleaner', 'native canopy'],
          date: '12/03/26',
          location: 'Cascade Ridge & Urban Perimeter',
          participants: 1420,
          participantUnit: 'volunteers',
          targetGoal: '15,000 Native Saplings',
          summary:
            'Restoring degraded watershed slopes with drought-tolerant oak, pine, and birch saplings to prevent soil erosion and capture carbon.',
          highlights: [
            'Soil microbiome inoculation for 92% sapling survival rate',
            'GPS-tagged plots with quarterly drone canopy monitoring',
            'Tools, gloves, and botanical field training provided on site',
          ],
          image:
            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
          fallbackTheme: 'planting',
        },
        {
          id: 'beach-cleanup',
          title: 'Beach cleanup',
          category: 'Coastal',
          tags: ['future generations', 'marine recovery'],
          date: '29/05/26',
          location: 'Pacific Cove & Tidal Estuaries',
          participants: 980,
          participantUnit: 'volunteers',
          targetGoal: '12 Tons Marine Debris Removed',
          summary:
            'Coordinated low-tide shoreline sweeps and ghost-net extraction protecting sea turtle nesting beaches and nearshore kelp beds.',
          highlights: [
            'Sorted recovery stream for industrial ocean-plastic upcycling',
            'Microplastic sifting stations led by marine biologists',
            'Zero-waste basecamp with solar hydration stations',
          ],
          image:
            'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=600&q=80',
          fallbackTheme: 'beach',
          featured: true,
        },
        {
          id: 'educational-events',
          title: 'Educational events',
          category: 'Education',
          tags: ['courses', 'green initiatives'],
          date: '06/05/26',
          location: 'Regional Botanical Labs & Online',
          participants: 2150,
          participantUnit: 'volunteers',
          targetGoal: '85 Schools & Community Chapters',
          summary:
            'Hands-on climate literacy workshops teaching regenerative composting, urban hydrology, and local biodiversity auditing.',
          highlights: [
            'Open-source field curriculum for high schools and universities',
            'Live soil chemistry and water quality testing practicums',
            'Direct mentorship for launching student-led GreenCare chapters',
          ],
          image:
            'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
          fallbackTheme: 'education',
        },
        {
          id: 'park-cleaning',
          title: 'Park cleaning',
          category: 'Urban',
          tags: ['day off cleaning', 'urban biodiversity'],
          date: '18/08/26',
          location: 'Metropolitan Greenbelt Commons',
          participants: 760,
          participantUnit: 'volunteers',
          targetGoal: '48 Urban Parks Restored',
          summary:
            'Weekend community mobilization removing invasive weeds, clearing litter from urban creeks, and seeding native pollinator meadows.',
          highlights: [
            'Native wildflower seed-ball distribution for pollinator corridors',
            'Stream-bank stabilization along municipal walking trails',
            'Family-friendly morning shifts with local tool libraries',
          ],
          image:
            'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
          fallbackTheme: 'park',
        },
      ],
    },
    problemsSection: {
      buttonLabel: 'EXPLORE PROBLEM',
      allocationCurrency: '$',
      allocationAmounts: [15, 25, 50, 100],
      cards: [
        {
          id: 'ocean-pollution',
          title: 'Ocean Pollution',
          kicker: 'Ecological Catastrophe',
          secondaryTag: 'Pollution issues',
          statValue: '11M',
          statUnit: 'metric tons of plastic enter oceans annually',
          image:
            'https://images.unsplash.com/photo-1484291470158-b8f8d608850d?auto=format&fit=crop&w=600&q=80',
          fallbackTheme: 'ocean',
          overview:
            'Plastic gyres, discarded fishing gear, and agricultural nutrient runoff suffocate coral reefs and bioaccumulate across marine food webs.',
          rootCauses: [
            'Unintercepted riverine plastic discharge from coastal watersheds',
            'Abandoned synthetic gillnets and commercial trawl debris',
            'Chemical fertilizer runoff triggering hypoxic dead zones',
          ],
          greenCareResponse:
            'Deploying estuary boom interceptors across 18 high-flow rivers and organizing monthly volunteer coastal extraction sweeps.',
          fundedPercentage: 84,
        },
        {
          id: 'glacier-melting',
          title: 'Glacier Melting',
          kicker: 'Ecological Catastrophe',
          statValue: '267B',
          statUnit: 'tons of glacial ice lost per year globally',
          image:
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
          fallbackTheme: 'glacier',
          overview:
            'Accelerating cryosphere retreat destabilizes alpine freshwater reserves for 2 billion people and accelerates global sea-level rise.',
          rootCauses: [
            'Black-carbon soot deposition darkening reflective snowpack',
            'Rising high-altitude winter baseline temperatures',
            'Permafrost thaw releasing trapped methane in sub-arctic basins',
          ],
          greenCareResponse:
            'Eliminating regional black-carbon agricultural burning and constructing high-altitude watershed retention terraces.',
          fundedPercentage: 72,
        },
        {
          id: 'forest-clearance',
          title: 'Forest Clearance',
          kicker: 'Ecological Catastrophe',
          statValue: '10M',
          statUnit: 'hectares of primary forest lost each year',
          image:
            'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=600&q=80',
          fallbackTheme: 'forest',
          overview:
            'Clear-cutting primary rainforests and boreal timberlands destroys irreplaceable carbon sinks and fragments critical wildlife migration corridors.',
          rootCauses: [
            'Unregulated agricultural expansion and monoculture grazing',
            'Illegal logging in unmonitored buffer territories',
            'Wildfire vulnerability due to canopy fragmentation',
          ],
          greenCareResponse:
            'Funding acoustic canopy sensors for ranger patrols and replanting multi-species native buffer belts with local cooperatives.',
          fundedPercentage: 91,
        },
        {
          id: 'ghg-emissions',
          title: 'GHG Emissions',
          kicker: 'Ecological Catastrophe',
          statValue: '421',
          statUnit: 'ppm atmospheric CO2 concentration milestone',
          image:
            'https://images.unsplash.com/photo-1611270418597-a6c77f4b7271?auto=format&fit=crop&w=600&q=80',
          fallbackTheme: 'emissions',
          overview:
            'Industrial greenhouse gas emissions trap outgoing infrared radiation, intensifying extreme weather events, prolonged droughts, and ocean acidification.',
          rootCauses: [
            'Fossil-fuel combustion in power generation and heavy transport',
            'Methane leakage from municipal landfills and industrial sites',
            'Degradation of natural peatland and coastal mangrove carbon sinks',
          ],
          greenCareResponse:
            'Scaling verified blue-carbon mangrove restoration and community solar microgrids that displace diesel generators.',
          fundedPercentage: 78,
        },
      ],
    },
    impactSection: {
      headingLine1: 'Our Impact',
      headingLine2: 'in Numbers',
      description:
        'Transparency is key to our mission. Here is what we have achieved together across verified field sites.',
      stat1Initial: 50420,
      stat1Suffix: 'k+',
      stat1Label: 'Trees Planted',
      stat1Sub: 'verified saplings',
      stat2Initial: 2400000,
      stat2Currency: '$',
      stat2Label: 'Funds Raised',
      stat2Sub: '100% allocated to field work',
      stat3Value: '120',
      stat3Label: 'Global Partners',
      stat3Sub: 'Across 42 countries',
      simulatorPrompt:
        'Simulate or pledge native saplings directly to our 2026 Reforestation Corridor:',
      simulatorUnit: 'Trees',
      simulatorOptions: [10, 25, 100],
    },
    faqSection: {
      heading: 'Have Questions?',
      subheading:
        'Find answers to the most common questions about our mission.',
      items: [
        {
          id: 'volunteer',
          question: 'How can I volunteer?',
          answer:
            'It is simple! Click the "Contact Us" button in the navigation bar, fill out our volunteer application form, and our community manager will get back to you within 48 hours.',
          category: 'Participation',
        },
        {
          id: 'donations',
          question: 'Where do the donations go?',
          answer:
            '100% of public donations go directly to funding our on-the-ground projects. We cover our operational costs through private grants and corporate sponsorships.',
          category: 'Transparency',
        },
        {
          id: 'chapter',
          question: 'Can I start a local chapter?',
          answer:
            'Absolutely. We provide a starter kit and mentorship for passionate individuals looking to bring GreenCare to their local community.',
          category: 'Community',
        },
      ],
    },
    footer: {
      tag: 'Newsletter Dispatch',
      subscribeHeading:
        'Subscribe to our newsletter to get the latest updates on missions, projects & initiatives.',
      copyright: '©2026 GreenCare Foundation. All Rights Reserved.',
      contactTopics: [
        'Volunteer Application',
        'Start a Chapter',
        'Partner / Sponsor',
      ],
    },
  },
};
