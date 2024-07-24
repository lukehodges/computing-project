import { Client } from "../entities/Client"
import { Contact } from "../entities/Contact"

export interface IContactFindOptions {
    id?: number| null,
    firstName?: string| null,
    lastName?: string| null,
    email?: string| null,
    phoneNumber?: string| null,
    address?: string| null,
    city?: string| null,
    country?: string| null,
    jobTitle?: string | null,
    company?: string | null,
    notes: string | null
    clientId?: string | null
}
export interface IContactRepository {
    findbyID(id: number):Promise<Contact | null>
    findAll(): Promise<Contact[]>
    findByParameters(data:IContactFindOptions): Promise<Contact[] | null>
    create(contact: Contact): Promise<Contact>
    update(contact: Contact): Promise<Contact>
    delete(id: number): Promise<void>
    getClient(id: number): Promise<Client | null>
}