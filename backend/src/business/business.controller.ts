import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { BusinessService } from './business.service';
import { RequestWithUser } from 'src/auth/types/request-with-user.interface';
import { CreateBusinessDto } from './dto/create-business.dto';
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  create(
    @Body() createBusinessDto: CreateBusinessDto,
    @Request() req: RequestWithUser,
  ) {
    return this.businessService.create(createBusinessDto, req.user.id);
  }

  @Get()
  async getByUser(@Request() req: RequestWithUser) {
    return this.businessService.getByUser(req.user.id);
  }
}
