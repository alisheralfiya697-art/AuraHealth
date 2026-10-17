import React from 'react';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  Award, 
  GraduationCap, 
  Globe2, 
  ShieldCheck, 
  Video, 
  PhoneCall, 
  Share2,
  AlertCircle
} from 'lucide-react';
import { useNavigation, useRoute } from '../navigation/NavigationContext';
import { MOCK_DOCTORS } from '../data/mockDoctors';
import { AvatarWithFallback } from '../components/common/AvatarWithFallback';

export const DoctorProfileScreen: React.FC = () => {
  const { navigate, goBack } = useNavigation();
  const route = useRoute<'DoctorProfile'>();
  const { doctorId } = route.params || {};

  // Retrieve doctor from state/dataset
  const doctor = MOCK_DOCTORS.find((d) => d.id === doctorId);

  // Gracefully handle missing doctor details
  if (!doctor) {
    return (
      <div className="flex flex-col h-full bg-slate-50 text-slate-900">
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3">
          <button
            onClick={goBack}
            className="p-2 -ml-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-semibold text-slate-900">Physician Profile</h2>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-3">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Doctor Profile Not Found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs">
            We couldn’t retrieve the medical records for this provider ID ({doctorId || 'unknown'}). It may have been moved or archived.
          </p>
          <button
            onClick={goBack}
            className="mt-4 px-4 py-2 bg-teal-700 text-white text-xs font-semibold rounded-xl hover:bg-teal-800 transition-colors"
          >
            Return to Doctor Directory
          </button>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    navigate('Booking', { doctorId: doctor.id });
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-900">
      {/* Top Navigation Bar with Back Button */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="p-2 -ml-2 rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
            aria-label="Back to Directory"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-slate-900 truncate">{doctor.name}</h2>
            <p className="text-[11px] text-slate-500 truncate">{doctor.specialty}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `${doctor.name} - ${doctor.specialty}`,
                  text: `Book an appointment with ${doctor.name} at ${doctor.clinic.name}`,
                  url: window.location.href,
                }).catch(() => {});
              } else {
                navigator.clipboard?.writeText(window.location.href);
              }
            }}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Share doctor profile"
            title="Share profile link"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Scrollable Profile Body */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-4 pb-24">
        {/* Hero Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
          <div className="flex items-start gap-4">
            <AvatarWithFallback
              src={doctor.imageUrl}
              name={doctor.name}
              specialty={doctor.specialty}
              size="xl"
              roundedClassName="rounded-2xl"
            />

            <div className="flex-1 min-w-0">
              <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md mb-1">
                {doctor.specialty}
              </span>
              <h1 className="text-base font-bold text-slate-900 leading-snug">
                {doctor.name}
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                {doctor.title}
              </p>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                {doctor.subspecialty}
              </p>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 text-center">
            <div className="bg-slate-50 rounded-xl p-2">
              <div className="flex items-center justify-center gap-1 text-xs font-bold text-slate-900">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{doctor.rating.toFixed(2)}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium">{doctor.reviewCount} reviews</span>
            </div>

            <div className="bg-slate-50 rounded-xl p-2">
              <div className="text-xs font-bold text-slate-900">
                {doctor.experienceYears}+ Yrs
              </div>
              <span className="text-[10px] text-slate-500 font-medium">Experience</span>
            </div>

            <div className="bg-slate-50 rounded-xl p-2">
              <div className="text-xs font-bold text-teal-800">
                ${doctor.consultationFee}
              </div>
              <span className="text-[10px] text-slate-500 font-medium">Consult Fee</span>
            </div>
          </div>
        </div>

        {/* Availability Banner */}
        <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-900">{doctor.availability.status}</p>
              <p className="text-[11px] text-emerald-700">
                {doctor.availability.nextAvailableSlot || 'Accepting consultations'}
              </p>
            </div>
          </div>
          {doctor.telehealthAvailable && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-800 bg-white/80 px-2 py-1 rounded-lg border border-teal-200">
              <Video className="w-3 h-3 text-teal-600" />
              <span>Telehealth</span>
            </span>
          )}
        </div>

        {/* Practice Location */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-2">
            <MapPin className="w-4 h-4 text-teal-700" />
            <span>Practice & Clinic Location</span>
          </div>
          <p className="text-xs font-semibold text-slate-800">{doctor.clinic.name}</p>
          <p className="text-xs text-slate-500 mt-0.5">{doctor.clinic.address}</p>
          <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-600">
            <span>Neighborhood: <strong className="text-slate-800">{doctor.clinic.neighborhood}</strong></span>
            {doctor.clinic.distance && (
              <span>Distance: <strong className="text-slate-800">{doctor.clinic.distance}</strong></span>
            )}
          </div>
        </div>

        {/* Biography & Approach */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <h3 className="text-xs font-bold text-slate-900 mb-2">About Physician</h3>
          <p className="text-xs text-slate-600 leading-relaxed">{doctor.about}</p>
        </div>

        {/* Education & Training */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-2.5">
            <GraduationCap className="w-4 h-4 text-teal-700" />
            <span>Education & Fellowships</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {doctor.education.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-teal-700 mt-0.5 font-bold">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Board Certifications */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-2.5">
            <Award className="w-4 h-4 text-teal-700" />
            <span>Board Certifications</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {doctor.certifications.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-teal-700 mt-0.5 font-bold">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Languages & Accepted Insurances */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-2">
              <Globe2 className="w-3.5 h-3.5 text-teal-700" />
              <span>Languages</span>
            </div>
            <p className="text-xs text-slate-600">{doctor.languages.join(', ')}</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
              <span>Insurances</span>
            </div>
            <p className="text-xs text-slate-600 truncate">{doctor.insurances.slice(0, 3).join(', ')} +more</p>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Booking Bar */}
      <div className="sticky bottom-0 left-0 right-0 p-3.5 bg-white/95 backdrop-blur-md border-t border-slate-200 flex items-center justify-between gap-3 shadow-lg z-20">
        <div>
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">Consultation</span>
          <span className="text-base font-bold text-slate-900 tabular-nums">
            ${doctor.consultationFee}
          </span>
          <span className="text-[11px] text-slate-500 font-normal"> / session</span>
        </div>

        <button
          onClick={handleBookNow}
          disabled={doctor.availability.status === 'Fully Booked'}
          className={`flex-1 max-w-xs h-12 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            doctor.availability.status === 'Fully Booked'
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-teal-700 text-white hover:bg-teal-800 active:scale-[0.98] shadow-md shadow-teal-900/10'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{doctor.availability.status === 'Fully Booked' ? 'Fully Booked' : 'Book Appointment'}</span>
        </button>
      </div>
    </div>
  );
};
