import {prisma} from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const postId = String(req.query.id);
    if (req.method === 'DELETE') {
        const post = await prisma.post.delete({
            where: { id: postId },
        });
        res.json(post);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route`,
        );
    }
}