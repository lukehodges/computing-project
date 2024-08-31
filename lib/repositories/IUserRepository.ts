import { Task } from "../entities/Tasks";
import { User } from "../entities/User";

export interface IUserRepository {
    getbyID(id: number): Promise<User>;
    getAll(): Promise<User[]>;
    create(user: User): Promise<User>;
}