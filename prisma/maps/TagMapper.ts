import { Tag } from "@/lib/entities/Tag"
import { Tag as PrismaTagModel } from "@prisma/client"
export const mapPrismaTagToEntity = (prismaTag:PrismaTagModel): Tag => {
    return new Tag(
        prismaTag.id,
        prismaTag.name,
        prismaTag.color,
    )
}
export const mapEntityToPrismaTag = (tag:Tag):PrismaTagModel => {
    return {
        id:tag.id,
        name:tag.name,
        color:tag.color,
    }
}