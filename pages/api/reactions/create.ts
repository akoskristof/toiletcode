import {prisma} from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next';
import {Prisma} from "@prisma/client";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        let errors = [];
        const {like_dislike, comment, postId, userId} = req.body;

        try {
            const createdReaction = await prisma.reaction.create({
                data: {
                    like_dislike: like_dislike,
                    comment: comment,
                    postId: postId,
                    userId: userId
                }
            });
            return res.status(201).json({createdReaction});
        } catch(e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === "P2002") {
                    return res.status(400).json({ message: e.message });
                }
                return res.status(400).json({ message: e.message });
            }
        }
    } else {
        return res.status(405).json({error: "This request only supports POST requests"})
    }
}