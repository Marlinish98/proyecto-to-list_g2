import React, { useState } from "react";
import type { taskI } from "../interfaces/taskI";

const tareasIniciales: taskI[] = [
  {
    id: 1,
    name: "Comprar baleadas",
    description: "Pedir una baleada con todo.",
    dueDate: "20/02/2025",
    dateCreated: "15/02/2025",
    priority: "Alta",
    status: "Pendiente ", 
    expired: true,
  },
  {
    id: 2,
    name: "Preparar presentación del proyecto",
    description: "Preparar presentación en PowerPoint para el proyecto final.",
    dueDate: "28/03/2026",
    dateCreated: "15/12/2025",
    priority: "Media",
    status: "Pendiente ", 
    expired: false,
  },
  {
    id: 3,
    name: "Subir código a GitHub",
    description: "Hacer commit y push de los últimos cambios.",
    dueDate: "10/05/2026",
    dateCreated: "12/02/2026",
    priority: "Baja",
    status: "Completada",
    expired: false,
  },
];

const priorityStyle: Record<taskI["priority"], string> = {
  Alta: "bg-red-600 text-white",
  Media: "bg-yellow-600 text-white",
  Baja: "bg-green-700 text-white",
};

interface TaskCardProps {
  task: taskI;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

function TaskCard({ task, onComplete, onDelete }: TaskCardProps) {
  return (
    <div
      className={`rounded-xl border p-5 transition-all ${
        task.expired
          ? "border-red-700 bg-red-950/60"
          : task.status === "Completada"
          ? "border-gray-700 bg-gray-900/60 opacity-75"
          : "border-gray-700 bg-gray-900/60"
      }`}
    >
      {task.expired && task.status !== "Completada" && (
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-red-400">
          Tarea vencida
        </p>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3
            className={`font-bold tracking-wide ${
              task.status === "Completada" ? "text-gray-400 line-through" : "text-white"
            }`}
          >
            {task.name.toUpperCase()}
          </h3>
          {task.description && (
            <p className="mt-1 text-sm text-gray-400">{task.description}</p>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <span
            className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
              task.status === "Completada" ? "bg-green-700 text-white" : "bg-blue-700 text-white"
            }`}
          >
            {task.status === "Completada" ? "✓ Completada" : "⏳ Pendiente"}
          </span>
          <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${priorityStyle[task.priority]}`}>
            ⚡ {task.priority}
          </span>
        </div>
      </div>

      <div className="my-3 border-t border-gray-700" />

      <div className="flex flex-wrap gap-4 text-xs text-gray-400">
        <span>📅 Fecha límite: {task.dueDate}</span>
        <span>📅 Creada: {task.dateCreated}</span>
      </div>

      
      <div className="mt-4 flex gap-3">
        {task.status !== "Completada" && (
          <button
            onClick={() => onComplete(task.id)}
            className="flex-1 rounded-lg bg-green-600 py-2 text-sm font-bold uppercase tracking-wider text-white hover:bg-green-500"
          >
            Completar
          </button>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-bold uppercase tracking-wider text-white hover:bg-red-500"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

function TaskList() {
  const [tasks, setTasks] = useState<taskI[]>(tareasIniciales);
  const [filter, setFilter] = useState<string>("Todas");
  const [sortAsc, setSortAsc] = useState<boolean | null>(null);

  const completeTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: "Completada", expired: false } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearAll = () => {
    setTasks([]);
  };

  const toggleSort = () => {
    setSortAsc(prev => prev === null ? true : !prev);
  };

  let displayedTasks = tasks.filter(task => {
    if (filter === "Todas") return true;
    return task.status === filter; 
  });

  if (sortAsc !== null) {
    displayedTasks.sort((a, b) => {
      const dateA = new Date(a.dueDate.split('/').reverse().join('-')).getTime();
      const dateB = new Date(b.dueDate.split('/').reverse().join('-')).getTime();
      
      return sortAsc ? dateA - dateB : dateB - dateA;
    });
  }

  const filterOptions = ["Todas", "Pendiente ", "Completada"];

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold">
        📋 Tareas ({displayedTasks.length} {displayedTasks.length === 1 ? 'tarea' : 'tareas'})
      </h2>

      <div className="mb-5 flex flex-wrap gap-3 rounded-xl bg-gray-800 p-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Estado:
          </span>
          {filterOptions.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                filter === s
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {s.trim()} {/* Usamos .trim para limpiar la pantalla*/}
            </button>
          ))}
        </div>

        <div className="hidden w-px bg-gray-600 sm:block" />

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Fecha límite:
          </span>
          <button 
            onClick={toggleSort}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              sortAsc !== null ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {sortAsc === null ? "Ordenar" : sortAsc ? "Más cercanas " : "Más lejanas "}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {displayedTasks.length > 0 ? (
          displayedTasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onComplete={completeTask} 
              onDelete={deleteTask} 
            />
          ))
        ) : (
          <p className="text-center text-gray-400 py-6">No hay tareas para mostrar</p>
        )}
      </div>

      {tasks.length > 0 && (
        <button 
          onClick={clearAll}
          className="mt-6 w-full rounded-xl bg-yellow-500 py-3 text-sm font-bold uppercase tracking-widest text-gray-900 transition hover:bg-yellow-400"
        >
          Limpiar listado completo
        </button>
      )}

      <div className="pb-10" />
    </div>
  );
}

export default TaskList;