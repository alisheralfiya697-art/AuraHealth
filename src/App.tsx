import React, { useState } from 'react';
import { 
  Smartphone, 
  Layers, 
  FileCode2, 
  BookOpen, 
  RotateCcw, 
  AlertTriangle, 
  Maximize2, 
  Minimize2,
  Stethoscope,
  Wifi,
  Battery,
  Signal
} from 'lucide-react';
import { NavigationProvider, useNavigation } from './navigation/NavigationContext';
import { DoctorListScreen } from './screens/DoctorListScreen';
import { DoctorProfileScreen } from './screens/DoctorProfileScreen';
import { BookingScreen } from './screens/BookingScreen';
import { ConfirmationScreen } from './screens/ConfirmationScreen';
import { MyBookingsScreen } from './screens/MyBookingsScreen';
import { ScreenshotsGallery } from './components/deliverables/ScreenshotsGallery';
import { CodeViewer } from './components/deliverables/CodeViewer';
import { ReadmeViewer } from './components/deliverables/ReadmeViewer';

type WorkspaceTab = 'simulator' | 'screenshots' | 'code' | 'readme';

const MobileScreenRouter: React.FC = () => {
  const { currentRoute } = useNavigation();

  switch (currentRoute) {
    case 'DoctorList':
      return <DoctorListScreen />;
    case 'DoctorProfile':
      return <DoctorProfileScreen />;
    case 'Booking':
      return <BookingScreen />;
    case 'Confirmation':
      return <ConfirmationScreen />;
    case 'MyBookings':
      return <MyBookingsScreen />;
    default:
      return <DoctorListScreen />;
  }
};

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('simulator');
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(true);
  const { popToTop, forceImageError, setForceImageError } = useNavigation();

  return (
    <div className="min-h-screen bg-slate-100/80 text-slate-900 flex flex-col font-sans">
      {/* Top Bar Contract: Brand — Nav Links — Primary Action */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold shadow-xs">
              <Stethoscope className="w-4 h-4" />
            </div>
            <span className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap">
              AuraHealth
            </span>
            <span className="hidden sm:inline-block text-[11px] font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/60">
              React Native Challenge
            </span>
          </div>

          {/* Zone 2: Clean single-line navigation tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {[
              { id: 'simulator', label: 'Mobile Simulator', icon: Smartphone },
              { id: 'screenshots', label: 'Deliverable Screenshots', icon: Layers },
              { id: 'code', label: 'Source Code', icon: FileCode2 },
              { id: 'readme', label: 'README & Specs', icon: BookOpen },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as WorkspaceTab)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary quick controls */}
          <div className="flex items-center gap-2 shrink-0">
            {activeTab === 'simulator' && (
              <>
                {/* Fallback image toggle */}
                <button
                  onClick={() => setForceImageError(prev => !prev)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    forceImageError
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  title="Simulate network failure to test initials/placeholder avatar fallback"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">{forceImageError ? 'Fallback: ON' : 'Test Fallback'}</span>
                </button>

                {/* Frame mode toggle */}
                <button
                  onClick={() => setDeviceFrameMode(prev => !prev)}
                  className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                  title={deviceFrameMode ? 'Switch to responsive fluid view' : 'Switch to phone mockup frame'}
                >
                  {deviceFrameMode ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>

                {/* Reset Simulator to Roster */}
                <button
                  onClick={popToTop}
                  className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                  title="Reset simulator to Doctor Directory"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace Canvas */}
      <main className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
        {activeTab === 'simulator' && (
          <div className="flex-1 flex flex-col items-center justify-center">
            {deviceFrameMode ? (
              /* Mobile Phone Mockup (iPhone 16 Pro styling) */
              <div className="relative w-full max-w-[420px] h-[820px] bg-slate-900 rounded-[50px] p-3 shadow-2xl ring-1 ring-slate-800/80 transition-all flex flex-col">
                {/* Outer bezel highlights */}
                <div className="absolute inset-0 rounded-[50px] pointer-events-none ring-1 ring-white/10" />

                {/* Side volume / power button notches */}
                <div className="absolute -left-1 top-24 w-1 h-8 bg-slate-700 rounded-l-sm" />
                <div className="absolute -left-1 top-36 w-1 h-12 bg-slate-700 rounded-l-sm" />
                <div className="absolute -left-1 top-52 w-1 h-12 bg-slate-700 rounded-l-sm" />
                <div className="absolute -right-1 top-32 w-1 h-16 bg-slate-700 rounded-r-sm" />

                {/* Screen Enclosure */}
                <div className="relative flex-1 bg-white rounded-[40px] overflow-hidden flex flex-col shadow-inner">
                  {/* Status Bar */}
                  <div className="h-10 bg-white px-6 pt-2 flex items-center justify-between text-slate-900 text-xs font-semibold z-30 select-none">
                    <span>9:41</span>
                    {/* Dynamic Island */}
                    <div className="w-24 h-5 bg-slate-950 rounded-full flex items-center justify-end px-2">
                      <div className="w-2 h-2 rounded-full bg-teal-500/80 animate-pulse mr-0.5" />
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-800">
                      <Signal className="w-3 h-3" />
                      <Wifi className="w-3 h-3" />
                      <Battery className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Mobile Screen App Router */}
                  <div className="flex-1 overflow-hidden flex flex-col relative">
                    <MobileScreenRouter />
                  </div>

                  {/* Home Indicator Bar */}
                  <div className="h-5 bg-white flex items-center justify-center z-30 select-none">
                    <div className="w-32 h-1 bg-slate-300 rounded-full" />
                  </div>
                </div>
              </div>
            ) : (
              /* Full Width Responsive View */
              <div className="w-full max-w-2xl h-[780px] bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden flex flex-col">
                <MobileScreenRouter />
              </div>
            )}

            {/* Quick helper tip below simulator */}
            <div className="mt-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
              <span>Try searching for doctor names, filtering by specialty, or clicking &ldquo;Test Fallback&rdquo; to test avatar errors.</span>
            </div>
          </div>
        )}

        {activeTab === 'screenshots' && <ScreenshotsGallery />}
        {activeTab === 'code' && <CodeViewer />}
        {activeTab === 'readme' && <ReadmeViewer />}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}
