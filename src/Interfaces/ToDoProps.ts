import type { taskFormI } from "./TaskFormI";

export interface ToDoProps {
  addTask: (form: taskFormI) => void;
}
