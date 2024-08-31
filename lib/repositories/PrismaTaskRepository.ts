
import { mapEntityToPrismaTask, mapPrismaTaskToEntity } from "@/prisma/maps/TaskMapper";
import prisma from "../db";
import { Task } from "../entities/Tasks";
import { ITaskFindOptions, ITaskRepository } from "./ITaskRepository";
import { TaskStatus } from "@prisma/client";
import { User } from "../entities/User";
import { mapPrismaUserToEntity } from "@/prisma/maps/UserMapper";
import { mapPrismaTagToEntity } from "@/prisma/maps/TagMapper";
import { Tag } from "../entities/Tag";
import { UserUseCases } from "../usecases";


export class PrismaTaskRepository implements ITaskRepository {
  async removeAssignee(id: number, assignee: number): Promise<Task> {
    if ((await this.getAssignees(id)).filter(task => task.id === assignee).length == 0) {
      throw new Error("Task does not have this assignee");
    }
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { assignees: { disconnect: { id: assignee } } },
    });
    return mapPrismaTaskToEntity(updatedTask)
  }
  async addAssignee(id: number, assignee: number): Promise<Task> {
    if (!await UserUseCases.getUserByID(assignee)) {
      throw new Error("User Not Found")
    }
    if ((await this.getAssignees(id)).filter(task => task.id === assignee).length != 0) {
    throw new Error("Task already has this assignee");
  }
  const updatedTask = await prisma.task.update({
    where: { id },
    data: { assignees: { connect: { id: assignee } } },
  });
  return mapPrismaTaskToEntity(updatedTask)
}
  async findByParameters(data: ITaskFindOptions): Promise<Task[] | null> {
    let query = {}
    if (data.id) {
      query = { id:data.id };
    }
    if (data.priority) {
      query = {...query, priority: data.priority };
    }
    // if (data.status) {
    //   query = {...query, status: data.status };
    // }
    if (data.projectId) {
    query = {...query, projectId: data.projectId}
    }
    if (data.dueDate) {
      query = {...query, dueDate: data.dueDate };
    }
    if (data.createdAt) {
      query = {...query, createdAt: data.createdAt };
    }
    if (data.updatedAt) {
      query = {...query, updatedAt: data.updatedAt };
    }
    if (data.createdBefore) {
      query = {...query, createdAt: { lt: data.createdBefore } };
    }
    if (data.createdAfter) {
      query = {...query, createdAt: { gt: data.createdAfter } };
    }
    if (data.updatedBefore) {
      query = {...query, updatedAt: { lt: data.updatedBefore } };
    }
    if (data.updatedAfter) {
      query = {...query, updatedAt: { gt: data.updatedAfter } };
    }
    if (data.parentTaskId) {
      query = {...query, parentTaskId: data.parentTaskId };
    }
    if (data.userId) {
      query = {...query, assignees: { some: { userId: data.userId } } };
    }
    if (data.tags) {
      query = {...query, assignees: { some: { tags: { some: { id: data.tags.map(tag => tag.id) } } } } };
    }
    if (data.assignees) {
      query = {...query, assignees: { some: { userId: data.assignees.map(user => user.id) } } };
    }
    if (data.comments) {
      query = {...query, comments: { some: { id: data.comments.map(comment => comment) } } };
    }
    let orderby = {}
    if (data.order) {
      orderby = {...query, orderBy: [{ [data.order.field]: data.order.direction }] };
    }

    const prismaTask = await prisma.task.findMany({
      where: {},
      orderBy: orderby
    })
    if (!prismaTask) return []
    return prismaTask.map(mapPrismaTaskToEntity);
  }
  async markasDone(id: number): Promise<void> {
    const prismaTask = await prisma.task.findUnique({
      where: {
        id,
      },
    });
    if (!prismaTask) return;
    prismaTask.status = TaskStatus.DONE;
    await prisma.task.update({
      where: {
        id,
      },
      data: prismaTask,
    });
  }
  async getTags(id: number): Promise<Tag[]> {
    const prismaTask = await prisma.task.findUnique({
      where: {
        id,
      },
      include: {
        tags: true,
      },
    });
    if (!prismaTask) return [];
    return prismaTask.tags.map(tag => mapPrismaTagToEntity(tag));
  }
  getSubTasks(id: number): Promise<Task[]> {
    throw new Error("Method not implemented.");
  }
  getComments(id: number): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
  async getAssignees(id: number): Promise<User[]> {
    const prismaTask = await prisma.task.findUnique({
      where: {
        id,
      },
      include: {
        assignees: true,
      },
    });
    if (!prismaTask) return [];
    return prismaTask.assignees.map(assignee=> mapPrismaUserToEntity(assignee));
  }
  async findById(id: number): Promise<Task | null> {
    const prismaTask = await prisma.task.findUnique({
      where: {
        id,
      },
    });
    if (!prismaTask) return null;
    return mapPrismaTaskToEntity(prismaTask);
  }

  async findAll(): Promise<Task[]> {
    const prismaTasks = await prisma.task.findMany();
    return prismaTasks.map(task => mapPrismaTaskToEntity(task));
  }

  async create(task: Task): Promise<Task> {
    const createdTask = await prisma.task.create({
      data: mapEntityToPrismaTask(task),
    });
    return mapPrismaTaskToEntity(createdTask);
  }

  async update(task: Task): Promise<Task> {
    const updatedTask = await prisma.task.update({
      where: {
        id: task.id,
      },
      data: mapEntityToPrismaTask(task),
    });
    return mapPrismaTaskToEntity(updatedTask);
  }

  async delete(id: number): Promise<void> {
    await prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
