import { BACKEND_URL } from "./constants";
import { getSession } from "./session";

export interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const backendFetch = async (
  url: string | URL,
  options: FetchOptions = {}
) => {
  const session = await getSession();

  if (session?.accessToken) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${session?.accessToken}`,
    };
  }
  try {
    const response = await fetch(`${BACKEND_URL}/${url}`, options);
    if (response.status === 401) {
      return {
        ok: false,
        code: response.status,
        message: "Unauthorized",
      };
    }
    const result = await response.json();
    return {
      ok: true,
      code: response.status,
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      code: 500,
      message: "Something went wrong",
    };
  }
};
