import React, { createContext, useEffect, useState } from "react";

import Axios from "axios";
import { serverDomain } from "../config.json";

import { ITask } from "../interfaces/Task.interface";

export interface ITaskContext {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  removeTask: (taskId: number) => void;
}

interface IProps {
  authenticated: boolean;
  children: React.ReactNode;
}

export const TasksContext = createContext<ITaskContext | null>(null);

const TaskContextWrapper: React.FC<IProps> = ({ authenticated, children }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    if (!authenticated) return;

    async function fetchTasks() {
      const { data } = await Axios.get(`${serverDomain}/tasks/get`);
      setTasks(data);
    }
    fetchTasks();
  }, [authenticated]);

  function removeTask(taskId: number) {
    setTasks((currentValue) =>
      currentValue.filter((task) => task.id !== taskId)
    );
  }

  return (
    <TasksContext.Provider value={{ tasks, setTasks, removeTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export default TaskContextWrapper;
