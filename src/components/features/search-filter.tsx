"use client";

import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { FilterState, ContributionType, Difficulty } from '@/types';

interface SearchFilterProps {
  onSearch: (filters: FilterState) => void;
}

const contributionAreas: ContributionType[] = [
  'Documentation',
  'Testing',
  'Bug Reports',
  'Translation',
  'User Feedback'
];

const difficulties: Difficulty[] = ['Beginner', 'Intermediate', 'Advanced'];
const languages = ['JavaScript', 'Python', 'Java', 'Ruby', 'Go', 'Rust'];

export function SearchFilter({ onSearch }: SearchFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    selectedAreas: [],
    difficulty: [],
    language: [],
  });

  const toggleFilter = (type: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = prev[type] as string[];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      
      const newFilters = {
        ...prev,
        [type]: updated
      } as FilterState; // Type assertion to ensure proper typing
      
      onSearch(newFilters);
      return newFilters;
    });
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      searchTerm: e.target.value
    };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  return (
    <div className="space-y-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      {/* Search Input */}
      <div>
        <div className="relative">
          <input
            type="text"
            className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 dark:text-white placeholder-gray-500 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search projects..."
            value={filters.searchTerm}
            onChange={handleSearchInput}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Contribution Areas */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Contribution Areas
        </h3>
        <div className="flex flex-wrap gap-2">
          {contributionAreas.map(area => (
            <Badge
              key={area}
              variant={filters.selectedAreas.includes(area) ? "default" : "secondary"}
              className="cursor-pointer"
              interactive
              onClick={() => toggleFilter('selectedAreas', area)}
            >
              {area}
            </Badge>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Difficulty Level
        </h3>
        <div className="flex flex-wrap gap-2">
          {difficulties.map(level => (
            <Badge
              key={level}
              variant={filters.difficulty.includes(level) ? "default" : "secondary"}
              className="cursor-pointer"
              interactive
              onClick={() => toggleFilter('difficulty', level)}
            >
              {level}
            </Badge>
          ))}
        </div>
      </div>

      {/* Programming Languages */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Programming Languages
        </h3>
        <div className="flex flex-wrap gap-2">
          {languages.map(lang => (
            <Badge
              key={lang}
              variant={filters.language.includes(lang) ? "default" : "secondary"}
              className="cursor-pointer"
              interactive
              onClick={() => toggleFilter('language', lang)}
            >
              {lang}
            </Badge>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const clearedFilters: FilterState = {
              searchTerm: '',
              selectedAreas: [],
              difficulty: [],
              language: [],
            };
            setFilters(clearedFilters);
            onSearch(clearedFilters);
          }}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
