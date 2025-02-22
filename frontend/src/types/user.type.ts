export type User = {
  id: string;
  name: string;
  email: string;
  hasBusiness: boolean;
  role: Role;
};

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}
