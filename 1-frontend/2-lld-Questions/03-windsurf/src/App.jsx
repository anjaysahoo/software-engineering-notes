import { useState } from 'react'.hamburger {
  position: relative;
  padding: 10px;
  background: #f0f0f4;
  border-radius: 8px;
  cursor: pointer;
}

.hamburger__lines {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hamburger__line {
  width: 20px;
  height: 2px;
  background-color: #333;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  min-width: 200px;
  display: none;
}

.dropdown--active {
  display: block;
}

.dropdown__item {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  cursor: pointer;
}

.dropdown__item:hover {
  background-color: #f0f0f4;
}

.dropdown__shortcut {
  color: #666;
  font-size: 0.9em;
}import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNewTab = () => {
    console.log('New Tab clicked');
    // Add your function logic here
  };

  const handleNewWindow = () => {
    console.log('New Window clicked');
    // Add your function logic here
  };

  const handleOpenClosedTab = () => {
    console.log('Open Closed Tab clicked');
    // Add your function logic here
  };

  const handleOpenFile = () => {
    console.log('Open File clicked');
    // Add your function logic here
  };

  return (
    <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
      <div className="hamburger__lines">
        <span className="hamburger__line"></span>
        <span className="hamburger__line"></span>
        <span className="hamburger__line"></span>
      </div>
      
      <div className={`dropdown ${isOpen ? 'dropdown--active' : ''}`}>
        <div className="dropdown__item" onClick={handleNewTab}>
          <span>New Tab</span>
          <span className="dropdown__shortcut">⌘T</span>
        </div>
        <div className="dropdown__item" onClick={handleNewWindow}>
          <span>New Window</span>
          <span className="dropdown__shortcut">⌘N</span>
        </div>
        <div className="dropdown__item" onClick={handleOpenClosedTab}>
          <span>Open Closed Tab</span>
          <span className="dropdown__shortcut">⌘⇧N</span>
        </div>
        <div className="dropdown__item" onClick={handleOpenFile}>
          <span>Open File...</span>
          <span className="dropdown__shortcut">⌘O</span>
        </div>
      </div>
    </div>
  );
}

export default App;
import './App.css'

function App() {

  return (
    <>
      <div>
       Hello React
      </div>
    </>
  )
}

export default App
