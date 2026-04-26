// ═══════════════════════════════════════════════════════════════
//  Pague Menos Academy — XP System
// ═══════════════════════════════════════════════════════════════

import { getLevelByXP } from '../data/levels.js';
import { badges } from '../data/badges.js';
import { tracks, getAllModules, getAllCourses } from '../data/tracks.js';

export const XP_REWARDS = {
  WATCH_LESSON: 50,
  QUIZ_PASS: 80,
  QUIZ_PERFECT: 150,
  EXERCISE: 120,
  MODULE_COMPLETE: 500,
  STREAK_7: 200,
  STREAK_30: 1000,
};

export const XBOLT_REWARDS = { EXERCISE: 25, QUIZ_PERFECT: 15, MODULE_COMPLETE: 50 };
export const XCOIN_REWARDS = { MODULE_COMPLETE: 10, BADGE_EARNED: 5, QUIZ_PERFECT: 3, COURSE_COMPLETE: 50 };

export const addXP = (state, amount, reason) => {
  const oldLevel = getLevelByXP(state.xp);
  const newXP = state.xp + amount;
  const newLevel = getLevelByXP(newXP);
  const newState = { ...state, xp: newXP };
  const notifications = [{ id: Date.now(), message: `+${amount} XP — ${reason}`, icon: 'zap', type: 'xp' }];
  if (newLevel.id > oldLevel.id) {
    notifications.push({ id: Date.now() + 1, message: `Nível alcançado: ${newLevel.name}`, icon: 'trending', type: 'levelup', levelData: newLevel });
  }
  return { newState, notifications };
};

const addXBolts = (state, amount) => ({ ...state, xbolts: (state.xbolts || 0) + amount });
const addXCoins = (state, amount) => ({ ...state, xcoins: (state.xcoins || 0) + amount });

export const completeLesson = (state, lessonId) => {
  if (state.completedLessons.includes(lessonId)) return { newState: state, notifications: [] };
  let newState = { ...state, completedLessons: [...state.completedLessons, lessonId] };
  const { newState: xpState, notifications } = addXP(newState, XP_REWARDS.WATCH_LESSON, 'Aula concluída');
  newState = xpState;
  const { state: badgeState, notifications: badgeNotifs } = checkAndAwardBadges(newState);
  return { newState: badgeState, notifications: [...notifications, ...badgeNotifs] };
};

export const completeQuiz = (state, quizId, score, total) => {
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 70;
  let newState = { ...state, completedQuizzes: { ...state.completedQuizzes, [quizId]: { score, total, percentage, date: new Date().toISOString() } } };
  const allNotifications = [];
  if (passed) {
    const xpAmount = percentage === 100 ? XP_REWARDS.QUIZ_PERFECT : XP_REWARDS.QUIZ_PASS;
    const reason = percentage === 100 ? 'Quiz perfeito' : 'Quiz aprovado';
    const { newState: xpState, notifications } = addXP(newState, xpAmount, reason);
    newState = xpState;
    allNotifications.push(...notifications);
    if (percentage === 100) {
      newState = addXBolts(newState, XBOLT_REWARDS.QUIZ_PERFECT);
      newState = addXCoins(newState, XCOIN_REWARDS.QUIZ_PERFECT);
    }
  }
  const { state: badgeState, notifications: badgeNotifs } = checkAndAwardBadges(newState);
  allNotifications.push(...badgeNotifs);
  return { newState: badgeState, notifications: allNotifications, passed, percentage };
};

export const completeExercise = (state, exerciseId) => {
  if (state.completedExercises.includes(exerciseId)) return { newState: state, notifications: [] };
  let newState = { ...state, completedExercises: [...state.completedExercises, exerciseId] };
  const { newState: xpState, notifications } = addXP(newState, XP_REWARDS.EXERCISE, 'Exercício entregue');
  newState = xpState;
  newState = addXBolts(newState, XBOLT_REWARDS.EXERCISE);
  const { state: badgeState, notifications: badgeNotifs } = checkAndAwardBadges(newState);
  return { newState: badgeState, notifications: [...notifications, ...badgeNotifs] };
};

export const completeModule = (state, moduleId) => {
  if (state.completedModules.includes(moduleId)) return { newState: state, notifications: [] };
  let newState = { ...state, completedModules: [...state.completedModules, moduleId] };
  const { newState: xpState, notifications } = addXP(newState, XP_REWARDS.MODULE_COMPLETE, 'Módulo completo');
  newState = xpState;
  newState = addXBolts(newState, XBOLT_REWARDS.MODULE_COMPLETE);
  newState = addXCoins(newState, XCOIN_REWARDS.MODULE_COMPLETE);
  const { state: badgeState, notifications: badgeNotifs } = checkAndAwardBadges(newState);
  return { newState: badgeState, notifications: [...notifications, ...badgeNotifs] };
};

export const awardStreakXP = (state, streakDays) => {
  const allNotifications = [];
  if (streakDays === 7) { const r = addXP(state, XP_REWARDS.STREAK_7, 'Streak de 7 dias'); state = r.newState; allNotifications.push(...r.notifications); }
  if (streakDays === 30) { const r = addXP(state, XP_REWARDS.STREAK_30, 'Streak de 30 dias'); state = r.newState; allNotifications.push(...r.notifications); }
  const { state: badgeState, notifications: badgeNotifs } = checkAndAwardBadges(state);
  allNotifications.push(...badgeNotifs);
  return { newState: badgeState, notifications: allNotifications };
};

const checkAndAwardBadges = (state) => {
  const notifications = [];
  const earned = new Set(state.earnedBadges);
  let updatedState = { ...state };
  const award = (badgeId) => {
    if (!earned.has(badgeId)) {
      earned.add(badgeId);
      const badge = badges.find(b => b.id === badgeId);
      if (badge) {
        updatedState = addXCoins(updatedState, XCOIN_REWARDS.BADGE_EARNED);
        notifications.push({ id: Date.now() + Math.random(), message: `Badge: ${badge.name}`, icon: 'award', type: 'badge', badgeData: badge });
      }
    }
  };

  if (updatedState.completedLessons.length >= 1) award('first-step');
  if (Object.keys(updatedState.completedQuizzes).length >= 1) award('first-quiz');
  if (updatedState.completedExercises.length >= 1) award('first-exercise');
  if (Object.values(updatedState.completedQuizzes).some(q => q.percentage === 100)) award('perfect-quiz');

  // Course completions
  const allCourses = getAllCourses();
  for (const course of allCourses) {
    const moduleIds = course.modules.map(m => m.id);
    const allDone = moduleIds.length > 0 && moduleIds.every(id => updatedState.completedModules.includes(id));
    if (allDone) award(`course-${course.id}`);
  }

  // Streaks
  if (updatedState.streak.current >= 7) award('streak-7');
  if (updatedState.streak.current >= 15) award('streak-15');
  if (updatedState.streak.current >= 30) award('streak-30');

  // General
  if (updatedState.completedLessons.length >= 30) award('veteran');
  if ((updatedState.xbolts || 0) >= 500) award('bolt-hunter');

  updatedState.earnedBadges = [...earned];
  return { state: updatedState, notifications };
};

// ── Progress helpers ──
export const getModuleProgress = (state, mod) => {
  if (!mod) return 0;
  const total = mod.lessons.length + 1 + 1;
  let done = 0;
  mod.lessons.forEach(l => { if (state.completedLessons.includes(l.id)) done++; });
  if (state.completedQuizzes[mod.quiz.id]) done++;
  if (state.completedExercises.includes(mod.exercise.id)) done++;
  return Math.round((done / total) * 100);
};

export const getCourseProgress = (state, course) => {
  if (!course || !course.modules.length) return 0;
  const avg = course.modules.map(m => getModuleProgress(state, m)).reduce((a, b) => a + b, 0) / course.modules.length;
  return Math.round(avg);
};

export const getTrackProgress = (state, track) => {
  if (!track || !track.courses.length) return 0;
  const avg = track.courses.map(c => getCourseProgress(state, c)).reduce((a, b) => a + b, 0) / track.courses.length;
  return Math.round(avg);
};
