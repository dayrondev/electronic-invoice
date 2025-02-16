import { backendFetch } from "./api";

export const getCompaniesByUser = async () => {
  const result = await backendFetch("company/get-by-user", {
    method: "GET",
  });
  if (result.ok) {
    return {
      ok: true,
      data: result.data,
    };
  }
  return {
    ok: false,
    message: "Error fetching user companies",
  };
};
