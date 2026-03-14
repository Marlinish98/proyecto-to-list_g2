import type { taskI } from "../interfaces/taskI";



//Relacionamos el objeto a un color según su prioridad
const priorityStyle: Record<taskI["priority"], string> = {
  Alta:  "bg-red-600 text-white",
  Media: "bg-yellow-600 text-white",
  Baja:  "bg-green-700 text-white",
};

// Tarjetas
function TaskCard({ task }: { task: taskI }) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        task.expired
          ? "border-red-700 bg-red-950/60"
          : task.status === "Completada"
          ? "border-gray-700 bg-gray-900/60 opacity-75"
          : "border-gray-700 bg-gray-900/60"
      }`}
    >
      {task.expired && (
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-red-400">
          ⚠️ Tarea vencida
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
        <div className="flex flex-col items-end gap-2 shrink-0">
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

      {/* Dates */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-400">
        <span>📅 Fecha límite: {task.dueDate}</span>
        <span>📅 Creada: {task.dateCreated}</span>
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-3">
        {task.status !== "Completada" && (
          <button className="flex-1 rounded-lg bg-green-600 py-2 text-sm font-bold uppercase tracking-wider text-white hover:bg-green-500">
            Completar
          </button>
        )}
        <button className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-bold uppercase tracking-wider text-white hover:bg-red-500">
          Eliminar
        </button>
      </div>
    </div>
  );
}


function TaskList() {
  return (
    <div>
      {/* Título */}
      <h2 className="mb-4 text-lg font-bold">
        📋 Tareas ({tareas.length} tareas)
      </h2>

      {/* Barra de filtros — solo visual, sin lógica aún */}
      <div className="mb-5 flex flex-wrap gap-3 rounded-xl bg-gray-800 p-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Estado:
          </span>
          {["Todas", "Pendiente", "Completada"].map((s) => (
            <button
              key={s}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                s === "Todas"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="hidden sm:block w-px bg-gray-600" />

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Fecha límite:
          </span>
          <button className="rounded-full px-3 py-1 text-xs font-semibold bg-gray-700 text-gray-300 hover:bg-gray-600">
            Ordenar
          </button>
        </div>
      </div>

      {/* Lista */}
      <div className="space-y-4">
        {tareas.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {/* Limpiar todo */}
      <button className="mt-6 w-full rounded-xl bg-yellow-500 py-3 text-sm font-bold uppercase tracking-widest text-gray-900 hover:bg-yellow-400">
        Limpiar listado completo
      </button>

      <div className="pb-10" />
    </div>
  );
}

export default TaskList;