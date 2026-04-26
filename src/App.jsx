// ═══════════════════════════════════════════════════════════════
//  Pague Menos Academy — Main Application
// ═══════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback } from 'react';

// Data
import { tracks, getAllModules } from './data/tracks.js';
import { getLevelByXP } from './data/levels.js';

// Utils
import { getState, saveState, updateStreak } from './data/storage.js';
import {
  completeLesson,
  completeQuiz,
  completeExercise,
  completeModule,
  getModuleProgress,
} from './utils/xpSystem.js';

// Components
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import TrackView from './components/TrackView.jsx';
import TrackMap from './components/TrackMap.jsx';
import ModuleView from './components/ModuleView.jsx';
import LessonView from './components/LessonView.jsx';
import QuizView from './components/QuizView.jsx';
import BadgeGrid from './components/BadgeGrid.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Notification from './components/Notification.jsx';
import LevelUpAnimation from './components/LevelUpAnimation.jsx';
import OnboardingModal from './components/OnboardingModal.jsx';

export default function App() {
  const [state, setState] = useState(() => {
    const loaded = getState();
    return updateStreak(loaded);
  });
  const [view, setView] = useState('dashboard');
  const [viewData, setViewData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [levelUpData, setLevelUpData] = useState(null);

  // Persist state on change
  useEffect(() => {
    saveState(state);
  }, [state]);

  const processNotifications = useCallback((notifs) => {
    const levelUp = notifs.find(n => n.type === 'levelup');
    if (levelUp) setLevelUpData(levelUp.levelData);
    const otherNotifs = notifs.filter(n => n.type !== 'levelup');
    if (otherNotifs.length > 0) setNotifications(prev => [...prev, ...otherNotifs]);
  }, []);

  const handleNavigate = useCallback((targetView, data = null) => {
    setView(targetView);
    setViewData(data);
    const mainContent = document.querySelector('.main-content');
    if (mainContent) mainContent.scrollTop = 0;
  }, []);

  const handleOnboardingComplete = useCallback((userData) => {
    setState(prev => ({
      ...prev,
      user: { ...prev.user, ...userData, onboardingComplete: true, createdAt: new Date().toISOString() },
    }));
  }, []);

  const handleCompleteLesson = useCallback((lessonId) => {
    const { newState, notifications: notifs } = completeLesson(state, lessonId);
    const allModules = getAllModules();
    for (const mod of allModules) {
      const lessonInModule = mod.lessons.find(l => l.id === lessonId);
      if (lessonInModule) {
        const modProgress = getModuleProgress(newState, mod);
        if (modProgress === 100 && !newState.completedModules.includes(mod.id)) {
          const { newState: moduleState, notifications: moduleNotifs } = completeModule(newState, mod.id);
          setState(moduleState);
          processNotifications([...notifs, ...moduleNotifs]);
          return;
        }
        break;
      }
    }
    setState(newState);
    processNotifications(notifs);
  }, [state, processNotifications]);

  const handleCompleteQuiz = useCallback((quizId, score, total) => {
    const { newState, notifications: notifs } = completeQuiz(state, quizId, score, total);
    const allModules = getAllModules();
    for (const mod of allModules) {
      if (mod.quiz.id === quizId) {
        const modProgress = getModuleProgress(newState, mod);
        if (modProgress === 100 && !newState.completedModules.includes(mod.id)) {
          const { newState: moduleState, notifications: moduleNotifs } = completeModule(newState, mod.id);
          setState(moduleState);
          processNotifications([...notifs, ...moduleNotifs]);
          return;
        }
        break;
      }
    }
    setState(newState);
    processNotifications(notifs);
  }, [state, processNotifications]);

  const handleCompleteExercise = useCallback((exerciseId) => {
    const { newState, notifications: notifs } = completeExercise(state, exerciseId);
    const allModules = getAllModules();
    for (const mod of allModules) {
      if (mod.exercise.id === exerciseId) {
        const modProgress = getModuleProgress(newState, mod);
        if (modProgress === 100 && !newState.completedModules.includes(mod.id)) {
          const { newState: moduleState, notifications: moduleNotifs } = completeModule(newState, mod.id);
          setState(moduleState);
          processNotifications([...notifs, ...moduleNotifs]);
          return;
        }
        break;
      }
    }
    setState(newState);
    processNotifications(notifs);
  }, [state, processNotifications]);

  const renderView = () => {
    // Track views — show courses
    if (view.startsWith('track-')) {
      const trackId = view.replace('track-', '');
      return <TrackView trackId={trackId} state={state} onNavigate={handleNavigate} />;
    }

    // Course views — show modules (roadmap)
    if (view.startsWith('course-')) {
      const courseId = view.replace('course-', '');
      return <TrackMap courseId={courseId} state={state} onNavigate={handleNavigate} />;
    }

    // Module views
    if (view.startsWith('module-')) {
      const moduleId = view.replace('module-', '');
      return (
        <ModuleView
          moduleId={moduleId}
          state={state}
          onNavigate={handleNavigate}
          onCompleteLesson={handleCompleteLesson}
          onCompleteExercise={handleCompleteExercise}
        />
      );
    }

    // Lesson views
    if (view.startsWith('lesson-')) {
      return (
        <LessonView
          lessonData={viewData?.lesson}
          moduleData={viewData?.module}
          state={state}
          onNavigate={handleNavigate}
          onCompleteLesson={handleCompleteLesson}
        />
      );
    }

    // Quiz views
    if (view.startsWith('quiz-')) {
      const quizId = view.replace('quiz-', '');
      return <QuizView quizId={quizId} state={state} onNavigate={handleNavigate} onCompleteQuiz={handleCompleteQuiz} />;
    }

    switch (view) {
      case 'badges': return <BadgeGrid state={state} onNavigate={handleNavigate} />;
      case 'leaderboard': return <Leaderboard state={state} onNavigate={handleNavigate} />;
      case 'dashboard':
      default: return <Dashboard state={state} onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      {!state.user.onboardingComplete && <OnboardingModal onComplete={handleOnboardingComplete} />}
      {levelUpData && <LevelUpAnimation level={levelUpData} onClose={() => setLevelUpData(null)} />}
      <Notification notifications={notifications} onClear={() => setNotifications([])} />
      <div className="app-layout">
        <Sidebar currentView={view} onNavigate={handleNavigate} streak={state.streak.current} />
        <main className="main-content">{renderView()}</main>
      </div>
    </>
  );
}
