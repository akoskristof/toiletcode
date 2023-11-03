import {prisma} from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const locationId = String(req.query.id);
    if (req.method === 'DELETE') {
        const location = await prisma.location.delete({
            where: { id: locationId },
        });
        res.json(location);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route`,
        );
    }
}