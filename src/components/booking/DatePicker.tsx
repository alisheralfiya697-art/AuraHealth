import React from 'react';
import { getDateString } from '../../data/mockDoctors';
import { Doctor } from '../../types';

interface DatePickerProps {
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (date: string) => void;
  doctor?: Doctor;
  daysCount?: number;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onSelectDate,
  doctor,
  daysCount = 14,
}) => {
  // Generate date list
  const dates = Array.from({ length: daysCount }).map((_, i) => {
    const dateStr = getDateString(i);
    const parts = dateStr.split('-');
    const dateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));

    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tmrw' : dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = dateObj.getDate();
    const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' });

    // Check availability for this date
    const slots = doctor?.schedules[dateStr] || [];
    const hasAvailableSlots = slots.some(s => s.isAvailable);

    return {
      dateStr,
      dayName,
      dayNumber,
      monthName,
      hasAvailableSlots,
      slotCount: slots.filter(s => s.isAvailable).length,
    };
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold text-slate-700 tracking-tight">Select Appointment Date</label>
        <span className="text-[11px] text-slate-500">14-day schedule</span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-1 px-1">
        {dates.map((item) => {
          const isSelected = selectedDate === item.dateStr;
          return (
            <button
              key={item.dateStr}
              type="button"
              onClick={() => onSelectDate(item.dateStr)}
              className={`shrink-0 flex flex-col items-center justify-center w-14 py-2.5 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-teal-700 border-teal-700 text-white shadow-sm ring-2 ring-teal-500/20'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className={`text-[10px] font-semibold tracking-wider uppercase ${
                isSelected ? 'text-teal-100' : 'text-slate-400'
              }`}>
                {item.dayName}
              </span>
              <span className={`text-base font-bold my-0.5 tabular-nums ${
                isSelected ? 'text-white' : 'text-slate-900'
              }`}>
                {item.dayNumber}
              </span>
              <span className={`text-[10px] font-medium ${
                isSelected ? 'text-teal-200' : 'text-slate-500'
              }`}>
                {item.monthName}
              </span>

              {/* Availability Indicator dot */}
              <div className="mt-1 flex items-center justify-center h-1.5">
                {item.hasAvailableSlots ? (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? 'bg-emerald-300' : 'bg-emerald-500'
                    }`}
                    title={`${item.slotCount} slots available`}
                  />
                ) : (
                  <span
                    className={`w-1 h-1 rounded-full ${
                      isSelected ? 'bg-teal-300/40' : 'bg-slate-300'
                    }`}
                    title="No slots"
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
