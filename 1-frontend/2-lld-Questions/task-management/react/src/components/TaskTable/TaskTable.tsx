import React from 'react';
import { Task } from '../../types/Task';
import './TaskTable.css';

interface TaskTableProps {
  tasks: Task[];
}

export const TaskTable: React.FC<TaskTableProps> = ({ tasks }) => {
  return (
    <div className="task-table-container">
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>
                <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              </td>
              <td>
                <span className={`status-badge status-${task.status.toLowerCase().replace(' ', '-')}`}>
                  {task.status}
                </span>
              </td>
              <td>{new Date(task.createdAt).toLocaleDateString()}</td>
              <td>{new Date(task.updatedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 