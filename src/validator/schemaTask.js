import * as Yup from 'yup';

export const schemaTask = Yup.object({
  taskName: Yup.string()
    .max(20, "Task title must be at most 20 characters")
    .required("Task title is required!"),
  userId: Yup.number()
    .required("User ID is required"),
});
