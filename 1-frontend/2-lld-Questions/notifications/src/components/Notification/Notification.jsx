import { useState, useEffect, useRef } from 'react';

export const Notification = ({ message, type, onClose, id, onPause }) => {
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef(null);
  
  useEffect(() => {
    const progressBar = progressRef.current;
    if (!progressBar) return;
    progressBar.style.animationPlayState = isPaused ? 'paused' : 'running';
  }, [isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    onPause?.(id, true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    onPause?.(id, false);
  };

  return (
    <div 
      className={`notification notification--${type}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="notification__content">
        <span className="notification__message">{message}</span>
        <button className="notification__close" onClick={() => onClose(id)}>
          ×
        </button>
      </div>
      <div 
        ref={progressRef}
        className="notification__progress"
      />
    </div>
  );
};

export const NotificationContainer = ({ notifications, onClose, onPause }) => {
  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          {...notification}
          onClose={onClose}
          onPause={onPause}
        />
      ))}
    </div>
  );
}; 