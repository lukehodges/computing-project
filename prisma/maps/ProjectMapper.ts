import { Project } from "@/lib/entities/Project"
import { Project as PrismaProject } from "@prisma/client"
export const mapPrismaProjectToEntity = (prismaProject:PrismaProject ): Project => {
    return new Project(
        prismaProject.id,
        prismaProject.name,
        prismaProject.description,
        prismaProject.ownerId,
        prismaProject.createdAt,
        prismaProject.updatedAt,
        prismaProject.iconID,
    )
}
export const mapEntityToPrismaProject = (project:Project ): PrismaProject => {
    return {
        id:project.id,
        name:project.name,
        description:project.description,
        ownerId:project.ownerID,
        createdAt:project.createdAt,
        updatedAt:project.updatedAt,
        iconID:project.iconId,
    }
}