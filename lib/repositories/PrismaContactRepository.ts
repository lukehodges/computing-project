import { mapPrismaContactToEntity } from "@/prisma/maps/ContactMapper";
import prisma from "../db";
import { Client } from "../entities/Client";
import { Contact } from "../entities/Contact";
import { IContactFindOptions, IContactRepository } from "./IContactRepository";
import { mapPrismaClientToEntity } from "@/prisma/maps/ClientMapper";

export class PrismaContactRepository implements IContactRepository {
    async findbyID(id: number): Promise<Contact | null> {
        const prismaContact = await prisma.contact.findUnique({where:{id}})
        if (!prismaContact) return null;
        return mapPrismaContactToEntity(prismaContact)
    }
    async findAll(): Promise<Contact[]> {
        const prismaContacts = await prisma.contact.findMany()
        return prismaContacts.map(mapPrismaContactToEntity)
    }
    async findByParameters(data: IContactFindOptions): Promise<Contact[] | null> {
        let query = {}
        if (data.clientId) query = {...query, clientId:{equals:data.clientId}}
        if (data.firstName) query = {...query, firstName:{contains:data.firstName}}
        if (data.lastName) query = {...query, lastName:{contains:data.lastName}}
        if (data.email) query = {...query, email:{contains:data.email}}
        if (data.phoneNumber) query = {...query, phoneNumber:{contains:data.phoneNumber}}
        if (data.address) query = {...query, address:{contains:data.address}}
        if (data.city) query = {...query, city:{contains:data.city}}
        if (data.country) query = {...query, country:{contains:data.country}}
        if (data.jobTitle) query = {...query, jobTitle:{contains:data.jobTitle}}
        if (data.company) query = {...query, company:{contains:data.company}}
        if (data.notes) query = {...query, notes:{contains:data.notes}}
        const prismaContacts = await prisma.contact.findMany({where:query})
        if (!prismaContacts) return [];
        return prismaContacts.map(mapPrismaContactToEntity)
    }
    async create(contact: Contact): Promise<Contact> {
        const createdContact = await prisma.contact.create({data:contact})
        return mapPrismaContactToEntity(createdContact)
    }
    async update(contact: Contact): Promise<Contact> {
        const updatedContact = await prisma.contact.update({where:{id:contact.id}, data:contact})
        return mapPrismaContactToEntity(updatedContact)
    }
    async delete(id: number): Promise<void> {
        await prisma.contact.delete({where:{id}})
    }
    async getClient(id: number): Promise<Client | null> {
        const contact = await prisma.contact.findUnique({where:{id}, include:{client:true}})
        if (!contact) return null
        return contact.client? mapPrismaClientToEntity(contact.client) : null;
    }

}