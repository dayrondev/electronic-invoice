import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class CompanyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductService,
  ) {}

  async getByUser(userId: string) {
    return await this.prisma.company.findMany({
      where: { userId },
    });
  }

  async getProducts(companyId: string, userId: string) {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId, userId },
    });
    if (!company) throw new NotFoundException('Company not found.');

    return await this.productService.getByCompany(companyId);
  }
}
