export type User = {
  id: string;
  name: string;
  email?: string;
  role: Role;
};

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}
