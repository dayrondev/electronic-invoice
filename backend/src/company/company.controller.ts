import { Controller, Get, Param, Request } from '@nestjs/common';
import { CompanyService } from './company.service';
import { RequestWithUser } from 'src/auth/types/request-with-user.interface';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async getByUser(@Request() req: RequestWithUser) {
    return this.companyService.getByUser(req.user.id);
  }

  @Get(':id/products')
  async getProducts(
    @Param('id') companyId: string,
    @Request() req: RequestWithUser,
  ) {
    return this.companyService.getProducts(companyId, req.user.id);
  }
}
