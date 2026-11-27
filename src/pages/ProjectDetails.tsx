
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useData } from "../context/DataContext";

import type { Task } from "../types";

import { Badge } from "../components/ui/Badge";
import { TaskForm } from "../components/tasks/TaskForm";
import { KanbanBoard } from "../components/tasks/KanbanBoard";

interface TaskFormData {
  title: string;
  description: string;
  priority: Task["priority"];
  status: Task["status"];
  dueDate: string;
  assigneeId: string;
}

export function ProjectDetails() {
  const { id } = useParams();

  const { projects, members, tasks, setTasks } = useData();

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

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

  const handleTaskSubmit = (data: TaskFormData) => {
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...data }
            : task
        )
      );
    } else {
      const newTask: Task = {
        id: crypto.randomUUID(),
        projectId: project.id,
        ...data,
      };

      setTasks([...tasks, newTask]);
    }

    setShowTaskForm(false);
    setEditingTask(undefined);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = (taskId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  const handleStatusChange = (
  taskId: string,
  newStatus: Task["status"]
) => {
  setTasks(
    tasks.map((task) =>
      task.id === taskId
        ? { ...task, status: newStatus }
        : task
    )
  );
};

  const handleCancelTaskForm = () => {
    setShowTaskForm(false);
    setEditingTask(undefined);
  };

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
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Project Tasks ({projectTasks.length})
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage and track your project tasks.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditingTask(undefined);
              setShowTaskForm(true);
            }}
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
          >
            Add New Task
          </button>
        </div>

        {showTaskForm && (
          <div className="mb-6 rounded-xl border border-gray-200 p-5">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              {editingTask ? "Edit Task" : "Create New Task"}
            </h3>

            <TaskForm
              members={projectMembers}
              initialData={editingTask}
              onSubmit={handleTaskSubmit}
              onCancel={handleCancelTaskForm}
            />
          </div>
        )}

        {projectTasks.length > 0 ? (
        <KanbanBoard
  tasks={projectTasks}
  members={projectMembers}
  onStatusChange={handleStatusChange}
/>
        ) : (
          <p className="py-8 text-center text-sm text-gray-400">
            No tasks assigned to this project yet.
          </p>
        )}

        {projectTasks.length > 0 && (
          <div className="mt-6 border-t border-gray-200 pt-5">
            <h3 className="mb-3 font-semibold text-gray-800">
              Task Actions
            </h3>

            <div className="space-y-2">
              {projectTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 p-3"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {task.title}
                  </span>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditTask(task)}
                      className="rounded-md bg-blue-50 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-100"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteTask(task.id)}
                      className="rounded-md bg-red-50 px-3 py-1.5 text-sm text-red-600 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
