import { HistoryMap, DayRecord } from '../types';
import { APP_STORAGE_KEY } from '../constants';

export const getTodayStr = (): string => {
  // Use locale string to handle local timezone correctly for "today"
  const date = new Date();
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - (offset * 60 * 1000));
  return localDate.toISOString().split('T')[0];
};

export const loadHistory = (): HistoryMap => {
  try {
    const raw = localStorage.getItem(APP_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse history", e);
    return {};
  }
};

export const saveHistory = (history: HistoryMap) => {
  localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(history));
};

export const getTodayHabits = (history: HistoryMap): string[] => {
  const today = getTodayStr();
  return history[today] || [];
};

export const toggleHabitInStorage = (habitId: string): { newHistory: HistoryMap, isCompleted: boolean } => {
  const history = loadHistory();
  const today = getTodayStr();
  
  const currentCompleted = history[today] || [];
  let newCompleted: string[];

  const isCompleted = currentCompleted.includes(habitId);

  if (isCompleted) {
    newCompleted = currentCompleted.filter(id => id !== habitId);
  } else {
    newCompleted = [...currentCompleted, habitId];
  }

  const newHistory = {
    ...history,
    [today]: newCompleted
  };

  saveHistory(newHistory);
  
  return { newHistory, isCompleted: !isCompleted };
};