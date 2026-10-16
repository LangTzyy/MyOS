export type Priority = "low" | "medium" | "high";
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "completed";
  priority: Priority;
  dueDate: string;
  dueLabel: string;
  projectId?: string;
  category: string;
  tags: string[];
}
export interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: "active" | "paused" | "done";
  stack: string[];
}
export interface Deadline {
  id: string;
  title: string;
  label: string;
}
