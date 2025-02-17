"use client";

import { getProductsByCompany } from "@/lib/company";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { useApplicationStore } from "@/store/application.store";

export default function ProductsPage() {
  const activeCompany = useApplicationStore((state) => state.activeCompany);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (activeCompany) {
        const result = await getProductsByCompany(activeCompany.id);
        if (result.ok) {
          setProducts(result.data);
        }
      }
    };

    fetchProducts();
  }, [activeCompany]);

  if (!products)
    return (
      <div className="container mx-auto p-10 pt-0">
        <p>Cargando...</p>
      </div>
    );

  return (
    <div className="container mx-auto p-10 pt-0">
      <DataTable columns={columns} data={products} />
    </div>
  );
}
