// src/repositories/prismaclientrepository.ts
import { mapEntityToPrismaClient, mapPrismaClientToEntity } from "@/prisma/maps/ClientMapper";
import prisma from "../db";

import { Client } from "../entities/Client";
import { Document } from "../entities/Document";
import { Invoice } from "../entities/Invoice";
import { Opportunity } from "../entities/Opportunity";
import { Tag } from "../entities/Tag";
import { User } from "../entities/User";
import { IClientFindOptions, IClientRepository } from "./IClientRepository";
import { mapPrismaUserToEntity } from "@/prisma/maps/UserMapper";
import { mapPrismaTagToEntity } from "@/prisma/maps/TagMapper";
import { mapPrismaContactToEntity } from "@/prisma/maps/ContactMapper";
import { Contact } from "../entities/Contact";

export class PrismaClientRepository implements IClientRepository {
  async findByParameters(data: IClientFindOptions): Promise<Client[] | null> {
    let query = {}
    // implement the query based on the provided data
    const prismaClients = await prisma.client.findMany({
      where: query,
    });
    if (!prismaClients) return [];
    return prismaClients.map(mapPrismaClientToEntity);
  }

  async findById(id: number): Promise<Client | null> {
    const prismaClient = await prisma.client.findUnique({
      where: {
        id,
      },
    });
    if (!prismaClient) return null;
    return mapPrismaClientToEntity(prismaClient);
  }

  async findAll(): Promise<Client[]> {
    const prismaClients = await prisma.client.findMany();
    return prismaClients.map(mapPrismaClientToEntity);
  }

  async create(client: Client): Promise<Client> {
    const createdClient = await prisma.client.create({
      data: mapEntityToPrismaClient(client),
    });
    return mapPrismaClientToEntity(createdClient);
  }

  async update(client: Client): Promise<Client> {
    const updatedClient = await prisma.client.update({
      where: {
        id: client.id,
      },
      data: mapEntityToPrismaClient(client),
    });
    return mapPrismaClientToEntity(updatedClient);
  }

  async delete(id: number): Promise<void> {
    await prisma.client.delete({
      where: {
        id,
      },
    });
  }

  async getDocuments(id: number): Promise<Document[]> {
    const prismaClient = await prisma.client.findUnique({
      where: {
        id,
      },
      include: {
        documents: true,
      },
    });
    if (!prismaClient) return [];
    return prismaClient.documents.map(document => ({...document }));
  }

  async getInvoices(id: number): Promise<Invoice[]> {
    const prismaClient = await prisma.client.findUnique({
      where: {
        id,
      },
      include: {
        invoices: true,
      },
    });
    if (!prismaClient) return [];
    return prismaClient.invoices.map(invoice => ({...invoice }));
  }

  async getOpportunities(id: number): Promise<Opportunity[]> {
    const prismaClient = await prisma.client.findUnique({
      where: {
        id,
      },
      include: {
        opportunities: true,
      },
    });
    if (!prismaClient) return [];
    return prismaClient.opportunities.map(opportunity => ({...opportunity }));
  }

  async getTags(id: number): Promise<Tag[]> {
    const prismaClient = await prisma.client.findUnique({
      where: {
        id,
      },
      include: {
        tags: true,
      },
    });
    if (!prismaClient) return [];
    return prismaClient.tags.map(tag => mapPrismaTagToEntity(tag));
  }

  async getContacts(id: number): Promise<Contact[]> {
    const prismaClient = await prisma.client.findUnique({
      where: {
        id,
      },
      include: {
        contacts: true,
      },
    });
    if (!prismaClient) return [];
    return prismaClient.contacts.map(contact => mapPrismaContactToEntity(contact));
  }

  async getAssignedUsers(id: number): Promise<User[]> {
    const prismaClient = await prisma.client.findUnique({
      where: {
        id,
      },
      include: {
        assigned: true,
      },
    });
    if (!prismaClient) return [];
    return prismaClient.assigned.map(user => mapPrismaUserToEntity(user));
  }
}