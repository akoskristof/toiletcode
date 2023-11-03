import {prisma} from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next';
import {Prisma} from "@prisma/client";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        let errors = [];
        const {lat, lng, name, userId} = req.body;

        try {
            const location = await prisma.location.findFirst({
                where: {
                    lat: lat,
                    lng: lng
                },
            });

            if (location) {
                errors.push("A location with the given coordinates has already been registered");
                return res.status(400).json({errors});
            } else {
                const createdLocation = await prisma.location.create({
                    data: {
                        lat: lat,
                        lng: lng,
                        name: name,
                        userId: userId
                    }
                });
                return res.status(201).json({createdLocation});
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