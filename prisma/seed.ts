import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const alice = await prisma.user.upsert({
        where: { email: 'alice@prisma.io' },
        update: {},
        create: {
            email: 'alice@prisma.io',
            name: 'Alice',
            username: 'alice',
            password: '$2a$12$WlDxCd9M0XDJj/xpHXzl/eea4YLpy43q0eceEQqjaWEFrOZjaqCeW',
            role: "BASIC",
            // posts: {
            //     create: {
            //         title: 'Check out Prisma with Next.js',
            //         content: 'https://www.prisma.io/nextjs',
            //         published: true,
            //     },
            // },
        },
    })
    console.log({ alice })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
