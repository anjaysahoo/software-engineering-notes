import { useState, useCallback, useRef } from 'react';

export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const timeoutRefs = useRef({});
  const startTimeRefs = useRef({});
  const durationRefs = useRef({});

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    if (timeoutRefs.current[id]) {
      clearTimeout(timeoutRefs.current[id]);
      delete timeoutRefs.current[id];
      delete startTimeRefs.current[id];
      delete durationRefs.current[id];
    }
  }, []);

  const addNotification = useCallback((message, type = 'success') => {
    const id = Date.now();
    const duration = 5000;

    setNotifications(prev => [...prev, { id, message, type }]);
    startTimeRefs.current[id] = Date.now();
    durationRefs.current[id] = duration;

    timeoutRefs.current[id] = setTimeout(() => {
      removeNotification(id);
    }, duration);

    return id;
  }, [removeNotification]);

  const handlePause = useCallback((id, isPaused) => {
    if (isPaused) {
      // When paused, clear the existing timeout and calculate remaining time
      if (timeoutRefs.current[id]) {
        clearTimeout(timeoutRefs.current[id]);
        const elapsedTime = Date.now() - startTimeRefs.current[id];
        durationRefs.current[id] = Math.max(0, durationRefs.current[id] - elapsedTime);
      }
    } else {
      // When unpaused, start a new timeout with the remaining duration
      if (durationRefs.current[id] > 0) {
        startTimeRefs.current[id] = Date.now();
        timeoutRefs.current[id] = setTimeout(() => {
          removeNotification(id);
        }, durationRefs.current[id]);
      }
    }
  }, [removeNotification]);

  return {
    notifications,
    addNotification,
    removeNotification,
    handlePause
  };
};
