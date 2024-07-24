import { Project } from "../entities/Project";
import { Tag } from "../entities/Tag";
import { Task } from "../entities/Tasks";

export interface IProjectRepository {
    findById(id: number): Promise<Project | null>;
    findAll(): Promise<Project[]>;
    create(project: Project): Promise<Project>;
    update(project: Project): Promise<Project>;
    delete(id: number): Promise<void>;
    getTasks(id: number): Promise<Task[]>;
    getTags(id:number):Promise<Tag[]>
}