import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { RequestWithUser } from 'src/auth/types/request-with-user.interface';
import { CreateBusinessDto } from './dto/create-business.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  @UseInterceptors(FileInterceptor('logo'))
  create(
    @Body() createBusinessDto: CreateBusinessDto,
    @Request() req: RequestWithUser,
    @UploadedFile() logo?: Express.Multer.File,
  ) {
    return this.businessService.create(createBusinessDto, req.user.id, logo);
  }

  @Get()
  async getByUser(@Request() req: RequestWithUser) {
    return this.businessService.getByUser(req.user.id);
  }
}
