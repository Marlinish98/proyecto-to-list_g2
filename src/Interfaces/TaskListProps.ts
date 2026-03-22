import type { taskI } from "./taskI";

export interface TaskListProps {
  tareas: taskI[];
  completeTask: (id: number) => void;
  deleteTask: (id: number) => void;
  clearAllTasks: () => void;
};
