export const rarityColors = {
  common:    { bg: 'rgba(33,51,221,0.1)', border: '#2133DD', glow: 'rgba(33,51,221,0.2)' },
  rare:      { bg: 'rgba(59,130,246,0.1)', border: '#3B82F6', glow: 'rgba(59,130,246,0.2)' },
  epic:      { bg: 'rgba(139,92,246,0.1)', border: '#8B5CF6', glow: 'rgba(139,92,246,0.2)' },
  legendary: { bg: 'rgba(255,35,66,0.1)',  border: '#FF2342', glow: 'rgba(255,35,66,0.2)' },
};

export const badges = [
  // Milestone
  { id: 'first-step',     name: 'Primeiro Passo',      icon: 'shield',    rarity: 'common',    category: 'milestone',    description: 'Completou sua primeira aula.' },
  { id: 'first-quiz',     name: 'Desafiador',           icon: 'crosshair', rarity: 'common',    category: 'milestone',    description: 'Completou seu primeiro quiz.' },
  { id: 'first-exercise', name: 'Mão na Massa',         icon: 'wrench',    rarity: 'common',    category: 'milestone',    description: 'Entregou seu primeiro exercício.' },
  { id: 'perfect-quiz',   name: 'Nota Máxima',          icon: 'target',    rarity: 'rare',      category: 'milestone',    description: 'Gabaritou um quiz com 100%.' },

  // Course
  { id: 'course-powerbi', name: 'Power BI Completo',    icon: 'bar-chart', rarity: 'epic',      category: 'course',       description: 'Completou todos os módulos de Power BI.' },
  { id: 'course-python',  name: 'Pythonista',           icon: 'code',      rarity: 'epic',      category: 'course',       description: 'Completou todos os módulos de Python.' },
  { id: 'course-sql',     name: 'SQL Master',           icon: 'database',  rarity: 'epic',      category: 'course',       description: 'Completou todos os módulos de SQL.' },
  { id: 'course-negocios',name: 'Mente Estratégica',    icon: 'briefcase', rarity: 'epic',      category: 'course',       description: 'Completou o curso de BI Comercial.' },

  // Roadmap
  { id: 'roadmap-junior', name: 'Júnior Certificado',   icon: 'award',     rarity: 'rare',      category: 'roadmap',      description: 'Concluiu todos os tópicos do nível Júnior no Roadmap.' },
  { id: 'roadmap-pleno',  name: 'Pleno Certificado',    icon: 'award',     rarity: 'epic',      category: 'roadmap',      description: 'Concluiu todos os tópicos do nível Pleno no Roadmap.' },
  { id: 'roadmap-senior', name: 'Sênior Certificado',   icon: 'crown',     rarity: 'legendary', category: 'roadmap',      description: 'Concluiu todos os tópicos do nível Sênior no Roadmap.' },

  // Streak
  { id: 'streak-7',       name: 'Dedicado',             icon: 'fire',      rarity: 'common',    category: 'streak',       description: '7 dias consecutivos de estudo.' },
  { id: 'streak-15',      name: 'Engajado',             icon: 'fire',      rarity: 'rare',      category: 'streak',       description: '15 dias consecutivos de estudo.' },
  { id: 'streak-30',      name: 'Constância Exemplar',  icon: 'fire',      rarity: 'epic',      category: 'streak',       description: '30 dias consecutivos.' },

  // Achievement
  { id: 'veteran',        name: 'Veterano',             icon: 'award',     rarity: 'rare',      category: 'achievement',  description: 'Completou 30+ aulas.' },
  { id: 'bolt-hunter',    name: 'Caçador de Bolts',     icon: 'zap',       rarity: 'rare',      category: 'achievement',  description: 'Acumulou 500+ XBolts.' },
  { id: 'data-master',    name: 'Data Master',          icon: 'crown',     rarity: 'legendary', category: 'achievement',  description: 'Completou toda a Trilha de Dados.' },
];
