import {prisma} from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next';
import {Prisma} from "@prisma/client";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        let errors = [];
        const {message, code, userId, locationId} = req.body;

        try {
            const post = await prisma.post.findFirst({
                where: {
                    locationId: locationId
                }
            });

            if (post) {
                errors.push("A post with this location has already been registered");
                return res.status(400).json({errors});
            } else {
                const createdPost = await prisma.post.create({
                    data: {
                        message: message,
                        code: code,
                        userId: userId,
                        locationId: locationId
                    }
                });
                return res.status(201).json({createdPost});
            }

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