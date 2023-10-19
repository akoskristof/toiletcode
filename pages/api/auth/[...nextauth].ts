import { NextApiHandler } from 'next';
import NextAuth, {NextAuthOptions} from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from '@/lib/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            id: "credentials",
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password", placeholder: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials.password) {
                    return null
                }
                const userCredentials = {
                    email: credentials.email,
                    password: credentials.password,
                };
                const res = await fetch(
                    `http://localhost:3000/api/user/login`,
                    {
                        method: "POST",
                        body: JSON.stringify(userCredentials),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const user = await res.json();
                if (res.ok && user) {
                    return user;
                } else {
                    return null;
                }

                /*const user = await prisma.user.findUnique({
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
                return null;
                */
            }
        }),
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
    session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },

    pages: {
        /*signIn: "/login",
        signOut: "/login",
        error: "/login",*/
    },

    callbacks: {
        session: ({session, token}) => {
            console.log('Session Callback', {session, token});
            return session
        },
        jwt: ({ token, user }) => {
            console.log('JWT Callback', { token, user });
            return token
        }
    },
};
