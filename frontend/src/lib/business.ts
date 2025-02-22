import {
  BusinessProductsPaginatedPayload,
  BusinessState,
} from "@/types/business.type";
import { backendFetch } from "./api";
import { CreateBusinessSchema } from "@/schemas/business.schema";

export async function createBusiness(
  _state: BusinessState,
  formData: FormData
): Promise<BusinessState> {
  const validatedFields = CreateBusinessSchema.safeParse({
    name: formData.get("name"),
    cif: formData.get("cif"),
    residenceType: formData.get("residenceType"),
  });
  if (!validatedFields.success) {
    return {
      ok: false,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }
  console.log(JSON.stringify(validatedFields.data));
  return {
    ok: true,
  };
  // const result = await backendFetch("business", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(validatedFields.data),
  // });

  // if (!result.ok) {
  //   return {
  //     ok: false,
  //     message: "Error creating business",
  //   };
  // }
  // return {
  //   ok: true,
  //   data: result.data,
  // };
}

export const getBusinessesByUser = async () => {
  const result = await backendFetch("business", {
    method: "GET",
  });
  if (!result.ok) {
    return {
      ok: false,
      message: "Error fetching user businesses",
    };
  }
  return {
    ok: true,
    data: result.data,
  };
};

export const getProductsByBusiness = async (businessId: string) => {
  const result = await backendFetch(`business/${businessId}/products/all`, {
    method: "GET",
  });
  if (!result.ok) {
    return {
      ok: false,
      message: `Error fetching products for company ${businessId}}`,
    };
  }
  return {
    ok: true,
    data: result.data,
  };
};

export const getPaginatedProductsByBusiness = async ({
  businessId,
  page,
  pageSize,
}: BusinessProductsPaginatedPayload) => {
  const result = await backendFetch(
    `business/${businessId}/products?page=${page}&pageSize=${pageSize}`,
    {
      method: "GET",
    }
  );
  if (!result.ok) {
    return {
      ok: false,
      message: `Error fetching products for company ${businessId}}`,
    };
  }
  return {
    ok: true,
    data: result.data,
  };
};
