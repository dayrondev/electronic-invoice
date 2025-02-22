import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';

@Module({
  controllers: [BusinessController],
  providers: [BusinessService, PrismaService, ProductService],
})
export class BusinessModule {}
