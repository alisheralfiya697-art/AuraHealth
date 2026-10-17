import React, { useState, useMemo } from 'react';
import { Stethoscope, Sparkles, FilterX, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useNavigation } from '../navigation/NavigationContext';
import { MOCK_DOCTORS } from '../data/mockDoctors';
import { Doctor, Specialty } from '../types';
import { SearchBar } from '../components/directory/SearchBar';
import { SpecialtyFilter } from '../components/directory/SpecialtyFilter';
import { DoctorCard } from '../components/directory/DoctorCard';
import { FlatList } from '../components/common/FlatList';

export const DoctorListScreen: React.FC = () => {
  const { navigate, forceImageError, setForceImageError } = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty>('All');
  const [onlyAvailableToday, setOnlyAvailableToday] = useState(false);

  // Compute specialty counts for the current search query
  const specialtyCounts = useMemo(() => {
    const counts: Record<Specialty, number> = {
      All: 0,
      Cardiology: 0,
      Dermatology: 0,
      Pediatrics: 0,
      Neurology: 0,
      Orthopedics: 0,
      'General Practice': 0,
      Psychiatry: 0,
      Ophthalmology: 0,
    };

    MOCK_DOCTORS.forEach((doc) => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
      const matchesToday = !onlyAvailableToday || doc.availability.status === 'Available Today';
      if (matchesSearch && matchesToday) {
        counts.All += 1;
        if (counts[doc.specialty] !== undefined) {
          counts[doc.specialty] += 1;
        }
      }
    });

    return counts;
  }, [searchQuery, onlyAvailableToday]);

  // Combined search and specialty filtering (requirement: search and specialty filters must work together)
  const filteredDoctors = useMemo(() => {
    return MOCK_DOCTORS.filter((doctor) => {
      // 1. Name filter
      const matchesName = doctor.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());

      // 2. Specialty filter
      const matchesSpecialty =
        selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;

      // 3. Availability toggle
      const matchesAvailability =
        !onlyAvailableToday || doctor.availability.status === 'Available Today';

      return matchesName && matchesSpecialty && matchesAvailability;
    });
  }, [searchQuery, selectedSpecialty, onlyAvailableToday]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSpecialty('All');
    setOnlyAvailableToday(false);
  };

  const handleDoctorPress = (doctorId: string) => {
    navigate('DoctorProfile', { doctorId });
  };

  const handleBookPress = (doctorId: string) => {
    navigate('Booking', { doctorId });
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-900 select-none">
      {/* App Header / Navigation Title Bar */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 pt-3 pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center shadow-xs">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 tracking-tight leading-tight">
                AuraHealth
              </h1>
              <p className="text-[11px] text-slate-500 font-medium">Physician Directory</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick Test Switch: Force Image Errors */}
            <button
              onClick={() => setForceImageError(prev => !prev)}
              className={`px-2.5 py-1 rounded-md text-[10px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                forceImageError
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              title="Toggle image network error simulation to test initials avatar fallback"
            >
              <AlertTriangle className="w-3 h-3" />
              <span>{forceImageError ? 'Fallback: ON' : 'Test Fallback'}</span>
            </button>

            {/* My Bookings link */}
            <button
              onClick={() => navigate('MyBookings')}
              className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 transition-colors"
            >
              My Bookings
            </button>
          </div>
        </div>

        {/* Search Field */}
        <div className="mt-2.5">
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            totalResults={filteredDoctors.length}
          />
        </div>

        {/* Specialty Filter */}
        <div className="mt-2.5">
          <SpecialtyFilter
            selectedSpecialty={selectedSpecialty}
            onSelectSpecialty={setSelectedSpecialty}
            specialtyCounts={specialtyCounts}
          />
        </div>

        {/* Quick Filter Strip */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs">
          <button
            onClick={() => setOnlyAvailableToday(prev => !prev)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
              onlyAvailableToday
                ? 'bg-emerald-100 text-emerald-800 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${onlyAvailableToday ? 'bg-emerald-600' : 'bg-slate-400'}`} />
            <span>Available Today Only</span>
          </button>

          {(searchQuery || selectedSpecialty !== 'All' || onlyAvailableToday) && (
            <button
              onClick={handleResetFilters}
              className="text-[11px] font-medium text-slate-500 hover:text-teal-700 flex items-center gap-1"
            >
              <FilterX className="w-3 h-3" />
              <span>Clear filters</span>
            </button>
          )}
        </div>
      </header>

      {/* FlatList Component for Doctor Roster */}
      <FlatList<Doctor>
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-4 pt-3 pb-8"
        onRefresh={() => {
          // Simulate pull to refresh data
          console.log('Roster refreshed');
        }}
        ListEmptyComponent={() => (
          <div className="py-12 px-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <FilterX className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">No Doctors Found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              We couldn’t find any physicians matching &ldquo;{searchQuery}&rdquo; in {selectedSpecialty}.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 bg-teal-700 text-white text-xs font-semibold rounded-xl hover:bg-teal-800 transition-colors shadow-xs"
            >
              Reset All Filters
            </button>
          </div>
        )}
        renderItem={({ item }) => (
          <DoctorCard
            doctor={item}
            onPress={handleDoctorPress}
            onBookPress={handleBookPress}
          />
        )}
      />
    </div>
  );
};
