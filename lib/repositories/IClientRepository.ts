// src/repositories/IClientRepository.ts
import { Client } from "../entities/Client";
import { Contact } from "../entities/Contact";
// import { Document } from "../entities/Document";
// import { Invoice } from "../entities/Invoice";
import { Opportunity } from "../entities/Opportunity";
import { Tag } from "../entities/Tag";
import { User } from "../entities/User";

export interface IClientFindOptions {
  id?: number | null;
  name?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  createdBefore?: Date | null;
  createdAfter?: Date | null;
  updatedBefore?: Date | null;
  updatedAfter?: Date | null;
  userId?: number | null;
  tags?: Tag[] | null;
  assignees?: User[] | null;
  order?: {
    field: keyof Client;
    direction: 'asc' | 'desc';
  } | null;
}

export interface IClientRepository {
  findById(id: number): Promise<Client | null>;
  findByParameters(data: IClientFindOptions): Promise<Client[] | null>;
  findAll(): Promise<Client[]>;
  create(client: Client): Promise<Client>;
  update(client: Client): Promise<Client>;
  delete(id: number): Promise<void>;
  // getDocuments(id: number): Promise<Document[]>;
  // getInvoices(id: number): Promise<Invoice[]>;
  getOpportunities(id: number): Promise<Opportunity[]>;
  getTags(id: number): Promise<Tag[]>;
  getContacts(id: number): Promise<Contact[]>;
  getAssignedUsers(id: number): Promise<User[]>;
}