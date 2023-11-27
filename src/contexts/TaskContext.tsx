import React, { createContext, useEffect, useState } from "react";

import Axios from "axios";
import { serverDomain } from "../config.json";

import { ITask } from "../interfaces/Task.interface";
import { IAuthentication } from "../App";
import { ICreateTask } from "../interfaces/CreateTask.interface";

export interface ITaskContext {
  tasks: ITask[];
  editTask: (taskId: number, task: ICreateTask) => void;
  createTask: (task: ICreateTask) => void;
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

  async function createTask(task: ICreateTask) {
    const newLocalTask: ITask = {
      id: Date.now(),
      ...task,
    };

    setTasks((currentValue) => [newLocalTask, ...currentValue]);

    await Axios.post(`${serverDomain}/tasks/add`, task, {
      withCredentials: true,
    });
  }

  async function editTask(taskId: number, task: ICreateTask) {
    const { title, description, completed } = task;

    const newLocalTask = {
      id: Date.now(),
      title,
      description,
      completed,
    };

    setTasks((currentValue) => {
      const oldTasks = currentValue.filter((task) => task.id !== taskId);
      return [newLocalTask, ...oldTasks];
    });

    await Axios.put(`${serverDomain}/tasks/edit?id=${taskId}`, task, {
      withCredentials: true,
    });
  }

  async function removeTask(taskId: number) {
    setTasks((currentValue) =>
      currentValue.filter((task) => task.id !== taskId)
    );

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
