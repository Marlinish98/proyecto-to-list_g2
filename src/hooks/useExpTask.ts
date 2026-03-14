import type { taskI } from "../interfaces/taskI"

function parseDate(dateString: string) {
  const [day, month, year] = dateString.split("/").map(Number)
  return new Date(year, month - 1, day)
}

export function useExpTasks() {

  function isExpired(task: taskI) {

    const today = new Date()
    today.setHours(0,0,0,0)

    const due = parseDate(task.dueDate)
    due.setHours(0,0,0,0)

    return task.status === "Pendiente " && due < today
  }

  function updateExpiration(tasks: taskI[]) {

    return tasks.map(task => ({
      ...task,
      expired: isExpired(task)
    }))
  }

  return {
    isExpired,
    updateExpiration
  }
}