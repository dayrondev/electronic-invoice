import { PrismaClient, Role, UserStatus } from '@prisma/client';
import { hash } from 'argon2';
import { countries } from './data/country.data';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing tables...');
  await prisma.business.deleteMany();
  await prisma.address.deleteMany();
  await prisma.country.deleteMany();
  await prisma.user.deleteMany();

  console.log('Inserting test data...');

  await prisma.country.createMany({
    data: countries.map((country) => ({
      name: country.name,
      iso2: country.iso2,
      iso3: country.iso3,
    })),
    skipDuplicates: true,
  });

  const hashedPasswordAdmin = await hash('Admin*123');
  await prisma.user.create({
    data: {
      email: 'admin@mail.com',
      name: 'Admin',
      password: hashedPasswordAdmin,
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
    },
  });

  const hashedPassword = await hash('Pepe*123');
  await prisma.user.create({
    data: {
      email: 'pepe@mail.com',
      name: 'Pepe',
      password: hashedPassword,
      role: Role.USER,
      status: UserStatus.ACTIVE,
    },
  });

  console.log('Test data inserted successfully');
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
