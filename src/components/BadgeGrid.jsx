// ═══════════════════════════════════════════════════════════════
//  Pague Menos Academy — Badge Grid
// ═══════════════════════════════════════════════════════════════

import { badges, rarityColors } from '../data/badges.js';
import Icon from './Icon.jsx';
import '../styles/badges.css';

const rarityLabels = {
  common: 'Comum',
  rare: 'Raro',
  epic: 'Épico',
  legendary: 'Lendário',
};

export default function BadgeGrid({ state, onNavigate }) {
  const earnedCount = state.earnedBadges.length;
  const totalCount = badges.length;

  const groupedBadges = {
    milestone:   badges.filter(b => b.category === 'milestone'),
    course:      badges.filter(b => b.category === 'course'),
    achievement: badges.filter(b => b.category === 'achievement'),
    streak:      badges.filter(b => b.category === 'streak'),
  };

  const categoryNames = {
    milestone: 'Marcos',
    course: 'Cursos',
    achievement: 'Conquistas',
    streak: 'Consistência',
  };

  const categoryIcons = {
    milestone: 'shield',
    course: 'layers',
    achievement: 'star',
    streak: 'fire',
  };

  return (
    <div className="badges-page fade-in">
      <button className="back-btn" onClick={() => onNavigate('dashboard')}>
        <Icon name="arrow-left" size={16} /> Voltar ao Dashboard
      </button>

      <div className="page-header" style={{ marginBottom: 'var(--space-xl)' }}>
        <h1>Suas Conquistas</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '4px', fontSize: '0.9rem' }}>
          Colete todas as badges completando aulas, quizzes, exercícios e mantendo sua consistência.
        </p>
      </div>

      <div className="badges-stats">
        <div className="badges-stat-card">
          <div className="stat-value gradient-text">{earnedCount}</div>
          <div className="stat-label">Conquistados</div>
        </div>
        <div className="badges-stat-card">
          <div className="stat-value" style={{ color: 'var(--text-muted)' }}>{totalCount - earnedCount}</div>
          <div className="stat-label">Restantes</div>
        </div>
        <div className="badges-stat-card">
          <div className="stat-value" style={{ color: 'var(--warning)' }}>
            {totalCount > 0 ? Math.round((earnedCount / totalCount) * 100) : 0}%
          </div>
          <div className="stat-label">Completo</div>
        </div>
      </div>

      {Object.entries(groupedBadges).map(([category, categoryBadges]) => {
        if (categoryBadges.length === 0) return null;
        return (
          <div key={category}>
            <div className="badges-section-title">
              <Icon name={categoryIcons[category]} size={14} /> {categoryNames[category]}
            </div>
            <div className="badges-grid stagger-children">
              {categoryBadges.map(badge => {
                const earned = state.earnedBadges.includes(badge.id);
                const colors = rarityColors[badge.rarity];
                return (
                  <div
                    key={badge.id}
                    className={`badge-card ${earned ? 'earned' : 'locked'} ${badge.rarity}`}
                    style={earned ? {
                      borderColor: colors.border,
                      boxShadow: `0 0 10px ${colors.glow}`,
                    } : {}}
                  >
                    <span className="badge-card-icon">
                      {earned
                        ? <Icon name={badge.icon} size={32} color={colors.border} />
                        : <Icon name="lock" size={28} color="var(--text-muted)" />
                      }
                    </span>
                    <div className="badge-card-name">{earned ? badge.name : '???'}</div>
                    <div className="badge-card-desc">
                      {earned ? badge.description : 'Continue progredindo para desbloquear.'}
                    </div>
                    <span
                      className="badge-card-rarity"
                      style={{
                        backgroundColor: earned ? colors.bg : 'var(--bg-tertiary)',
                        color: earned ? colors.border : 'var(--text-muted)',
                        border: `1px solid ${earned ? colors.border : 'transparent'}`,
                      }}
                    >
                      {rarityLabels[badge.rarity]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
