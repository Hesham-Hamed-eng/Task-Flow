
import { Link, useParams } from "react-router-dom";

import { useData } from "../context/DataContext";

import { Badge } from "../components/ui/Badge";

export function ProjectDetails() {
  const { id } = useParams();

  const { projects, members, tasks } = useData();

  const project = projects.find((item) => item.id === id);

  if (!project) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">
          Project Not Found
        </h1>

        <p className="mt-2 text-gray-500">
          The project you are looking for does not exist.
        </p>

        <Link
          to="/projects"
          className="mt-4 inline-block text-purple-600 hover:underline"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  const projectMembers = members.filter((member) =>
    project.memberIds.includes(member.id)
  );

  const projectTasks = tasks.filter(
    (task) => task.projectId === project.id
  );

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

  const taskStatusColors = {
    todo: "gray",
    "in-progress": "yellow",
    done: "green",
  } as const;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {project.title}
          </h1>

          <p className="mt-2 text-gray-500">
            Project Details
          </p>
        </div>

        <Link
          to={`/projects/${project.id}/edit`}
          className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
        >
          Edit Project
        </Link>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Project Information
        </h2>

        <p className="mb-5 text-gray-600">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-3">
          <Badge color={statusColors[project.status]}>
            {project.status}
          </Badge>

          <Badge color={priorityColors[project.priority]}>
            {project.priority} priority
          </Badge>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 text-sm text-gray-600 md:grid-cols-2">
          <p>Start Date: {project.startDate}</p>
          <p>End Date: {project.endDate}</p>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Team Members ({projectMembers.length})
        </h2>

        {projectMembers.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {projectMembers.map((member) => (
              <div
                key={member.id}
                className="rounded-lg bg-gray-100 px-4 py-3"
              >
                <p className="font-medium text-gray-800">
                  {member.name}
                </p>

                <p className="text-sm text-gray-500">
                  {member.email}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">
            No members assigned.
          </p>
        )}
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Project Tasks ({projectTasks.length})
        </h2>

        {projectTasks.length > 0 ? (
          <div className="space-y-3">
            {projectTasks.map((task) => {
              const assignee = members.find(
                (member) => member.id === task.assigneeId
              );

              return (
                <div
                  key={task.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 p-4"
                >
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {task.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Assigned to: {assignee?.name ?? "Unassigned"}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Due Date: {task.dueDate}
                    </p>
                  </div>

                  <Badge color={taskStatusColors[task.status]}>
                    {task.status}
                  </Badge>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-400">
            No tasks assigned to this project.
          </p>
        )}
      </div>

      <Link
        to="/projects"
        className="inline-block text-sm font-medium text-purple-600 hover:underline"
      >
        Back to Projects
      </Link>
    </div>
  );
}
