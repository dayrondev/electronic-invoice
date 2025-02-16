import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, PrismaService, ProductService],
})
export class CompanyModule {}
