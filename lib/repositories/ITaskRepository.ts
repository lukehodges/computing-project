// src/repositories/ITaskRepository.ts

import { Tag } from "../entities/Tag";
import { Task, TaskStatus } from "../entities/Tasks";
import { User } from "../entities/User";

export interface ITaskFindOptions {
  id?:number| null,
  priority?:number| null,
  status?: TaskStatus| null,
  projectId?: number| null,
  dueDate?: Date| null,
  createdAt?: Date| null,
  updatedAt?: Date| null,
  createdBefore?: Date| null,
  createdAfter?: Date| null,
  updatedBefore?: Date| null,
  updatedAfter?: Date| null,
  parentTaskId?: number| null,
  userId?: number| null,
  tags?: Tag[]| null,
  assignees?: User[]| null,
  comments?: string[]| null,
  order?: {
    field: keyof Task,
    direction: 'asc' | 'desc',
  }| null,
}


export interface ITaskRepository {
  findById(id: number): Promise<Task | null>;
  findByParameters(data:ITaskFindOptions): Promise<Task[] | null >;
  findAll(): Promise<Task[]>;
  create(task: Task): Promise<Task>;
  update(task: Task): Promise<Task>;
  delete(id: number): Promise<void>;
  markasDone(id: number): Promise<void>;
  getTags(id: number): Promise<Tag[]>;
  getSubTasks(id: number): Promise<Task[]>;
  getComments(id: number): Promise<string[]>;
  getAssignees(id: number): Promise<User[]>;
}
