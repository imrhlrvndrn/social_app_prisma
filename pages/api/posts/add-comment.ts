import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '@/lib/prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const session = await getServerSession(req, res, authOptions);
        if (!session?.user?.email)
            return res.status(403).json({ message: 'Please sign in to add comments.' });

        const prismaUser = await prisma.user.findUnique({
            where: { email: session.user.email },
        });
        if (!prismaUser?.email) return res.status(404).json({ message: 'No user found.' });

        const content: string = req.body.content;
        if (!content?.length)
            return res.status(400).json({ message: 'Please do not leave comment empty' });

        try {
            const result = await prisma.comment.create({
                data: { content, userId: prismaUser.id, postId: req.body.postId },
            });

            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            return res.status(403).json({ message: 'Error has occured while adding the comment.' });
        }
    }
}
