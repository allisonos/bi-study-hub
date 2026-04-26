// ═══════════════════════════════════════════════════════════════
//  Pague Menos Academy — Tracks / Courses / Modules
//  Hierarchy: Track → Course → Module → Lesson
// ═══════════════════════════════════════════════════════════════

import powerbi from './modules/powerbi.json';
import sql from './modules/sql.json';
import python from './modules/python.json';
import negocios from './modules/negocios.json';

// Helper to map bi-study-hub course to Plataform course
const mapCourse = (c, trackId, icon, color, gradient) => {
  return {
    id: c.id === '1' ? 'powerbi' : c.id === '2' ? 'sql' : c.id === '3' ? 'python' : 'negocios',
    name: c.title,
    icon,
    color,
    gradient,
    description: c.description,
    trackId,
    modules: c.trails.map((t, i) => ({
      id: t.id,
      name: t.title,
      description: t.description,
      level: i === 0 ? 'Básico' : i < 3 ? 'Intermediário' : 'Avançado',
      courseId: c.id === '1' ? 'powerbi' : c.id === '2' ? 'sql' : c.id === '3' ? 'python' : 'negocios',
      trackId,
      lessons: t.lessons.map(l => ({
        id: l.id,
        title: l.title,
        type: l.type, // 'theory' or 'practice'
        duration: l.type === 'theory' ? '15 min' : '5 min', // Dummy duration
        content: l.content, // The rich markdown
        task: l.task,
        options: l.options,
        expectedAnswer: l.expectedAnswer,
        expectedText: l.expectedText
      })),
      quiz: { id: `${t.id}-quiz`, questions: 5 },
      exercise: { id: `${t.id}-ex`, title: `Exercício prático: ${t.title}` }
    }))
  };
};

export const tracks = [
  {
    id: 'dados',
    name: 'BI Study Hub',
    icon: 'database',
    color: '#2962FF',
    gradient: 'linear-gradient(135deg, #0000BE, #2962FF)',
    description: 'Acelere sua jornada para se tornar um Analista e Especialista em Business Intelligence.',
    comingSoon: false,
    courses: [
      mapCourse(powerbi, 'dados', 'bar-chart', '#F2C811', 'linear-gradient(135deg, #F2C811, #FFDA44)'),
      mapCourse(python, 'dados', 'code', '#3B82F6', 'linear-gradient(135deg, #2563EB, #3B82F6)'),
      mapCourse(sql, 'dados', 'database', '#10B981', 'linear-gradient(135deg, #059669, #10B981)'),
      mapCourse(negocios, 'dados', 'briefcase', '#8B5CF6', 'linear-gradient(135deg, #7C3AED, #8B5CF6)')
    ],
  }
];

// ── Helpers ──
export const getTrackById = (id) => tracks.find(t => t.id === id);

export const getCourseById = (courseId) => {
  for (const track of tracks) {
    const course = track.courses.find(c => c.id === courseId);
    if (course) return course;
  }
  return null;
};

export const getModuleById = (moduleId) => {
  for (const track of tracks) {
    for (const course of track.courses) {
      const mod = course.modules.find(m => m.id === moduleId);
      if (mod) return mod;
    }
  }
  return null;
};

export const getAllModules = () => {
  return tracks.flatMap(t => t.courses.flatMap(c => c.modules));
};

export const getAllCourses = () => {
  return tracks.flatMap(t => t.courses);
};
