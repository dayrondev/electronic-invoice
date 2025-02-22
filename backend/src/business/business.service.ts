import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BusinessService {
  constructor(private readonly prisma: PrismaService) {}

  async getByUser(userId: string) {
    return await this.prisma.business.findMany({
      where: { userId },
    });
  }
}
