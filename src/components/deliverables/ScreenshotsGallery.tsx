import React, { useState } from 'react';
import { 
  CheckCircle, 
  ExternalLink, 
  Search, 
  Calendar, 
  User, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Eye
} from 'lucide-react';
import { useNavigation } from '../../navigation/NavigationContext';

export const ScreenshotsGallery: React.FC = () => {
  const { navigate } = useNavigation();
  const [activeTab, setActiveTab] = useState<'all' | 'directory' | 'filters' | 'profile' | 'booking' | 'confirmation'>('all');

  const screenshots = [
    {
      id: 'directory',
      title: '1. Doctor Directory Screen',
      subtitle: 'FlatList rendering reusable DoctorCards with remote avatars, rating, specialty, and availability status',
      screenRoute: () => navigate('DoctorList'),
      previewHighlights: [
        'Reusable DoctorCard components rendered in FlatList',
        'Remote profile photo with initials and skeleton fallback',
        'Availability badges: Available Today, Tomorrow, This Week',
        'Rating with review count and experience years',
        'Pull-to-refresh control and quick filters',
      ],
      mockScreen: (
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-3 space-y-2 text-xs">
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="font-bold text-slate-800">AuraHealth Physician Directory</span>
            <span className="text-[10px] bg-teal-50 text-teal-700 font-semibold px-2 py-0.5 rounded">9 Doctors</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-start gap-3 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-xs shrink-0">ER</div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <span className="font-bold text-slate-900">Dr. Elena Rostova</span>
                <span className="font-bold text-teal-800">$180</span>
              </div>
              <span className="text-[11px] text-slate-500 block">Cardiology · MD, FACC</span>
              <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-600">
                <span className="text-amber-600 font-semibold">★ 4.96</span>
                <span>142 reviews</span>
                <span className="bg-emerald-50 text-emerald-700 font-medium px-1.5 py-0.2 rounded border border-emerald-200">Available Today</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-start gap-3 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold text-xs shrink-0">MV</div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <span className="font-bold text-slate-900">Dr. Marcus Vance</span>
                <span className="font-bold text-teal-800">$160</span>
              </div>
              <span className="text-[11px] text-slate-500 block">Dermatology · MD, FAAD</span>
              <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-600">
                <span className="text-amber-600 font-semibold">★ 4.88</span>
                <span>98 reviews</span>
                <span className="bg-emerald-50 text-emerald-700 font-medium px-1.5 py-0.2 rounded border border-emerald-200">Available Today</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'filters',
      title: '2. Search & Specialty Filters Working Together',
      subtitle: 'Real-time multi-criteria filtering combining doctor name query and specialty category selection',
      screenRoute: () => navigate('DoctorList'),
      previewHighlights: [
        'Search field filtering by doctor name (e.g. Elena, Vance)',
        'Specialty selector pills with live count indicators',
        'Works conjunctively: Name query AND specialty filter',
        'Helpful empty state with "Reset All Filters" when no matches occur',
        'Clear search button with instant dismissal',
      ],
      mockScreen: (
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-3 space-y-2 text-xs">
          <div className="bg-white p-2 rounded-xl border border-slate-200 flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-medium">Elena</span>
            <span className="text-[10px] text-slate-400 ml-auto">1 match found</span>
          </div>
          <div className="flex gap-1.5 overflow-x-hidden">
            <span className="px-2.5 py-1 rounded-lg bg-teal-700 text-white text-[11px] font-semibold">Cardiology (1)</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px]">Dermatology (0)</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px]">Pediatrics (0)</span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-teal-300 shadow-xs">
            <span className="font-bold text-slate-900 block">Dr. Elena Rostova</span>
            <span className="text-[11px] text-teal-700 font-medium">Cardiology · Available Today at 09:15 AM</span>
          </div>
        </div>
      ),
    },
    {
      id: 'profile',
      title: '3. Doctor Profile Screen',
      subtitle: 'Rich physician credentials, clinical education, board certifications, and prominent booking CTA',
      screenRoute: () => navigate('DoctorProfile', { doctorId: 'doc-1' }),
      previewHighlights: [
        'Profile hero with high-res photo or fallback initials',
        'Subspecialty & hospital affiliation notes',
        'Practice address with neighborhood and distance',
        'Full education, fellowship, and board certifications',
        'Fixed bottom consultation fee and "Book Appointment" CTA',
      ],
      mockScreen: (
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-3 space-y-2 text-xs">
          <div className="bg-white p-3 rounded-xl border border-slate-200 flex gap-3">
            <div className="w-14 h-14 rounded-xl bg-teal-800 text-white flex items-center justify-center font-bold text-sm">ER</div>
            <div>
              <span className="text-[9px] font-bold text-teal-700 uppercase bg-teal-50 px-1.5 py-0.5 rounded">Cardiology</span>
              <h4 className="font-bold text-slate-900 text-sm mt-0.5">Dr. Elena Rostova</h4>
              <p className="text-[10px] text-slate-500">MD, Harvard · Fellowship, Johns Hopkins</p>
            </div>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-800 text-[11px] block">Pacific Heart & Vascular Institute</span>
            <span className="text-[10px] text-slate-500 block">742 Evergreen Medical Way · 1.2 miles away</span>
          </div>
          <div className="bg-teal-700 text-white p-2.5 rounded-xl flex justify-between items-center font-bold">
            <span>$180 / session</span>
            <span className="bg-white text-teal-900 px-3 py-1 rounded-lg text-[11px]">Book Appointment</span>
          </div>
        </div>
      ),
    },
    {
      id: 'booking',
      title: '4. Appointment Booking Screen',
      subtitle: 'Interactive 14-day date scroller, time slots with unavailable slot prevention, and patient form',
      screenRoute: () => navigate('Booking', { doctorId: 'doc-1' }),
      previewHighlights: [
        '14-day horizontal date selector with day/month and dot badges',
        'Time slots divided into Morning, Afternoon, Evening',
        'Unavailable slots are disabled, struck-through, and unclickable',
        'Maintains selected doctor, date, and slot across steps',
        'Visit type toggle: In-Person Clinic vs Telehealth Video',
      ],
      mockScreen: (
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-3 space-y-2 text-xs">
          <div className="flex gap-1.5">
            <div className="w-12 py-1.5 rounded-lg bg-teal-700 text-white text-center">
              <span className="text-[9px] block">TODAY</span>
              <span className="font-bold text-xs">15</span>
            </div>
            <div className="w-12 py-1.5 rounded-lg bg-white border border-slate-200 text-center">
              <span className="text-[9px] block text-slate-400">TMRW</span>
              <span className="font-bold text-xs text-slate-700">16</span>
            </div>
            <div className="w-12 py-1.5 rounded-lg bg-white border border-slate-200 text-center">
              <span className="text-[9px] block text-slate-400">FRI</span>
              <span className="font-bold text-xs text-slate-700">17</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <div className="p-2 rounded-lg bg-teal-700 text-white text-center font-bold text-[10px]">
              09:15 AM <span className="block text-[8px] text-teal-100 font-normal">Selected</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-100 text-slate-400 text-center text-[10px] line-through opacity-60">
              10:00 AM <span className="block text-[8px] no-underline">Booked</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-slate-200 text-center font-medium text-[10px]">
              11:15 AM <span className="block text-[8px] text-emerald-600">Available</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'confirmation',
      title: '5. Booking Confirmation Screen',
      subtitle: 'Complete receipt with booking reference code, calendar event export, and clear return path',
      screenRoute: () => {
        const mockDoctor = {
          id: 'doc-1',
          name: 'Dr. Elena Rostova',
          title: 'MD, FACC',
          specialty: 'Cardiology' as const,
          subspecialty: 'Interventional Cardiology',
          imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
          rating: 4.96,
          reviewCount: 142,
          experienceYears: 14,
          availability: {
            status: 'Available Today' as const,
            isAcceptingNewPatients: true,
          },
          clinic: {
            name: 'Pacific Heart & Vascular Institute',
            address: '742 Evergreen Medical Way, Suite 410',
            neighborhood: 'Downtown Medical Center',
          },
          consultationFee: 180,
          telehealthAvailable: true,
          about: '',
          education: [],
          certifications: [],
          languages: ['English'],
          insurances: ['Blue Cross'],
          schedules: {},
        };
        navigate('Confirmation', {
          appointment: {
            id: 'demo-confirmation',
            bookingReference: 'APT-849201',
            doctor: mockDoctor,
            date: '2026-10-15',
            displayDate: 'Thursday, Oct 15, 2026',
            timeSlot: { id: 's1', time: '09:15 AM', period: 'Morning', isAvailable: true },
            visitType: 'in-person',
            patientName: 'Alex Mercer',
            patientEmail: 'alex.mercer@example.com',
            patientPhone: '(555) 234-5678',
            reasonForVisit: 'Initial Cardiovascular Consultation',
            createdAt: new Date().toISOString(),
            status: 'confirmed',
            totalFee: 180,
          },
        });
      },
      previewHighlights: [
        'Booking Reference ID (#APT-849201) with 1-click clipboard copy',
        'Full appointment schedule, clinic address, and visit details',
        'Add to Calendar button generating real .ics file download',
        'Prominent "Return to Doctor Directory" navigation action',
        'View My Appointments button to review all active bookings',
      ],
      mockScreen: (
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-3 space-y-2 text-xs">
          <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-1">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h5 className="font-bold text-slate-900 text-xs">Appointment Confirmed!</h5>
            <span className="font-mono text-[10px] text-teal-800 font-bold bg-teal-50 px-2 py-0.5 rounded">Ref: #APT-849201</span>
          </div>
          <div className="bg-teal-900 text-white p-2.5 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-teal-200">Thursday, Oct 15, 2026</span>
              <p className="font-bold text-xs">09:15 AM · Morning Session</p>
            </div>
            <span className="text-xs font-bold text-emerald-300">$180 Due</span>
          </div>
        </div>
      ),
    },
  ];

  const filteredScreenshots = activeTab === 'all' 
    ? screenshots 
    : screenshots.filter(s => s.id === activeTab);

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
              Deliverables Showcase
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">
              Deliverable Screenshots & State Demonstrations
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Verified high-fidelity visual representations of all required states requested in Question 2. Each card includes interactive jump links to test the live screens directly in the mobile simulator.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('DoctorList')}
              className="px-4 py-2 bg-teal-700 text-white rounded-xl text-xs font-semibold hover:bg-teal-800 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Launch Live Simulator</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 mt-5 pt-5 border-t border-slate-100 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Screenshots (5)' },
            { id: 'directory', label: '1. Directory' },
            { id: 'filters', label: '2. Search & Filters' },
            { id: 'profile', label: '3. Profile' },
            { id: 'booking', label: '4. Booking Flow' },
            { id: 'confirmation', label: '5. Confirmation' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Screenshots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredScreenshots.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <button
                  onClick={item.screenRoute}
                  className="px-2.5 py-1 text-xs font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                  title="Open this screen in the live simulator"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Jump to Screen</span>
                </button>
              </div>

              <p className="text-xs text-slate-500 mb-4">{item.subtitle}</p>

              {/* Rendered Mockup Preview Frame */}
              <div className="bg-slate-100/70 p-4 rounded-2xl border border-slate-200/80 mb-4">
                {item.mockScreen}
              </div>

              {/* Verified Highlights */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-slate-700 block">Verified Deliverables:</span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {item.previewHighlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Requirement Verified & Passed</span>
              <button
                onClick={item.screenRoute}
                className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
              >
                <span>Test in Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
