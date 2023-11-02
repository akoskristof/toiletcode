import {prisma} from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const locations = await prisma.location.findMany();
        return res.json(locations)
    } else {
        return res.status(405);
    }
}