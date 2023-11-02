import {prisma} from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const posts = await prisma.post.findMany();
        return res.json(posts)
    } else {
        return res.status(405);
    }
}