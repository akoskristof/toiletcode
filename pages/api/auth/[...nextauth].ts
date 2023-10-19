import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from '@/lib/prisma';
import { compare } from 'bcrypt';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email" },
                password: { label: "Password", type: "password", placeholder: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials.password) {
                    return null
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (user) {
                    const passwordCorrect = await compare(credentials?.password, user.password);
                    if(passwordCorrect) {
                        return {
                            id: user.id,
                            email: user.email,
                        };
                    }
                }

                return null
            }
        }),
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
};