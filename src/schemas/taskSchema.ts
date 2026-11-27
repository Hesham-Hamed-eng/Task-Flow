
import * as yup from "yup";

export const taskSchema = yup.object({
  title: yup
    .string()
    .required("Task title is required")
    .min(3, "Task title must be at least 3 characters")
    .max(100, "Task title cannot exceed 100 characters"),

  description: yup
    .string()
    .required("Task description is required")
    .max(500, "Description cannot exceed 500 characters"),

  priority: yup
    .mixed<"low" | "medium" | "high">()
    .oneOf(["low", "medium", "high"])
    .required("Priority is required"),

  status: yup
    .mixed<"todo" | "in-progress" | "done">()
    .oneOf(["todo", "in-progress", "done"])
    .required("Status is required"),

  dueDate: yup
    .string()
    .required("Due date is required")
    .test(
      "valid-date",
      "Please enter a valid due date",
      (value) => !value || !Number.isNaN(Date.parse(value))
    ),

  assigneeId: yup
    .string()
    .required("Please select a member"),
});
