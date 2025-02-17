import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { RequestWithUser } from 'src/auth/types/request-with-user.interface';
import { PaginationQueryDto } from 'src/dto/pagination-query.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async getByUser(@Request() req: RequestWithUser) {
    return this.companyService.getByUser(req.user.id);
  }

  @Get(':id/products/all')
  async getAllProducts(
    @Param('id') companyId: string,
    @Request() req: RequestWithUser,
  ) {
    return this.companyService.getProducts(companyId, req.user.id);
  }

  @Get(':id/products')
  async getProducts(
    @Param('id') companyId: string,
    @Query(new ValidationPipe({ transform: true }))
    paginationQuery: PaginationQueryDto,
    @Request() req: RequestWithUser,
  ) {
    const { page, pageSize } = paginationQuery;
    return this.companyService.getProductsPaginated({
      companyId,
      userId: req.user.id,
      page,
      pageSize,
    });
  }
}
