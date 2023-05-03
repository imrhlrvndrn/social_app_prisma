import prisma from '@/lib/prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const postData = await prisma.post.findUnique({
                where: { id: req.query.postId as string },
                include: {
                    user: true,
                    comments: {
                        orderBy: { createdAt: 'desc' },
                        include: { user: true },
                    },
                },
            });

            res.status(200).json(postData);
        } catch (error) {
            res.status(403).json({ message: 'Error has occured while fetching the post.' });
        }
    }
}
