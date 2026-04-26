// ═══════════════════════════════════════════════════════════════
//  Pague Menos Academy — Course Map (shows modules)
//  Replaces old TrackMap — now one level deeper
// ═══════════════════════════════════════════════════════════════

import { getCourseById } from '../data/tracks.js';
import { getModuleProgress, getCourseProgress } from '../utils/xpSystem.js';
import Icon from './Icon.jsx';
import '../styles/trackmap.css';

export default function TrackMap({ courseId, state, onNavigate }) {
  const course = getCourseById(courseId);

  if (!course) {
    return <div className="empty-state"><p>Curso não encontrado</p></div>;
  }

  const courseProgress = getCourseProgress(state, course);

  const getLevelTag = (level) => {
    const map = { 'Básico': 'tag-basic', 'Intermediário': 'tag-intermediate', 'Avançado': 'tag-advanced' };
    return map[level] || 'tag-basic';
  };

  return (
    <div className="trackmap fade-in">
      <button className="back-btn" onClick={() => onNavigate(`track-${course.trackId}`)}>
        <Icon name="arrow-left" size={16} /> Voltar à Trilha
      </button>

      {/* Header */}
      <div className="trackmap-header">
        <div className="trackmap-icon" style={{ background: course.gradient }}>
          <Icon name={course.icon} size={28} color="#fff" />
        </div>
        <div className="trackmap-info">
          <h2>{course.name}</h2>
          <p>{course.description}</p>
          <div className="trackmap-progress-row">
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${courseProgress}%`, background: course.gradient }}></div>
            </div>
            <span className="trackmap-progress-label">{courseProgress}%</span>
          </div>
        </div>
      </div>

      {/* Module Nodes (Roadmap) */}
      <div className="trackmap-modules stagger-children">
        {course.modules.map((mod, index) => {
          const modProgress = getModuleProgress(state, mod);
          const isCompleted = state.completedModules.includes(mod.id);
          const isInProgress = modProgress > 0 && !isCompleted;

          return (
            <div
              key={mod.id}
              className={`module-node ${isCompleted ? 'completed' : ''} ${isInProgress ? 'in-progress' : ''}`}
              onClick={() => onNavigate(`module-${mod.id}`)}
            >
              <div className="module-node-dot">
                {isCompleted && <Icon name="check" size={12} color="#fff" />}
              </div>
              <div className="module-node-card">
                <div className="module-node-header">
                  <span className="module-node-title">{mod.name}</span>
                  <span className={`tag ${getLevelTag(mod.level)}`}>{mod.level}</span>
                </div>
                <div className="module-node-desc">{mod.description}</div>
                <div className="module-node-meta">
                  <span><Icon name="video" size={13} /> {mod.lessons.length} aulas</span>
                  <span><Icon name="crosshair" size={13} /> 1 quiz</span>
                  <span><Icon name="wrench" size={13} /> 1 exercício</span>
                </div>
                {modProgress > 0 && (
                  <div className="module-node-progress">
                    <div className="module-node-progress-label">
                      <span>Progresso</span>
                      <span>{modProgress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{ width: `${modProgress}%`, background: course.gradient }}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
