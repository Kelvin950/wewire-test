import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);

  await prisma.user.upsert({
    where: { email: 'test@wewire.com' },
    update: {},
    create: {
      email: 'test@wewire.com',
      passwordHash: password,
    },
  });

  console.log('Test user created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
