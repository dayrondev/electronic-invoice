import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UploadService } from 'src/upload/upload.service';
import { CLOUDINARY_LOGO_FOLDER } from 'src/auth/config/constants';

@Injectable()
export class BusinessService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async create(
    createBusinessDto: CreateBusinessDto,
    userId: string,
    file?: Express.Multer.File,
  ) {
    const { street, postalCode, town, province, countryId, ...businessData } =
      createBusinessDto;
    let logoUrl = '';
    if (file) {
      const uploadResponse = await this.uploadService.uploadFile(
        file,
        CLOUDINARY_LOGO_FOLDER,
      );
      logoUrl = uploadResponse.secure_url as string;
    }
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
          logo: logoUrl,
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
