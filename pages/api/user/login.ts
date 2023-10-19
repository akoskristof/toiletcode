import { prisma } from '@/lib/prisma';
import { compare } from 'bcrypt';

export default async function handle(req: any, res: any) {
    if (req.method === "POST") {
        await loginUserHandler(req, res);
    } else {
        return res.status(405);
    }
}
async function loginUserHandler(req: any, res: any) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Invalid inputs"});
    }
    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
            },
        });

        if (user && await compare(password, user.password)) {
            return res.status(200).json(exclude(user, ["password"]));
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (e: any) {
        throw new Error(e);
    }
}

function exclude(user: any, keys: any) {
    for (let key of keys) {
        delete user[key];
    }
    return user;
}