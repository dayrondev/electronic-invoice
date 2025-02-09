import { signout } from "@/lib/auth";

export async function GET() {
  await signout();
}
