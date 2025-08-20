'use client';

import { useState, useEffect } from 'react';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DateRangePickerProps {
  onDateRangeChange: (dateFrom?: string, dateTo?: string) => void;
  className?: string;
}

export function DateRangePicker({ onDateRangeChange, className }: DateRangePickerProps) {
  const [date, setDate] = useState<DateRange | undefined>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (date?.from && date?.to) {
      const fromDate = date.from.toISOString().split('T')[0];
      const toDate = date.to.toISOString().split('T')[0];
      onDateRangeChange(fromDate, toDate);
    } else if (date?.from && !date?.to) {
      const fromDate = date.from.toISOString().split('T')[0];
      onDateRangeChange(fromDate, fromDate);
    } else {
      onDateRangeChange(undefined, undefined);
    }
  }, [date, onDateRangeChange]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const getDisplayText = () => {
    if (!date?.from) {
      return 'Pick date range';
    }

    if (date.from && !date.to) {
      return formatDate(date.from);
    }

    if (date.from && date.to) {
      return `${formatDate(date.from)} - ${formatDate(date.to)}`;
    }

    return 'Pick date range';
  };

  const clearDateRange = () => {
    setDate(undefined);
    setIsOpen(false);
  };

  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-center gap-2', className)}>
      <span className="text-sm font-medium text-text shrink-0">Date Range:</span>

      <div className="flex gap-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="neutral"
              className={cn(
                'justify-start text-left font-normal min-w-[240px]',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {getDisplayText()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
            {date && (
              <div className="p-3 border-t">
                <Button variant="neutral" size="sm" onClick={clearDateRange} className="w-full">
                  Clear Date Range
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>

        {date && (
          <Button variant="neutral" size="sm" onClick={clearDateRange} className="px-2">
            ✕
          </Button>
        )}
      </div>
    </div>
  );
}
