
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const username = 'HubCos';
  // Hash for the password (using the one from users.json for consistency if possible, or a known default)
  // The hash in users.json is: $2b$10$FQetI6OD499PYQTZae6OO.oFz/u.pX.FYqEudZ4kpHuD5tFyxd1zC
  // This corresponds to a password (unknown to me right now without brute force, but likely the user knows it).
  // Safest bet: Insert the hash directly so their old password works.
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
