import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../prisma/client';

const adapter = PrismaAdapter(prisma);

export const authOptions = {
    adapter,
    secret: process.env.AUTH_SECRET,
    providers: [
        // You may add multiple providers here
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
};

export default NextAuth(authOptions);
