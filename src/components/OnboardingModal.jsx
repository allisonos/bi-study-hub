import { useState } from 'react';
import Icon from './Icon.jsx';
import '../styles/animations.css';

export default function OnboardingModal({ onComplete }) {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [musicGenre, setMusicGenre] = useState('any');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete({
        name: name.trim(),
        goal: goal || 'Crescimento profissional',
        musicGenre,
      });
    }
  };

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-modal">
        <div className="onboarding-logo">
          <div className="pm-cross-large">📊</div>
        </div>
        <h2 className="onboarding-title">
          Bem-vindo ao <span className="cta-text">BI Study Hub</span>
        </h2>
        <p className="onboarding-subtitle">
          Desenvolva suas habilidades e cresça na carreira de dados.
        </p>

        <form className="onboarding-form" onSubmit={handleSubmit}>
          <label htmlFor="onb-name">Como podemos te chamar?</label>
          <input
            id="onb-name"
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
            required
          />

          <label htmlFor="onb-goal">Qual seu objetivo?</label>
          <select id="onb-goal" value={goal} onChange={e => setGoal(e.target.value)}>
            <option value="">Selecione...</option>
            <option value="Crescimento profissional">Crescimento profissional</option>
            <option value="Transição para área de dados">Transição para área de dados</option>
            <option value="Melhorar minhas análises">Melhorar minhas análises</option>
            <option value="Aprender novas ferramentas">Aprender novas ferramentas</option>
          </select>

          <label htmlFor="onb-genre">Qual seu gênero musical favorito?</label>
          <select id="onb-genre" value={musicGenre} onChange={e => setMusicGenre(e.target.value)}>
            <option value="any">Qualquer um 🎵</option>
            <option value="sertanejo">Sertanejo 🤠</option>
            <option value="funk">Funk 🎤</option>
            <option value="pagode">Pagode 🥁</option>
            <option value="pop">Pop 🌟</option>
            <option value="rock">Rock 🎸</option>
            <option value="trap">Trap / RAP 🎧</option>
            <option value="gospel">Gospel 🙏</option>
          </select>

          <button type="submit" className="btn btn-primary btn-lg" disabled={!name.trim()}>
            Começar minha jornada <Icon name="arrow-right" size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
