// ═══════════════════════════════════════════════════════════════
//  Pague Menos Academy — Sidebar with Drill-Down
// ═══════════════════════════════════════════════════════════════

import { useState } from 'react';
import { tracks } from '../data/tracks.js';
import Icon from './Icon.jsx';
import '../styles/sidebar.css';

export default function Sidebar({ currentView, onNavigate, streak }) {
  const [expandedTrack, setExpandedTrack] = useState('dados');

  const toggleTrack = (trackId) => {
    setExpandedTrack(prev => prev === trackId ? null : trackId);
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo" onClick={() => onNavigate('dashboard')}>
        <div className="sidebar-logo-icon">
          <span className="pm-cross">+</span>
        </div>
        <div className="sidebar-logo-text">
          <h1>Pague Menos</h1>
          <span>Academy</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {/* Dashboard */}
        <div className="sidebar-section-label">Início</div>
        <div
          className={`sidebar-item ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => onNavigate('dashboard')}
        >
          <span className="item-icon"><Icon name="home" size={18} /></span>
          <span className="item-label">Dashboard</span>
        </div>

        {/* Trilhas com drill-down */}
        <div className="sidebar-section-label" style={{ marginTop: '16px' }}>Trilhas</div>
        {tracks.map(track => (
          <div key={track.id} className="sidebar-track-group">
            {/* Track header */}
            <div
              className={`sidebar-item sidebar-track-item ${currentView === `track-${track.id}` ? 'active' : ''}`}
              onClick={() => {
                if (track.comingSoon) return;
                toggleTrack(track.id);
                onNavigate(`track-${track.id}`);
              }}
              style={{ opacity: track.comingSoon ? 0.5 : 1 }}
            >
              <span className="item-icon"><Icon name={track.icon} size={18} /></span>
              <span className="item-label">{track.name}</span>
              {track.comingSoon ? (
                <span className="tag tag-coming-soon" style={{ fontSize: '0.55rem', padding: '1px 6px' }}>Em breve</span>
              ) : (
                <span className={`sidebar-chevron ${expandedTrack === track.id ? 'open' : ''}`}>
                  <Icon name="arrow-right" size={12} />
                </span>
              )}
            </div>

            {/* Courses (drill-down) */}
            {!track.comingSoon && expandedTrack === track.id && (
              <div className="sidebar-courses">
                {track.courses.map(course => (
                  <div
                    key={course.id}
                    className={`sidebar-item sidebar-course-item ${currentView === `course-${course.id}` ? 'active' : ''}`}
                    onClick={() => onNavigate(`course-${course.id}`)}
                  >
                    <span className="course-dot" style={{ background: course.color }}></span>
                    <span className="item-label">{course.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Plataforma */}
        <div className="sidebar-section-label" style={{ marginTop: '16px' }}>Plataforma</div>
        {[
          { id: 'leaderboard', icon: 'trophy', label: 'Ranking' },
          { id: 'badges', icon: 'award', label: 'Conquistas' },
        ].map(item => (
          <div
            key={item.id}
            className={`sidebar-item ${currentView === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="item-icon"><Icon name={item.icon} size={18} /></span>
            <span className="item-label">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-streak">
          <Icon name="fire" size={16} color="#FF2342" />
          <span>XCore: {streak} {streak === 1 ? 'dia' : 'dias'}</span>
        </div>
      </div>
    </aside>
  );
}
