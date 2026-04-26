// ═══════════════════════════════════════════════════════════════
//  BI Study Hub — Rich Lesson View
//  Custom markdown renderer with visual blocks + practice quiz
// ═══════════════════════════════════════════════════════════════

import { useState, useCallback } from 'react';
import Icon from './Icon.jsx';
import { LESSON_DIAGRAMS } from './InlineDiagrams.jsx';
import '../styles/lesson-content.css';

// ── Utility: detect callout type from blockquote text ──────────
function detectCallout(text) {
  if (text.includes('💡') || text.toLowerCase().includes('dica'))
    return { type: 'tip', label: 'Dica Sênior', icon: '💡' };
  if (text.includes('⚠️') || text.toLowerCase().includes('atenção') || text.toLowerCase().includes('cuidado'))
    return { type: 'warning', label: 'Atenção', icon: '⚠️' };
  if (text.includes('🚨') || text.toLowerCase().includes('nunca') || text.toLowerCase().includes('perigo'))
    return { type: 'danger', label: 'Importante', icon: '🚨' };
  return { type: 'tip', label: 'Nota', icon: '📌' };
}

// ── Copy to clipboard hook ──────────────────────────────────────
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button className={`code-block-copy ${copied ? 'copied' : ''}`} onClick={handleCopy}>
      <Icon name={copied ? 'check' : 'copy'} size={11} />
      {copied ? 'Copiado!' : 'Copiar'}
    </button>
  );
}

// ── Code Block ─────────────────────────────────────────────────
function CodeBlock({ lang, code }) {
  return (
    <div className="code-block-wrap">
      <div className="code-block-header">
        <span className="code-block-lang">{lang || 'code'}</span>
        <CopyButton text={code} />
      </div>
      <pre className="code-block-pre"><code>{code}</code></pre>
    </div>
  );
}

// ── Inline text renderer (handles bold, italic, inline code) ───
function renderInlineText(text) {
  if (!text) return null;
  // Split on **bold**, *italic*, `code`, and links
  const parts = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.*?)\*\*/);
    const italicMatch = remaining.match(/\*(.*?)\*/);
    const codeMatch = remaining.match(/`([^`]+)`/);
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

    const candidates = [boldMatch, italicMatch, codeMatch, linkMatch]
      .filter(Boolean)
      .sort((a, b) => a.index - b.index);

    if (candidates.length === 0) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }

    const first = candidates[0];
    if (first.index > 0) {
      parts.push(<span key={key++}>{remaining.slice(0, first.index)}</span>);
    }

    if (first === boldMatch) {
      parts.push(<strong key={key++}>{first[1]}</strong>);
    } else if (first === italicMatch) {
      parts.push(<em key={key++}>{first[1]}</em>);
    } else if (first === codeMatch) {
      parts.push(<code key={key++}>{first[1]}</code>);
    } else if (first === linkMatch) {
      parts.push(<strong key={key++}>{first[1]}</strong>);
    }

    remaining = remaining.slice(first.index + first[0].length);
  }

  return parts;
}

// ── Main Content Renderer ───────────────────────────────────────
function ContentRenderer({ markdown }) {
  if (!markdown) return null;

  const lines = markdown.split('\n');
  const blocks = [];
  let i = 0;
  let sectionCount = 0;

  while (i < lines.length) {
    const line = lines[i];

    // ── H2 Heading → Section block ──
    if (line.startsWith('## ')) {
      sectionCount++;
      const title = line.replace(/^## /, '');
      // Collect paragraph lines until next ## or ─── or end
      const bodyLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('## ') && !lines[i].startsWith('---')) {
        bodyLines.push(lines[i]);
        i++;
      }
      const bodyText = bodyLines.join('\n').trim();
      // Parse bodyText into sub-elements
      const subBlocks = parseBodyLines(bodyLines);
      blocks.push(
        <div key={`sec-${sectionCount}`} className="content-section" style={{ animationDelay: `${sectionCount * 0.05}s` }}>
          <div className="content-section-title">
            <div className="content-section-num">{sectionCount}</div>
            <h3>{title}</h3>
          </div>
          <div className="content-section-body">
            {subBlocks}
          </div>
        </div>
      );
      continue;
    }

    // ── Horizontal rule → separator ──
    if (line.startsWith('---')) {
      blocks.push(<div key={`sep-${i}`} className="content-separator" />);
      i++;
      continue;
    }

    // ── Blockquote → Callout ──
    if (line.startsWith('> ')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].replace(/^> /, ''));
        i++;
      }
      const text = quoteLines.join(' ');
      const callout = detectCallout(text);
      const cleanText = text.replace(/[💡⚠️🚨📌]/g, '').trim();
      blocks.push(
        <div key={`callout-${i}`} className={`callout-card ${callout.type}`}>
          <div className="callout-icon">{callout.icon}</div>
          <div className="callout-content">
            <div className="callout-label">{callout.label}</div>
            <p>{renderInlineText(cleanText)}</p>
          </div>
        </div>
      );
      continue;
    }

    // ── Code block ──
    if (line.startsWith('```')) {
      const lang = line.replace('```', '').trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push(<CodeBlock key={`code-${i}`} lang={lang} code={codeLines.join('\n')} />);
      continue;
    }

    // ── Table (markdown) ──
    if (line.startsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      blocks.push(<MarkdownTable key={`table-${i}`} lines={tableLines} />);
      continue;
    }

    // ── Bullet list ──
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const listItems = [];
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        listItems.push(lines[i].replace(/^[-*] /, ''));
        i++;
      }
      blocks.push(
        <ul key={`list-${i}`} className="content-list">
          {listItems.map((item, idx) => (
            <li key={idx}>{renderInlineText(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // ── Numbered list ──
    if (/^\d+\. /.test(line)) {
      const listItems = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\. /, ''));
        i++;
      }
      blocks.push(
        <ul key={`olist-${i}`} className="content-list">
          {listItems.map((item, idx) => (
            <li key={idx}>{renderInlineText(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // ── H3 heading → inline bold title ──
    if (line.startsWith('### ')) {
      const title = line.replace(/^### /, '');
      blocks.push(
        <p key={`h3-${i}`} style={{
          fontWeight: 700, fontSize: '0.95rem',
          color: 'var(--text-primary)', marginBottom: '4px',
          paddingTop: '4px'
        }}>
          {renderInlineText(title)}
        </p>
      );
      i++;
      continue;
    }

    // ── Empty line ──
    if (line.trim() === '') {
      i++;
      continue;
    }

    // ── Regular paragraph ──
    const paraLines = [];
    while (i < lines.length && lines[i].trim() !== '' && !lines[i].startsWith('#') && !lines[i].startsWith('```') && !lines[i].startsWith('|') && !lines[i].startsWith('> ') && !lines[i].startsWith('- ') && !lines[i].startsWith('---')) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push(
        <p key={`para-${i}`} style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.8' }}>
          {renderInlineText(paraLines.join(' '))}
        </p>
      );
    }
  }

  return <div className="lesson-content-renderer">{blocks}</div>;
}

// ── Parse body lines within a ## section ──────────────────────
function parseBodyLines(lines) {
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('> ')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].replace(/^> /, ''));
        i++;
      }
      const text = quoteLines.join(' ');
      const callout = detectCallout(text);
      const cleanText = text.replace(/[💡⚠️🚨📌]/g, '').trim();
      blocks.push(
        <div key={`sq-callout-${i}`} className={`callout-card ${callout.type}`} style={{ marginTop: 8, marginBottom: 8 }}>
          <div className="callout-icon">{callout.icon}</div>
          <div className="callout-content">
            <div className="callout-label">{callout.label}</div>
            <p>{renderInlineText(cleanText)}</p>
          </div>
        </div>
      );
      continue;
    }

    if (line.startsWith('```')) {
      const lang = line.replace('```', '').trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      blocks.push(<CodeBlock key={`sq-code-${i}`} lang={lang} code={codeLines.join('\n')} />);
      continue;
    }

    if (line.startsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      blocks.push(<MarkdownTable key={`sq-table-${i}`} lines={tableLines} />);
      continue;
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      const items = [];
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        items.push(lines[i].replace(/^[-*] /, ''));
        i++;
      }
      blocks.push(
        <ul key={`sq-list-${i}`} className="content-list" style={{ marginTop: 8, marginBottom: 8 }}>
          {items.map((item, idx) => <li key={idx}>{renderInlineText(item)}</li>)}
        </ul>
      );
      continue;
    }

    if (/^\d+\. /.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ''));
        i++;
      }
      blocks.push(
        <ul key={`sq-olist-${i}`} className="content-list" style={{ marginTop: 8, marginBottom: 8 }}>
          {items.map((item, idx) => <li key={idx}>{renderInlineText(item)}</li>)}
        </ul>
      );
      continue;
    }

    if (line.startsWith('### ')) {
      blocks.push(
        <p key={`sq-h3-${i}`} style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--accent-light)', marginTop: 12, marginBottom: 4 }}>
          {renderInlineText(line.replace(/^### /, ''))}
        </p>
      );
      i++;
      continue;
    }

    if (line.trim() === '') { i++; continue; }

    const paraLines = [];
    while (i < lines.length && lines[i].trim() !== '' && !lines[i].startsWith('#') && !lines[i].startsWith('```') && !lines[i].startsWith('|') && !lines[i].startsWith('> ') && !lines[i].startsWith('- ') && !lines[i].startsWith('---')) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length) {
      blocks.push(
        <p key={`sq-para-${i}`} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.8', marginBottom: 8 }}>
          {renderInlineText(paraLines.join(' '))}
        </p>
      );
    }
  }
  return blocks;
}

// ── Markdown Table Component ────────────────────────────────────
function MarkdownTable({ lines }) {
  const rows = lines.filter(l => !l.match(/^\|[-\s|]+\|$/));
  if (rows.length === 0) return null;
  const headers = rows[0].split('|').filter(c => c.trim()).map(c => c.trim());
  const body = rows.slice(1).map(r => r.split('|').filter(c => c.trim()).map(c => c.trim()));

  return (
    <div className="content-table-wrap">
      <table className="content-table">
        <thead>
          <tr>{headers.map((h, i) => <th key={i}>{renderInlineText(h)}</th>)}</tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{renderInlineText(cell)}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Practice Quiz Component ─────────────────────────────────────
function PracticeQuiz({ lessonData, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = selected === lessonData.expectedAnswer;
  const letters = ['A', 'B', 'C', 'D', 'E'];

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    if (isCorrect) setTimeout(() => onComplete(), 1500);
  };

  return (
    <div className="practice-quiz">
      <div className="practice-quiz-header">
        <Icon name="edit-3" size={16} color="#00E676" />
        <h3>Desafio Prático</h3>
      </div>
      <div className="practice-quiz-body">
        {/* Scenario content */}
        <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: 'var(--space-lg)', marginBottom: 'var(--space-lg)', border: '1px solid var(--border-subtle)' }}>
          <ContentRenderer markdown={lessonData.content} />
        </div>

        {lessonData.options && (
          <>
            <div className="practice-options">
              {lessonData.options.map((opt, i) => {
                let cls = 'practice-option';
                if (submitted) {
                  if (i === lessonData.expectedAnswer) cls += ' correct';
                  else if (i === selected) cls += ' incorrect';
                } else if (i === selected) cls += ' selected';
                return (
                  <button
                    key={i}
                    className={cls}
                    onClick={() => !submitted && setSelected(i)}
                    disabled={submitted}
                  >
                    <span className="practice-option-letter">{letters[i]}</span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {!submitted && (
              <button
                className="btn btn-primary btn-lg practice-submit"
                onClick={handleSubmit}
                disabled={selected === null}
              >
                <Icon name="check" size={16} /> Confirmar Resposta
              </button>
            )}

            {submitted && (
              <div className={`practice-feedback ${isCorrect ? 'correct-fb' : 'incorrect-fb'}`}>
                <div className="practice-feedback-icon">{isCorrect ? '🎉' : '💡'}</div>
                <div className="practice-feedback-text">
                  <div className="practice-feedback-title">{isCorrect ? 'Excelente! Resposta correta.' : 'Não foi dessa vez!'}</div>
                  <p>
                    {isCorrect
                      ? 'Você demonstrou domínio do conceito. Avançando para conclusão da aula...'
                      : `A resposta correta é a opção ${letters[lessonData.expectedAnswer]}: ${lessonData.options[lessonData.expectedAnswer]}`
                    }
                  </p>
                  {!isCorrect && (
                    <button
                      className="btn btn-ghost btn-sm"
                      style={{ marginTop: 12 }}
                      onClick={() => { setSelected(null); setSubmitted(false); }}
                    >
                      <Icon name="refresh-cw" size={13} /> Tentar novamente
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ── Main LessonView Component ───────────────────────────────────
export default function LessonView({ lessonData, moduleData, state, onNavigate, onCompleteLesson }) {
  if (!lessonData || !moduleData) {
    return <div className="empty-state"><p>Aula não encontrada</p></div>;
  }

  const isCompleted = state.completedLessons.includes(lessonData.id);
  const diagrams = LESSON_DIAGRAMS[lessonData.id] || [];
  const isPractice = lessonData.type === 'practice';

  return (
    <div className="lesson-view fade-in">
      <button className="back-btn" onClick={() => onNavigate(`module-${moduleData.id}`)}>
        <Icon name="arrow-left" size={16} /> Voltar ao Módulo
      </button>

      {/* Hero Header */}
      <div className="lesson-hero">
        <div className="lesson-hero-glow" />
        <div className={`lesson-hero-badge ${isPractice ? 'type-practice' : 'type-theory'}`}>
          <Icon name={isPractice ? 'edit-3' : 'book-open'} size={11} />
          {isPractice ? 'Desafio Prático' : 'Aula Teórica'}
        </div>
        <h2>{lessonData.title}</h2>
        <div className="lesson-hero-meta">
          <span><Icon name="layers" size={13} />{moduleData.name}</span>
          <span><Icon name="clock" size={13} />{lessonData.duration}</span>
          {isCompleted && <span style={{ color: 'var(--success)' }}><Icon name="check-circle" size={13} />Concluída</span>}
        </div>
      </div>

      {/* Inline Diagrams (before content for context) */}
      {diagrams.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
          {diagrams.map((Diagram, idx) => <Diagram key={idx} />)}
        </div>
      )}

      {/* Content */}
      {isPractice ? (
        <PracticeQuiz lessonData={lessonData} onComplete={() => onCompleteLesson(lessonData.id)} />
      ) : (
        <ContentRenderer markdown={lessonData.content} />
      )}

      {/* Action Footer */}
      <div className="lesson-action-footer">
        {!isCompleted ? (
          <button className="lesson-complete-btn" onClick={() => onCompleteLesson(lessonData.id)}>
            <Icon name="check" size={18} />
            Marcar como Concluída — +50 XP
          </button>
        ) : (
          <div className="lesson-completed-badge">
            <Icon name="check-circle" size={18} />
            Aula Concluída!
          </div>
        )}
        <button className="btn btn-ghost" onClick={() => onNavigate(`module-${moduleData.id}`)}>
          <Icon name="arrow-left" size={14} /> Voltar ao Módulo
        </button>
      </div>
    </div>
  );
}
