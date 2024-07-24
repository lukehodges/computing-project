// src/use-cases/TaskUseCases.ts
import { Tag } from '../entities/Tag';
import { Task } from '../entities/Tasks';
import { User } from '../entities/User';
import { ITaskFindOptions, ITaskRepository } from '../repositories/ITaskRepository';


export class TaskUseCases {
  constructor(private taskRepository: ITaskRepository) {}
  async findTasksByInformation(data:ITaskFindOptions){
    return this.taskRepository.findByParameters(data);
  }
  async createTask(task: Task): Promise<Task> {
    // Business logic validation, calculations, etc.
    return this.taskRepository.create(task);
  }

  async updateTask(task: Task): Promise<Task> {
    // Business logic for updating a task
    return this.taskRepository.update(task);
  }

  async deleteTask(id: number): Promise<void> {
    // Business logic for deleting a task
    return this.taskRepository.delete(id);
  }

  async getTaskById(id: number): Promise<Task | null> {
    return this.taskRepository.findById(id);
  }

  listTasks(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }
  markasDone(id: number): Promise<void> {
    return this.taskRepository.markasDone(id);
  }
  getTags(id: number): Promise<Tag[]> {
    return this.taskRepository.getTags(id);
  }
  async getSubTasks(id: number): Promise<Task[]> {
    return this.taskRepository.getSubTasks(id);
  }
  async getComments(id: number): Promise<string[]> {
    return this.taskRepository.getComments(id);
  }
  async getAssignees(id: number): Promise<User[]> {
    return this.taskRepository.getAssignees(id);
  }
  serializeTask(task: Task): any {
    return JSON.parse(JSON.stringify(task));
  }
  

}
