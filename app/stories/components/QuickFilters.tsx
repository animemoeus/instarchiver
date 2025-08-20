'use client';

import { Button } from '@/components/ui/button';

interface QuickFiltersProps {
  onQuickFilter: (dateFrom?: string, dateTo?: string) => void;
  className?: string;
}

export function QuickFilters({ onQuickFilter, className }: QuickFiltersProps) {
  const getDateRange = (type: 'today' | 'week' | 'month'): [string, string] => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (type) {
      case 'today': {
        const todayStr = today.toISOString().split('T')[0];
        return [todayStr, todayStr];
      }
      case 'week': {
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        const weekAgoStr = weekAgo.toISOString().split('T')[0];
        const todayStr = today.toISOString().split('T')[0];
        return [weekAgoStr, todayStr];
      }
      case 'month': {
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        const monthAgoStr = monthAgo.toISOString().split('T')[0];
        const todayStr = today.toISOString().split('T')[0];
        return [monthAgoStr, todayStr];
      }
    }
  };

  const handleQuickFilter = (type: 'today' | 'week' | 'month') => {
    const [from, to] = getDateRange(type);
    onQuickFilter(from, to);
  };

  const handleClearFilters = () => {
    onQuickFilter(undefined, undefined);
  };

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 ${className || ''}`}>
      <span className="text-sm font-medium text-text shrink-0">Quick Filters:</span>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="neutral"
          size="sm"
          onClick={() => handleQuickFilter('today')}
          className="text-xs font-bold"
        >
          Today
        </Button>
        <Button
          variant="neutral"
          size="sm"
          onClick={() => handleQuickFilter('week')}
          className="text-xs font-bold"
        >
          Last 7 Days
        </Button>
        <Button
          variant="neutral"
          size="sm"
          onClick={() => handleQuickFilter('month')}
          className="text-xs font-bold"
        >
          Last 30 Days
        </Button>
        <Button
          variant="neutral"
          size="sm"
          onClick={handleClearFilters}
          className="text-xs font-bold text-red-600 hover:bg-red-50"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
