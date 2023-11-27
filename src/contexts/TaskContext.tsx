import React, { createContext, useEffect, useState } from "react";

import Axios from "axios";
import { serverDomain } from "../config.json";

import { ITask } from "../interfaces/Task.interface";
import { IAuthentication } from "../App";

export interface ITaskContext {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  removeTask: (taskId: number) => void;
}

interface IProps {
  authentication: IAuthentication;
  children: React.ReactNode;
}

export const TasksContext = createContext<ITaskContext | null>(null);

const TaskContextWrapper: React.FC<IProps> = ({ authentication, children }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    if (authentication.loading || !authentication.authenticated) return;

    async function fetchTasks() {
      const { data } = await Axios.get(`${serverDomain}/tasks/get`, {
        withCredentials: true,
      });
      setTasks(data);
    }
    fetchTasks();
  }, [authentication]);

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
