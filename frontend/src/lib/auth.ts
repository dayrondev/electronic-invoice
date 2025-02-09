"use server";

import { redirect } from "next/navigation";
import { BACKEND_URL, FRONTEND_URL } from "./constants";
import { SignupFormSchema, FormState, LoginFormSchema } from "./type";
import { createSession, deleteSession } from "./session";
import { backendFetch } from "./backend-fetch";

export async function signup(
  _state: FormState,
  formData: FormData
): Promise<FormState> {
  const validationFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationFields.data),
  });
  if (!response.ok) {
    return {
      message:
        response.status === 409
          ? "The user is already existed!"
          : response.statusText,
    };
  }
  redirect("/login");
}

export async function signin(
  _state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
  });
  if (!response.ok) {
    return {
      message:
        response.status === 401 ? "Invalid Credentials!" : response.statusText,
    };
  }

  const result = await response.json();
  await createSession({
    user: {
      id: result.id,
      name: result.name,
      role: result.role,
    },
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
  });

  redirect("/");
}

export const refreshToken = async (oldRefreshToken: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: oldRefreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token" + response.statusText);
    }

    const { accessToken, refreshToken } = await response.json();
    // update session with new tokens
    // await updateTokens({ accessToken, refreshToken }); // Error: Cookies can only be modified in a Server Action or Route Handler
    // It must be generated from the client side, not in the getProfile() action
    const updateRes = await fetch(`${FRONTEND_URL}/api/auth/update`, {
      method: "POST",
      body: JSON.stringify({
        accessToken,
        refreshToken,
      }),
    });
    if (!updateRes.ok) throw new Error("Failed to update the tokens");

    return accessToken;
  } catch (err) {
    console.error("Refresh Token failed:", err);
    return null;
  }
};

export const signout = async () => {
  backendFetch("auth/signout", {
    method: "POST",
  });
  await deleteSession();
  redirect("/");
};
