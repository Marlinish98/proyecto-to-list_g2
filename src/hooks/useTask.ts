import { useState } from "react"
import type { taskI } from "../interfaces/taskI"

function parseDate(dateString: string) {
  const [day, month, year] = dateString.split("/").map(Number)
  return new Date(year, month - 1, day)
}

export function useTask(initialTasks: taskI[]) {

  const [tasks, setTasks] = useState<taskI[]>(initialTasks)

  function deleteTask(id: number) {
    setTasks((prev: taskI[]) => prev.filter(task => task.id !== id))
  }

  function sortByDate() {
    setTasks((prev: taskI[]) =>
      [...prev].sort(
        (a, b) =>
          parseDate(a.dueDate).getTime() -
          parseDate(b.dueDate).getTime()
      )
    )
  }

  function sortByPriority() {

    const priorityValue: Record<taskI["priority"], number> = {
      Alta: 1,
      Media: 2,
      Baja: 3
    }

    setTasks((prev: taskI[]) =>
      [...prev].sort(
        (a, b) => priorityValue[a.priority] - priorityValue[b.priority]
      )
    )
  }

  return {
    tasks,
    deleteTask,
    sortByDate,
    sortByPriority
  }
}