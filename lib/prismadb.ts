import { PrismaClient } from "@/lib/generated/prisma";

// On évite de recréer PrismaClient à chaque hot reload en dev

declare global {
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;
