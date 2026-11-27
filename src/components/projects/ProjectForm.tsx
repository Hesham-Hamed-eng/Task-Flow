
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { projectSchema } from "../../schemas/projectSchema";
import type { Member, Project } from "../../types";

import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export type ProjectFormValues = Omit<
  Project,
  "id" | "createdAt"
>;

interface ProjectFormProps {
  members: Member[];
  initialValues?: ProjectFormValues;
  onSubmit: (data: ProjectFormValues) => void;
  submitLabel?: string;
  isSubmitting?: boolean;
}

const defaultValues: ProjectFormValues = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  priority: "medium",
  status: "active",
  memberIds: [],
};

export function ProjectForm({
  members,
  initialValues = defaultValues,
  onSubmit,
  submitLabel = "Save Project",
  isSubmitting = false,
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: yupResolver(projectSchema),
    defaultValues: initialValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-xl bg-white p-6 shadow-sm"
    >
      <Input
        label="Project Title"
        placeholder="Enter project title"
        {...register("title")}
        error={errors.title?.message}
      />

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Description
        </label>

        <textarea
          {...register("description")}
          placeholder="Enter project description"
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="Start Date"
          type="date"
          {...register("startDate")}
          error={errors.startDate?.message}
        />

        <Input
          label="End Date"
          type="date"
          {...register("endDate")}
          error={errors.endDate?.message}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Priority
          </label>

          <select
            {...register("priority")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {errors.priority && (
            <p className="mt-1 text-sm text-red-500">
              {errors.priority.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Status
          </label>

          <select
            {...register("status")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>

          {errors.status && (
            <p className="mt-1 text-sm text-red-500">
              {errors.status.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-gray-700">
          Team Members
        </h3>

        {members.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {members.map((member) => (
              <label
                key={member.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-purple-50"
              >
                <input
                  type="checkbox"
                  value={member.id}
                  {...register("memberIds")}
                  className="h-4 w-4 accent-purple-600"
                />

                <span className="text-sm text-gray-700">
                  {member.name}
                </span>
              </label>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No team members available.
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
