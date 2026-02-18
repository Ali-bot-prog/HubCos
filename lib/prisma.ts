
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

let prismaInstance: PrismaClient | undefined;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { PrismaClient: PC } = require('@prisma/client');
  prismaInstance = globalForPrisma.prisma || new PC({ log: ['query'] });
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance;
} catch (e) {
  console.warn("Prisma client not initialized. Database features will be disabled.");
}

export const prisma = prismaInstance;

