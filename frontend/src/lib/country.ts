import { backendFetch } from "./api";

export async function getCountries() {
  const result = await backendFetch("country", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!result.ok) {
    return {
      ok: false,
      message: "Error fetching countries",
    };
  }
  return {
    ok: true,
    data: result.data,
  };
}
