export interface HabitDef {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
}

export interface DayRecord {
  date: string; // YYYY-MM-DD
  completedIds: string[]; // IDs of habits completed that day
}

export type HistoryMap = Record<string, string[]>; // Date -> Array of completed Habit IDs

// For canvas-confetti
declare global {
  interface Window {
    confetti: any;
  }
}