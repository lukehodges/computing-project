// src/entities/Task.ts
export class Task {
    constructor(
      public id: number,
      public title: string,
      public description: string | null,
      public status: TaskStatus,
      public priority: number,
      public projectId: number | null,
      public dueDate: Date | null,
      public createdAt: Date,
      public updatedAt: Date ,
      public startDate: Date | null,
      public estimatedHours: number | null,
      public parentTaskId: number | null,
      public content: string | null
    ) {}
  }
  
  export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
    CANCELED = 'CANCELED',
    BACKLOG = 'BACKLOG',
  }
  