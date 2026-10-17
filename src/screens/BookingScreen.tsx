import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useNavigation, useRoute } from '../navigation/NavigationContext';
import { MOCK_DOCTORS, getDateString, formatDisplayDate } from '../data/mockDoctors';
import { TimeSlot, Appointment } from '../types';
import { AvatarWithFallback } from '../components/common/AvatarWithFallback';
import { DatePicker } from '../components/booking/DatePicker';
import { TimeSlotPicker } from '../components/booking/TimeSlotPicker';

export const BookingScreen: React.FC = () => {
  const { navigate, goBack, addAppointment } = useNavigation();
  const route = useRoute<'Booking'>();
  const { doctorId, preselectedDate, preselectedSlotId } = route.params || {};

  const doctor = MOCK_DOCTORS.find((d) => d.id === doctorId);

  // Initial date: today (or preselected)
  const initialDate = preselectedDate || getDateString(0);
  const [selectedDate, setSelectedDate] = useState<string>(initialDate);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  // Visit type: in-person or telehealth (if doctor supports)
  const [visitType, setVisitType] = useState<'in-person' | 'telehealth'>(
    doctor?.telehealthAvailable ? 'in-person' : 'in-person'
  );

  // Patient Details Form
  const [patientName, setPatientName] = useState('Alex Mercer');
  const [patientEmail, setPatientEmail] = useState('alex.mercer@example.com');
  const [patientPhone, setPatientPhone] = useState('(555) 234-5678');
  const [reasonForVisit, setReasonForVisit] = useState('Initial Consultation & Diagnostic Evaluation');
  const [patientNotes, setPatientNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Available slots for the currently selected date
  const dateSlots = useMemo(() => {
    if (!doctor) return [];
    return doctor.schedules[selectedDate] || [];
  }, [doctor, selectedDate]);

  // When date changes, reset selected slot if it doesn't match
  const handleSelectDate = (newDate: string) => {
    setSelectedDate(newDate);
    setSelectedSlot(null);
    setErrorMsg(null);
  };

  const handleSelectSlot = (slot: TimeSlot) => {
    if (!slot.isAvailable) return; // Prevent selection of unavailable slots
    setSelectedSlot(slot);
    setErrorMsg(null);
  };

  // Missing doctor guard
  if (!doctor) {
    return (
      <div className="flex flex-col h-full bg-slate-50 text-slate-900">
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3">
          <button onClick={goBack} className="p-2 -ml-2 rounded-xl text-slate-700 hover:bg-slate-100">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-semibold">Book Appointment</h2>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <AlertCircle className="w-8 h-8 text-rose-500 mb-2" />
          <h3 className="text-sm font-bold text-slate-900">Physician Not Selected</h3>
          <p className="text-xs text-slate-500 mt-1">Please return to the directory and select a physician to schedule an appointment.</p>
          <button
            onClick={goBack}
            className="mt-4 px-4 py-2 bg-teal-700 text-white text-xs font-semibold rounded-xl"
          >
            Return to Directory
          </button>
        </div>
      </div>
    );
  }

  const handleConfirmBooking = () => {
    if (!selectedDate) {
      setErrorMsg('Please select an appointment date.');
      return;
    }
    if (!selectedSlot) {
      setErrorMsg('Please select an available time slot.');
      return;
    }
    if (!patientName.trim()) {
      setErrorMsg('Please enter the patient full name.');
      return;
    }

    // Generate appointment record
    const refNumber = `APT-${Math.floor(100000 + Math.random() * 900000)}`;
    const newAppointment: Appointment = {
      id: `app-${Date.now()}`,
      bookingReference: refNumber,
      doctor,
      date: selectedDate,
      displayDate: formatDisplayDate(selectedDate),
      timeSlot: selectedSlot,
      visitType,
      patientName: patientName.trim(),
      patientEmail: patientEmail.trim(),
      patientPhone: patientPhone.trim(),
      reasonForVisit,
      notes: patientNotes.trim(),
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      totalFee: doctor.consultationFee,
    };

    // Save to local state
    addAppointment(newAppointment);

    // Navigate to confirmation screen with appointment data
    navigate('Confirmation', { appointment: newAppointment });
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="p-2 -ml-2 rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
            aria-label="Back to Doctor Profile"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Schedule Appointment</h2>
            <p className="text-[11px] text-slate-500">{doctor.name} · {doctor.specialty}</p>
          </div>
        </div>
      </header>

      {/* Main Form Body */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-4 pb-28">
        {/* Doctor Summary Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center gap-3 shadow-xs">
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
            <p className="text-[10px] text-slate-400 truncate mt-0.5">{doctor.clinic.name}</p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs font-bold text-teal-800">${doctor.consultationFee}</span>
            <span className="block text-[9px] text-slate-400">Fixed rate</span>
          </div>
        </div>

        {/* Visit Type Selector */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <label className="text-xs font-semibold text-slate-700 tracking-tight block mb-2">
            Consultation Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setVisitType('in-person')}
              className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                visitType === 'in-person'
                  ? 'bg-teal-50 border-teal-600 text-teal-900 font-semibold ring-1 ring-teal-600'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${visitType === 'in-person' ? 'bg-teal-700 text-white' : 'bg-slate-200 text-slate-600'}`}>
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs block">In-Person</span>
                <span className="text-[10px] font-normal text-slate-500 block truncate">At clinic office</span>
              </div>
            </button>

            <button
              type="button"
              disabled={!doctor.telehealthAvailable}
              onClick={() => doctor.telehealthAvailable && setVisitType('telehealth')}
              className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all ${
                !doctor.telehealthAvailable
                  ? 'bg-slate-100/50 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                  : visitType === 'telehealth'
                  ? 'bg-teal-50 border-teal-600 text-teal-900 font-semibold ring-1 ring-teal-600 cursor-pointer'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${visitType === 'telehealth' ? 'bg-teal-700 text-white' : 'bg-slate-200 text-slate-600'}`}>
                <Video className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs block">Telehealth</span>
                <span className="text-[10px] font-normal text-slate-500 block truncate">
                  {doctor.telehealthAvailable ? 'Secure video call' : 'Unavailable'}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Date Selection */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <DatePicker
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
            doctor={doctor}
          />
        </div>

        {/* Time Slot Selection */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <TimeSlotPicker
            slots={dateSlots}
            selectedSlotId={selectedSlot?.id || null}
            onSelectSlot={handleSelectSlot}
            doctorName={doctor.name}
          />
        </div>

        {/* Patient Contact & Details */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <User className="w-3.5 h-3.5 text-teal-700" />
            <span>Patient Information</span>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              Full Legal Name *
            </label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
              placeholder="e.g. Alex Mercer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                placeholder="alex@example.com"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                placeholder="(555) 000-0000"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              Primary Reason for Visit
            </label>
            <select
              value={reasonForVisit}
              onChange={(e) => setReasonForVisit(e.target.value)}
              className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
            >
              <option value="Initial Consultation & Diagnostic Evaluation">Initial Consultation & Diagnostic Evaluation</option>
              <option value="Follow-up Routine Check">Follow-up Routine Check</option>
              <option value="Second Opinion on Diagnosis">Second Opinion on Diagnosis</option>
              <option value="Medication Refill or Adjustment">Medication Refill or Adjustment</option>
              <option value="Preventative Health Wellness Exam">Preventative Health Wellness Exam</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              Optional Medical Notes / Symptoms
            </label>
            <textarea
              rows={2}
              value={patientNotes}
              onChange={(e) => setPatientNotes(e.target.value)}
              placeholder="Describe any existing symptoms, current prescriptions, or allergies..."
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 resize-none"
            />
          </div>
        </div>

        {/* Validation Error Message */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Sticky Bottom Confirmation Bar */}
      <div className="sticky bottom-0 left-0 right-0 p-3.5 bg-white/95 backdrop-blur-md border-t border-slate-200 flex items-center justify-between gap-3 shadow-lg z-20">
        <div className="min-w-0">
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
            {selectedSlot ? `${formatDisplayDate(selectedDate).split(',')[0]} · ${selectedSlot.time}` : 'Pick slot'}
          </span>
          <span className="text-base font-bold text-slate-900 tabular-nums">
            ${doctor.consultationFee}
          </span>
          <span className="text-[10px] text-slate-500"> (Pay at clinic)</span>
        </div>

        <button
          onClick={handleConfirmBooking}
          disabled={!selectedSlot}
          className={`flex-1 max-w-xs h-12 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            !selectedSlot
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-teal-700 text-white hover:bg-teal-800 active:scale-[0.98] shadow-md shadow-teal-900/10'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{selectedSlot ? 'Confirm & Book' : 'Select Time Slot'}</span>
        </button>
      </div>
    </div>
  );
};
