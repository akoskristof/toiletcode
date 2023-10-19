import { prisma } from '@/lib/prisma';
import { Prisma } from "@prisma/client";
const bcrypt = require('bcrypt');

export default async (req: any, res: any) => {
    if (req.method === "POST") {
        let errors = [];
        const {email, password, name} = req.body;

        if (password.length < 6) {
            errors.push("Password length should be more than 6 characters");
            return res.status(400).json({ errors });
        }

        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (user) {
                errors.push("An account using this email address has already been registered");
                return res.status(400).json({errors});
            } else {
                const hash = await bcrypt.hash(password, 12);
                const createdUser = await prisma.user.create({
                    data: {
                        email: email,
                        password: hash,
                        name: name
                    }
                });
                return res.status(201).json({createdUser});
            }

        }
        catch (e: any) {
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