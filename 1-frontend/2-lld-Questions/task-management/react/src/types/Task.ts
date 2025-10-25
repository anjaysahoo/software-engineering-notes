export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'Todo' | 'In Progress' | 'Done';

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export interface CustomField {
  name: string;
  type: 'text' | 'number' | 'checkbox';
}

export interface TaskWithCustomFields extends Task {
  customFields: Record<string, string | number | boolean>;
} 