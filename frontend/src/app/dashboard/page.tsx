// import { getSession } from "@/lib/session";
// import { redirect } from "next/navigation";
// import { Role } from "@/lib/type";

export default async function Dashboard() {
  // const session = await getSession();
  // if (!session || !session.user) redirect("/login");
  // if (session.user.role !== Role.ADMIN) redirect("/");
  return (
    <>
      <main className="">Dashboard</main>
    </>
  );
}
