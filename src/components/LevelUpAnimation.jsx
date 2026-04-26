// ═══════════════════════════════════════════════════════════════
//  DataPulse — Level Up Animation Component (Professional)
// ═══════════════════════════════════════════════════════════════

import { useEffect } from 'react';
import Icon from './Icon.jsx';
import '../styles/animations.css';

export default function LevelUpAnimation({ level, onClose }) {
  useEffect(() => {
    // Spawn subtle confetti particles
    const colors = ['#7C3AED', '#06B6D4', '#3B82F6', '#8B5CF6', '#94A3B8'];
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle';
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.animationDelay = `${Math.random() * 1}s`;
      particle.style.animationDuration = `${1.5 + Math.random() * 1.5}s`;
      particle.style.opacity = '0.6';
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 3000);
    }

    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!level) return null;

  return (
    <div className="levelup-overlay" onClick={onClose}>
      <div className="levelup-content" onClick={e => e.stopPropagation()}>
        <div className="levelup-icon" style={{ color: level.color }}>
          <Icon name={level.icon} size={72} />
        </div>
        <div className="levelup-title">Nível Alcançado</div>
        <div className="levelup-name gradient-text">{level.name}</div>
        <ul className="levelup-benefits">
          {level.benefits.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <button className="btn btn-primary btn-lg" onClick={onClose}>
          Continuar <Icon name="arrow-right" size={16} />
        </button>
      </div>
    </div>
  );
}
