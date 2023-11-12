import {prisma} from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const id = String(req.query.id);
        const {lat, lng, name} = req.body;
        const updated_location = await prisma.location.update({
            where: {
                id: id
            },
            data: {
                lat: lat,
                lng: lng,
                name: name
            }
        });

        return res.json(updated_location)
    }
    else if (req.method === 'PATCH') {
        const id = String(req.query.id);

        const json = await req.body;
        const updated_location = await prisma.location.update({
            where: {
                id: id
            },
            data: json
        });

        return res.json(updated_location)
    } else {
        return res.status(405).json({error: "This request only supports PUT or PATCH requests"})
    }
}