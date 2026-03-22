import { useTask } from "../hooks/useTask";
import Tasklist from "./Tasklist";
import ToDo from "./toDo";
import { FaGithub } from 'react-icons/fa';

const GestionToDo: React.FC = () => {
    const {
        tasks,
        addTask,
        completeTask,
        deleteTask,
        clearAllTasks,
    } = useTask();

    return (
        <div>
            <div>
                <div>
                    <ToDo
                        addTask={addTask}
                    />
                </div>

            </div>

            <div>
                <Tasklist
                  tareas={tasks}
                  completeTask={completeTask}
                  deleteTask={deleteTask}
                  clearAllTasks={clearAllTasks} 
                />
            </div>

            <footer className="text-center text-sm py-5 bg-blue-950 text-white space-y-2.5" >

                <div className="flex justify-center gap-4 text-xl text-gray-400">
                    <a href="https://github.com/Marlinish98/proyecto-to-list_g2" target="_blank">
                    <FaGithub className="hover:text-white cursor-pointer transition" />
                    </a>
            
            
            </div>
                    <p className="font-bold"> 
                    Desarrollado por Angelenamorado777 / ElidethMatus / JoeDB993 / 
                    lissybarrera24 / Marlinish98</p>
                <p> © 2026 TaskFlow. Todos los derechos reservados</p>     
            </footer>
        </div>

    )

}

export default GestionToDo;