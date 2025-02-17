import { CompanyProductsPaginatedPayload } from "@/types/company.type";
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
  const result = await backendFetch(`company/${companyId}/products/all`, {
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

export const getPaginatedProductsByCompany = async ({
  companyId,
  page,
  pageSize,
}: CompanyProductsPaginatedPayload) => {
  const result = await backendFetch(
    `company/${companyId}/products?page=${page}&pageSize=${pageSize}`,
    {
      method: "GET",
    }
  );
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
