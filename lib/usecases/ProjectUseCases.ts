import { Project } from "../entities/Project";
import { Tag } from "../entities/Tag";
import { Task } from "../entities/Tasks";
import { IProjectRepository } from "../repositories/IProjectRepository";

export class ProjectUseCases {
    constructor(private projectRepository: IProjectRepository) {}
    async createProject(project: Project): Promise<Project> {
        // Business logic validation, calculations, etc.
        return this.projectRepository.create(project);
    }
    async updateProject(project: Project): Promise<Project> {
        // Business logic for updating a project
        return this.projectRepository.update(project);
    }
    async deleteProject(id: number): Promise<void> {
        // Business logic for deleting a project
        return this.projectRepository.delete(id);
    }
    async getProjectById(id: number): Promise<Project | null> {
        return this.projectRepository.findById(id);
    }
    async listProjects(): Promise<Project[]> {
        return this.projectRepository.findAll();
    }
    async getTasks(id: number): Promise<Task[]> {
        return this.projectRepository.getTasks(id);
    }
    serializeProject(project: Project) {
        return JSON.parse(JSON.stringify(project));
    }
    async getTags(id:number):Promise<Tag[]>{
        return this.projectRepository.getTags(id);
    }
}