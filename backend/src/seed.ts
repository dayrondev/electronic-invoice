import {
  CompanyType,
  InvoiceStatus,
  PrismaClient,
  Role,
  UserStatus,
} from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing tables...');
  await prisma.invoiceItem.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.product.deleteMany();
  await prisma.customerRelation.deleteMany();
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();

  console.log('Inserting test data...');
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
  const user = await prisma.user.create({
    data: {
      email: 'pepe@mail.com',
      name: 'Pepe',
      password: hashedPassword,
      role: Role.USER,
      status: UserStatus.ACTIVE,
    },
  });

  // Create companies
  const [company1, company2] = await Promise.all([
    prisma.company.create({
      data: {
        nif: 'A12345678',
        name: 'Company 1',
        address: '123 Street, City, Country',
        companyType: CompanyType.INDIVIDUAL,
        userId: user.id,
      },
    }),
    prisma.company.create({
      data: {
        nif: 'B87654321',
        name: 'Company 2',
        address: '456 Avenue, City, Country',
        companyType: CompanyType.LEGAL,
        userId: user.id,
      },
    }),
  ]);

  // Create products for both companies
  for (let i = 1; i <= 50; i++) {
    await prisma.product.create({
      data: {
        name: `Product ${i} for Company 1`,
        description: `Description of Product ${i} for Company 1`,
        priceInCents: 1000 * i,
        companyId: company1.id,
      },
    });

    await prisma.product.create({
      data: {
        name: `Product ${i} for Company 2`,
        description: `Description of Product ${i} for Company 2`,
        priceInCents: 1000 * i,
        companyId: company2.id,
      },
    });
  }

  // Create customer relations
  await prisma.customerRelation.create({
    data: {
      companyId: company1.id,
      customerId: company2.id,
    },
  });

  // Create 25 invoices for each company
  for (let j = 1; j <= 25; j++) {
    // Create an invoice for Company 1
    const invoice1 = await prisma.invoice.create({
      data: {
        number: `INV-001-${j}`,
        issueDate: new Date(),
        dueDate: new Date(),
        totalAmountInCents: 50000 + j * 1000, // Variation in the total invoice amount
        status: InvoiceStatus.DRAFT,
        issuerId: company1.id,
        receiverId: company2.id,
      },
    });

    // Create invoice items for Company 1
    const products1 = await prisma.product.findMany({
      where: { companyId: company1.id },
      take: 5, // Select 5 random products
    });

    for (const product of products1) {
      await prisma.invoiceItem.create({
        data: {
          invoiceId: invoice1.id,
          productId: product.id,
          quantity: 1,
          unitPriceInCents: product.priceInCents,
        },
      });
    }

    // Create an invoice for Company 2
    const invoice2 = await prisma.invoice.create({
      data: {
        number: `INV-002-${j}`,
        issueDate: new Date(),
        dueDate: new Date(),
        totalAmountInCents: 50000 + j * 1000, // Variation in the total invoice amount
        status: InvoiceStatus.DRAFT,
        issuerId: company2.id,
        receiverId: company1.id,
      },
    });

    // Create invoice items for Company 2
    const products2 = await prisma.product.findMany({
      where: { companyId: company2.id },
      take: 5, // Select 5 random products
    });

    for (const product of products2) {
      await prisma.invoiceItem.create({
        data: {
          invoiceId: invoice2.id,
          productId: product.id,
          quantity: 1,
          unitPriceInCents: product.priceInCents,
        },
      });
    }
  }

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
