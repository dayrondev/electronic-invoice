import { IsOptional, IsString } from 'class-validator';

export class CreateBusinessDto {
  @IsString()
  name: string;

  @IsString()
  taxIdentification: string;

  @IsString()
  @IsOptional()
  personType;

  @IsString()
  residenceType;

  @IsString()
  @IsOptional()
  status;

  @IsString()
  street;

  @IsString()
  postalCode;

  @IsString()
  town;

  @IsString()
  province;

  @IsString()
  countryId;
}
