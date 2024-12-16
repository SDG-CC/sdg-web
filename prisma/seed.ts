import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.admin.upsert({
        where: { 
            email: 'sdgcampusclub.nitrkl@gmail.com'
        },
        update: {},
        create: {
            email: 'sdgcampusclub.nitrkl@gmail.com',
            name: 'SDG-CC Admin',
            password: `SDGCC2030`
        }
    })
    console.log({user})
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) =>{
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })