import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CountryService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.country.findMany({ orderBy: { name: 'asc' } });
  }
}
