import {prisma} from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const id = String(req.query.id);
        const {like_dislike, comment, postId, userId} = req.body;
        const updated_reaction = await prisma.reaction.update({
            where: {
                id: id
            },
            data: {
                like_dislike: like_dislike,
                comment: comment || null
            }
        });

        return res.json(updated_reaction)
    }
    else if (req.method === 'PATCH') {
        const id = String(req.query.id);

        const json = await req.body;
        const updated_reaction = await prisma.reaction.update({
            where: {
                id: id
            },
            data: json
        });

        return res.json(updated_reaction)
    } else {
        return res.status(405).json({error: "This request only supports PUT or PATCH requests"})
    }
}