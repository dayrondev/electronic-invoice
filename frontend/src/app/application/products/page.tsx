"use client";

import { getProductsByBusiness } from "@/lib/business";
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
        const result = await getProductsByBusiness(activeCompany.id);
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
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <DataTable columns={columns} data={products} />
    </div>
  );
}
