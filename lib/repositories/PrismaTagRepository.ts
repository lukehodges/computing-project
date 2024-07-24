import { mapEntityToPrismaTag, mapPrismaTagToEntity } from "@/prisma/maps/TagMapper";
import prisma from "../db";
import { Tag } from "../entities/Tag";
import { Task } from "../entities/Tasks";
import { ITagRepository } from "./ITagRepository";
import { mapPrismaTaskToEntity } from "@/prisma/maps/TaskMapper";

export class PrismaTagRepository implements ITagRepository {
    async findById(id: number): Promise<Tag | null> {
        const prismaTag = await prisma.tag.findUnique({
            where: {
                id,
            },
        })
        if (!prismaTag)  return null;
        return mapPrismaTagToEntity(prismaTag);
    }
    async findAll(): Promise<Tag[]> {
        const prismaTags = await prisma.tag.findMany();
        return prismaTags.map(mapPrismaTagToEntity);
    }
    async create(tag: Tag): Promise<Tag> {
        const createdTag = await prisma.tag.create({data:mapEntityToPrismaTag(tag)});
        return mapPrismaTagToEntity(createdTag);
    }
    async update(tag: Tag): Promise<Tag> {
        const updatedTag = await prisma.tag.update({
            where:{
                id:tag.id
            },
            data:mapEntityToPrismaTag(tag)
        });
        return mapPrismaTagToEntity(updatedTag);
    }
    async delete(id: number): Promise<void> {
        await prisma.notification.delete({
            where:{
                id
            }
        })
    }
    async getTasks(id: number): Promise<Task[]> {
        const prismaTag = await prisma.tag.findUnique({
            where:{
                id,
            },
            include:{
                tasks:true
            }
        }
    )
    if (!prismaTag) return [];
    return prismaTag.tasks.map(task => mapPrismaTaskToEntity(task));

    }
}