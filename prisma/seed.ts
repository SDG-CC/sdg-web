import {PrismaClient} from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const password = await hash(process.env.PASSWORD as string, 12)
    await prisma.user.upsert({
        where: { 
            email: process.env.EMAIL
        },
        update: {},
        create: {
            email: process.env.EMAIL as string,
            name: process.env.NAME as string,
            password,
            role: 'ADMIN',
            isVerified: true
        }
    })
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) =>{
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })