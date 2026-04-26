// ═══════════════════════════════════════════════════════════════
//  DataPulse — Quiz View Component (Professional)
// ═══════════════════════════════════════════════════════════════

import { useState } from 'react';
import { getQuizById } from '../data/quizzes.js';
import Icon from './Icon.jsx';
import '../styles/quiz.css';

export default function QuizView({ quizId, state, onNavigate, onCompleteQuiz }) {
  const quiz = getQuizById(quizId);

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  if (!quiz) {
    return <div className="empty-state"><p>Quiz não encontrado</p></div>;
  }

  const question = quiz.questions[currentQ];
  const letters = ['A', 'B', 'C', 'D'];

  const handleSelect = (optionIndex) => {
    if (answered) return;
    setSelected(optionIndex);
  };

  const handleConfirm = () => {
    if (selected === null) return;

    const isCorrect = selected === question.correct;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);
    setAnswered(true);
    setAnswers([...answers, { questionId: question.id, selected, correct: question.correct, isCorrect }]);
  };

  const handleNext = () => {
    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
      onCompleteQuiz(quizId, score, quiz.questions.length);
    }
  };

  const getOptionClass = (index) => {
    if (!answered) {
      return selected === index ? 'selected' : '';
    }
    if (index === question.correct) return 'correct correct-answer';
    if (index === selected && index !== question.correct) return 'incorrect';
    return 'disabled';
  };

  const percentage = Math.round((score / quiz.questions.length) * 100);
  const passed = percentage >= 70;

  // Already completed
  const previousResult = state.completedQuizzes[quizId];

  if (finished || previousResult) {
    const displayScore = finished ? score : previousResult?.score || 0;
    const displayTotal = finished ? quiz.questions.length : previousResult?.total || quiz.questions.length;
    const displayPercentage = finished ? percentage : previousResult?.percentage || 0;
    const displayPassed = displayPercentage >= 70;

    return (
      <div className="quiz fade-in">
        <button className="back-btn" onClick={() => onNavigate(`module-${quiz.moduleId}`)}>
          <Icon name="arrow-left" size={16} /> Voltar ao Módulo
        </button>

        <div className="quiz-results">
          <div className={`quiz-results-score ${displayPassed ? 'passed' : 'failed'}`}>
            {displayPercentage}%
          </div>
          <div className="quiz-results-label">
            {displayPassed
              ? (displayPercentage === 100 ? 'Perfeito! Nota máxima.' : 'Aprovado! Bom trabalho.')
              : 'Não atingiu 70%. Tente novamente.'
            }
          </div>
          {displayPassed && (
            <div className="quiz-results-xp">
              <Icon name="zap" size={16} /> +{displayPercentage === 100 ? '150' : '80'} XP
            </div>
          )}
          <div className="quiz-results-details">
            Acertou {displayScore} de {displayTotal} questões
          </div>
          <div className="quiz-actions">
            {!displayPassed && !previousResult && (
              <button className="btn btn-primary" onClick={() => {
                setCurrentQ(0); setSelected(null); setAnswered(false);
                setScore(0); setFinished(false); setAnswers([]);
              }}>
                Tentar Novamente
              </button>
            )}
            <button className="btn btn-secondary" onClick={() => onNavigate(`module-${quiz.moduleId}`)}>
              Voltar ao Módulo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz fade-in">
      <button className="back-btn" onClick={() => onNavigate(`module-${quiz.moduleId}`)}>
        <Icon name="arrow-left" size={16} /> Voltar ao Módulo
      </button>

      <div className="quiz-header">
        <h2>{quiz.title}</h2>
        <div className="quiz-progress-info">
          Questão {currentQ + 1} de {quiz.questions.length}
        </div>
        <div className="progress-bar" style={{ maxWidth: '300px', margin: '0 auto' }}>
          <div
            className="progress-bar-fill"
            style={{ width: `${((currentQ + (answered ? 1 : 0)) / quiz.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="quiz-question-card">
        <div className="quiz-question-number">Questão {currentQ + 1}</div>
        <div className="quiz-question-text">{question.question}</div>

        <div className="quiz-options">
          {question.options.map((option, i) => (
            <div
              key={i}
              className={`quiz-option ${getOptionClass(i)}`}
              onClick={() => handleSelect(i)}
            >
              <span className={`quiz-option-letter ${getOptionClass(i)}`}>{letters[i]}</span>
              <span>{option}</span>
            </div>
          ))}
        </div>

        {answered && (
          <div className="quiz-explanation">
            <strong>Explicação: </strong>{question.explanation}
          </div>
        )}
      </div>

      <div className="quiz-actions">
        {!answered ? (
          <button
            className="btn btn-primary btn-lg"
            onClick={handleConfirm}
            disabled={selected === null}
          >
            Confirmar Resposta
          </button>
        ) : (
          <button className="btn btn-primary btn-lg" onClick={handleNext}>
            {currentQ < quiz.questions.length - 1 ? 'Próxima Questão' : 'Ver Resultado'}
            {' '}<Icon name="arrow-right" size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
