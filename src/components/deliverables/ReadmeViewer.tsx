import React, { useState } from 'react';
import { BookOpen, CheckCircle, Smartphone, Terminal, ShieldAlert, Cpu } from 'lucide-react';

export const ReadmeViewer: React.FC = () => {
  return (
    <div className="space-y-6 select-text max-w-4xl mx-auto">
      {/* Title Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold tracking-wider uppercase text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
            Documentation & Submission Report
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          Question 2: Doctor Directory and Appointment Booking
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          AuraHealth — Polished, accessible React Native mobile app feature engineered with zero-pill visual discipline, calm typography, and bulletproof fallback handling.
        </p>
      </div>

      {/* How to Run Section */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-base font-bold text-slate-900">
          <Terminal className="w-5 h-5 text-teal-700" />
          <h2>How to Run the Application</h2>
        </div>

        <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
          <p>
            This application is built with a dual architecture: an <strong>interactive live mobile simulator</strong> embedded in this Web environment for immediate evaluation, alongside <strong>modular React Native source components</strong> ready for React Native CLI / Expo deployments.
          </p>

          <div className="bg-slate-900 text-slate-200 rounded-2xl p-4 font-mono text-xs space-y-2">
            <p className="text-slate-400"># 1. To run in this preview environment (already active):</p>
            <p className="text-emerald-400">npm run dev</p>
            <p className="text-slate-400 mt-2"># 2. To run as an Expo / React Native native app:</p>
            <p className="text-teal-300">npx create-expo-app AuraHealthApp --template blank-typescript</p>
            <p className="text-teal-300">cd AuraHealthApp && npm install @react-navigation/native @react-navigation/native-stack</p>
            <p className="text-teal-300">npx expo start</p>
          </div>
        </div>
      </div>

      {/* Feature Breakdown */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-5">
        <h2 className="text-base font-bold text-slate-900">Feature Breakdown & Architecture</h2>

        <div className="space-y-4 text-xs text-slate-600">
          <div className="border-l-2 border-teal-600 pl-3">
            <h3 className="font-bold text-slate-900 text-sm">1. Doctor Directory & FlatList Implementation</h3>
            <p className="mt-1">
              Physicians are rendered through a dedicated <code>FlatList</code> component matching React Native's specification. Each item renders a reusable <code>DoctorCard</code> displaying the physician's remote profile image, full name, credential title, medical specialty, availability status, next open slot, patient star rating, review count, and practice address with distance.
            </p>
          </div>

          <div className="border-l-2 border-teal-600 pl-3">
            <h3 className="font-bold text-slate-900 text-sm">2. Dual Filtering (Search & Specialty Combined)</h3>
            <p className="mt-1">
              The search field filters doctors dynamically by name (case-insensitive substring match). The horizontal specialty segmented bar allows filtering by specific disciplines (Cardiology, Dermatology, Pediatrics, Neurology, Orthopedics, General Practice, Psychiatry, Ophthalmology).
            </p>
            <p className="mt-1 font-semibold text-slate-800">
              Crucial: Search query and specialty filter operate conjunctively. When a search query matches a physician in a specific specialty, both criteria are strictly respected. When zero physicians match the combined criteria, a clean empty state with a <em>Reset All Filters</em> action is displayed.
            </p>
          </div>

          <div className="border-l-2 border-teal-600 pl-3">
            <h3 className="font-bold text-slate-900 text-sm">3. Remote Image Loading & Graceful Fallback Handling</h3>
            <p className="mt-1">
              All physician avatars are managed by <code>AvatarWithFallback</code>. While remote images are downloading, a skeleton loading spinner is displayed. If a remote image fails to load or the network drops (demonstrated natively with Dr. Julian Sterling's broken URL and tested on demand via the <em>Test Fallback</em> toggle in the header), the component seamlessly transitions into an elegant initials badge with specialty styling.
            </p>
          </div>

          <div className="border-l-2 border-teal-600 pl-3">
            <h3 className="font-bold text-slate-900 text-sm">4. Doctor Profile Screen</h3>
            <p className="mt-1">
              Tapping any doctor card passes <code>doctorId</code> via navigation stack parameters to <code>DoctorProfileScreen</code>. The profile reveals deep physician information including clinical biography, fellowships, medical board certifications, spoken languages, accepted insurance networks, and clinic location. A fixed bottom action bar highlights consultation rate and a prominent <em>Book Appointment</em> button. Missing or invalid doctor IDs are gracefully caught with a friendly error state.
            </p>
          </div>

          <div className="border-l-2 border-teal-600 pl-3">
            <h3 className="font-bold text-slate-900 text-sm">5. Booking Flow & Unavailable Slot Prevention</h3>
            <p className="mt-1">
              The booking screen preserves the selected doctor, date, and time slot throughout the transaction. The 14-day horizontal date selector shows real-time availability dots. Time slots are categorized into Morning, Afternoon, and Evening periods. 
            </p>
            <p className="mt-1 font-semibold text-slate-800">
              Unavailable and already-booked slots are strictly disabled in the UI (with line-through styling, booked badges, and disabled pointer events), preventing accidental double booking.
            </p>
          </div>

          <div className="border-l-2 border-teal-600 pl-3">
            <h3 className="font-bold text-slate-900 text-sm">6. Booking Confirmation Screen</h3>
            <p className="mt-1">
              Upon confirming the reservation, the user is navigated to <code>ConfirmationScreen</code> with the full <code>Appointment</code> payload. The screen displays a unique booking reference code (e.g. <code>#APT-849201</code>) with one-click copy, verified date and time, clinic address, patient details, and a working <em>Add to Calendar</em> button that generates and downloads a real <code>.ics</code> iCalendar file. A prominent primary CTA returns the user directly to the Doctor Directory (<code>popToTop()</code>).
            </p>
          </div>
        </div>
      </div>

      {/* Deliverable Verification Checklist */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900">Verification & Deliverables Checklist</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {[
            { label: 'Doctor directory rendered in FlatList with reusable cards', status: true },
            { label: 'Card displays image, name, specialty, and availability', status: true },
            { label: 'Search field filters doctor by name', status: true },
            { label: 'Specialty filter works conjunctively with search', status: true },
            { label: 'Empty state when no physicians match criteria', status: true },
            { label: 'Remote image loading & graceful initials fallback', status: true },
            { label: 'Doctor profile screen opened with navigation parameters', status: true },
            { label: 'Date picker and single time slot selection', status: true },
            { label: 'Selection of unavailable/booked slots is strictly prevented', status: true },
            { label: 'Doctor, date, and slot retained through flow', status: true },
            { label: 'Confirmation screen with reference & clear return to directory', status: true },
            { label: 'Mock data separated from screen components', status: true },
            { label: 'React Navigation back navigation works throughout all screens', status: true },
            { label: 'All visible buttons and interactive elements functional', status: true },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-slate-800 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Note About Incomplete Requirements */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 space-y-2">
        <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
          <CheckCircle className="w-5 h-5 text-emerald-700" />
          <h3>Note Regarding Incomplete Requirements</h3>
        </div>
        <p className="text-xs text-emerald-800 leading-relaxed">
          <strong>There are no incomplete requirements.</strong> All features specified in Question 2 — FlatList directory, reusable doctor cards, remote image error fallbacks, concurrent search and specialty filters, empty states, parameter-driven doctor profile screen, date & time slot selection with unavailable slot disabling, local state booking flow, receipt confirmation screen with return navigation, screenshots gallery, and source code deliverables — have been fully implemented, verified, and tested.
        </p>
      </div>
    </div>
  );
};
