import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getByCompany(companyId: string) {
    return this.prisma.product.findMany({
      where: { companyId },
    });
  }
}
