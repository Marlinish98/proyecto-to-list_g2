import type { taskI } from "../interfaces/taskI";
import type { TaskListProps } from "../interfaces/TaskListProps";
import type { TaskCardProps } from "../interfaces/TaskCardProps";
import { useState } from "react";
import { AiFillAlert } from "react-icons/ai";
import { FcTodoList } from "react-icons/fc";

//Relacionamos el objeto a un color según su prioridad
const priorityStyle: Record<taskI["priority"], string> = {
  Alta: "bg-red-600 text-white",
  Media: "bg-yellow-600 text-white",
  Baja: "bg-green-700 text-white",
};

// Tarjetas
function TaskCard({ task, completeTask, deleteTask }: TaskCardProps) {
  return (
    <div className="">
      <div className={`rounded-xl border p-4 sm:p-5 ${task.expired
        ? "border-red-700 bg-red-950/60"
        : task.status === "Completada"
          ? "border-gray-700 bg-gray-900/60 opacity-75"
          : "border-gray-700 bg-gray-900/60"
        }`}>
        {task.expired && (
          <p className="mb-3 flex items-center gap-2 text-sm sm:text-base font-bold uppercase tracking-widest text-white">
            <AiFillAlert className="text-white text-2xl" /> Tarea vencida
          </p>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <h3
              className={`font-bold tracking-wide text-sm sm:text-base ${task.status === "Completada" ? "text-gray-400 line-through" : "text-white"
                }`}
            >
              {task.name.toUpperCase()}
            </h3>
            {task.description && (
              <p className="mt-1 text-xs sm:text-sm text-white">{task.description}</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 shrink-0">
            <span
              className={`rounded-full px-3 py-0.5 text-xs sm:text-sm font-semibold ${task.status === "Completada" ? "bg-green-700 text-white" : "bg-blue-700 text-white"
                }`}
            >
              {task.status === "Completada" ? "✓ Completada" : "⏳ Pendiente"}
            </span>
            <span className={`rounded-full px-3 py-0.5 text-xs sm:text-sm font-semibold ${priorityStyle[task.priority]}`}>
              ⚡ {task.priority}
            </span>
          </div>
        </div>

        <div className="my-3 border-t border-gray-700" />

        {/* Dates */}
        <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-white">
          <span>📅 Fecha límite: {task.dueDate}</span>
          <span>📅 Creada: {task.dateCreated}</span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          {task.status !== "Completada" && (
            <button onClick={() => completeTask(task.id)} className="flex-1 rounded-lg bg-green-600 py-2 text-sm sm:text-base font-bold uppercase tracking-wider text-white hover:bg-green-500">
              Completar
            </button>
          )}
          <button onClick={() => deleteTask(task.id)} className="flex-1 rounded-lg bg-red-600 py-2 text-sm sm:text-base font-bold uppercase tracking-wider text-white hover:bg-red-500">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

const Tasklist: React.FC<TaskListProps> = ({
  tareas,
  completeTask,
  deleteTask,
  clearAllTasks,
}) => {
  if (!tareas || tareas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500 font-medium gap-3">
        <FcTodoList className="w-12 h-12" />
        <p className="text-sm sm:text-base">Comienza agregando tu primera tarea</p>
      </div>
    );
  }

  const [filtro, setFiltro] = useState<"Todas" | "Pendiente" | "Completada">("Todas");

  const tareasFiltradas = tareas.filter((task) => {
    if (filtro === "Todas") return true;
    return task.status.toLowerCase() === filtro.toLowerCase();
  });

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-30">
      {/* Título */}
      <h2 className="mb-4 text-center">
        <p className="pt-4 font-bold text-xl sm:text-2xl md:text-3xl">Gestión de Tareas</p>
        <p className="font-extralight text-sm sm:text-base md:text-lg">
          Mantente al día con tus tareas sin preocuparte por olvidarlas
        </p>
      </h2>

      {/* Barra de filtros */}
      <div className="mb-5 flex flex-wrap justify-center gap-3 rounded-xl bg-gray-800 p-3 max-w-full mx-auto">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-gray-400">
            Estado:
          </span>
          {(["Todas", "Pendiente", "Completada"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFiltro(s)}
              className={`rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold transition ${filtro === s
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {s}
            </button>
          ))}
          <p className="text-white">|</p>
          <p className="bg-yellow-400 px-2 rounded-lg text-xs sm:text-sm">
            Tareas pendientes: {tareas.filter(t => t.status === "Pendiente" && !t.expired).length}
          </p>
        </div>
      </div>

      {/* Listado de tareas */}
      <div className="space-y-4">
        {tareasFiltradas.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            completeTask={completeTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>

      {/* Botón para limpiar tareas */}
      <button
        onClick={clearAllTasks}
        className="mt-6 mx-auto block w-full sm:w-72 md:w-96 rounded-xl bg-yellow-500 py-2 text-sm sm:text-base font-bold uppercase tracking-widest text-gray-900 hover:bg-yellow-400"
      >
        Limpiar listado
      </button>

      <div className="pb-10" />
    </div>
  );
};

export default Tasklist;