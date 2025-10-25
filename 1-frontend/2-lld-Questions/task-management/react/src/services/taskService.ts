import { Task, Priority, Status } from '../types/Task';

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    priority: 'High' as Priority,
    status: 'In Progress' as Status,
    createdAt: '2024-02-28T10:00:00Z',
    updatedAt: '2024-02-28T10:00:00Z',
  },
  {
    id: '2',
    title: 'Review pull requests',
    priority: 'Medium' as Priority,
    status: 'Todo' as Status,
    createdAt: '2024-02-28T09:00:00Z',
    updatedAt: '2024-02-28T09:00:00Z',
  },
  {
    id: '3',
    title: 'Update documentation',
    priority: 'Low' as Priority,
    status: 'Done' as Status,
    createdAt: '2024-02-28T08:00:00Z',
    updatedAt: '2024-02-28T08:00:00Z',
  },
];

export const getTasks = (): Promise<Task[]> => {
  return Promise.resolve(mockTasks);
}; 