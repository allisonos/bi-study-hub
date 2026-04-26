// ═══════════════════════════════════════════════════════════════
//  DataPulse — Leaderboard Component (Professional)
// ═══════════════════════════════════════════════════════════════

import { getLevelByXP } from '../data/levels.js';
import Icon from './Icon.jsx';
import '../styles/leaderboard.css';

// Extended fake leaderboard data
const fakeUsers = [
  { name: 'Renan Vieira', xp: 18450, initials: 'RV' },
  { name: 'Diego Cardoso', xp: 15200, initials: 'DC' },
  { name: 'Allison Ryan', xp: 12900, initials: 'AR' },
  { name: 'Ana Clara Costa', xp: 11300, initials: 'AC' },
  { name: 'Gabriel Rocha', xp: 9600, initials: 'GR' },
  { name: 'Julia Ferreira', xp: 8100, initials: 'JF' },
  { name: 'Rafael Oliveira', xp: 6800, initials: 'RO' },
  { name: 'Camila Santos', xp: 5400, initials: 'CS' },
  { name: 'Diego Almeida', xp: 4200, initials: 'DA' },
  { name: 'Fernanda Lima', xp: 3100, initials: 'FL' },
];

export default function Leaderboard({ state, onNavigate }) {
  const userName = state.user.name || 'Você';
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const userEntry = {
    name: userName,
    xp: state.xp,
    initials: userInitials,
    isYou: true,
  };

  const allEntries = [...fakeUsers, userEntry]
    .sort((a, b) => b.xp - a.xp)
    .map((entry, i) => ({ ...entry, rank: i + 1 }));

  const top3 = allEntries.slice(0, 3);
  const rest = allEntries.slice(3);

  // Reorder top3 for podium display: 2nd, 1st, 3rd
  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);

  const medals = { 0: '2°', 1: '1°', 2: '3°' };

  return (
    <div className="leaderboard-page fade-in">
      <button className="back-btn" onClick={() => onNavigate('dashboard')}>
        <Icon name="arrow-left" size={16} /> Voltar ao Dashboard
      </button>

      <div className="page-header" style={{ textAlign: 'center' }}>
        <h1>Ranking Global</h1>
        <p>Suba no ranking conquistando XP em aulas, quizzes e exercícios.</p>
      </div>

      {/* Podium */}
      <div className="leaderboard-podium">
        {podiumOrder.map((entry, i) => {
          const posClass = i === 1 ? 'first' : i === 0 ? 'second' : 'third';
          return (
            <div key={entry.rank} className={`podium-item ${posClass}`}>
              <div
                className="podium-avatar"
                style={{ background: 'var(--bg-tertiary)' }}
              >
                {entry.initials}
              </div>
              <div className={`podium-name ${entry.isYou ? 'gradient-text' : ''}`}>
                {entry.name}
              </div>
              <div className="podium-xp">{entry.xp.toLocaleString()} XP</div>
              <div className="podium-bar">{medals[i]}</div>
            </div>
          );
        })}
      </div>

      {/* Rest of leaderboard */}
      <div className="leaderboard-list">
        {rest.map(entry => {
          const level = getLevelByXP(entry.xp);
          return (
            <div
              key={entry.rank}
              className={`leaderboard-list-item ${entry.isYou ? 'is-you' : ''}`}
            >
              <span className="lb-rank">{entry.rank}</span>
              <div className="lb-avatar">{entry.initials}</div>
              <div className="lb-info">
                <div className="lb-name">
                  {entry.name} {entry.isYou ? '(você)' : ''}
                </div>
                <div className="lb-level">
                  <Icon name={level.icon} size={11} /> {level.name}
                </div>
              </div>
              <span className="lb-xp">{entry.xp.toLocaleString()} XP</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
