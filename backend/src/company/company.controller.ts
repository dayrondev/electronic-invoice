import { Controller, Get, Request } from '@nestjs/common';
import { CompanyService } from './company.service';
import { RequestWithUser } from 'src/auth/types/request-with-user.interface';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('get-by-user')
  async getCompaniesByUserId(@Request() req: RequestWithUser) {
    return this.companyService.getCompaniesByUserId(req.user.id);
  }
}
