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
    Opportunity = 'Opportunity',
    Contact = 'Contact',
    Client = 'Client',
    // Add other entity types as needed
  }



export function categorizeNotifications(notifications: Notification[]) {
  const now = new Date().getTime();  // Current time in milliseconds since epoch (UTC)
  const lastHour: Notification[] = [];
  const today: Notification[] = [];
  const yesterday: Notification[] = [];
  const thisWeek: Notification[] = [];
  const thisMonth: Notification[] = [];
  const thisYear: Notification[] = [];
  const lastYear: Notification[] = [];

  // Calculate time boundaries in UTC
  const startOfToday = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate())).getTime();
  const startOfYesterday = startOfToday - 86400000; // 86400000 ms = 24 hours
  const startOfThisWeek = startOfToday - (new Date().getUTCDay() * 86400000);
  const startOfThisMonth = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1)).getTime();
  const startOfThisYear = new Date(Date.UTC(new Date().getUTCFullYear(), 0, 1)).getTime();
  const startOfLastYear = new Date(Date.UTC(new Date().getUTCFullYear() - 1, 0, 1)).getTime();

  // Iterate once and classify notifications
  notifications.forEach((notification:Notification) => {
    notification.createdAt = new Date(notification.createdAt)
      const createdAt = notification.createdAt.getTime();

      if (createdAt > now - 3600000) { // last hour
          lastHour.push(notification);
      } else if (createdAt > startOfToday) { // today but not last hour
          today.push(notification);
      } else if (createdAt > startOfYesterday) { // yesterday
          yesterday.push(notification);
      } else if (createdAt > startOfThisWeek) { // this week but not yesterday or today
          thisWeek.push(notification);
      } else if (createdAt > startOfThisMonth) { // this month but not this week
          thisMonth.push(notification);
      } else if (createdAt > startOfThisYear) { // this year but not this month
          thisYear.push(notification);
      } else if (createdAt > startOfLastYear) { // last year
          lastYear.push(notification);
      }
  });

  return { lastHour, today, yesterday, thisWeek, thisMonth, thisYear, lastYear };
}