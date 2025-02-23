"use client";

import { getPaginatedProductsByBusiness } from "@/lib/business";
import { useCallback, useEffect, useState } from "react";
import { useApplicationStore } from "@/store/application.store";
import { Product } from "@/types/product.type";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { PaginationMeta } from "@/types/pagination.type";

export default function PaginatedProductsPage() {
  const activeBusiness = useApplicationStore((state) => state.activeBusiness);
  const [data, setData] = useState<Product[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  const pageSize = 10;

  const fetchProducts = useCallback(
    async (page: number, pageSize: number) => {
      if (activeBusiness) {
        const result = await getPaginatedProductsByBusiness({
          businessId: activeBusiness.id,
          page,
          pageSize,
        });
        if (result.ok) {
          setData(result.data.data);
          setMeta(result.data.meta);
        }
      }
    },
    [activeBusiness]
  );

  useEffect(() => {
    if (activeBusiness) fetchProducts(1, 10);
  }, [activeBusiness, fetchProducts]);

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
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
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
