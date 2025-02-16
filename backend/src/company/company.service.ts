import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async getCompaniesByUserId(userId: string) {
    return await this.prisma.company.findMany({
      where: { userId },
    });
  }
}
