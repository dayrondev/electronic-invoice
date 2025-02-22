"use server";

import { BACKEND_URL, FRONTEND_URL } from "./constants";
import { createSession, deleteSession } from "./session";
import { backendFetch } from "./api";
import { SignupSchema } from "@/schemas/signup.schema";
import { SignupState } from "@/types/signup-state.type";
import { LoginState } from "@/types/login-state.type";
import { LoginSchema } from "@/schemas/login.schema";
import { User } from "@/types/user.type";

export async function signup(
  _state: SignupState,
  formData: FormData
): Promise<SignupState> {
  const validationFields = SignupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validationFields.success) {
    return {
      ok: false,
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
      ok: false,
      message:
        response.status === 409
          ? "The user is already existed!"
          : response.statusText,
    };
  }
  return { ok: true };
}

export async function signin(
  _state: LoginState,
  formData: FormData
): Promise<LoginState> {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return {
      ok: false,
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
      ok: false,
      message:
        response.status === 401 ? "Invalid Credentials!" : response.statusText,
    };
  }

  const result = await response.json();

  const user: User = {
    id: result.id,
    name: result.name,
    email: result.email,
    role: result.role,
  };

  await createSession({
    user,
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
  });

  return {
    ok: true,
    user,
  };
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
  const result = await backendFetch("auth/signout", {
    method: "POST",
  });
  if (result.ok) {
    await deleteSession();
    return {
      ok: true,
    };
  }
  return {
    ok: false,
    message: "Failed to sign out",
  };
};
