// prisma/seed.ts

import { PrismaClient, TaskStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  await prisma.activityLog.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.project.deleteMany({})
  await prisma.task.deleteMany({})
  await prisma.comment.deleteMany({})
  await prisma.timeEntry.deleteMany({})
  await prisma.tag.deleteMany({})
  await prisma.notification.deleteMany({})
  await prisma.organization.deleteMany({})
  // Seed Users
  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        birthday: faker.date.past(),
        gender: faker.name.gender(),
      },
    });
    users.push(user);
  }

  // Create an Organization
  let orgname = faker.company.name()
  const organization = await prisma.organization.create({
    data: {
      id: faker.datatype.uuid(),
      identifier: orgname.slice(0,4),
      name: orgname,
      legalName: orgname+ " Inc.",
      image: faker.image.business(),
      users: {
        connect: users.map(user => ({ id: user.id })),
      },
    },
  });

  // Seed Clients
  const clients = [];
  for (let i = 0; i < 5; i++) {
    const client = await prisma.client.create({
      data: {
        name: faker.company.name(),
        assigned: {
          connect: faker.helpers.arrayElements(users,faker.number.int({min:0,max:4})).map(user => ({ id: user.id })),
        },
      },
    });
    clients.push(client);
  }

  // Seed Projects
  const projects = [];
  for (let i = 0; i < 5; i++) {
    const project = await prisma.project.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.lorem.sentences(3),
        owner: {
          connect: { id: faker.helpers.arrayElement(users).id },
        },
        organization: {
          connect: { id: organization.id },
        },
      },
    });
    projects.push(project);
  }

  // Seed Tasks
  const tasks = [];
  for (let i = 0; i < 20; i++) {
    const task = await prisma.task.create({
      data: {
        title: faker.hacker.verb(),
        description: faker.lorem.sentence(),
        project: {
          connect: { id: projects[Math.floor(Math.random() * projects.length)].id },
        },
        assignees: {
          connect: faker.helpers.arrayElements(users,faker.number.int({min:0,max:4})).map(user => ({ id: user.id })),
        },
        status: faker.helpers.arrayElement([TaskStatus.TODO,TaskStatus.IN_PROGRESS, TaskStatus.DONE, TaskStatus.CANCELED, TaskStatus.BACKLOG]),
        priority:faker.number.int({min:0,max:5})
      },
    });
    tasks.push(task);
  }

  // Seed Comments
  for (let i = 0; i < 50; i++) {
    await prisma.comment.create({
      data: {
        content: faker.lorem.sentence(),
        author: {
          connect: { id: users[Math.floor(Math.random() * users.length)].id },
        },
        task: {
          connect: { id: tasks[Math.floor(Math.random() * tasks.length)].id },
        },
      },
    });
  }

  // Seed Invoices
  for (let i = 0; i < 5; i++) {
    await prisma.invoice.create({
      data: {
        client: {
          connect: { id: clients[Math.floor(Math.random() * clients.length)].id },
        },
        amount: parseFloat(faker.commerce.price()),
        status: "PENDING",
        issuedAt: faker.date.recent(),
        dueDate: faker.date.future(),
      },
    });
  }

  // Seed Activity Logs
  for (let i = 0; i < 50; i++) {
    await prisma.activityLog.create({
      data: {
        userId: users[Math.floor(Math.random() * users.length)].id,
        action: faker.hacker.verb(),
        details: faker.hacker.phrase(),
      },
    });
  }

  console.log('Database has been seeded. 🌱');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
