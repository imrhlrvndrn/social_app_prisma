import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '@/lib/prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const session = await getServerSession(req, res, authOptions);
        if (!session?.user?.email)
            return res.status(403).json({ message: 'Please sign in to delete posts.' });

        // Delete a post
        try {
            const result = await prisma.post.delete({
                where: { id: req.body.postId },
            });

            return res.status(200).json(result);
        } catch (error) {
            console.error(error);
            return res.status(403).json({ message: 'Error has occured while deleting the post.' });
        }
    }
}
