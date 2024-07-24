// src/repositories/PrismaNotificationRepository.ts
import { mapEntityToPrismaNotification, mapPrismaNotificationToEntity } from '@/prisma/maps/NotificationMapper';
import prisma from '../db';
import { Notification } from '../entities/Notifications';
import { INotificationRepository } from './INotificationRepository';

export class PrismaNotificationRepository implements INotificationRepository {
  async sendToNewUser(userId: number, id: number): Promise<void> {
    const prismaNotification = await prisma.notification.findUnique({
      where: {
        id,
      },
    });
    if (!prismaNotification) return;
    prismaNotification.userId = userId;
    await prisma.notification.create({
      data: prismaNotification,
    });
  }
  async markasRead(id: number): Promise<void> {
    const prismaNotification = await prisma.notification.findUnique({
      where: {
        id,
      },
    });
    if (!prismaNotification) return;
    await prisma.notification.update({
      where: {
        id,
      },
      data: {
        read: true,
      },
    });
  }
  async findById(id: number): Promise<Notification | null> {
    const prismaNotification = await prisma.notification.findUnique({
      where: {
        id,
      },
    });
    if (!prismaNotification) return null;
    return mapPrismaNotificationToEntity(prismaNotification);
  }

  async findAll(): Promise<Notification[]> {
    const prismaNotifications = await prisma.notification.findMany({orderBy:{createdAt: 'desc' }});
    return prismaNotifications.map(mapPrismaNotificationToEntity);
  }

  async create(notification: Notification): Promise<Notification> {
    const createdNotification = await prisma.notification.create({
      data: mapEntityToPrismaNotification(notification),
    });
    return mapPrismaNotificationToEntity(createdNotification);
  }

  async update(notification: Notification): Promise<Notification> {
    const updatedNotification = await prisma.notification.update({
      where: {
        id: notification.id,
      },
      data: mapEntityToPrismaNotification(notification),
    });
    return mapPrismaNotificationToEntity(updatedNotification);
  }

  async delete(id: number): Promise<void> {
    await prisma.notification.delete({
      where: {
        id,
      },
    });
  }
}