import React, { useEffect, useState } from 'react';
import { TaskTable } from './components/TaskTable/TaskTable';
import { getTasks } from './services/taskService';
import { Task } from './types/Task';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Management</h1>
      </header>
      <main className="app-main">
        <TaskTable tasks={tasks} />
      </main>
    </div>
  );
}

export default App; 