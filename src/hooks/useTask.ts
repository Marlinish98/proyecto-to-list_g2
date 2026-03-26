import { useState, useEffect } from "react"
import type { taskI } from "../Interfaces/taskI"
import type { taskFormI } from "../Interfaces/TaskFormI"
import Swal from "sweetalert2"

function parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split("/").map(Number)
    return new Date(year, month - 1, day)
}

function isExpired(task: taskI): boolean {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const due = parseDate(task.dueDate)
    due.setHours(0, 0, 0, 0)

    return task.status === "Pendiente" && due < today
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
            status: "Pendiente",
            expired: isExpired({ dueDate: dueDateFormatted, status: "Pendiente" } as taskI),
        }

        setTasks((prev) => [newTask, ...prev])

    }

    const completeTask = (id: number): void => {
        Swal.fire({
            icon: "info",
            text: "¿Desea completar esta tarea?",
            showCancelButton: true,
            confirmButtonText: "Sí, completar",
            cancelButtonText: "No, cancelar",
            confirmButtonColor: "#008000",
            cancelButtonColor: "#d33",
        }).then((resultado) => {
            if (resultado.isConfirmed) {
                setTasks((prev) =>
                    prev.map((t) => t.id === id ? { ...t, status: "Completada", expired: false } : t))
                Swal.fire({
                    icon: "success",
                    title: "Tarea completada",
                    showConfirmButton: false,
                    timer: 3000,
                });
            }
        }
        )
    };
    const deleteTask = (id: number): void => {
        Swal.fire({
            title: "¿Desea eliminar esta tarea?",
            text: "No podra revertir esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#008000",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar",
            cancelButtonText: "Cancelar"
        }).then((resultado) => {
            if (resultado.isConfirmed) {
                setTasks((prev) => prev.filter((t) => t.id !== id));
                Swal.fire({
                    icon: "success",
                    title: "Tarea eliminada",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        });
    }

    const clearAllTasks = (): void => {
         Swal.fire({
            title: "¿Desea eliminar todas las tarea?",
            text: "Esta accion no sera reversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#008000",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar",
            cancelButtonText: "Cancelar"
        }).then((resultado) => {
            if (resultado.isConfirmed) {
                setTasks([]);
                Swal.fire({
                    icon: "success",
                    title: "Tareas eliminadas exitosamente",
                    showConfirmButton: false,
                    timer: 4000,
                });
            }
        });
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