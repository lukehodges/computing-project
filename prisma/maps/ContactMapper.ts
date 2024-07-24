// src/frameworks/prisma/ContactMapper.ts
import { Contact } from '@/lib/entities/Contact';
import { Contact as PrismaContactModel } from '@prisma/client';

export const mapPrismaContactToEntity = (prismaContact: PrismaContactModel): Contact => {
  return new Contact(
    prismaContact.id,
    prismaContact.firstName,
    prismaContact.lastName,
    prismaContact.email,
    prismaContact.phoneNumber,
    prismaContact.address,
    prismaContact.city,
    prismaContact.country,
    prismaContact.jobTitle,
    prismaContact.company,
    prismaContact.notes,
    prismaContact.clientId,
  );
};

export const mapEntityToPrismaContact = (contact: Contact): PrismaContactModel => {
  return {
    id: contact.id,
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phoneNumber: contact.phoneNumber,
    address: contact.address,
    city: contact.city,
    country: contact.country,
    jobTitle: contact.jobTitle,
    company: contact.company,
    notes: contact.notes,
    clientId: contact.clientId,
  };
};