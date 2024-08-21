import { mapEntityToPrismaProject, mapPrismaProjectToEntity } from "@/prisma/maps/ProjectMapper";
import { Project } from "../entities/Project";
import { Task } from "../entities/Tasks";
import { IProjectRepository } from "./IProjectRepository";
import prisma from "../db";
import { mapPrismaTaskToEntity } from "@/prisma/maps/TaskMapper";
import { Tag } from "../entities/Tag";
import { mapPrismaTagToEntity } from "@/prisma/maps/TagMapper";

export class PrismaProjectRepository implements IProjectRepository {
    async getTags(id: number): Promise<Tag[]> {
        const prismaProject = await prisma.project.findUnique({
            where: {
                id,
            },
            include:{
                tags:true,
            }
        })
        if (!prismaProject)  return [];
        return prismaProject.tags.map(mapPrismaTagToEntity);
    }
    async findById(id: number): Promise<Project | null> {
        const prismaProject = await prisma.project.findUnique({
            where: {
                id,
            },
        })
        if (!prismaProject)  return null;
        return mapPrismaProjectToEntity(prismaProject);
    }
    async findAll(): Promise<Project[]> {
        const prismaProjects = await prisma.project.findMany();
        return prismaProjects.map(mapPrismaProjectToEntity);
    }
    async create(project: Project): Promise<Project> {
        const createdProject = await prisma.project.create({
            data: mapEntityToPrismaProject(project),
        });
        return mapPrismaProjectToEntity(createdProject);
    }
    async update(project: Project): Promise<Project> {
        const updatedProject = await prisma.project.update({
            where: {
                id: project.id,
            },
            data: mapEntityToPrismaProject(project),
        });
        return mapPrismaProjectToEntity(updatedProject);
    }
    async delete(id: number): Promise<void> {
        await prisma.project.delete({
            where: {
                id,
            },
        });
    }
    async getTasks(id: number): Promise<Task[]> {
        let prismaProject =  await prisma.project.findUnique({
            where: {
                id,
            },
            include: {
                tasks: true,
                
            },
        })
        if (!prismaProject) return [];
        return prismaProject.tasks.map(task => mapPrismaTaskToEntity(task));
    }
}