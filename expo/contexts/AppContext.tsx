import { useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';
import { useColorScheme } from 'react-native';
import { Colors, ThemeColors } from '@/constants/colors';
import { DEFAULT_TRANSLATION } from '@/constants/translations';

export type ThemeMode = 'system' | 'light' | 'dark';

export type JournalMood = 'grateful' | 'peaceful' | 'hopeful' | 'struggling' | 'seeking' | 'joyful';

export interface JournalEntry {
  id: string;
  devotionalId: string;
  text: string;
  mood?: JournalMood;
  promptUsed?: string;
  prayerRequest?: string;
  gratitudeNote?: string;
  createdAt: string;
  updatedAt: string;
}

interface UserNote {
  devotionalId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

interface HistoryEntry {
  devotionalId: string;
  viewedAt: string;
}

interface FavoriteEntry {
  devotionalId: string;
  savedAt: string;
}

interface AppState {
  hasCompletedOnboarding: boolean;
  selectedTranslation: string;
  themeMode: ThemeMode;
  notificationTime: string;
  isPremium: boolean;
  notes: UserNote[];
  journalEntries: JournalEntry[];
  streak: number;
  lastVisitDate: string | null;
  totalDaysRead: number;
  history: HistoryEntry[];
  favorites: FavoriteEntry[];
  activeTopicId: string | null;
}

const DEFAULT_STATE: AppState = {
  hasCompletedOnboarding: false,
  selectedTranslation: DEFAULT_TRANSLATION,
  themeMode: 'system',
  notificationTime: '07:00',
  isPremium: false,
  notes: [],
  journalEntries: [],
  streak: 0,
  lastVisitDate: null,
  totalDaysRead: 0,
  history: [],
  favorites: [],
  activeTopicId: null,
};

const FREE_HISTORY_DAYS = 7;
const PREMIUM_HISTORY_DAYS = 90;

const STORAGE_KEY = '@beacon_app_state';

export const [AppProvider, useApp] = createContextHook(() => {
  const systemColorScheme = useColorScheme();
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadState();
  }, []);

  const loadState = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setState({ ...DEFAULT_STATE, ...parsed });
      }
    } catch (error) {
      console.log('Error loading app state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveState = async (newState: AppState) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (error) {
      console.log('Error saving app state:', error);
    }
  };

  const updateState = useCallback((updates: Partial<AppState>) => {
    setState(prev => {
      const newState = { ...prev, ...updates };
      saveState(newState);
      return newState;
    });
  }, []);

  const completeOnboarding = useCallback(() => {
    updateState({ hasCompletedOnboarding: true });
  }, [updateState]);

  const setTranslation = useCallback((translation: string) => {
    updateState({ selectedTranslation: translation });
  }, [updateState]);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    updateState({ themeMode: mode });
  }, [updateState]);

  const setNotificationTime = useCallback((time: string) => {
    updateState({ notificationTime: time });
  }, [updateState]);

  const setPremium = useCallback((isPremium: boolean) => {
    updateState({ isPremium });
  }, [updateState]);

  const saveNote = useCallback((devotionalId: string, text: string) => {
    setState(prev => {
      const existingIndex = prev.notes.findIndex(n => n.devotionalId === devotionalId);
      const now = new Date().toISOString();
      let newNotes: UserNote[];
      
      if (existingIndex >= 0) {
        newNotes = [...prev.notes];
        newNotes[existingIndex] = { ...newNotes[existingIndex], text, updatedAt: now };
      } else {
        newNotes = [...prev.notes, { devotionalId, text, createdAt: now, updatedAt: now }];
      }
      
      const newState = { ...prev, notes: newNotes };
      saveState(newState);
      return newState;
    });
  }, []);

  const getNote = useCallback((devotionalId: string): UserNote | undefined => {
    return state.notes.find(n => n.devotionalId === devotionalId);
  }, [state.notes]);

  const addToHistory = useCallback((devotionalId: string) => {
    setState(prev => {
      const now = new Date().toISOString();
      const existingIndex = prev.history.findIndex(h => h.devotionalId === devotionalId);
      let newHistory: HistoryEntry[];
      
      if (existingIndex >= 0) {
        newHistory = [...prev.history];
        newHistory[existingIndex] = { ...newHistory[existingIndex], viewedAt: now };
      } else {
        newHistory = [{ devotionalId, viewedAt: now }, ...prev.history];
      }
      
      const maxDays = prev.isPremium ? PREMIUM_HISTORY_DAYS : FREE_HISTORY_DAYS;
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - maxDays);
      newHistory = newHistory.filter(h => new Date(h.viewedAt) >= cutoffDate);
      
      const newState = { ...prev, history: newHistory };
      saveState(newState);
      return newState;
    });
  }, []);

  const getHistory = useCallback(() => {
    const maxDays = state.isPremium ? PREMIUM_HISTORY_DAYS : FREE_HISTORY_DAYS;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - maxDays);
    return state.history
      .filter(h => new Date(h.viewedAt) >= cutoffDate)
      .sort((a, b) => new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime());
  }, [state.history, state.isPremium]);

  const toggleFavorite = useCallback((devotionalId: string) => {
    setState(prev => {
      const existingIndex = prev.favorites.findIndex(f => f.devotionalId === devotionalId);
      let newFavorites: FavoriteEntry[];
      
      if (existingIndex >= 0) {
        newFavorites = prev.favorites.filter(f => f.devotionalId !== devotionalId);
      } else {
        newFavorites = [{ devotionalId, savedAt: new Date().toISOString() }, ...prev.favorites];
      }
      
      const newState = { ...prev, favorites: newFavorites };
      saveState(newState);
      return newState;
    });
  }, []);

  const isFavorite = useCallback((devotionalId: string): boolean => {
    return state.favorites.some(f => f.devotionalId === devotionalId);
  }, [state.favorites]);

  const saveJournalEntry = useCallback((entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    setState(prev => {
      const now = new Date().toISOString();
      const existingIndex = prev.journalEntries.findIndex(
        e => e.devotionalId === entry.devotionalId
      );
      let newEntries: JournalEntry[];

      if (existingIndex >= 0) {
        newEntries = [...prev.journalEntries];
        newEntries[existingIndex] = {
          ...newEntries[existingIndex],
          ...entry,
          updatedAt: now,
        };
      } else {
        newEntries = [
          {
            ...entry,
            id: `journal-${Date.now()}`,
            createdAt: now,
            updatedAt: now,
          },
          ...prev.journalEntries,
        ];
      }

      const newState = { ...prev, journalEntries: newEntries };
      saveState(newState);
      return newState;
    });
  }, []);

  const getJournalEntry = useCallback((devotionalId: string): JournalEntry | undefined => {
    return state.journalEntries.find(e => e.devotionalId === devotionalId);
  }, [state.journalEntries]);

  const getJournalEntries = useCallback(() => {
    return [...state.journalEntries].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [state.journalEntries]);

  const setActiveTopic = useCallback((topicId: string | null) => {
    updateState({ activeTopicId: topicId });
  }, [updateState]);

  const getFavorites = useCallback(() => {
    return state.favorites.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
  }, [state.favorites]);

  const recordVisit = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    
    if (state.lastVisitDate === today) {
      return;
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    let newStreak = state.streak;
    if (state.lastVisitDate === yesterdayStr) {
      newStreak = state.streak + 1;
    } else if (state.lastVisitDate !== today) {
      newStreak = 1;
    }
    
    updateState({
      streak: newStreak,
      lastVisitDate: today,
      totalDaysRead: state.totalDaysRead + 1,
    });
  }, [state.lastVisitDate, state.streak, state.totalDaysRead, updateState]);

  const resetOnboarding = useCallback(() => {
    updateState({ hasCompletedOnboarding: false });
  }, [updateState]);

  const isDark = useMemo(() => {
    if (state.themeMode === 'system') {
      return systemColorScheme === 'dark';
    }
    return state.themeMode === 'dark';
  }, [state.themeMode, systemColorScheme]);

  const colors: ThemeColors = useMemo(() => {
    return isDark ? Colors.dark : Colors.light;
  }, [isDark]);

  return {
    ...state,
    isLoading,
    isDark,
    colors,
    completeOnboarding,
    setTranslation,
    setThemeMode,
    setNotificationTime,
    setPremium,
    saveNote,
    getNote,
    recordVisit,
    addToHistory,
    getHistory,
    toggleFavorite,
    isFavorite,
    getFavorites,
    saveJournalEntry,
    getJournalEntry,
    getJournalEntries,
    setActiveTopic,
    historyDaysLimit: state.isPremium ? PREMIUM_HISTORY_DAYS : FREE_HISTORY_DAYS,
    resetOnboarding,
  };
});
