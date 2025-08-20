'use client';

import { useState, useEffect } from 'react';

export type ViewMode = 'grid' | 'compact' | 'list';

const STORAGE_KEY = 'stories-view-mode';
const DEFAULT_VIEW_MODE: ViewMode = 'grid';

export function useViewMode() {
  const [viewMode, setViewMode] = useState<ViewMode>(DEFAULT_VIEW_MODE);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && ['grid', 'compact', 'list'].includes(saved)) {
        setViewMode(saved as ViewMode);
      }
    } catch (error) {
      console.warn('Failed to load view mode from localStorage:', error);
    }
  }, []);

  const updateViewMode = (newMode: ViewMode) => {
    setViewMode(newMode);
    try {
      localStorage.setItem(STORAGE_KEY, newMode);
    } catch (error) {
      console.warn('Failed to save view mode to localStorage:', error);
    }
  };

  return [viewMode, updateViewMode] as const;
}
