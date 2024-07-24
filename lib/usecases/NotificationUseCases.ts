// src/use-cases/NotificationUseCases.ts
import { INotificationRepository } from '../repositories/INotificationRepository';
import { Notification } from '../entities/Notifications';
export class NotificationUseCases {
  constructor(private notificationRepository: INotificationRepository) {}

  async createNotification(notification: Notification): Promise<Notification> {
    // Business logic validation, calculations, etc.
    return this.notificationRepository.create(notification);
  }

  async updateNotification(notification: Notification): Promise<Notification> {
    // Business logic for updating a notification
    return this.notificationRepository.update(notification);
  }

  async deleteNotification(id: number): Promise<void> {
    // Business logic for deleting a notification
    return this.notificationRepository.delete(id);
  }

  async getNotificationById(id: number): Promise<Notification | null> {
    return this.notificationRepository.findById(id);
  }

  async listNotifications(): Promise<Notification[]> {
    return this.notificationRepository.findAll();
  }
  async markasRead(id: number): Promise<void> {
    return this.notificationRepository.markasRead(id);
  }
  async sendToNewUser(userId: number,id:number): Promise<void> {
    return this.notificationRepository.sendToNewUser(userId,id);
  }
}
