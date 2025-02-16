import { getProductsByCompany } from "@/lib/company";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function DemoPage() {
  const result = await getProductsByCompany(
    "14c78837-941a-49b8-b752-6752ff572c8d"
  );
  if (!result.ok) return null;

  return (
    <div className="container mx-auto p-10 pt-0">
      <DataTable columns={columns} data={result.data} />
    </div>
  );
}
