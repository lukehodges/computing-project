import { Tag } from "../entities/Tag";
import { Task } from "../entities/Tasks";

export interface ITagRepository {
    findById(id: number): Promise<Tag | null>;
    findAll(): Promise<Tag[]>;
    create(tag: Tag): Promise<Tag>;
    update(tag: Tag): Promise<Tag>;
    delete(id: number): Promise<void>;
    getTasks(id: number): Promise<Task[]>;
}