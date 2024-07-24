// src/entities/Notification.ts
export class Notification {
    constructor(
      public id: number,
      public message: string,
      public read: boolean,
      public userId: number,
      public type: NotificationType,
      public entityId: number | null,
      public entityType: EntityType | null,
      public createdAt: Date
    ) {}
  }
  
  export enum NotificationType {
    TASK_CREATE = 'TASK_CREATE',
    TASK_MODIFY = 'TASK_MODIFY',
    TASK_DELETE = 'TASK_DELETE',
    TASK_ASSIGN = 'TASK_ASSIGN',
    TASK_UNASSIGN = 'TASK_UNASSIGN',
    TASK_OVERDUE = 'TASK_OVERDUE',
    TASK_DONE = 'TASK_DONE',
    TASK_CANCELED = 'TASK_CANCELED',
    // Add other notification types as needed
  }
  
  export enum EntityType {
    Task = 'Task',
    User = 'User',
    Comment = 'Comment',
    Project = 'Project',
    Invoice = 'Invoice',
    File = 'File',
    Document = 'Document',
    Deal = 'Deal',
    Contact = 'Contact',
    Client = 'Client',
    // Add other entity types as needed
  }
  