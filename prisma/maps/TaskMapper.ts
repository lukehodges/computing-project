// src/frameworks/prisma/TaskMapper.ts
import { Task, TaskStatus } from '@/lib/entities/Tasks';
import { Task as PrismaTaskModel } from '@prisma/client';

export const mapPrismaTaskToEntity = (prismaTask: PrismaTaskModel): Task => {
  return new Task(
    prismaTask.id,
    prismaTask.title,
    prismaTask.description,
    prismaTask.status as TaskStatus,
    prismaTask.priority,
    prismaTask.projectId,
    prismaTask.dueDate,
    prismaTask.createdAt,
    prismaTask.updatedAt,
    prismaTask.startDate,
    prismaTask.estimatedHours,
    prismaTask.parentTaskId,
    prismaTask.content
  );
};

export const mapEntityToPrismaTask = (task: Task): PrismaTaskModel => {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    projectId: task.projectId,
    dueDate: task.dueDate,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    startDate: task.startDate,
    estimatedHours: task.estimatedHours,
    parentTaskId: task.parentTaskId,
    content: task.content,
  };
};
