import { useState, useEffect } from "react"
import type { taskI } from "../interfaces/taskI"
import type { taskFormI } from "../Interfaces/TaskFormI"

function parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split("/").map(Number)
    return new Date(year, month - 1, day)
}

function isExpired(task: taskI): boolean {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const due = parseDate(task.dueDate)
    due.setHours(0, 0, 0, 0)

    return task.status === "Pendiente " && due < today
}

export const useTask = () => {

    const [tasks, setTasks] = useState<taskI[]>(() => {
        const tareasGuardadas = localStorage.getItem("tasks")
        return tareasGuardadas ? JSON.parse(tareasGuardadas) : []
    })

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    const addTask = (form: taskFormI): void => {
        const today = new Date()
        const dateCreated = today.toLocaleDateString("es-HN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        })

        const [year, month, day] = form.dueDate.split("-")
        const dueDateFormatted = `${day}/${month}/${year}`

        const newTask: taskI = {
            id: Date.now(),
            name: form.name.trim(),
            description: form.description.trim(),
            dueDate: dueDateFormatted,
            dateCreated,
            priority: form.priority,
            status: "Pendiente ",
            expired: isExpired({ dueDate: dueDateFormatted, status: "Pendiente " } as taskI),
        }

        setTasks((prev) => [newTask, ...prev])
    }

    const completeTask = (id: number): void => {
        setTasks((prev) =>
            prev.map((t) => t.id === id ? { ...t, status: "Completada", expired: false } : t)
        )
    }

    const deleteTask = (id: number): void => {
        setTasks((prev) => prev.filter((t) => t.id !== id))
    }

    const clearAllTasks = (): void => {
        setTasks([])
    }

    const sortByDate = (): void => {
        setTasks((prev) =>
            [...prev].sort(
                (a, b) => parseDate(a.dueDate).getTime() - parseDate(b.dueDate).getTime()
            )
        )
    }

    const sortByPriority = (): void => {
        const priorityValue: Record<taskI["priority"], number> = {
            Alta: 1,
            Media: 2,
            Baja: 3,
        }
        setTasks((prev) =>
            [...prev].sort((a, b) => priorityValue[a.priority] - priorityValue[b.priority])
        )
    }

    return {
        tasks,
        addTask,
        completeTask,
        deleteTask,
        clearAllTasks,
        sortByDate,
        sortByPriority,
    }
}