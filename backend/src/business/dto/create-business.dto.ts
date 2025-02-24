import { ResidenceType } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreateBusinessDto {
  @IsString()
  name: string;

  @IsString()
  taxIdentification: string;

  @IsEnum(ResidenceType)
  residenceType: ResidenceType;

  @IsString()
  street: string;

  @IsString()
  postalCode: string;

  @IsString()
  town: string;

  @IsString()
  province: string;

  @IsString()
  countryId: string;
}
