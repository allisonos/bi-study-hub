// ═══════════════════════════════════════════════════════════════
//  DataPulse — Module View Component (Professional)
// ═══════════════════════════════════════════════════════════════

import { getModuleById } from '../data/tracks.js';
import { getQuizById } from '../data/quizzes.js';
import Icon from './Icon.jsx';
import '../styles/animations.css';

export default function ModuleView({ moduleId, state, onNavigate, onCompleteLesson, onCompleteExercise }) {
  const mod = getModuleById(moduleId);

  if (!mod) {
    return <div className="empty-state"><p>Módulo não encontrado</p></div>;
  }

  const quiz = getQuizById(mod.quiz.id);
  const hasQuiz = !!quiz;
  const quizResult = state.completedQuizzes[mod.quiz.id];
  const exerciseCompleted = state.completedExercises.includes(mod.exercise.id);

  return (
    <div className="module-view fade-in">
      <button className="back-btn" onClick={() => onNavigate(`course-${mod.courseId}`)}>
        <Icon name="arrow-left" size={16} /> Voltar ao Curso
      </button>

      <div className="module-view-header">
        <h2>{mod.name}</h2>
        <p>{mod.description}</p>
      </div>

      {/* Lessons */}
      <div className="module-section-header"><Icon name="video" size={14} /> Aulas</div>
      <div className="lesson-list">
        {mod.lessons.map(lesson => {
          const completed = state.completedLessons.includes(lesson.id);
          return (
            <div
              key={lesson.id}
              className={`lesson-item ${completed ? 'completed' : ''}`}
              onClick={() => {
                if (!completed) onCompleteLesson(lesson.id);
                onNavigate(`lesson-${lesson.id}`, { lesson, module: mod });
              }}
            >
              <div className="lesson-check">
                {completed ? <Icon name="check" size={14} color="#fff" /> : ''}
              </div>
              <div className="lesson-info">
                <div className="lesson-title">{lesson.title}</div>
                <div className="lesson-meta">
                  <span>
                    <Icon name={lesson.type === 'theory' ? 'book-open' : 'edit-3'} size={12} />
                    {' '}{lesson.type === 'theory' ? 'Teoria' : 'Prática'}
                  </span>
                  <span><Icon name="clock" size={12} /> {lesson.duration}</span>
                </div>
              </div>
              {!completed && <span className="lesson-xp-badge">+50 XP</span>}
            </div>
          );
        })}
      </div>

      {/* Quiz */}
      <div className="module-section-header"><Icon name="crosshair" size={14} /> Quiz de Fixação</div>
      <div className="lesson-list">
        <div
          className={`lesson-item ${quizResult ? 'completed' : ''}`}
          onClick={() => {
            if (hasQuiz) onNavigate(`quiz-${mod.quiz.id}`);
          }}
          style={{ cursor: hasQuiz ? 'pointer' : 'default' }}
        >
          <div className="lesson-check">
            {quizResult
              ? <Icon name="check" size={14} color="#fff" />
              : <Icon name="crosshair" size={14} />
            }
          </div>
          <div className="lesson-info">
            <div className="lesson-title">Quiz: {mod.name}</div>
            <div className="lesson-meta">
              <span><Icon name="file-text" size={12} /> {mod.quiz.questions} questões</span>
              {quizResult && <span style={{ color: 'var(--success)' }}>{quizResult.percentage}% correto</span>}
            </div>
          </div>
          {!quizResult && hasQuiz && (
            <span className="lesson-xp-badge">+80~150 XP</span>
          )}
          {!hasQuiz && (
            <span className="tag tag-basic" style={{ fontSize: '0.65rem' }}>Em breve</span>
          )}
        </div>
      </div>

      {/* Exercise */}
      <div className="module-section-header"><Icon name="wrench" size={14} /> Exercício Prático</div>
      <div className="lesson-list">
        <div className={`lesson-item ${exerciseCompleted ? 'completed' : ''}`}>
          <div className="lesson-check">
            {exerciseCompleted
              ? <Icon name="check" size={14} color="#fff" />
              : <Icon name="wrench" size={14} />
            }
          </div>
          <div className="lesson-info">
            <div className="lesson-title">{mod.exercise.title}</div>
            <div className="lesson-meta">
              <span><Icon name="file-text" size={12} /> Exercício prático com dados reais</span>
            </div>
          </div>
          {!exerciseCompleted ? (
            <button
              className="btn btn-success btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                onCompleteExercise(mod.exercise.id);
              }}
            >
              Entregar
            </button>
          ) : (
            <span style={{ color: 'var(--success)', fontSize: '0.8rem', fontWeight: 600 }}>
              Entregue <Icon name="check-circle" size={14} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
