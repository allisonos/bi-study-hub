// ═══════════════════════════════════════════════════════════════
//  Pague Menos Academy — Track View (shows courses)
// ═══════════════════════════════════════════════════════════════

import { getTrackById } from '../data/tracks.js';
import { getCourseProgress } from '../utils/xpSystem.js';
import Icon from './Icon.jsx';
import '../styles/trackmap.css';

export default function TrackView({ trackId, state, onNavigate }) {
  const track = getTrackById(trackId);

  if (!track) {
    return <div className="empty-state"><p>Trilha não encontrada</p></div>;
  }

  if (track.comingSoon) {
    return (
      <div className="trackmap fade-in">
        <button className="back-btn" onClick={() => onNavigate('dashboard')}>
          <Icon name="arrow-left" size={16} /> Voltar ao Dashboard
        </button>
        <div className="coming-soon-page">
          <Icon name="briefcase" size={48} color="#FF2342" />
          <h2>{track.name}</h2>
          <p>{track.description}</p>
          <span className="tag tag-coming-soon" style={{ fontSize: '0.8rem', padding: '6px 16px', marginTop: '16px' }}>
            Em breve
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="trackmap fade-in">
      <button className="back-btn" onClick={() => onNavigate('dashboard')}>
        <Icon name="arrow-left" size={16} /> Voltar ao Dashboard
      </button>

      {/* Header */}
      <div className="trackmap-header">
        <div className="trackmap-icon" style={{ background: track.gradient }}>
          <Icon name={track.icon} size={28} color="#fff" />
        </div>
        <div className="trackmap-info">
          <h2>{track.name}</h2>
          <p>{track.description}</p>
        </div>
      </div>

      {/* Course Cards */}
      <div className="track-courses-grid stagger-children">
        {track.courses.map((course, i) => {
          const progress = getCourseProgress(state, course);
          const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);

          return (
            <div
              key={course.id}
              className="track-course-card"
              onClick={() => onNavigate(`course-${course.id}`)}
              style={{ '--course-color': course.color }}
            >
              <div className="track-course-number">{String(i + 1).padStart(2, '0')}</div>
              <div className="track-course-icon" style={{ background: course.gradient }}>
                <Icon name={course.icon} size={28} color="#fff" />
              </div>
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <div className="track-course-stats">
                <span><Icon name="layers" size={13} /> {course.modules.length} módulos</span>
                <span><Icon name="video" size={13} /> {totalLessons} aulas</span>
              </div>
              <div className="progress-bar" style={{ margin: '12px 0 8px' }}>
                <div className="progress-bar-fill" style={{ width: `${progress}%`, background: course.gradient }}></div>
              </div>
              <div className="track-course-progress">
                <span>{progress}% completo</span>
                <Icon name="arrow-right" size={14} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
