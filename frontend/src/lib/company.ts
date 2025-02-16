import { backendFetch } from "./api";

export const getCompaniesByUser = async () => {
  const result = await backendFetch("company", {
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

export const getProductsByCompany = async (companyId: string) => {
  const result = await backendFetch(`company/${companyId}/products`, {
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
    message: `Error fetching products for company ${companyId}}`,
  };
};
