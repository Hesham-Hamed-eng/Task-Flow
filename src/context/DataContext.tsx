
import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import type { Project, Member, Task } from "../types";

import { mockProjects } from "../data/mockProjects";
import { mockMembers } from "../data/mockMembers";
import { mockTasks } from "../data/mockTasks";

import { useLocalStorage } from "../hooks/useLocalStorage";

interface DataContextType {
  projects: Project[];
  setProjects: (value: Project[]) => void;

  members: Member[];
  setMembers: (value: Member[]) => void;

  tasks: Task[];
  setTasks: (value: Task[]) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useLocalStorage<Project[]>(
    "taskflow_projects",
    mockProjects
  );

  const [members, setMembers] = useLocalStorage<Member[]>(
    "taskflow_members",
    mockMembers
  );

  const [tasks, setTasks] = useLocalStorage<Task[]>(
    "taskflow_tasks",
    mockTasks
  );

  return (
    <DataContext.Provider
      value={{
        projects,
        setProjects,
        members,
        setMembers,
        tasks,
        setTasks,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useData must be used inside DataProvider");
  }

  return context;
}
