import { PrismaClient, TaskStatus } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function createUsers() {
    const userIds = [];
    for (let i = 0; i < 10; i++) {
        const user = await prisma.user.create({
            data: {
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
                tfaEnabled: faker.number.int() % 1 === 0
            }
        });
        userIds.push(user.id);
    }
    return userIds;
}

async function createTasks(userIds: readonly (string | undefined)[]) {
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
                assignee: { connect: { id: faker.helpers.arrayElement(userIds) } }
            }
        });
    }
}



async function createContacts() {
    for (let i = 0; i < 10; i++) {
        await prisma.contact.create({
            data: {
                // Adjust fields as necessary
            }
        });
    }
}

async function createCompanies(userIds: readonly string[]) {
    for (let i = 0; i < 10; i++) {
        await prisma.company.create({
            data: {
                name: faker.company.name(),
                createdAt: faker.date.past(),
            }
        });
    }
}

async function createClients() {
    for (let i = 0; i < 10; i++) {
        await prisma.client.create({
            data: {
                name: faker.company.name(),
                createdAt: faker.date.past()
            }
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
                image: faker.image.imageUrl()
            }
        });
    }
}

async function createProjects(userIds: readonly string[]) {
    for (let i = 0; i < 10; i++) {
        await prisma.project.create({
            data: {
                name: faker.company.name(),
                description: faker.lorem.sentence(),
                ownerId: faker.helpers.arrayElement(userIds),
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent()
            }
        });
    }
}

async function createComments(userIds: readonly string[]) {
    for (let i = 0; i < 100; i++) {
        await prisma.comment.create({
            data: {
                content: faker.lorem.sentence(),
                taskId: faker.number.int({ min: 1, max: 100 }),
                authorId: faker.helpers.arrayElement(userIds),
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent()
            }
        });
    }
}

async function createTimeEntries(userIds: readonly string[]) {
    for (let i = 0; i < 100; i++) {
        await prisma.timeEntry.create({
            data: {
                userId: faker.helpers.arrayElement(userIds),
                taskId: faker.number.int({ min: 1, max: 100 }),
                projectId: faker.number.int({ min: 1, max: 10 }),
                date: faker.date.past(),
                hours: faker.number.float({ min: 1, max: 8 }),
                description: faker.lorem.sentence(),
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent()
            }
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

    const userIds = await createUsers();

    await createTasks(userIds);
    await createContacts();
    await createCompanies(userIds);
    await createClients();
    await createOrganizations();
    await createProjects(userIds);
    await createComments(userIds);
    await createTimeEntries(userIds);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
