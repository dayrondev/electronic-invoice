export type BusinessState =
  | {
      ok: boolean;
      error?: {
        name?: string[];
        taxIdentification?: string[];
        residenceType?: string[];
        street?: string[];
        postalCode?: string[];
        town?: string[];
        province?: string[];
        countryId?: string[];
      };
      message?: string;
    }
  | undefined;

export type Business = {
  id: string;
  name: string;
  taxIdentification: string;
  personType: PersonType;
  residenceType: ResidenceType;
  status: BusinessStatus;
  addressId: string;
  userId: string;
};

export enum PersonType {
  F = "F",
  J = "J",
}

export enum ResidenceType {
  E = "E",
  R = "R",
  U = "U",
}

export enum BusinessStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}

export type BusinessProductsPaginatedPayload = {
  businessId: string;
  page: number;
  pageSize: number;
};
