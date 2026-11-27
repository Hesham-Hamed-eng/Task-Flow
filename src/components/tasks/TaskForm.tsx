
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import type { Task, Member, Priority, TaskStatus } from "../../types";
import { taskSchema } from "../../schemas/taskSchema";

interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  dueDate: string;
  assigneeId: string;
}

interface TaskFormProps {
  members: Member[];
  initialData?: Task;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
}

export function TaskForm({
  members,
  initialData,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
      dueDate: "",
      assigneeId: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description,
        priority: initialData.priority,
        status: initialData.status,
        dueDate: initialData.dueDate,
        assigneeId: initialData.assigneeId,
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: TaskFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Task Title</label>
        <input
          {...register("title")}
          className="w-full rounded-lg border border-gray-300 p-2"
          placeholder="Enter task title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Description</label>
        <textarea
          {...register("description")}
          className="w-full rounded-lg border border-gray-300 p-2"
          rows={3}
          placeholder="Enter task description"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Priority</label>
        <select
          {...register("priority")}
          className="w-full rounded-lg border border-gray-300 p-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Status</label>
        <select
          {...register("status")}
          className="w-full rounded-lg border border-gray-300 p-2"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Due Date</label>
        <input
          type="date"
          {...register("dueDate")}
          className="w-full rounded-lg border border-gray-300 p-2"
        />
        {errors.dueDate && (
          <p className="mt-1 text-sm text-red-500">
            {errors.dueDate.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Assigned Member</label>
        <select
          {...register("assigneeId")}
          className="w-full rounded-lg border border-gray-300 p-2"
        >
          <option value="">Select a member</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
        {errors.assigneeId && (
          <p className="mt-1 text-sm text-red-500">
            {errors.assigneeId.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-4 py-2"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-violet-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : initialData ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
}
