import {
  EntityType,
  NotificationType,
  PrismaClient,
  TaskStatus,
} from "@prisma/client";
import { Faker, faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function createUsers() {
  const userIds = [];
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        id:i,
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        passwordEnabled: false,
        emailVerified: true,
        image: faker.image.avatar(),
        createdAt: faker.date.past(),
        lastLoginAt: faker.date.recent(),
        username: faker.internet.userName(),
        birthday: faker.date.birthdate(),
        gender: faker.person.sex(),
        tfaEnabled: faker.number.int() % 1 === 0,
      },
    });
    userIds.push(user.id);
  }
  return userIds;
}

async function createTasks(userIds: number[]) {
  for (let i = 0; i < 100; i++) {
    await prisma.task.create({
      data: {
        title: faker.lorem.sentence(),
        description: faker.lorem.sentence(2),
        status: faker.helpers.enumValue(TaskStatus),
        priority: faker.number.int({ min: 1, max: 3 }),
        estimatedHours: faker.number.float({ min: 1, max: 150 }),
        content: faker.lorem.paragraph(),
        dueDate: faker.date.future(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        startDate: faker.date.soon(),
        assignees: {
          connect: faker.helpers
            .arrayElements(userIds, faker.number.int({ min: 1, max: 3 }))
            .map((id) => ({ id })),
        },
      },
    });
  }
}

async function createContacts() {
  for (let i = 0; i < 10; i++) {
    await prisma.contact.create({
      data: {
        // Adjust fields as necessary
      },
    });
  }
}

async function createCompanies(userIds: number[]) {
  for (let i = 0; i < 10; i++) {
    await prisma.company.create({
      data: {
        name: faker.company.name(),
        createdAt: faker.date.past(),
      },
    });
  }
}

async function createClients() {
  for (let i = 0; i < 10; i++) {
    await prisma.client.create({
      data: {
        name: faker.company.name(),
        createdAt: faker.date.past(),
      },
    });
  }
}

async function createOrganizations() {
  for (let i = 0; i < 10; i++) {
    await prisma.organization.create({
      data: {
        id: faker.string.uuid(),
        identifier: faker.random.word(),
        name: faker.company.name(),
        legalName: faker.company.name(),
        image: faker.image.imageUrl(),
      },
    });
  }
}

async function createProjects(userIds: number[]) {
  for (let i = 0; i < 10; i++) {
    await prisma.project.create({
      data: {
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        ownerId: faker.helpers.arrayElement(userIds),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        iconID: faker.number.int({ min: 1, max: 10 }),
      },
    });
  }
}

async function createComments(userIds: number[]) {
  let tasks = await prisma.task.findMany({});
  for (let i = 0; i < 100; i++) {
    await prisma.comment.create({
      data: {
        content: faker.lorem.sentence(),
        taskId: faker.helpers.arrayElement(tasks).id,
        authorId: faker.helpers.arrayElement(userIds),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    });
  }
}

async function createTimeEntries(userIds: number[]) {
  let tasks = await prisma.task.findMany({});
  let project = await prisma.project.findMany({});
  for (let i = 0; i < 100; i++) {
    await prisma.timeEntry.create({
      data: {
        userId: faker.helpers.arrayElement(userIds),
        taskId: faker.helpers.arrayElement(tasks).id,
        projectId: faker.helpers.arrayElement(project).id,
        date: faker.date.past(),
        hours: faker.number.float({ min: 1, max: 8 }),
        description: faker.lorem.sentence(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    });
  }
}
async function createTags() {
  let clients = await prisma.client.findMany({});
  let projects = await prisma.project.findMany({});
  let tasks = await prisma.task.findMany({});
  for (let i = 0; i < 10; i++) {
    await prisma.tag.create({
      data: {
        name: faker.word.words(2),
        color: faker.internet.color(),
        tasks: {
          connect: faker.helpers
            .arrayElements(tasks, faker.number.int({ min: 5, max: 40 }))
            .map((task) => ({ id: task.id })),
        },
        projects: {
          connect: faker.helpers
            .arrayElements(projects, 3)
            .map((project) => ({ id: project.id })),
        },
        clients: {
          connect: faker.helpers
            .arrayElements(clients, 3)
            .map((client) => ({ id: client.id })),
        },
      },
    });
  }
}
async function createNotifications() {
  let users = await prisma.user.findMany({});
  let tasks = await prisma.task.findMany({});
  for (let i = 0; i < 10; i++) {
    await prisma.notification.create({
      data: {
        message: faker.lorem.sentence(),
        read: false,
        user: {connect:{id:faker.helpers.arrayElement(users).id}},
        type: faker.helpers.arrayElement([NotificationType.TASK_ASSIGN, NotificationType.TASK_CREATE]),
        entityId: faker.helpers.arrayElement(tasks).id,
        entityType: EntityType.Task,
        createdAt:faker.date.between(faker.date.recent(), new Date())
      },
    });
  }
}
async function main() {
  await prisma.user.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.contact.deleteMany({});
  await prisma.company.deleteMany({});
  await prisma.client.deleteMany({});
  await prisma.organization.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.comment.deleteMany({});
  await prisma.timeEntry.deleteMany({});
  await prisma.tag.deleteMany({});
  const userIds = await createUsers();

  await createTasks(userIds);
  await createContacts();
  await createCompanies(userIds);
  await createClients();
  await createOrganizations();
  await createProjects(userIds);
  await createComments(userIds);
  await createTimeEntries(userIds);
  await createTags();
  await createNotifications()
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
