import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';
import { ScraperService } from './scraper.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, PrismaService, ProductService, ScraperService],
})
export class CompanyModule {}
