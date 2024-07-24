import { faker } from "@faker-js/faker"
import prisma from "./lib/db"

const tasks = Array.from({ length: 100 }, () => ({
    title: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
    description : faker.hacker.phrase(),
    priority: faker.number.int({min:1, max:5}),
    estimatedHours: faker.number.float({min:0.1, max:100}),
    content:"yap yap yap ",
    projectId:1,
  }))


prisma.task.createMany({data:tasks})