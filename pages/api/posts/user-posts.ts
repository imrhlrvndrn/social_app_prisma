import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '@/lib/prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getServerSession(req, res, authOptions);
        if (!session?.user?.email)
            return res.status(403).json({ message: 'Please sign in to create posts.' });

        // Get authenticated user's posts
        try {
            const result = await prisma.user.findUnique({
                where: { email: session.user.email },
                include: {
                    posts: {
                        orderBy: { createdAt: 'desc' },
                        include: { comments: true, user: true },
                    },
                },
            });

            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            return res
                .status(403)
                .json({ message: 'Error has occured while fetching your posts.' });
        }
    }
}
