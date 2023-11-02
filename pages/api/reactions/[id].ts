import {prisma} from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const id = String(req.query.id);
        const reactions = await prisma.reaction.findMany({
            where: {
                postId: id
            }
        });
        return res.json(reactions)
    } else {
        return res.status(405);
    }
}