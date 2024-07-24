
import { EntityType, Notification, NotificationType } from '@/lib/entities/Notifications';
import { Notification as PrismaNotificationModel } from '@prisma/client';

export const mapPrismaNotificationToEntity = (prismaNotification: PrismaNotificationModel): Notification => {
  return new Notification(
    prismaNotification.id,
    prismaNotification.message,
    prismaNotification.read,
    prismaNotification.userId,
    prismaNotification.type as NotificationType,
    prismaNotification.entityId,
    prismaNotification.entityType as EntityType,
    prismaNotification.createdAt
  );
};

export const mapEntityToPrismaNotification = (notification: Notification): PrismaNotificationModel => {
  return {
    id: notification.id,
    message: notification.message,
    read: notification.read,
    userId: notification.userId,
    type: notification.type,
    entityId: notification.entityId,
    entityType: notification.entityType,
    createdAt: notification.createdAt,
  };
};
