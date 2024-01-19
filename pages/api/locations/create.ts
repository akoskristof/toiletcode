import {prisma} from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next';
import {Prisma} from "@prisma/client";
import {useSession} from "next-auth/react";
import {getToken} from "next-auth/jwt";
import {getServerSession} from "next-auth";
import { auth } from "../auth/auth";


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        let errors = [];
        const {lat, lng, name} = req.body;
        const  session = await auth(req,res)

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
                console.log('create');
                
                const createdLocation = await prisma.location.create({
                    data: {
                        lat: lat,
                        lng: lng,
                        name: name,
                        userId: session?.user.id
                    }
                });
                console.log(createdLocation);
                return res.status(201).json(createdLocation);
            }
        } catch(e: any) {
            console.log(e);
            
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