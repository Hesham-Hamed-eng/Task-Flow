
import type { Task, Member, TaskStatus } from "../../types";

import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

interface TaskCardProps {
  task: Task;
  assignee?: Member;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}

export function TaskCard({
  task,
  assignee,
  onStatusChange,
}: TaskCardProps) {
  const statusColors = {
    todo: "gray",
    "in-progress": "yellow",
    done: "green",
  } as const;

  const priorityColors = {
    low: "gray",
    medium: "yellow",
    high: "red",
  } as const;

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-800">
          {task.title}
        </h3>

        <Badge color={statusColors[task.status]}>
          {task.status}
        </Badge>
      </div>

      <p className="text-sm text-gray-600">
        {task.description}
      </p>

      <div className="flex flex-wrap gap-2">
        <Badge color={priorityColors[task.priority]}>
          {task.priority} priority
        </Badge>
      </div>

      <div className="space-y-1 text-sm text-gray-500">
        <p>
          Assigned to: {assignee?.name ?? "Unassigned"}
        </p>

        <p>
          Due Date: {task.dueDate}
        </p>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Change Status
        </label>

        <select
          value={task.status}
          onChange={(event) =>
            onStatusChange(task.id, event.target.value as TaskStatus)
          }
          className="w-full rounded-lg border border-gray-300 p-2 text-sm"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </Card>
  );
}
