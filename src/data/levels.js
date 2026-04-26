// ═══════════════════════════════════════════════════════════════
//  DataPulse — Levels (Xperiun-style)
// ═══════════════════════════════════════════════════════════════

export const levels = [
  { id: 1, name: 'Aprendiz',            minXP: 0,     icon: 'seed',     color: '#94A3B8', gradient: 'linear-gradient(135deg, #94A3B8, #64748B)', benefits: ['Acesso às trilhas Fundamentals'] },
  { id: 2, name: 'Analista Júnior',     minXP: 1000,  icon: 'shield',   color: '#10B981', gradient: 'linear-gradient(135deg, #10B981, #34D399)', benefits: ['Acesso às trilhas Analyst', 'Badge de Analista Jr.'] },
  { id: 3, name: 'Analista',            minXP: 3500,  icon: 'bar-chart',color: '#3B82F6', gradient: 'linear-gradient(135deg, #3B82F6, #60A5FA)', benefits: ['Acesso às trilhas Expert', 'Ranking visível para todos'] },
  { id: 4, name: 'Especialista',        minXP: 8000,  icon: 'cpu',      color: '#8B5CF6', gradient: 'linear-gradient(135deg, #8B5CF6, #A78BFA)', benefits: ['Acesso às trilhas Specialist', 'Badge Especialista'] },
  { id: 5, name: 'Data Master',         minXP: 15000, icon: 'crown',    color: '#F59E0B', gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)', benefits: ['Status máximo', 'Acesso completo', 'Badge Incomparável'] },
];

export const getLevelByXP = (xp) => {
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].minXP) return levels[i];
  }
  return levels[0];
};

export const getNextLevel = (xp) => {
  const currentLevel = getLevelByXP(xp);
  const nextIndex = levels.findIndex(l => l.id === currentLevel.id) + 1;
  return nextIndex < levels.length ? levels[nextIndex] : null;
};

export const getLevelProgress = (xp) => {
  const current = getLevelByXP(xp);
  const next = getNextLevel(xp);
  if (!next) return 100;
  const range = next.minXP - current.minXP;
  const progress = xp - current.minXP;
  return Math.round((progress / range) * 100);
};
