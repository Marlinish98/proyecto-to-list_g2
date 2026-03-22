import { useForm } from "../hooks/useForm";
import type { taskFormI } from "../interfaces/TaskFormI";
import type { taskI } from "../interfaces/taskI";
import type { ToDoProps } from "../interfaces/ToDoProps";
import toast, { Toaster } from 'react-hot-toast';



const ToDo: React.FC<ToDoProps> = ({ addTask }) => {
    const { name, description, dueDate, priority, handleChange, handleDirectChange, resetForm, validateBeforeSubmit, form } = useForm<taskFormI>({
        name: "",
        description: "",
        dueDate: "",
        priority: "Baja"
    });

    const onSave = () => {
        if (!validateBeforeSubmit()) 
        return;
        addTask(form);
        resetForm();
        toast.success("Tarea guardada correctamente");
    };
    

    return (
        <div className="h-auto bg-gray-950 font-sans text-white">
            <Toaster position="top-center"/>

            {/* Header */}
            <header className="mb-8 bg-blue-700 py-5 text-center -mx-4">
                <h1 className="text-3xl tracking-wide" style={{ fontFamily: "'Russo One', sans-serif" }}>TaskFlow</h1>
                <p className="mt-1 text-sm text-blue-200">Tus tareas, en las mejores manos</p>
            </header>

            <div className="mx-auto max-w-xl pb-10">

                <div className="rounded-2xl bg-gray-800 p-6 shadow-xl">
                    <h2 className="mb-5 text-lg font-bold">📋 Nueva tarea</h2>

                    <div className="space-y-4">
                        {/* Nombre */}
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-gray-300">Nombre de tarea</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={handleChange}
                                placeholder="Tarea..."
                                className="w-full rounded-lg bg-gray-700 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none ring-1 ring-gray-600 focus:ring-blue-500"
                            />
                        </div>

                        {/* Descripción */}
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-white">Descripción</label>
                            <textarea
                                name="description"
                                value={description}
                                onChange={handleChange}
                                placeholder="Descripción..."
                                rows={3}
                                className="w-full rounded-lg bg-gray-700 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none ring-1 ring-gray-600 focus:ring-blue-500 resize-none"
                            />
                        </div>

                        {/* Fecha */}
                        <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-gray-300">📅 Fecha límite</label>
                            <input
                                type="date"
                                name="dueDate"
                                value={dueDate}
                                onChange={handleChange}
                                className="w-full rounded-lg bg-gray-700 px-4 py-2.5 text-sm text-white outline-none ring-1 ring-gray-600 focus:ring-blue-500"
                            />
                        </div>

                        {/* Prioridad */}
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-300 text-center">⚡ Prioridad</label>
                            <div className="flex gap-4 justify-center mb-4">
                                {(["Baja", "Media", "Alta"] as taskI["priority"][]).map((p) => (
                                    <label key={p} className="flex cursor-pointer items-center gap-2 text-sm">
                                        <input
                                            type="radio"
                                            name="priority"
                                            checked={priority === p}
                                            onChange={() => handleDirectChange("priority", p)}
                                            className="accent-blue-500"
                                        />
                                        {p}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Botones */}
                        <button onClick={onSave} className="w-full rounded-lg bg-blue-600 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-blue-500">
                            Guardar tarea
                        </button>
                        <button onClick={resetForm} className="w-full rounded-lg bg-gray-600 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-gray-500">
                            Limpiar campos
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default ToDo;