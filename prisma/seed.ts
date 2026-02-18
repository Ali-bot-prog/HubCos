
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const username = 'HUBYAPI';
  // Hash for 123456
  const passwordHash = '$2b$10$0iqpP8vFJiRjfZeQ76RZOe7zOYN2EVGLu/nniqZetTNk7kKH2hZI2';

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
