import React, { createContext, useEffect, useState, useContext } from "react";

import Axios from "axios";
import { serverDomain } from "../config.json";

import { ITask } from "../interfaces/Task.interface";
import { ICreateTask } from "../interfaces/CreateTask.interface";
import { AuthContext, IAuthContext } from "./AuthContext";

export interface ITaskContext {
  tasks: ITask[] | null;
  editTask: (taskId: number, task: ICreateTask) => void;
  createTask: (task: ICreateTask) => void;
  removeTask: (taskId: number) => void;
}

interface IProps {
  children: React.ReactNode;
}

export const TasksContext = createContext<ITaskContext | null>(null);

const TaskContextWrapper: React.FC<IProps> = ({ children }) => {
  const { authentication } = useContext(AuthContext) as IAuthContext;
  const [tasks, setTasks] = useState<ITask[] | null>(null);

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

  async function createTask(task: ICreateTask) {
    if (!tasks) return;

    const { data } = await Axios.post<ITask>(
      `${serverDomain}/tasks/add`,
      task,
      {
        withCredentials: true,
      }
    );

    const newLocalTask: ITask = {
      ...data,
      inactive: false,
    };

    setTasks((currentValue) => [
      { ...newLocalTask, inactive: true },
      ...(currentValue as ITask[]),
    ]);

    setTimeout(() => {
      setTasks((currentValue) => {
        if (!currentValue) return null;

        const oldTasks = currentValue?.filter((task) => task.id !== data.id);
        return [newLocalTask, ...oldTasks];
      });
    }, 200);
  }

  async function editTask(taskId: number, task: ICreateTask) {
    const { data } = await Axios.put<ITask>(
      `${serverDomain}/tasks/edit?id=${taskId}`,
      task,
      {
        withCredentials: true,
      }
    );

    const newLocalTask: ITask = {
      ...data,
      inactive: false,
    };

    setTasks((currentValue) => {
      if (!currentValue) return null;

      const oldTasks = currentValue.filter((task) => task.id !== taskId);
      return [newLocalTask, ...oldTasks];
    });
  }

  async function removeTask(taskId: number) {
    if (!tasks) return;

    setTasks((currentValue) => {
      if (!currentValue) return null;
      return currentValue.map((task) => {
        if (task.id !== taskId) return task;
        return {
          ...task,
          inactive: true,
        };
      });
    });

    setTimeout(() => {
      setTasks((currentValue) => {
        if (!currentValue) return null;
        return currentValue.filter((task) => task.id !== taskId);
      });
    }, 200);

    await Axios.delete(`${serverDomain}/tasks/delete?id=${taskId}`, {
      withCredentials: true,
    });
  }

  return (
    <TasksContext.Provider value={{ tasks, createTask, editTask, removeTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export default TaskContextWrapper;
