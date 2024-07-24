// src/frameworks/prisma/ClientMapper.ts
import { Client } from '@/lib/entities/Client';
import { Client as PrismaClientModel } from '@prisma/client';

export const mapPrismaClientToEntity = (prismaClient: PrismaClientModel): Client => {
  return new Client(
    prismaClient.id,
    prismaClient.name,
    prismaClient.createdAt,
  );
};

export const mapEntityToPrismaClient = (client: Client): PrismaClientModel => {
  return {
    id:client.id,
    name: client.name,
    createdAt: client.createdAt,
  };
};