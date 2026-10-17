import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  totalResults?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search doctors by name (e.g. Elena, Vance)...',
  totalResults,
}) => {
  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <div className="absolute left-3.5 pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder={placeholder}
          className="w-full h-11 pl-10 pr-10 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all"
          aria-label="Search doctors by name"
        />
        {value.length > 0 && (
          <button
            onClick={() => onChangeText('')}
            className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
            aria-label="Clear search query"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      {typeof totalResults === 'number' && (
        <div className="flex items-center justify-between mt-1.5 px-1 text-[11px] text-slate-500">
          <span>{totalResults} {totalResults === 1 ? 'physician available' : 'physicians available'}</span>
          {value && (
            <span className="text-teal-700 font-medium">Filtering by &ldquo;{value}&rdquo;</span>
          )}
        </div>
      )}
    </div>
  );
};
