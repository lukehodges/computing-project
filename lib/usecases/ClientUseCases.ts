// src/use-cases/ClientUseCases.ts
import { Client } from '../entities/Client';
import { Contact } from '../entities/Contact';
// import { Document } from '../entities/Document';
// import { Invoice } from '../entities/Invoice';
import { Opportunity } from '../entities/Opportunity';
import { Tag } from '../entities/Tag';
import { User } from '../entities/User';
import { IClientFindOptions, IClientRepository } from '../repositories/IClientRepository';

export class ClientUseCases {
  constructor(private clientRepository: IClientRepository) {}

  async findClientsByInformation(data: IClientFindOptions) {
    return this.clientRepository.findByParameters(data);
  }

  async createClient(client: Client): Promise<Client> {
    // Business logic validation, calculations, etc.
    return this.clientRepository.create(client);
  }

  async updateClient(client: Client): Promise<Client> {
    // Business logic for updating a client
    return this.clientRepository.update(client);
  }

  async deleteClient(id: number): Promise<void> {
    // Business logic for deleting a client
    return this.clientRepository.delete(id);
  }

  async getClientById(id: number): Promise<Client | null> {
    return this.clientRepository.findById(id);
  }

  listClients(): Promise<Client[]> {
    return this.clientRepository.findAll();
  }

  // async getDocuments(id: number): Promise<Document[]> {
  //   return this.clientRepository.getDocuments(id);
  // }

  // async getInvoices(id: number): Promise<Invoice[]> {
  //   return this.clientRepository.getInvoices(id);
  // }

  async getOpportunities(id: number): Promise<Opportunity[]> {
    return this.clientRepository.getOpportunities(id);
  }

  async getTags(id: number): Promise<Tag[]> {
    return this.clientRepository.getTags(id);
  }

  async getContacts(id: number): Promise<Contact[]> {
    return this.clientRepository.getContacts(id);
  }

  async getAssignedUsers(id: number): Promise<User[]> {
    return this.clientRepository.getAssignedUsers(id);
  }

  serializeClient(client: Client): any {
    return JSON.parse(JSON.stringify(client));
  }
}