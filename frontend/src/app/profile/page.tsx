import { getProfile } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Profile() {
  const { ok, data } = await getProfile();
  if (!ok) redirect("/api/auth/logout");

  return (
    <>
      <main className="">
        <h1>Profile</h1>
        <p>{JSON.stringify(data)}</p>
      </main>
    </>
  );
}
