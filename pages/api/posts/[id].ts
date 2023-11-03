import {prisma} from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const id = String(req.query.id);
        const post = await prisma.post.findUnique({
            where: {
                id: id
            }
        });
        return res.json(post)
    } else {
        return res.status(405).json({error: "This request only supports GET requests"})
    }
}