import { ITask } from "./Task.interface";

export type ICreateTask = Omit<ITask, "id">;