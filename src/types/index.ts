export type Specialty = 
  | 'All'
  | 'Cardiology'
  | 'Dermatology'
  | 'Pediatrics'
  | 'Neurology'
  | 'Orthopedics'
  | 'General Practice'
  | 'Psychiatry'
  | 'Ophthalmology';

export type AvailabilityStatus = 
  | 'Available Today'
  | 'Available Tomorrow'
  | 'Next Available This Week'
  | 'Fully Booked';

export interface TimeSlot {
  id: string;
  time: string; // e.g. "09:00 AM"
  period: 'Morning' | 'Afternoon' | 'Evening';
  isAvailable: boolean;
}

export interface DaySchedule {
  date: string; // "YYYY-MM-DD"
  slots: TimeSlot[];
}

export interface Doctor {
  id: string;
  name: string;
  title: string; // "MD, FACC"
  specialty: Specialty;
  subspecialty: string;
  imageUrl: string;
  rating: number; // 4.9
  reviewCount: number;
  experienceYears: number;
  availability: {
    status: AvailabilityStatus;
    isAcceptingNewPatients: boolean;
    nextAvailableSlot?: string;
  };
  clinic: {
    name: string;
    address: string;
    neighborhood: string;
    distance?: string;
  };
  consultationFee: number;
  telehealthAvailable: boolean;
  about: string;
  education: string[];
  certifications: string[];
  languages: string[];
  insurances: string[];
  schedules: Record<string, TimeSlot[]>; // date string YYYY-MM-DD -> TimeSlot[]
}

export interface Appointment {
  id: string;
  bookingReference: string;
  doctor: Doctor;
  date: string; // "YYYY-MM-DD"
  displayDate: string; // "Thursday, Oct 16, 2026"
  timeSlot: TimeSlot;
  visitType: 'in-person' | 'telehealth';
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  reasonForVisit: string;
  notes?: string;
  createdAt: string;
  status: 'confirmed' | 'cancelled';
  totalFee: number;
}

export type RootStackParamList = {
  DoctorList: undefined;
  DoctorProfile: { doctorId: string };
  Booking: { doctorId: string; preselectedDate?: string; preselectedSlotId?: string };
  Confirmation: { appointment: Appointment };
  MyBookings: undefined;
};
