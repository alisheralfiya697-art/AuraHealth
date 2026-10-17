import React from 'react';
import { Sun, CloudSun, Moon, AlertCircle } from 'lucide-react';
import { TimeSlot } from '../../types';

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selectedSlotId: string | null;
  onSelectSlot: (slot: TimeSlot) => void;
  doctorName?: string;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  slots,
  selectedSlotId,
  onSelectSlot,
  doctorName = 'the doctor',
}) => {
  const morningSlots = slots.filter((s) => s.period === 'Morning');
  const afternoonSlots = slots.filter((s) => s.period === 'Afternoon');
  const eveningSlots = slots.filter((s) => s.period === 'Evening');

  const availableCount = slots.filter((s) => s.isAvailable).length;

  if (slots.length === 0 || availableCount === 0) {
    return (
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-center my-2">
        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-2">
          <AlertCircle className="w-5 h-5" />
        </div>
        <h4 className="text-xs font-semibold text-amber-900">No Available Time Slots</h4>
        <p className="text-xs text-amber-700 mt-1 max-w-xs mx-auto">
          All appointment times on this date are fully reserved for {doctorName}. Please select another date above to view openings.
        </p>
      </div>
    );
  }

  const renderSection = (
    title: string,
    periodSlots: TimeSlot[],
    icon: React.ReactNode
  ) => {
    if (periodSlots.length === 0) return null;

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
          <span className="text-teal-700">{icon}</span>
          <span>{title}</span>
          <span className="text-[11px] font-normal text-slate-400">
            ({periodSlots.filter((s) => s.isAvailable).length} open)
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {periodSlots.map((slot) => {
            const isSelected = selectedSlotId === slot.id;
            const isAvailable = slot.isAvailable;

            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => isAvailable && onSelectSlot(slot)}
                disabled={!isAvailable}
                aria-disabled={!isAvailable}
                className={`relative flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-xs font-medium transition-all ${
                  !isAvailable
                    ? 'bg-slate-100/80 border border-slate-200 text-slate-400 cursor-not-allowed line-through opacity-60'
                    : isSelected
                    ? 'bg-teal-700 text-white shadow-sm ring-2 ring-teal-500/20 cursor-pointer font-semibold'
                    : 'bg-white border border-slate-200 text-slate-800 hover:border-teal-400/80 hover:bg-teal-50/30 cursor-pointer'
                }`}
                title={isAvailable ? `Select ${slot.time}` : `${slot.time} - Already Booked`}
              >
                <span>{slot.time}</span>
                <span
                  className={`text-[9px] mt-0.5 tracking-tight ${
                    !isAvailable
                      ? 'text-slate-400 no-underline font-normal'
                      : isSelected
                      ? 'text-teal-100 font-normal'
                      : 'text-emerald-600 font-medium'
                  }`}
                >
                  {isAvailable ? 'Available' : 'Booked'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700 tracking-tight">Select Time Slot</label>
        <span className="text-[11px] text-teal-800 font-medium">
          {availableCount} slots available
        </span>
      </div>

      <div className="space-y-3.5">
        {renderSection('Morning Slots', morningSlots, <Sun className="w-3.5 h-3.5" />)}
        {renderSection('Afternoon Slots', afternoonSlots, <CloudSun className="w-3.5 h-3.5" />)}
        {renderSection('Evening Slots', eveningSlots, <Moon className="w-3.5 h-3.5" />)}
      </div>
    </div>
  );
};
