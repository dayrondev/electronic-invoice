import { Controller, Get, Request } from '@nestjs/common';
import { BusinessService } from './business.service';
import { RequestWithUser } from 'src/auth/types/request-with-user.interface';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get()
  async getByUser(@Request() req: RequestWithUser) {
    return this.businessService.getByUser(req.user.id);
  }
}
