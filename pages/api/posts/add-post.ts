import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '@/lib/prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const session = await getServerSession(req, res, authOptions);
        if (!session?.user?.email)
            return res.status(403).json({ message: 'Please sign in to create posts.' });

        const prismaUser = await prisma.user.findUnique({
            where: { email: session.user.email },
        });
        if (!prismaUser?.email) return res.status(404).json({ message: 'No user found.' });

        const content: string = req.body.content;
        if (content?.length > 300)
            return res.status(400).json({ message: 'Please write a shorter post' });
        if (!content?.length)
            return res.status(400).json({ message: 'Please do not leave post empty' });

        try {
            const result = await prisma.post.create({
                data: { content, userId: prismaUser.id },
            });

            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            return res.status(403).json({ message: 'Error has occured while creating the post.' });
        }
    }
}
