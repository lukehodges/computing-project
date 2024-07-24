// src/lib/repositories/IOpportunityRepository.ts
import { Client } from "../entities/Client";
import { Contact } from "../entities/Contact";
import { Opportunity } from "../entities/Opportunity";

export interface IOpportunityFindOptions {
    id?: number | null,
    name?: string | null,
    description?: string | null,
    stage?: string | null,
    probability?: number | null,
    amount?: number | null,
    closeDate?: Date | null,
    contactId?: number | null,
    clientId?: number | null,
  }
export interface IOpportunityRepository {
  findById(id: number): Promise<Opportunity | null>;
  findAll(): Promise<Opportunity[]>;
  findByParameters(data: IOpportunityFindOptions): Promise<Opportunity[] | null>;
  create(opportunity: Opportunity): Promise<Opportunity>;
  update(opportunity: Opportunity): Promise<Opportunity>;
  delete(id: number): Promise<void>;
  getContact(id: number): Promise<Contact | null>;
  getClient(id: number): Promise<Client | null>;
}