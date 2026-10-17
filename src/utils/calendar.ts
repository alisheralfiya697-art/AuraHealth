import { Appointment } from '../types';

export function downloadCalendarEvent(appointment: Appointment) {
  const { doctor, date, timeSlot, bookingReference, visitType, patientName } = appointment;

  // Approximate start and end datetime
  // date: YYYY-MM-DD, timeSlot.time: "09:15 AM"
  const [timePart, modifier] = timeSlot.time.split(' ');
  const [hoursStr, minutesStr] = timePart.split(':');
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  const dateClean = date.replace(/-/g, '');
  const startHours = String(hours).padStart(2, '0');
  const startMinutes = String(minutes).padStart(2, '0');
  const startString = `${dateClean}T${startHours}${startMinutes}00`;

  // End time (+45 minutes)
  const endTotalMinutes = hours * 60 + minutes + 45;
  const endHours = Math.floor(endTotalMinutes / 60) % 24;
  const endMinutes = endTotalMinutes % 60;
  const endString = `${dateClean}T${String(endHours).padStart(2, '0')}${String(endMinutes).padStart(2, '0')}00`;

  const location = visitType === 'in-person'
    ? `${doctor.clinic.name}, ${doctor.clinic.address}`
    : 'AuraHealth Telehealth Video Room';

  const description = `Doctor Appointment with ${doctor.name} (${doctor.specialty}). Booking Ref: ${bookingReference}. Patient: ${patientName}. Consultation Fee: $${doctor.consultationFee}.`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AuraHealth//Doctor Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${bookingReference}@aurahealth.app`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${startString}`,
    `DTEND:${endString}`,
    `SUMMARY:Medical Consult: ${doctor.name} (${doctor.specialty})`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${bookingReference}_doctor_appointment.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
