import { User } from "./user.type";

export type LoginState =
  | {
      ok: boolean;
      user?: User;
      error?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
