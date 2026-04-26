// ═══════════════════════════════════════════════════════════════
//  DataPulse — Storage (Xperiun gamification)
// ═══════════════════════════════════════════════════════════════

const STORAGE_KEY = 'datapulse_state_v2';

const initialState = {
  user: { name: '', goal: '', musicGenre: 'any' },
  xp: 0,
  xbolts: 0,
  xcoins: 0,
  xcore: 0,
  completedLessons: [],
  completedQuizzes: {},
  completedExercises: [],
  completedModules: [],
  earnedBadges: [],
  streak: { current: 0, lastDate: null },
  onboarded: false,
  roadmapProgress: { junior: {}, pleno: {}, senior: {} },
  motivationalIndex: -1,
};

export const getState = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with initialState to fill missing fields from old saves
      return { ...initialState, ...parsed };
    }
    return { ...initialState };
  } catch {
    return { ...initialState };
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
};

export const resetState = () => {
  localStorage.removeItem(STORAGE_KEY);
  // Also clear old v1 key
  localStorage.removeItem('datapulse_state');
  return { ...initialState };
};

// Update streak / XCore
export const updateStreak = (state) => {
  const today = new Date().toISOString().split('T')[0];
  const lastDate = state.streak.lastDate;

  if (lastDate === today) return state;

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const newCurrent = lastDate === yesterday ? state.streak.current + 1 : 1;

  return {
    ...state,
    streak: { current: newCurrent, lastDate: today },
    xcore: (state.xcore || 0) + 1,
  };
};
