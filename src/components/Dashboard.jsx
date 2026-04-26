import { tracks, getAllCourses } from '../data/tracks.js';
import { badges } from '../data/badges.js';
import { getLevelByXP, getLevelProgress, getNextLevel } from '../data/levels.js';
import { getCourseProgress, getTrackProgress } from '../utils/xpSystem.js';
import { getDailyMotivational } from '../data/motivational.js';
import GamificationBar from './GamificationBar.jsx';
import Icon from './Icon.jsx';
import '../styles/dashboard.css';

const fakeLeaderboard = [
  { name: 'Mariana S.', xp: 12450 },
  { name: 'Pedro H.', xp: 10200 },
  { name: 'Lucas M.', xp: 8900 },
  { name: 'Ana Clara', xp: 7300 },
  { name: 'Gabriel R.', xp: 5600 },
];

export default function Dashboard({ state, onNavigate }) {
  const level = getLevelByXP(state.xp);
  const nextLevel = getNextLevel(state.xp);
  const levelProgress = getLevelProgress(state.xp);
  const completedLessons = state.completedLessons.length;
  const totalBadges = state.earnedBadges.length;
  const userEntry = { name: state.user.name || 'Você', xp: state.xp, isYou: true };
  const allEntries = [...fakeLeaderboard, userEntry].sort((a, b) => b.xp - a.xp).slice(0, 6);

  const dadosTrack = tracks.find(t => t.id === 'dados');
  const comercialTrack = tracks.find(t => t.id === 'comercial');

  // Motivational card
  const motivational = getDailyMotivational(state.user.musicGenre || 'any');

  return (
    <div className="dashboard fade-in">
      {/* Welcome */}
      <div className="dash-welcome">
        <div>
          <h2>Olá, {state.user.name || 'Colaborador'}</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', fontSize: '0.9rem' }}>
            {completedLessons === 0
              ? 'Bem-vindo ao BI Study Hub. Escolha um curso para começar.'
              : `${completedLessons} aulas concluídas. Continue progredindo!`}
          </p>
        </div>
        <div className="dash-level-badge" style={{ background: level.gradient }}>
          <Icon name={level.icon} size={16} color="#fff" />
          <span>{level.name}</span>
        </div>
      </div>

      {/* Motivational Card */}
      <div className="dash-motivational-card">
        <div className="dash-motivational-icon">
          {motivational.type === 'music' ? '🎵' : '💬'}
        </div>
        <div className="dash-motivational-content">
          <p className="dash-motivational-text">"{motivational.text}"</p>
          <span className="dash-motivational-source">— {motivational.source}</span>
        </div>
      </div>

      {/* Gamification Bar */}
      <GamificationBar state={state} />

      {/* XP Progress */}
      <div className="dash-xp-card">
        <div className="dash-xp-header">
          <span className="dash-xp-level" style={{ color: level.color }}>
            <Icon name={level.icon} size={16} /> {level.name}
          </span>
          <span className="dash-xp-amount">
            {state.xp.toLocaleString()} / {nextLevel ? nextLevel.minXP.toLocaleString() : '∞'} XP
          </span>
        </div>
        <div className="progress-bar" style={{ height: '10px' }}>
          <div className="progress-bar-fill" style={{ width: `${levelProgress}%`, background: level.gradient }}></div>
        </div>
        <div className="dash-xp-footer">
          <span>{level.name}</span>
          <span>{nextLevel ? nextLevel.name : 'Nível máximo'}</span>
        </div>
      </div>

      {/* Tracks section */}
      <div className="dash-grid">
        <div className="dash-tracks">
          {/* Trilha de Dados */}
          <h3>Trilha de Dados</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 'var(--space-lg)' }}>
            Domine Power BI, Python e SQL para se destacar em análise de dados.
          </p>
          <div className="dash-courses-grid stagger-children">
            {dadosTrack && dadosTrack.courses.map(course => {
              const progress = getCourseProgress(state, course);
              return (
                <div
                  key={course.id}
                  className="course-card"
                  onClick={() => onNavigate(`course-${course.id}`)}
                  style={{ '--course-color': course.color }}
                >
                  <div className="course-card-header">
                    <div className="course-card-icon" style={{ background: course.gradient }}>
                      <Icon name={course.icon} size={22} color="#fff" />
                    </div>
                    <div>
                      <div className="course-card-title">{course.name}</div>
                      <div className="course-card-modules">{course.modules.length} módulos</div>
                    </div>
                  </div>
                  <div className="course-card-desc">{course.description}</div>
                  <div className="progress-bar" style={{ marginBottom: '8px' }}>
                    <div className="progress-bar-fill" style={{ width: `${progress}%`, background: course.gradient }}></div>
                  </div>
                  <div className="course-card-footer">
                    <span style={{ color: course.color, fontWeight: 700 }}>{progress}%</span>
                    <span><Icon name="arrow-right" size={14} /></span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trilha Comercial */}
          <h3 style={{ marginTop: 'var(--space-xl)' }}>Trilha Comercial</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 'var(--space-lg)' }}>
            Desenvolva habilidades comerciais e estratégicas para o mercado.
          </p>
          <div className="dash-courses-grid stagger-children">
            {comercialTrack && comercialTrack.courses.map(course => {
              const progress = getCourseProgress(state, course);
              return (
                <div
                  key={course.id}
                  className="course-card"
                  onClick={() => onNavigate(`course-${course.id}`)}
                  style={{ '--course-color': course.color }}
                >
                  <div className="course-card-header">
                    <div className="course-card-icon" style={{ background: course.gradient }}>
                      <Icon name={course.icon} size={22} color="#fff" />
                    </div>
                    <div>
                      <div className="course-card-title">{course.name}</div>
                      <div className="course-card-modules">{course.modules.length} módulos</div>
                    </div>
                  </div>
                  <div className="course-card-desc">{course.description}</div>
                  <div className="progress-bar" style={{ marginBottom: '8px' }}>
                    <div className="progress-bar-fill" style={{ width: `${progress}%`, background: course.gradient }}></div>
                  </div>
                  <div className="course-card-footer">
                    <span style={{ color: course.color, fontWeight: 700 }}>{progress}%</span>
                    <span><Icon name="arrow-right" size={14} /></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Side panel */}
        <div className="dash-side">
          {/* Badges */}
          <div className="dash-panel-card">
            <h3><Icon name="award" size={14} /> Conquistas</h3>
            <div className="dash-badges-mini">
              {badges.slice(0, 6).map(badge => {
                const earned = state.earnedBadges.includes(badge.id);
                return (
                  <div key={badge.id} className={`dash-badge ${earned ? 'earned' : 'locked'}`} title={earned ? badge.name : '???'}>
                    {earned
                      ? <Icon name={badge.icon} size={18} color="var(--accent-primary)" />
                      : <Icon name="lock" size={14} color="var(--text-dim)" />}
                  </div>
                );
              })}
            </div>
            <div className="dash-panel-stat">
              <span className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 800 }}>{totalBadges}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}> / {badges.length} badges</span>
            </div>
            <button className="btn btn-ghost btn-sm" style={{ width: '100%', marginTop: '8px' }} onClick={() => onNavigate('badges')}>
              Ver conquistas <Icon name="arrow-right" size={14} />
            </button>
          </div>

          {/* Ranking */}
          <div className="dash-panel-card">
            <h3><Icon name="trophy" size={14} /> Ranking</h3>
            {allEntries.map((entry, i) => (
              <div key={i} className="dash-rank-item">
                <span className={`dash-rank-pos ${i < 3 ? `top-${i + 1}` : ''}`}>{i + 1}</span>
                <span className={`dash-rank-name ${entry.isYou ? 'is-you' : ''}`}>{entry.name}</span>
                <span className="dash-rank-xp">{entry.xp.toLocaleString()}</span>
              </div>
            ))}
            <button className="btn btn-ghost btn-sm" style={{ width: '100%', marginTop: '8px' }} onClick={() => onNavigate('leaderboard')}>
              Ver ranking <Icon name="arrow-right" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
