import { Notification } from "../entities/Notifications";
export interface INotificationRepository {
  findById(id: number): Promise<Notification | null>;
  findAll(): Promise<Notification[] >;
  create(notification: Notification): Promise<Notification>;
  update(notification: Notification): Promise<Notification>;
  delete(id: number): Promise<void>;
  markasRead(id: number): Promise<void>;
  sendToNewUser(userId: number,id:number): Promise<void>;
}
