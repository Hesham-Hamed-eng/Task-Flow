
import { useNavigate } from "react-router-dom";

import { useData } from "../context/DataContext";
import {
  ProjectForm,
  type ProjectFormValues,
} from "../components/projects/ProjectForm";

import type { Project } from "../types";

export function ProjectNew() {
  const { projects, setProjects, members } = useData();

  const navigate = useNavigate();

  function handleCreateProject(data: ProjectFormValues) {
    const newProject: Project = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    setProjects([...projects, newProject]);

    navigate("/projects");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Create New Project
        </h1>

        <p className="mt-2 text-gray-500">
          Create and manage a new project.
        </p>
      </div>

      <ProjectForm
        members={members}
        onSubmit={handleCreateProject}
        submitLabel="Create Project"
      />
    </div>
  );
}
