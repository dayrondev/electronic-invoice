"use server";

import { backendFetch } from "./backend-fetch";

export const getProfile = async () => {
  return await backendFetch("auth/protected");
};
