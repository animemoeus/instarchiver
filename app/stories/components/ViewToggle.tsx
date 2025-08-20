'use client';

import { Button } from '@/components/ui/button';
import { Grid3X3, List, LayoutGrid } from 'lucide-react';
import { ViewMode } from './StoriesGrid';

interface ViewToggleProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  const viewOptions = [
    {
      id: 'grid' as ViewMode,
      icon: Grid3X3,
      label: 'Grid',
      description: 'Large cards with full details',
    },
    {
      id: 'compact' as ViewMode,
      icon: LayoutGrid,
      label: 'Compact',
      description: 'Small cards for quick scanning',
    },
    {
      id: 'list' as ViewMode,
      icon: List,
      label: 'List',
      description: 'Horizontal layout',
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
      <span className="text-sm font-medium text-text shrink-0">View:</span>
      <div className="flex gap-1 bg-secondary border-2 border-border p-1 rounded">
        {viewOptions.map(({ id, icon: Icon, label }) => (
          <Button
            key={id}
            variant={currentView === id ? 'default' : 'neutral'}
            size="sm"
            onClick={() => onViewChange(id)}
            className={`flex items-center gap-1.5 px-2 py-1 h-8 ${
              currentView === id
                ? 'bg-main border-2 border-border shadow-[2px_2px_0_0_rgba(0,0,0,1)]'
                : 'hover:bg-main/10'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-bold">{label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
