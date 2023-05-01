import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // Fetch every user's posts
        try {
            const result = await prisma.post.findMany({
                include: { user: true, comments: true },
                orderBy: {
                    createdAt: 'desc',
                },
            });

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            return res.status(403).json({ message: 'Error fetching posts.' });
        }
    }
}
