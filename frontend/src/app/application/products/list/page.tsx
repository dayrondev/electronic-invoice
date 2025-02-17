"use client";

import { getPaginatedProductsByCompany } from "@/lib/company";
import { useEffect, useState } from "react";
import { useApplicationStore } from "@/store/application.store";
import { Product } from "@/types/product.type";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function PaginatedProductsPage() {
  const activeCompany = useApplicationStore((state) => state.activeCompany);
  const [data, setData] = useState<Product[]>([]);
  const [meta, setMeta] = useState<{
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  const pageSize = 10;

  const fetchProducts = async (page: number, pageSize: number) => {
    if (activeCompany) {
      const result = await getPaginatedProductsByCompany({
        companyId: activeCompany.id,
        page,
        pageSize,
      });
      if (result.ok) {
        setData(result.data.data);
        setMeta(result.data.meta);
      }
    }
  };

  useEffect(() => {
    fetchProducts(1, 10); // Cargar la primera página al inicio
  }, [activeCompany]);

  const handlePaginationChange = (page: number, pageSize: number) => {
    fetchProducts(page, pageSize);
  };

  if (!data.length)
    return (
      <div className="container mx-auto p-10 pt-0">
        <p>Cargando...</p>
      </div>
    );

  return (
    <div className="container mx-auto p-10 pt-0">
      <DataTable
        columns={columns}
        data={data}
        page={meta.currentPage}
        pageSize={pageSize}
        totalItems={meta.totalItems}
        onPaginationChange={handlePaginationChange}
      />
    </div>
  );
}
