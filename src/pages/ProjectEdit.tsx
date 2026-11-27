
import { useNavigate, useParams } from "react-router-dom";

import { useData } from "../context/DataContext";

import {
  ProjectForm,
  type ProjectFormValues,
} from "../components/projects/ProjectForm";

export function ProjectEdit() {
  const { id } = useParams();

  const navigate = useNavigate();

 const { projects, setProjects, members } = useData();

  const project = projects.find((item) => item.id === id);

  function handleUpdateProject(data: ProjectFormValues) {
    if (!project) return;

    const updatedProject = {
      ...project,
      ...data,
    };

    const updatedProjects = projects.map((item) =>
      item.id === project.id ? updatedProject : item
    );

    setProjects(updatedProjects);

    navigate("/projects");
  }

  if (!project) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">
          Project Not Found
        </h1>

        <p className="mt-2 text-gray-500">
          The project you are trying to edit does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Edit Project
        </h1>

        <p className="mt-2 text-gray-500">
          Update your project information here.
        </p>
      </div>

   <ProjectForm
  initialValues={project}
  members={members}
  onSubmit={handleUpdateProject}
  submitLabel="Save Changes"
/>
    </div>
  );
}
