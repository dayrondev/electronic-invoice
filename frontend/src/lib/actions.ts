"use server";

import { backendFetch } from "./api";

export const getProfile = async () => {
  return await backendFetch("auth/protected");
};
