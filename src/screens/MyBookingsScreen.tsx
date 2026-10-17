import React from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Video, Trash2, CalendarPlus, UserCheck } from 'lucide-react';
import { useNavigation } from '../navigation/NavigationContext';
import { AvatarWithFallback } from '../components/common/AvatarWithFallback';
import { downloadCalendarEvent } from '../utils/calendar';

export const MyBookingsScreen: React.FC = () => {
  const { goBack, bookedAppointments, cancelAppointment, navigate } = useNavigation();

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="p-2 -ml-2 rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-sm font-bold text-slate-900">My Appointments</h2>
            <p className="text-[11px] text-slate-500">{bookedAppointments.length} scheduled</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-3 pb-20">
        {bookedAppointments.length === 0 ? (
          <div className="py-16 px-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">No Appointments Booked Yet</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              You haven&apos;t scheduled any physician consultations in this session yet. Explore the directory to find a doctor.
            </p>
            <button
              onClick={() => navigate('DoctorList')}
              className="mt-4 px-4 py-2 bg-teal-700 text-white text-xs font-semibold rounded-xl hover:bg-teal-800 transition-colors shadow-xs"
            >
              Browse Doctor Directory
            </button>
          </div>
        ) : (
          bookedAppointments.map((app) => (
            <div
              key={app.id}
              className={`bg-white border rounded-2xl p-4 transition-all shadow-xs ${
                app.status === 'cancelled'
                  ? 'border-slate-200 opacity-60 bg-slate-50'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  app.status === 'cancelled'
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {app.status === 'cancelled' ? 'Cancelled' : 'Confirmed'}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {app.bookingReference}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <AvatarWithFallback
                  src={app.doctor.imageUrl}
                  name={app.doctor.name}
                  specialty={app.doctor.specialty}
                  size="md"
                  roundedClassName="rounded-xl"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{app.doctor.name}</h4>
                  <p className="text-[11px] text-slate-500 truncate">{app.doctor.specialty}</p>

                  <div className="flex items-center gap-2 mt-2 text-xs text-teal-900 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-teal-700" />
                    <span>{app.displayDate}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{app.timeSlot.time} ({app.timeSlot.period})</span>
                    <span className="text-slate-300">·</span>
                    <span className="capitalize">{app.visitType}</span>
                  </div>
                </div>
              </div>

              {app.status !== 'cancelled' && (
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => downloadCalendarEvent(app)}
                    className="text-[11px] text-teal-800 hover:text-teal-900 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <CalendarPlus className="w-3.5 h-3.5" />
                    <span>Add to Calendar</span>
                  </button>

                  <button
                    onClick={() => cancelAppointment(app.id)}
                    className="text-[11px] text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel Appointment</span>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
