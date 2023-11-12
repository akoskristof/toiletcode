import {prisma} from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const id = String(req.query.id);
        const {code, message} = req.body;
        const updated_post = await prisma.post.update({
            where: {
                id: id
            },
            data: {
                code: code,
                message: message || null
            }
        });

        return res.json(updated_post)
    }
    else if (req.method === 'PATCH') {
        const id = String(req.query.id);

        const json = await req.body;
        const updated_post = await prisma.post.update({
            where: {
                id: id
            },
            data: json
        });

        return res.json(updated_post)
    } else {
        return res.status(405).json({error: "This request only supports PUT or PATCH requests"})
    }
}