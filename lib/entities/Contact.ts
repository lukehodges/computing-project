// src/lib/entities/Contact.ts
export class Contact {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public phoneNumber: string,
        public address: string,
        public city: string,
        public country: string,
        public jobTitle: string,
        public company: string,
        public notes: string,
        public clientId:number | null,
    ){}
  }