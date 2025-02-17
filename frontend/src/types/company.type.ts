export type Company = {
  id: string;
  nif: string;
  name: string;
  address: string;
  companyType: CompanyType;
  status: CompanyStatus;
  userId: string;
};

export enum CompanyType {
  INDIVIDUAL = "INDIVIDUAL",
  LEGAL = "LEGAL",
}

export enum CompanyStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}

export type CompanyProductsPaginatedPayload = {
  companyId: string;
  page: number;
  pageSize: number;
};
