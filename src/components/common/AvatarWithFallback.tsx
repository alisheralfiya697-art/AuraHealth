import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../navigation/NavigationContext';

interface AvatarWithFallbackProps {
  src: string;
  name: string;
  specialty?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  roundedClassName?: string;
}

export const AvatarWithFallback: React.FC<AvatarWithFallbackProps> = ({
  src,
  name,
  specialty,
  size = 'md',
  className = '',
  roundedClassName = 'rounded-2xl',
}) => {
  const { forceImageError } = useNavigation();
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Compute initials (e.g., "Dr. Elena Rostova" -> "ER" or "Elena Rostova" -> "ER")
  const getInitials = (fullName: string): string => {
    const cleaned = fullName.replace(/^(Dr\.|Doctor|MD|PhD|Prof\.)\s*/i, '').trim();
    const parts = cleaned.split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return (parts[0] ? parts[0].slice(0, 2) : 'DR').toUpperCase();
  };

  const initials = getInitials(name);

  // When src changes or forced error changes, reset states
  useEffect(() => {
    setLoading(true);
    if (forceImageError) {
      setHasError(true);
      setLoading(false);
    } else {
      setHasError(false);
    }
  }, [src, forceImageError]);

  const sizeDimensions = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-14 h-14 text-sm',
    lg: 'w-20 h-20 text-lg',
    xl: 'w-24 h-24 text-2xl',
  }[size];

  // Colors for initials background based on name hash for consistent friendly tones
  const colorPalettes = [
    'from-teal-600 to-emerald-700 text-white',
    'from-blue-600 to-indigo-700 text-white',
    'from-sky-600 to-cyan-700 text-white',
    'from-slate-700 to-slate-900 text-white',
    'from-emerald-600 to-teal-800 text-white',
  ];
  const charCodeSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const palette = colorPalettes[charCodeSum % colorPalettes.length];

  return (
    <div
      className={`relative shrink-0 overflow-hidden select-none bg-slate-100 ${roundedClassName} ${sizeDimensions} ${className}`}
      aria-label={`Avatar for ${name}`}
    >
      {/* Loading Skeleton */}
      {loading && !hasError && (
        <div className="absolute inset-0 z-10 animate-pulse bg-slate-200 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full border-2 border-teal-600 border-t-transparent animate-spin" />
        </div>
      )}

      {/* Main Image */}
      {!hasError && (
        <img
          src={src}
          alt={name}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setHasError(true);
          }}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}

      {/* Graceful Fallback: Initials Avatar with medical accent */}
      {hasError && (
        <div
          className={`w-full h-full bg-gradient-to-br ${palette} flex flex-col items-center justify-center font-bold tracking-tight shadow-inner`}
          title={`${name} (fallback avatar)`}
        >
          <span>{initials}</span>
          {size === 'xl' && specialty && (
            <span className="text-[10px] font-medium opacity-80 mt-0.5 tracking-normal">
              {specialty.split(' ')[0]}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
