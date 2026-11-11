import React, { useState } from 'react';

export type FallbackTheme =
  | 'desert'
  | 'ocean'
  | 'glacier'
  | 'forest'
  | 'emissions'
  | 'planting'
  | 'beach'
  | 'education'
  | 'park'
  | 'avatar1'
  | 'avatar2'
  | 'avatar3'
  | 'avatar4';

const SVG_FALLBACKS: Record<FallbackTheme, string> = {
  desert: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#E6C79C"/>
          <stop offset="55%" stop-color="#D49B6A"/>
          <stop offset="100%" stop-color="#8C583A"/>
        </linearGradient>
        <linearGradient id="dune1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#C88A55"/>
          <stop offset="100%" stop-color="#7F4B2B"/>
        </linearGradient>
        <linearGradient id="dune2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#B07240"/>
          <stop offset="100%" stop-color="#5E341B"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#sky)"/>
      <circle cx="880" cy="210" r="78" fill="#FFF3D6" opacity="0.65"/>
      <path d="M0 490 Q 340 370 720 470 T 1200 430 L 1200 800 L 0 800 Z" fill="url(#dune1)"/>
      <path d="M0 580 Q 460 440 880 560 T 1200 510 L 1200 800 L 0 800 Z" fill="url(#dune2)"/>
      <path d="M180 650 Q 560 550 1200 640 L 1200 800 L 0 800 Z" fill="#432411" opacity="0.75"/>
    </svg>
  `)}`,
  ocean: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
      <defs>
        <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0D3B4C"/>
          <stop offset="50%" stop-color="#0A5C66"/>
          <stop offset="100%" stop-color="#06232B"/>
        </linearGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#oceanGrad)"/>
      <path d="M0 320 Q 200 270 400 320 T 800 300 L 800 1000 L 0 1000 Z" fill="#127475" opacity="0.35"/>
      <path d="M0 500 Q 260 450 520 510 T 800 490 L 800 1000 L 0 1000 Z" fill="#0E4749" opacity="0.6"/>
      <circle cx="620" cy="180" r="120" fill="#D9F99D" opacity="0.12"/>
    </svg>
  `)}`,
  glacier: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
      <defs>
        <linearGradient id="glacierGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1E3A5F"/>
          <stop offset="60%" stop-color="#3B6998"/>
          <stop offset="100%" stop-color="#0F2036"/>
        </linearGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#glacierGrad)"/>
      <polygon points="80,680 310,280 540,680" fill="#B6D6F2" opacity="0.45"/>
      <polygon points="320,700 560,240 780,700" fill="#DFF0FF" opacity="0.55"/>
      <polygon points="-40,720 190,390 420,720" fill="#7FAED9" opacity="0.5"/>
      <rect y="680" width="800" height="320" fill="#0B192C"/>
    </svg>
  `)}`,
  forest: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
      <defs>
        <linearGradient id="forestGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#132A13"/>
          <stop offset="55%" stop-color="#254D27"/>
          <stop offset="100%" stop-color="#0B1A0B"/>
        </linearGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#forestGrad)"/>
      <path d="M0 440 Q 240 340 480 420 T 800 390 L 800 1000 L 0 1000 Z" fill="#31572C" opacity="0.5"/>
      <path d="M0 600 Q 300 510 600 590 T 800 560 L 800 1000 L 0 1000 Z" fill="#1B3B1A" opacity="0.8"/>
      <circle cx="220" cy="240" r="90" fill="#D9F99D" opacity="0.18"/>
    </svg>
  `)}`,
  emissions: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
      <defs>
        <linearGradient id="emGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#2B2D42"/>
          <stop offset="55%" stop-color="#3F4259"/>
          <stop offset="100%" stop-color="#151722"/>
        </linearGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#emGrad)"/>
      <circle cx="480" cy="300" r="160" fill="#9CA3AF" opacity="0.18"/>
      <circle cx="340" cy="420" r="120" fill="#D9F99D" opacity="0.1"/>
      <path d="M0 680 L 800 580 L 800 1000 L 0 1000 Z" fill="#1B1D2B"/>
    </svg>
  `)}`,
  planting: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <rect width="600" height="400" fill="#1F3B2C"/>
      <circle cx="300" cy="200" r="110" fill="#D9F99D" opacity="0.22"/>
      <path d="M0 290 Q 300 220 600 290 L 600 400 L 0 400 Z" fill="#13261B"/>
    </svg>
  `)}`,
  beach: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <rect width="600" height="400" fill="#164E63"/>
      <path d="M0 240 Q 300 190 600 250 L 600 400 L 0 400 Z" fill="#D9C398" opacity="0.75"/>
    </svg>
  `)}`,
  education: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <rect width="600" height="400" fill="#1E293B"/>
      <circle cx="420" cy="140" r="85" fill="#D9F99D" opacity="0.28"/>
      <path d="M0 300 L 600 240 L 600 400 L 0 400 Z" fill="#0F172A"/>
    </svg>
  `)}`,
  park: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <rect width="600" height="400" fill="#2D4A22"/>
      <circle cx="180" cy="150" r="90" fill="#D9F99D" opacity="0.25"/>
      <path d="M0 270 Q 300 210 600 280 L 600 400 L 0 400 Z" fill="#1A2E13"/>
    </svg>
  `)}`,
  avatar1: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
      <rect width="120" height="120" rx="60" fill="#1F2937"/>
      <circle cx="60" cy="46" r="22" fill="#D9F99D"/>
      <path d="M22 108 C 22 78, 98 78, 98 108" fill="#D9F99D"/>
    </svg>
  `)}`,
  avatar2: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
      <rect width="120" height="120" rx="60" fill="#065F46"/>
      <circle cx="60" cy="46" r="22" fill="#ECFDF5"/>
      <path d="M22 108 C 22 78, 98 78, 98 108" fill="#ECFDF5"/>
    </svg>
  `)}`,
  avatar3: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
      <rect width="120" height="120" rx="60" fill="#374151"/>
      <circle cx="60" cy="46" r="22" fill="#F3F4F6"/>
      <path d="M22 108 C 22 78, 98 78, 98 108" fill="#F3F4F6"/>
    </svg>
  `)}`,
  avatar4: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
      <rect width="120" height="120" rx="60" fill="#1E3A8A"/>
      <circle cx="60" cy="46" r="22" fill="#DBEAFE"/>
      <path d="M22 108 C 22 78, 98 78, 98 108" fill="#DBEAFE"/>
    </svg>
  `)}`,
};

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTheme?: FallbackTheme;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackTheme = 'forest',
  className = '',
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src || SVG_FALLBACKS[fallbackTheme]);

  return (
    <img
      {...rest}
      src={imgSrc}
      alt={alt || 'GreenCare environmental visual'}
      referrerPolicy="no-referrer"
      onError={() => {
        if (imgSrc !== SVG_FALLBACKS[fallbackTheme]) {
          setImgSrc(SVG_FALLBACKS[fallbackTheme]);
        }
      }}
      className={className}
    />
  );
};
