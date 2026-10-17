import React from 'react';
import { Star, MapPin, Calendar, Clock, ChevronRight, Video } from 'lucide-react';
import { Doctor } from '../../types';
import { AvatarWithFallback } from '../common/AvatarWithFallback';

interface DoctorCardProps {
  doctor: Doctor;
  onPress: (doctorId: string) => void;
  onBookPress?: (doctorId: string) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onPress,
  onBookPress,
}) => {
  const getAvailabilityBadge = () => {
    switch (doctor.availability.status) {
      case 'Available Today':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500',
          label: 'Available Today',
        };
      case 'Available Tomorrow':
        return {
          bg: 'bg-teal-50 text-teal-800 border-teal-200',
          dot: 'bg-teal-500',
          label: 'Available Tomorrow',
        };
      case 'Next Available This Week':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500',
          label: 'This Week',
        };
      case 'Fully Booked':
      default:
        return {
          bg: 'bg-slate-100 text-slate-600 border-slate-200',
          dot: 'bg-slate-400',
          label: 'Fully Booked',
        };
    }
  };

  const badge = getAvailabilityBadge();

  return (
    <div
      onClick={() => onPress(doctor.id)}
      className="group relative bg-white border border-slate-200 rounded-2xl p-4 transition-all duration-200 hover:border-teal-400/80 hover:shadow-sm active:scale-[0.99] cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPress(doctor.id);
        }
      }}
      aria-label={`View profile for ${doctor.name}, ${doctor.specialty}`}
    >
      <div className="flex items-start gap-3.5">
        {/* Remote Profile Avatar with Graceful Fallback */}
        <div className="relative">
          <AvatarWithFallback
            src={doctor.imageUrl}
            name={doctor.name}
            specialty={doctor.specialty}
            size="lg"
            roundedClassName="rounded-xl"
          />
          {doctor.telehealthAvailable && (
            <div
              className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-xs border border-slate-100 text-teal-700"
              title="Telehealth video appointments available"
            >
              <Video className="w-3 h-3" />
            </div>
          )}
        </div>

        {/* Doctor Information */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 group-hover:text-teal-900 transition-colors truncate">
                {doctor.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium truncate">
                {doctor.specialty} · <span className="text-slate-400 font-normal">{doctor.title}</span>
              </p>
            </div>

            {/* Subtle Chevron indicator */}
            <div className="text-slate-300 group-hover:text-teal-600 transition-colors pt-0.5">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Rating, Experience & Reviews */}
          <div className="flex items-center gap-2 mt-2 text-xs text-slate-600">
            <div className="flex items-center gap-1 font-semibold text-amber-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{doctor.rating.toFixed(2)}</span>
            </div>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500">{doctor.reviewCount} reviews</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500">{doctor.experienceYears}y exp</span>
          </div>

          {/* Clinic & Distance */}
          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{doctor.clinic.neighborhood}</span>
            {doctor.clinic.distance && (
              <>
                <span className="text-slate-300">·</span>
                <span className="shrink-0 font-medium text-slate-600">{doctor.clinic.distance}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-3 border-t border-slate-100" />

      {/* Bottom Bar: Availability Status & Action */}
      <div className="flex items-center justify-between gap-2">
        {/* Availability Status */}
        <div className="flex items-center gap-2 min-w-0">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${badge.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
            <span className="truncate">{badge.label}</span>
          </span>
          {doctor.availability.nextAvailableSlot && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-500 truncate">
              <Clock className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{doctor.availability.nextAvailableSlot}</span>
            </span>
          )}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-semibold text-slate-900 tabular-nums">
            ${doctor.consultationFee}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onBookPress) {
                onBookPress(doctor.id);
              } else {
                onPress(doctor.id);
              }
            }}
            disabled={doctor.availability.status === 'Fully Booked'}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              doctor.availability.status === 'Fully Booked'
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-teal-700 text-white hover:bg-teal-800 active:scale-95 shadow-xs'
            }`}
          >
            <Calendar className="w-3 h-3" />
            <span>{doctor.availability.status === 'Fully Booked' ? 'Unavailable' : 'Book'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
