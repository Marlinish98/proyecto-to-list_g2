import type { taskI } from "./taskI";

export interface TaskCardProps {
  task: taskI;
  completeTask: (id: number) => void;
  deleteTask: (id: number) => void;
}