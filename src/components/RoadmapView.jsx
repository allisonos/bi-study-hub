import { useState } from 'react';
import { roadmapLevels } from '../data/roadmap.js';
import Icon from './Icon.jsx';
import '../styles/roadmap.css';

const MIN_SCORE = 4; // out of 5

function QuizModal({ topic, onClose, onPass }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);

  const q = topic.questions[current];
  const score = answers.filter(Boolean).length;

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
  };

  const handleNext = () => {
    const isCorrect = selected === q.answer;
    const newAnswers = [...answers, isCorrect];
    if (current + 1 >= topic.questions.length) {
      setAnswers(newAnswers);
      setDone(true);
    } else {
      setAnswers(newAnswers);
      setCurrent(c => c + 1);
      setSelected(null);
    }
  };

  const passed = score >= MIN_SCORE;

  return (
    <div className="roadmap-quiz-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="roadmap-quiz-modal">
        <button className="roadmap-quiz-close" onClick={onClose}>✕</button>

        {!done ? (
          <>
            <div className="roadmap-quiz-header">
              <span className="roadmap-quiz-topic">{topic.title}</span>
              <span className="roadmap-quiz-progress">{current + 1} / {topic.questions.length}</span>
            </div>
            <div className="roadmap-quiz-bar">
              <div style={{ width: `${((current) / topic.questions.length) * 100}%` }} />
            </div>
            <p className="roadmap-quiz-question">{q.q}</p>
            <div className="roadmap-quiz-options">
              {q.options.map((opt, i) => {
                let cls = 'roadmap-quiz-option';
                if (selected !== null) {
                  if (i === q.answer) cls += ' correct';
                  else if (i === selected) cls += ' wrong';
                }
                if (selected === i && i !== q.answer) cls += ' selected';
                return (
                  <button key={i} className={cls} onClick={() => handleSelect(i)}>
                    <span className="roadmap-quiz-letter">{String.fromCharCode(65 + i)}</span>
                    {opt}
                  </button>
                );
              })}
            </div>
            {selected !== null && (
              <button className="btn btn-primary" onClick={handleNext} style={{ marginTop: '16px', width: '100%' }}>
                {current + 1 < topic.questions.length ? 'Próxima →' : 'Ver resultado'}
              </button>
            )}
          </>
        ) : (
          <div className="roadmap-quiz-result">
            <div className={`roadmap-quiz-result-icon ${passed ? 'pass' : 'fail'}`}>
              {passed ? '🏆' : '😓'}
            </div>
            <h3>{passed ? 'Tópico Concluído!' : 'Quase lá!'}</h3>
            <p className="roadmap-quiz-score">
              {score} / {topic.questions.length} corretas
            </p>
            <p className="roadmap-quiz-result-msg">
              {passed
                ? `Você domina ${topic.title}. Continue avançando!`
                : `Mínimo para passar: ${MIN_SCORE}/${topic.questions.length}. Revise o conteúdo e tente novamente.`}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px' }}>
              <button className="btn btn-ghost" onClick={onClose}>Fechar</button>
              {passed
                ? <button className="btn btn-primary" onClick={() => onPass()}>Marcar como concluído ✓</button>
                : <button className="btn btn-primary" onClick={() => { setCurrent(0); setSelected(null); setAnswers([]); setDone(false); }}>Tentar novamente</button>
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TopicCard({ topic, completed, levelColor, onStartQuiz }) {
  const [expanded, setExpanded] = useState(false);
  const priorityColors = { alta: '#EF4444', média: '#F59E0B', baixa: '#10B981' };

  return (
    <div className={`roadmap-topic-card ${completed ? 'completed' : ''}`}>
      <div className="roadmap-topic-header" onClick={() => setExpanded(e => !e)}>
        <div className="roadmap-topic-left">
          <div className="roadmap-topic-status" style={{ borderColor: completed ? levelColor : 'var(--border-subtle)' }}>
            {completed && <span style={{ color: levelColor }}>✓</span>}
          </div>
          <div>
            <div className="roadmap-topic-title">{topic.title}</div>
            <div className="roadmap-topic-meta">
              <span>⏱ {topic.time}</span>
              <span className="roadmap-topic-priority" style={{ color: priorityColors[topic.priority] }}>
                ● {topic.priority}
              </span>
            </div>
          </div>
        </div>
        <span className={`roadmap-topic-chevron ${expanded ? 'open' : ''}`}>›</span>
      </div>

      {expanded && (
        <div className="roadmap-topic-body">
          <div className="roadmap-subtopics">
            {topic.subtopics.map((s, i) => (
              <span key={i} className="roadmap-subtopic-tag">{s}</span>
            ))}
          </div>
          <button
            className={`btn ${completed ? 'btn-ghost' : 'btn-primary'} btn-sm`}
            style={{ marginTop: '12px', minWidth: '160px' }}
            onClick={() => onStartQuiz(topic)}
          >
            {completed ? '✓ Refazer Quiz' : '🎯 Iniciar Quiz'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function RoadmapView({ state, onCompleteRoadmapTopic }) {
  const [selectedLevel, setSelectedLevel] = useState('junior');
  const [activeQuiz, setActiveQuiz] = useState(null);

  const level = roadmapLevels.find(l => l.id === selectedLevel);
  const progress = state.roadmapProgress || {};
  const levelProgress = progress[selectedLevel] || {};

  const completedCount = level.topics.filter(t => levelProgress[t.id]).length;
  const totalCount = level.topics.length;
  const pct = Math.round((completedCount / totalCount) * 100);

  const handlePass = () => {
    if (activeQuiz) {
      onCompleteRoadmapTopic(selectedLevel, activeQuiz.id);
      setActiveQuiz(null);
    }
  };

  return (
    <div className="roadmap-view fade-in">
      <div className="roadmap-hero">
        <h2>🗺️ Roadmap de Carreira</h2>
        <p>Valide seu conhecimento nível por nível. Mínimo <strong>4/5 questões</strong> para completar cada tópico.</p>
      </div>

      {/* Level selector */}
      <div className="roadmap-level-selector">
        {roadmapLevels.map(lvl => {
          const lvlProgress = progress[lvl.id] || {};
          const lvlDone = lvl.topics.filter(t => lvlProgress[t.id]).length;
          const lvlTotal = lvl.topics.length;
          const active = selectedLevel === lvl.id;

          return (
            <button
              key={lvl.id}
              className={`roadmap-level-btn ${active ? 'active' : ''}`}
              style={{ '--level-color': lvl.color }}
              onClick={() => setSelectedLevel(lvl.id)}
            >
              <span className="roadmap-level-icon">{lvl.icon}</span>
              <div className="roadmap-level-info">
                <span className="roadmap-level-name">{lvl.label}</span>
                <span className="roadmap-level-years">{lvl.years}</span>
              </div>
              <span className="roadmap-level-count">{lvlDone}/{lvlTotal}</span>
            </button>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="roadmap-progress-section">
        <div className="roadmap-progress-header">
          <span style={{ color: level.color, fontWeight: 700 }}>{level.icon} {level.label}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{completedCount}/{totalCount} tópicos • {pct}%</span>
        </div>
        <div className="roadmap-progress-bar">
          <div className="roadmap-progress-fill" style={{ width: `${pct}%`, background: level.gradient }} />
        </div>
      </div>

      {/* Topics list */}
      <div className="roadmap-topics-list">
        {level.topics.map((topic, idx) => (
          <div key={topic.id} className="roadmap-topic-wrapper">
            <div className="roadmap-topic-number" style={{ color: level.color }}>{idx + 1}</div>
            <TopicCard
              topic={topic}
              completed={!!levelProgress[topic.id]}
              levelColor={level.color}
              onStartQuiz={setActiveQuiz}
            />
          </div>
        ))}
      </div>

      {/* Quiz Modal */}
      {activeQuiz && (
        <QuizModal
          topic={activeQuiz}
          onClose={() => setActiveQuiz(null)}
          onPass={handlePass}
        />
      )}
    </div>
  );
}
