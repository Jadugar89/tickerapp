import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const tikets: Prisma.TicketCreateInput[] = [
  {
    title: "Add Permission",
    description: "test",
    category: "Software Problem",
    progress: 50,
    priority: "5",
    status: "started",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of tikets) {
    const tiket = await prisma.ticket.create({
      data: u,
    });
    console.log(`Created user with id: ${tiket.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
