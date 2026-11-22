export type Priority = "low" | "medium" | "high";

export type ProjectStatus = "active" | "completed" | "on-hold";

export type TaskStatus = "todo" | "in-progress" | "done";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "member";
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  priority: Priority;
  status: ProjectStatus;
  memberIds: string[];
  createdAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string;
  assigneeId: string;
}