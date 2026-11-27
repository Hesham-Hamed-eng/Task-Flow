
import type { Task, Member, TaskStatus } from "../../types";

import { TaskCard } from "./TaskCard";

interface KanbanBoardProps {
  tasks: Task[];
  members: Member[];
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}

export function KanbanBoard({
  tasks,
  members,
  onStatusChange,
}: KanbanBoardProps) {
  const columns = [
    {
      title: "To Do",
      status: "todo",
    },
    {
      title: "In Progress",
      status: "in-progress",
    },
    {
      title: "Done",
      status: "done",
    },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {columns.map((column) => {
        const columnTasks = tasks.filter(
          (task) => task.status === column.status
        );

        return (
          <div
            key={column.status}
            className="rounded-xl bg-gray-100 p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">
                {column.title}
              </h3>

              <span className="rounded-full bg-white px-3 py-1 text-sm text-gray-600">
                {columnTasks.length}
              </span>
            </div>

            <div className="space-y-3">
              {columnTasks.length > 0 ? (
                columnTasks.map((task) => {
                  const assignee = members.find(
                    (member) => member.id === task.assigneeId
                  );

                  return (
                    <TaskCard
                      key={task.id}
                      task={task}
                      assignee={assignee}
                      onStatusChange={onStatusChange}
                    />
                  );
                })
              ) : (
                <p className="py-6 text-center text-sm text-gray-400">
                  No tasks in this column
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
