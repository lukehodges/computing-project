import { Tag } from "./Tag";
import { User } from "./User";

export class Client {
    constructor(
        public id: number,
        public name: string,
        public createdAt: Date
    ){}
}