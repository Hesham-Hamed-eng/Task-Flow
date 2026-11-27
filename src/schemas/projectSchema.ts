import * as yup from "yup";

export const projectSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Project title is required")
    .min(3, "Title must be at least 3 characters"),

  description: yup
    .string()
    .trim()
    .required("Project description is required"),

  startDate: yup
    .string()
    .required("Start date is required"),

  endDate: yup
    .string()
    .required("End date is required")
    .test(
      "valid-date-range",
      "End date must be after or equal to start date",
      function (endDate) {
        const { startDate } = this.parent;

        if (!startDate || !endDate) {
          return true;
        }

        return endDate >= startDate;
      }
    ),

  priority: yup
    .mixed<"low" | "medium" | "high">()
    .oneOf(["low", "medium", "high"])
    .required("Priority is required"),

  status: yup
    .mixed<"active" | "completed" | "on-hold">()
    .oneOf(["active", "completed", "on-hold"])
    .required("Status is required"),

  memberIds: yup
    .array()
    .of(yup.string().required())
    .required(),
});