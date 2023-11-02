import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

async function main() {
    const alice = await prisma.user.upsert({
        where: { email: 'alice@prisma.io' },
        update: {},
        create: {
            email: 'alice@prisma.io',
            name: 'alice',
            password: '$2a$12$WlDxCd9M0XDJj/xpHXzl/eea4YLpy43q0eceEQqjaWEFrOZjaqCeW',
            role: "BASIC",
            posts: {
                create: {
                    message: 'test ¯_(ツ)_/¯',
                    location: {create: {name: 'örs kfc', lat: 12.5, lng:12.6, userId: '1'}},
                    code: '1234',
                },
            },
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
