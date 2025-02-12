import { User } from "./user.type";

export type Session = {
  user: User;
  accessToken: string;
  refreshToken: string;
};
