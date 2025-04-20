// lib/db.ts
import { PrismaClient } from '@prisma/client';

declare global {
    // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined; // استفاده از var به جای let
}

const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;