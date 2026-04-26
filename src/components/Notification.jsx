// ═══════════════════════════════════════════════════════════════
//  Pague Menos Academy — Notification Toast
//  Auto-dismiss individual notifications after 4s, max 3 visible
// ═══════════════════════════════════════════════════════════════

import { useState, useEffect, useRef, useCallback } from 'react';
import Icon from './Icon.jsx';
import '../styles/animations.css';

const typeIcons = {
  xp: 'zap',
  badge: 'award',
  levelup: 'trending',
};

export default function Notification({ notifications, onClear }) {
  const [queue, setQueue] = useState([]);
  const processedRef = useRef(new Set());

  // Add new notifications to queue
  useEffect(() => {
    if (notifications.length === 0) return;

    const newNotifs = notifications.filter(n => !processedRef.current.has(n.id));
    if (newNotifs.length === 0) return;

    newNotifs.forEach(n => processedRef.current.add(n.id));
    setQueue(prev => [...prev, ...newNotifs.map(n => ({ ...n, _ts: Date.now() + Math.random() }))]);
    if (onClear) onClear();
  }, [notifications]);

  // Auto-dismiss each notification after 4 seconds
  useEffect(() => {
    if (queue.length === 0) return;

    const oldest = queue[0];
    const timer = setTimeout(() => {
      setQueue(prev => prev.slice(1));
    }, 4000);

    return () => clearTimeout(timer);
  }, [queue]);

  // Show max 3 at a time
  const visible = queue.slice(0, 3);

  if (visible.length === 0) return null;

  return (
    <div className="notification-container">
      {visible.map((notif, i) => (
        <div
          key={notif._ts || notif.id || i}
          className={`notification-toast type-${notif.type || 'xp'}`}
          onClick={() => setQueue(prev => prev.filter(n => n._ts !== notif._ts))}
        >
          <span className="notification-icon">
            <Icon name={typeIcons[notif.type] || 'zap'} size={20} color={
              notif.type === 'xp' ? '#4D6AFF' :
              notif.type === 'badge' ? '#F59E0B' :
              '#FF2342'
            } />
          </span>
          <span className="notification-text">{notif.message}</span>
        </div>
      ))}
    </div>
  );
}
