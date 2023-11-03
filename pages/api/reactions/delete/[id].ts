import {prisma} from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const reactionId = String(req.query.id);
    if (req.method === 'DELETE') {
        const reaction = await prisma.reaction.delete({
            where: { id: reactionId },
        });
        res.json(reaction);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route`,
        );
    }
}