import { PrismaClient } from '@prisma/client';

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV === 'production') globalThis.prisma = client;
// use `prisma` in your application to read and write data in your DB

export default client;
