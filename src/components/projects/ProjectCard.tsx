
import type { Project, Member } from "../../types";

import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";

import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

interface ProjectCardProps {
  project: Project;
  members: Member[];
}

export function ProjectCard({
  project,
  members,
}: ProjectCardProps) {
  const { projects, setProjects, tasks, setTasks } = useData();

  const statusColors = {
    active: "green",
    completed: "blue",
    "on-hold": "yellow",
  } as const;

  const priorityColors = {
    low: "gray",
    medium: "yellow",
    high: "red",
  } as const;

  const projectMembers = members.filter((member) =>
    project.memberIds.includes(member.id)
  );

  function handleDeleteProject() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.title}"?`
    );

    if (!confirmed) return;

    setProjects(
      projects.filter((item) => item.id !== project.id)
    );

    setTasks(
      tasks.filter((task) => task.projectId !== project.id)
    );
  }

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-800">
          {project.title}
        </h2>

        <Badge color={statusColors[project.status]}>
          {project.status}
        </Badge>
      </div>

      <p className="text-sm text-gray-600">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        <Badge color={priorityColors[project.priority]}>
          {project.priority} priority
        </Badge>
      </div>

      <div className="text-sm text-gray-500">
        <p>Start: {project.startDate}</p>
        <p>End: {project.endDate}</p>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-700">
          Team Members
        </h3>

        {projectMembers.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {projectMembers.map((member) => (
              <span
                key={member.id}
                className="rounded-lg bg-gray-100 px-3 py-1 text-xs text-gray-700"
              >
                {member.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">
            No members assigned
          </p>
        )}
      </div>

      <div className="mt-auto flex flex-wrap gap-2 border-t border-gray-100 pt-4">
        <Link
          to={`/projects/${project.id}`}
          className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          View Details
        </Link>

        <Link
          to={`/projects/${project.id}/edit`}
          className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
        >
          Edit Project
        </Link>

        <button
          type="button"
          onClick={handleDeleteProject}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Delete Project
        </button>
      </div>
    </Card>
  );
}
