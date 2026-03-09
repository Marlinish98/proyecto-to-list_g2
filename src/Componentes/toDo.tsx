import TaskList from "./Tasklist";
import type { taskI } from "../interfaces/taskI";

function ToDo() {
    return (
        <div className="min-h-screen bg-gray-950 px-4 py-0 font-sans text-white">

            {/* Header */}
            <header className="mb-8 bg-blue-700 py-5 text-center -mx-4">
                <h1 className="text-3xl tracking-wide" style={{ fontFamily: "'Russo One', sans-serif" }}>TaskFlow</h1>
                <p className="mt-1 text-sm text-blue-200">
                    Tus tareas, en las mejores manos
                </p>
            </header>

            <div className="mx-auto max-w-xl space-y-8">

                {/* ── Formulario ── */}
                <div className="rounded-2xl bg-gray-800 p-6 shadow-xl">
                    <h2 className="mb-5 text-lg font-bold">📋 Nueva tarea</h2>

                    <div className="space-y-4">

                        {/* Nombre */}
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-gray-300">
                                Nombre de tarea
                            </label>
                            <input
                                type="text"
                                placeholder="Tarea..."
                                className="w-full rounded-lg bg-gray-700 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none ring-1 ring-gray-600 focus:ring-blue-500"
                            />
                        </div>

                        {/* Descripción */}
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-gray-300">
                                Descripción
                            </label>
                            <textarea
                                placeholder="Descripción de la tarea..."
                                rows={3}
                                className="w-full rounded-lg bg-gray-700 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none ring-1 ring-gray-600 focus:ring-blue-500 resize-none"
                            />
                        </div>

                        {/* Fecha límite */}
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-gray-300">
                                📅 Fecha límite
                            </label>
                            <input
                                type="date"
                                className="w-full rounded-lg bg-gray-700 px-4 py-2.5 text-sm text-white outline-none ring-1 ring-gray-600 focus:ring-blue-500"
                            />
                        </div>

                        {/* Prioridad */}
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-300">
                                ⚡ Prioridad
                            </label>
                            <div className="flex gap-30 justify-center mb-4">
                                {(["Baja", "Media", "Alta"] as taskI["priority"][]).map((p) => (
                                    <label key={p} className="flex cursor-pointer items-center gap-2 text-sm">
                                        <input
                                            type="radio"
                                            name="priority"
                                            value={p}
                                            defaultChecked={p === "Baja"}
                                            className="accent-blue-500"
                                        />
                                        {p}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Botones */}
                        <button className="w-full rounded-lg bg-blue-600 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-blue-500">
                            Guardar tarea
                        </button>
                        <button className="w-full rounded-lg bg-gray-600 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-gray-500">
                            Limpiar campos
                        </button>

                    </div>
                </div>

                {/* ── Lista de tareas nuevas que se crearán ── */}
                <TaskList />

            </div>
        </div>
    );
}

export default ToDo;