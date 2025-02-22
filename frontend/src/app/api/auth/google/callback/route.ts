import { createSession } from "@/lib/session";
import { Role } from "@/types/user.type";

import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const userId = searchParams.get("userId");
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const hasBusiness = searchParams.get("hasBusiness");
  const role = searchParams.get("role");

  if (
    !accessToken ||
    !refreshToken ||
    !userId ||
    !name ||
    !email ||
    !hasBusiness ||
    !role
  )
    throw new Error("Google Ouath Failed!");

  await createSession({
    user: {
      id: userId,
      name,
      email,
      hasBusiness: hasBusiness === "true",
      role: role as Role,
    },
    accessToken,
    refreshToken,
  });

  redirect("/application");
}
