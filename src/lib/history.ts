/**
 * Summary history management
 */

export interface HistoryEntry {
  id: string;
  text: string;
  mode: string;
  summary: string;
  timestamp: number;
}

const STORAGE_KEY = 'summaryHistory';
const MAX_HISTORY = 50;

export function saveToHistory(entry: Omit<HistoryEntry, 'id' | 'timestamp'>): void {
  try {
    const history = getHistory();
    const newEntry: HistoryEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    
    history.unshift(newEntry);
    if (history.length > MAX_HISTORY) history.pop();
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.warn('Failed to save history:', error);
  }
}

export function getHistory(): HistoryEntry[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function deleteHistoryEntry(id: string): void {
  try {
    const history = getHistory().filter(entry => entry.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.warn('Failed to delete history entry:', error);
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear history:', error);
  }
}
