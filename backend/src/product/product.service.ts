import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

type PaginatedByCompanyParam = {
  companyId: string;
  page: number;
  pageSize: number;
};

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getByCompany(companyId: string) {
    return this.prisma.product.findMany({
      where: { companyId },
    });
  }

  async getPaginatedByCompany({
    companyId,
    page,
    pageSize,
  }: PaginatedByCompanyParam) {
    const skip = (page - 1) * pageSize;
    const [products, total] = await Promise.all([
      await this.prisma.product.findMany({
        where: { companyId },
        skip,
        take: pageSize,
      }),
      this.prisma.product.count({
        where: { companyId },
      }),
    ]);
    return {
      data: products,
      meta: {
        currentPage: page,
        totalPages: Math.ceil(total / pageSize),
        totalItems: total,
      },
    };
  }
}
