import { mapEntityToPrismaOpportunity, mapPrismaOpportunityToEntity } from "@/prisma/maps/OpportunityMapper";
import prisma from "../db";
import { Client } from "../entities/Client";
import { Contact } from "../entities/Contact";
import { Opportunity } from "../entities/Opportunity";
import { IOpportunityFindOptions, IOpportunityRepository } from "./IOpportunityRepository";


export class PrismaOpportunityRepository implements IOpportunityRepository {
  getContact(id: number): Promise<Contact | null> {
      throw new Error("Method not implemented.");
  }
  getClient(id: number): Promise<Client | null> {
      throw new Error("Method not implemented.");
  }
  async findById(id: number): Promise<Opportunity | null> {
    const prismaOpportunity = await prisma.opportunity.findUnique({ where: { id } });
    if (!prismaOpportunity) return null;
    return mapPrismaOpportunityToEntity(prismaOpportunity);
  }

  async findAll(): Promise<Opportunity[]> {
    const prismaOpportunities = await prisma.opportunity.findMany();
    return prismaOpportunities.map(mapPrismaOpportunityToEntity);
  }

  async findByParameters(data: IOpportunityFindOptions): Promise<Opportunity[] | null> {
    let query = {};
    if (data.id) query = {...query, id: { equals: data.id } };
    if (data.name) query = {...query, name: { contains: data.name } };
    if (data.description) query = {...query, description: { contains: data.description } };
    if (data.stage) query = {...query, stage: { equals: data.stage } };
    if (data.probability) query = {...query, probability: { equals: data.probability } };
    if (data.amount) query = {...query, amount: { equals: data.amount } };
    if (data.closeDate) query = {...query, closeDate: { equals: data.closeDate } };
    if (data.contactId) query = {...query, contactId: { equals: data.contactId } };
    if (data.clientId) query = {...query, clientId: { equals: data.clientId } };

    const prismaOpportunities = await prisma.opportunity.findMany({ where: query });
    if (!prismaOpportunities) return [];
    return prismaOpportunities.map(mapPrismaOpportunityToEntity);
  }

  async create(opportunity: Opportunity): Promise<Opportunity> {
    let data = mapEntityToPrismaOpportunity(opportunity);
    const createdOpportunity = await prisma.opportunity.create({ data: data });
    return mapPrismaOpportunityToEntity(createdOpportunity);
  }

  async update(opportunity: Opportunity): Promise<Opportunity> {
    const updatedOpportunity = await prisma.opportunity.update({ where: { id: opportunity.id }, data: opportunity });
    return mapPrismaOpportunityToEntity(updatedOpportunity);
  }

  async delete(id: number): Promise<void> {
    await prisma.opportunity.delete({ where: { id } });
  }
}

