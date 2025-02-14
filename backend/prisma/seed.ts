import { PrismaClient, Role } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { hash } from 'argon2';

const prisma = new PrismaClient();

interface UserData {
  name: string;
  email: string;
  password: string;
  role: Role;
}

async function main() {
  console.log('Clearing the users table...');
  await prisma.user.deleteMany();

  console.log('Loading data from the JSON file...');
  const userData: UserData[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data', 'user.json'), 'utf-8'),
  ) as UserData[];

  const hashedUserData = await Promise.all(
    userData.map(async (item) => {
      const { password, ...user } = item;
      const hashedPassword = await hash(password);
      return {
        password: hashedPassword,
        ...user,
      };
    }),
  );
  console.log('Inserting initial data...');
  await prisma.user.createMany({
    data: hashedUserData,
  });

  console.log('Initial data inserted.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma
      .$disconnect()
      .catch((e) => console.error('Error during disconnect:', e));
  });
