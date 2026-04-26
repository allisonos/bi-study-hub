// ═══════════════════════════════════════════════════════════════
//  DataPulse — Professional SVG Icon System
//  Clean, monoline icons inspired by Lucide/Feather
// ═══════════════════════════════════════════════════════════════

const icons = {
  // ── Navigation ──
  home: (
    <><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" /></>
  ),
  trophy: (
    <><path d="M6 9H4.5a2.5 2.5 0 010-5H6m12 5h1.5a2.5 2.5 0 000-5H18M6 9v4a6 6 0 006 6v0a6 6 0 006-6V9M6 9h12M9 21h6m-3-2v2" /></>
  ),
  medal: (
    <><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></>
  ),
  fire: (
    <><path d="M12 2c0 4-4 6-4 10a4 4 0 008 0c0-4-4-6-4-10z" /><path d="M12 18a2 2 0 002-2c0-2-2-3-2-5 0 2-2 3-2 5a2 2 0 002 2z" /></>
  ),

  // ── Tracks ──
  spreadsheet: (
    <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" /></>
  ),
  database: (
    <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></>
  ),
  'bar-chart': (
    <><path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" /></>
  ),
  code: (
    <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>
  ),
  sigma: (
    <><path d="M18 7V4H6l6 8-6 8h12v-3" /></>
  ),

  // ── Content ──
  play: (
    <><polygon points="5 3 19 12 5 21 5 3" /></>
  ),
  'play-circle': (
    <><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></>
  ),
  book: (
    <><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></>
  ),
  'book-open': (
    <><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></>
  ),
  'edit-3': (
    <><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></>
  ),
  copy: (
    <><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></>
  ),
  'refresh-cw': (
    <><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" /></>
  ),
  video: (
    <><rect x="2" y="6" width="15" height="12" rx="2" /><path d="M17 10l5-3v10l-5-3z" /></>
  ),

  // ── Actions ──
  check: (
    <><polyline points="20 6 9 17 4 12" /></>
  ),
  'check-circle': (
    <><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>
  ),
  'arrow-left': (
    <><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></>
  ),
  'arrow-right': (
    <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>
  ),
  clock: (
    <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>
  ),
  lock: (
    <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></>
  ),

  // ── Gamification ──
  zap: (
    <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></>
  ),
  target: (
    <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>
  ),
  award: (
    <><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></>
  ),
  star: (
    <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></>
  ),
  crown: (
    <><path d="M2 20h20M4 20l2-14 4 5 2-8 2 8 4-5 2 14" /></>
  ),
  shield: (
    <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>
  ),
  'shield-check': (
    <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></>
  ),
  rocket: (
    <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></>
  ),
  layers: (
    <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>
  ),
  trending: (
    <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></>
  ),
  users: (
    <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></>
  ),
  hash: (
    <><line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" /></>
  ),
  terminal: (
    <><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></>
  ),
  cpu: (
    <><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></>
  ),
  'git-merge': (
    <><circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><path d="M6 21V9a9 9 0 009 9" /></>
  ),
  activity: (
    <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></>
  ),
  crosshair: (
    <><circle cx="12" cy="12" r="10" /><line x1="22" y1="12" x2="18" y2="12" /><line x1="6" y1="12" x2="2" y2="12" /><line x1="12" y1="6" x2="12" y2="2" /><line x1="12" y1="22" x2="12" y2="18" /></>
  ),
  compass: (
    <><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></>
  ),
  wrench: (
    <><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></>
  ),
  'bar-chart-2': (
    <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>
  ),
  settings: (
    <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.32 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></>
  ),

  // ── Xperiun Gamification ──
  lightning: (
    <><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></>
  ),
  coin: (
    <><circle cx="12" cy="12" r="8" /><path d="M12 6v12M9 9h6M9 15h6" /></>
  ),
  seed: (
    <><path d="M12 22c4-4 8-8 8-12S16 2 12 2 4 6 4 10s4 8 8 12z" /><path d="M12 22V10" /><path d="M8 14c2-2 4-2 4-4" /><path d="M16 14c-2-2-4-2-4-4" /></>
  ),
  briefcase: (
    <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /><path d="M12 12v0" /><path d="M2 12h20" /></>
  ),
  map: (
    <><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" /></>
  ),
};

export default function Icon({ name, size = 20, color = 'currentColor', className = '', style = {} }) {
  const iconPath = icons[name];

  if (!iconPath) {
    return <span style={{ width: size, height: size, display: 'inline-block', ...style }}></span>;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon ${className}`}
      style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle', ...style }}
    >
      {iconPath}
    </svg>
  );
}

// Export icon name mapping for data files
export const TRACK_ICONS = {
  excel: 'spreadsheet',
  sql: 'database',
  powerbi: 'bar-chart',
  python: 'code',
  stats: 'sigma',
};

export const NAV_ICONS = {
  dashboard: 'home',
  leaderboard: 'trophy',
  badges: 'award',
};

export const LEVEL_ICONS = {
  1: 'compass',
  2: 'trending',
  3: 'bar-chart-2',
  4: 'rocket',
  5: 'crown',
};
