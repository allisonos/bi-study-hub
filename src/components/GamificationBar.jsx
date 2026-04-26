// ═══════════════════════════════════════════════════════════════
//  Pague Menos Academy — Gamification Bar
// ═══════════════════════════════════════════════════════════════

import Icon from './Icon.jsx';

const metrics = [
  { key: 'xp',     label: 'XP',     icon: 'zap',       color: '#2133DD', desc: 'Conhecimento' },
  { key: 'xbolts', label: 'XBolts', icon: 'lightning',  color: '#3B82F6', desc: 'Prática' },
  { key: 'xcoins', label: 'XCoins', icon: 'coin',       color: '#F59E0B', desc: 'Moeda' },
  { key: 'xcore',  label: 'XCore',  icon: 'fire',       color: '#FF2342', desc: 'Constância' },
];

export default function GamificationBar({ state }) {
  return (
    <div className="gamification-bar">
      {metrics.map(m => (
        <div key={m.key} className="gbar-item" style={{ '--gbar-color': m.color }}>
          <div className="gbar-icon">
            <Icon name={m.icon} size={18} color={m.color} />
          </div>
          <div className="gbar-info">
            <div className="gbar-value">{(state[m.key] || 0).toLocaleString()}</div>
            <div className="gbar-label">{m.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
