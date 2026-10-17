import React from 'react';
import { Specialty } from '../../types';
import { SPECIALTIES_LIST } from '../../data/mockDoctors';

interface SpecialtyFilterProps {
  selectedSpecialty: Specialty;
  onSelectSpecialty: (specialty: Specialty) => void;
  specialtyCounts?: Record<Specialty, number>;
}

export const SpecialtyFilter: React.FC<SpecialtyFilterProps> = ({
  selectedSpecialty,
  onSelectSpecialty,
  specialtyCounts,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2 px-0.5">
        <span className="text-xs font-semibold text-slate-700 tracking-tight">Specialty Filter</span>
        {selectedSpecialty !== 'All' && (
          <button
            onClick={() => onSelectSpecialty('All')}
            className="text-[11px] font-medium text-teal-700 hover:text-teal-800 transition-colors"
          >
            Reset to All
          </button>
        )}
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
        {SPECIALTIES_LIST.map((item) => {
          const isSelected = selectedSpecialty === item.id;
          const count = specialtyCounts ? specialtyCounts[item.id] : undefined;

          return (
            <button
              key={item.id}
              onClick={() => onSelectSpecialty(item.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                isSelected
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
              }`}
            >
              <span>{item.label}</span>
              {typeof count === 'number' && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums font-semibold ${
                    isSelected ? 'bg-teal-800/80 text-teal-100' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
