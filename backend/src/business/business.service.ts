import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBusinessDto } from './dto/create-business.dto';

@Injectable()
export class BusinessService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBusinessDto: CreateBusinessDto, userId: string) {
    const { street, postalCode, town, province, countryId, ...businessData } =
      createBusinessDto;
    return await this.prismaService.$transaction(async (prisma) => {
      const address = await prisma.address.create({
        data: {
          street,
          postalCode,
          town,
          province,
          countryId,
        },
      });
      const business = await prisma.business.create({
        data: {
          ...businessData,
          addressId: address.id,
          userId,
        },
      });
      await prisma.user.update({
        data: { hasBusiness: true },
        where: { id: userId },
      });

      return business;
    });
  }

  async getByUser(userId: string) {
    return await this.prismaService.business.findMany({
      where: { userId },
    });
  }
}
