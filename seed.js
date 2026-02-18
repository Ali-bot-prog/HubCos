
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const username = 'HubCos';
  const passwordHash = '$2b$10$FQetI6OD499PYQTZae6OO.oFz/u.pX.FYqEudZ4kpHuD5tFyxd1zC';

  const existing = await prisma.admin.findUnique({
    where: { username },
  });

  if (!existing) {
    await prisma.admin.create({
      data: {
        username,
        password: passwordHash,
      },
    });
    console.log(`Created admin user: ${username}`);
  } else {
    console.log(`Admin user ${username} already exists.`);
  }
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
