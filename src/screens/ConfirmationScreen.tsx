import React, { useState } from 'react';
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  User, 
  Copy, 
  Check, 
  CalendarPlus, 
  ArrowLeft,
  Share2
} from 'lucide-react';
import { useNavigation, useRoute } from '../navigation/NavigationContext';
import { AvatarWithFallback } from '../components/common/AvatarWithFallback';
import { downloadCalendarEvent } from '../utils/calendar';

export const ConfirmationScreen: React.FC = () => {
  const { popToTop, navigate } = useNavigation();
  const route = useRoute<'Confirmation'>();
  const { appointment } = route.params || {};

  const [copied, setCopied] = useState(false);

  if (!appointment) {
    return (
      <div className="flex flex-col h-full bg-slate-50 items-center justify-center p-6 text-center">
        <h3 className="text-sm font-bold text-slate-900">No Booking Details Found</h3>
        <button
          onClick={popToTop}
          className="mt-4 px-4 py-2 bg-teal-700 text-white text-xs font-semibold rounded-xl"
        >
          Return to Doctor Directory
        </button>
      </div>
    );
  }

  const { doctor, bookingReference, date, displayDate, timeSlot, visitType, patientName, patientEmail, patientPhone, reasonForVisit, totalFee } = appointment;

  const handleCopyRef = () => {
    navigator.clipboard?.writeText(bookingReference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCalendar = () => {
    downloadCalendarEvent(appointment);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-900">
      {/* Top Header */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={popToTop}
            className="p-2 -ml-2 rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
            aria-label="Back to Directory"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-bold text-slate-900">Booking Confirmation</h2>
        </div>
      </header>

      {/* Confirmation Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-5 space-y-4 pb-28">
        {/* Success Hero Badge */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h1 className="text-lg font-bold text-slate-900">
            Appointment Confirmed!
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Your consultation request has been reserved with {doctor.name}. A confirmation email has been dispatched.
          </p>

          {/* Reference Badge */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <span className="text-slate-500 font-medium">Booking Ref:</span>
            <span className="font-mono font-bold text-slate-900">{bookingReference}</span>
            <button
              onClick={handleCopyRef}
              className="p-1 text-slate-400 hover:text-teal-700 transition-colors ml-1 cursor-pointer"
              title="Copy reference code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Date & Time Highlight Card */}
        <div className="bg-gradient-to-br from-teal-800 to-teal-950 text-white rounded-2xl p-4 shadow-sm">
          <div className="text-[11px] font-semibold text-teal-200 uppercase tracking-wider mb-2">
            Reserved Slot
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
              <Calendar className="w-5 h-5 text-teal-200" />
            </div>
            <div>
              <p className="text-sm font-bold">{displayDate}</p>
              <div className="flex items-center gap-1.5 text-xs text-teal-100 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-teal-300" />
                <span className="font-semibold">{timeSlot.time}</span>
                <span className="text-teal-400">·</span>
                <span className="text-teal-200 capitalize">{timeSlot.period} Session</span>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor & Location Details */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-3">
            <AvatarWithFallback
              src={doctor.imageUrl}
              name={doctor.name}
              specialty={doctor.specialty}
              size="md"
              roundedClassName="rounded-xl"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-bold text-slate-900 truncate">{doctor.name}</h3>
              <p className="text-[11px] text-slate-500 truncate">{doctor.specialty} · {doctor.title}</p>
              <p className="text-[10px] text-teal-800 font-semibold">{doctor.clinic.name}</p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
            <div className="flex items-start gap-2 text-slate-600">
              {visitType === 'in-person' ? (
                <>
                  <MapPin className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">In-Person Consultation</span>
                    <span className="text-slate-500 text-[11px]">{doctor.clinic.address}</span>
                  </div>
                </>
              ) : (
                <>
                  <Video className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Telehealth Video Call</span>
                    <span className="text-slate-500 text-[11px]">Video link will be active 10 minutes prior to session</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Patient Details Summary */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2.5">
          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-teal-700" />
            <span>Patient Information</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Name</span>
              <span className="font-medium text-slate-800">{patientName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Phone</span>
              <span className="font-medium text-slate-800">{patientPhone || 'Not provided'}</span>
            </div>
            <div className="col-span-2">
              <span className="text-[10px] text-slate-400 block uppercase">Email</span>
              <span className="font-medium text-slate-800 truncate block">{patientEmail}</span>
            </div>
            <div className="col-span-2">
              <span className="text-[10px] text-slate-400 block uppercase">Reason</span>
              <span className="font-medium text-slate-800">{reasonForVisit}</span>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-slate-100/70 rounded-2xl p-4 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500 block">Estimated Consultation</span>
            <span className="text-[10px] text-slate-400">Payment due upon arrival / claims</span>
          </div>
          <span className="text-base font-bold text-slate-900 tabular-nums">
            ${totalFee}
          </span>
        </div>

        {/* Add to Calendar Action */}
        <button
          onClick={handleDownloadCalendar}
          className="w-full py-3 px-4 rounded-xl border border-teal-200 bg-teal-50/60 hover:bg-teal-100/80 text-teal-900 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <CalendarPlus className="w-4 h-4 text-teal-700" />
          <span>Add to Calendar (.ics download)</span>
        </button>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="sticky bottom-0 left-0 right-0 p-3.5 bg-white/95 backdrop-blur-md border-t border-slate-200 flex flex-col sm:flex-row items-center gap-2.5 shadow-lg z-20">
        <button
          onClick={() => navigate('MyBookings')}
          className="w-full sm:w-auto flex-1 h-11 rounded-xl text-xs font-semibold bg-slate-100 text-slate-800 hover:bg-slate-200 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center"
        >
          View My Bookings
        </button>
        <button
          onClick={popToTop}
          className="w-full sm:w-auto flex-1 h-11 rounded-xl text-xs font-bold bg-teal-700 text-white hover:bg-teal-800 active:scale-[0.98] shadow-md shadow-teal-900/10 transition-all cursor-pointer flex items-center justify-center"
        >
          Return to Doctor Directory
        </button>
      </div>
    </div>
  );
};
