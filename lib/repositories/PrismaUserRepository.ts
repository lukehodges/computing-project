import { mapPrismaUserToEntity } from "@/prisma/maps/UserMapper";
import { User } from "../entities/User";
import { IUserRepository } from "./IUserRepository";
import prisma from "../db";

export class PrismaUserRepository implements IUserRepository {
    async getbyID(id: number): Promise<User> {
        const prismaUser = await prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!prismaUser) throw new Error(`User with id ${id} not found.`);
        return mapPrismaUserToEntity(prismaUser);
    }
    getAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    create(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

}