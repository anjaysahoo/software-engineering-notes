import { useNotification } from './hooks/useNotification';
import { NotificationContainer } from './components/Notification/Notification';
import './App.css';

function App() {
  const { notifications, addNotification, removeNotification, handlePause } = useNotification();

  const showNotification = (type) => {
    addNotification(`This is a ${type} notification!`, type);
  };

  return (
    <>
      <div>
        <button onClick={() => showNotification('success')}>Show Success</button>
        <button onClick={() => showNotification('error')}>Show Error</button>
        <button onClick={() => showNotification('warning')}>Show Warning</button>
      </div>

      <NotificationContainer 
        notifications={notifications}
        onClose={removeNotification}
        onPause={handlePause}
      />
    </>
  );
}

export default App;
