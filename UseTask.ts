// Importa useState para manejar el estado de las tareas
// y useEffect para ejecutar código cuando cambie el estado
import { useState, useEffect } from "react"

// Importa las interfaces de las tareas
// taskI representa la estructura de una tarea guardada
import type { taskI } from "../Interfaces/taskI"

// taskFormI representa los datos que vienen del formulario
import type { taskFormI } from "../Interfaces/TaskFormI"

// Importa SweetAlert2 para mostrar alertas visuales
import Swal from "sweetalert2"


// Función que convierte una fecha en formato dd/mm/yyyy a un objeto Date
// Se utiliza para poder comparar fechas
function parseDate(dateString: string): Date {

    // Separa el día, mes y año
    const [day, month, year] = dateString.split("/").map(Number)

    // Crea la fecha en formato Date
    return new Date(year, month - 1, day)
}


// Función que verifica si una tarea está vencida
// Retorna true si la fecha límite ya pasó
function isExpired(task: taskI): boolean {

    // Obtiene la fecha actual
    const today = new Date()

    // Ajusta la hora a 00:00:00
    today.setHours(0, 0, 0, 0)

    // Convierte la fecha límite de la tarea
    const due = parseDate(task.dueDate)

    // Ajusta la hora
    due.setHours(0, 0, 0, 0)

    // Retorna true si la tarea está pendiente y la fecha ya pasó
    return task.status === "Pendiente" && due < today
}


// Hook principal que maneja todas las tareas
export const useTask = () => {

    // Estado que guarda la lista de tareas
    // Se inicializa con las tareas guardadas en localStorage
    const [tasks, setTasks] = useState<taskI[]>(() => {

        // Obtiene las tareas guardadas
        const tareasGuardadas = localStorage.getItem("tasks")

        // Si existen las convierte a JSON
        // si no existen devuelve un arreglo vacío
        return tareasGuardadas ? JSON.parse(tareasGuardadas) : []
    })


    // useEffect guarda las tareas en localStorage cada vez que cambian
    useEffect(() => {

        localStorage.setItem("tasks", JSON.stringify(tasks))

    }, [tasks])


    // Función para agregar una nueva tarea
    const addTask = (form: taskFormI): void => {

        // Obtiene la fecha actual
        const today = new Date()

        // Formatea la fecha de creación
        const dateCreated = today.toLocaleDateString("es-HN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        })


        // Convierte la fecha del formulario (yyyy-mm-dd)
        const [year, month, day] = form.dueDate.split("-")

        // La convierte a formato dd/mm/yyyy
        const dueDateFormatted = `${day}/${month}/${year}`


        // Crea la nueva tarea
        const newTask: taskI = {

            // ID único basado en el tiempo
            id: Date.now(),

            // Nombre de la tarea
            name: form.name.trim(),

            // Descripción
            description: form.description.trim(),

            // Fecha límite
            dueDate: dueDateFormatted,

            // Fecha de creación
            dateCreated,

            // Prioridad
            priority: form.priority,

            // Estado inicial
            status: "Pendiente",

            // Verifica si está vencida
            expired: isExpired({ dueDate: dueDateFormatted, status: "Pendiente" } as taskI),
        }

        // Agrega la nueva tarea al inicio de la lista
        setTasks((prev) => [newTask, ...prev])

    }


    // Función para completar una tarea
    const completeTask = (id: number): void => {

        // Muestra alerta de confirmación
        Swal.fire({
            icon: "info",
            text: "¿Desea completar esta tarea?",
            showCancelButton: true,
            confirmButtonText: "Sí, completar",
            cancelButtonText: "No, cancelar",
            confirmButtonColor: "#008000",
            cancelButtonColor: "#d33",
        }).then((resultado) => {

            // Si el usuario confirma
            if (resultado.isConfirmed) {

                // Cambia el estado de la tarea a completada
                setTasks((prev) =>
                    prev.map((t) =>
                        t.id === id
                            ? { ...t, status: "Completada", expired: false }
                            : t
                    )
                )

                // Muestra alerta de éxito
                Swal.fire({
                    icon: "success",
                    title: "Tarea completada",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        })
    };


    // Función para eliminar una tarea
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

            // Si confirma
            if (resultado.isConfirmed) {

                // Elimina la tarea
                setTasks((prev) => prev.filter((t) => t.id !== id));

                // Alerta de éxito
                Swal.fire({
                    icon: "success",
                    title: "Tarea eliminada",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        });
    }


    // Función para eliminar todas las tareas
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

                // Vacía la lista de tareas
                setTasks([]);

                // Mensaje de éxito
                Swal.fire({
                    icon: "success",
                    title: "Tareas eliminadas exitosamente",
                    showConfirmButton: false,
                    timer: 4000,
                });
            }
        });
    }


    // Función para ordenar tareas por fecha
    const sortByDate = (): void => {

        setTasks((prev) =>
            [...prev].sort(
                (a, b) =>
                    parseDate(a.dueDate).getTime() -
                    parseDate(b.dueDate).getTime()
            )
        )
    }


    // Función para ordenar tareas por prioridad
    const sortByPriority = (): void => {

        // Valores numéricos de prioridad
        const priorityValue: Record<taskI["priority"], number> = {
            Alta: 1,
            Media: 2,
            Baja: 3,
        }

        setTasks((prev) =>
            [...prev].sort(
                (a, b) =>
                    priorityValue[a.priority] -
                    priorityValue[b.priority]
            )
        )
    }


    // Retorna todas las funciones y el estado
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