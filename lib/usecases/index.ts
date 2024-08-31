import { PrismaNotificationRepository } from "../repositories/PrismaNotificationRepository";
import { PrismaProjectRepository } from "../repositories/PrismaProjectRepository";
import { PrismaTaskRepository } from "../repositories/PrismaTaskRepository";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { NotificationUseCases } from "./NotificationUseCases";
import { ProjectUseCases } from "./ProjectUseCases";
import { TagUseCases } from "./TagsUseCases";
import { TaskUseCases } from "./TaskUseCases";
import { UserUseCases } from "./UserUseCases";
let _NotificationUseCases = new NotificationUseCases(
  new PrismaNotificationRepository()
);
let _TaskUseCases = new TaskUseCases(new PrismaTaskRepository());
let _ProjectUseCases = new ProjectUseCases(new PrismaProjectRepository());
let _TagUseCases = new TagUseCases();
let _UserUseCases = new UserUseCases(new PrismaUserRepository());
export {
  _NotificationUseCases as NotificationUseCases,
  _TaskUseCases as TaskUseCases,
  _ProjectUseCases as ProjectUseCases,
  _TagUseCases as TagUseCases,
  _UserUseCases as UserUseCases
};
