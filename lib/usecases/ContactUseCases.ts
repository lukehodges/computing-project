import { Contact } from "../entities/Contact";
import { IContactRepository } from "../repositories/IContactRepository";

export class ContactUseCases {
    constructor (private contactRepository: IContactRepository) {}
    async createContact(contact: Contact): Promise<Contact> {
        // Business logic validation, calculations, etc.
        return this.contactRepository.create(contact);
    }
    async updateContact(contact: Contact): Promise<Contact> {
        // Business logic for updating a contact
        return this.contactRepository.update(contact);
    }
    async deleteContact(id: number): Promise<void> {
        // Business logic for deleting a contact
        return this.contactRepository.delete(id);
    }
}