import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.admin.findMany();
    fs.writeFileSync('output.json', JSON.stringify({ success: true, data: users }, null, 2));
  } catch (e: any) {
    fs.writeFileSync('output.json', JSON.stringify({ success: false, error: e.message }, null, 2));
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
