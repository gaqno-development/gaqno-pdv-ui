import { useMemo, useState } from "react";
import { useErpProducts } from "@gaqno-development/frontcore/hooks/erp";

export function useProductSearch() {
  const [search, setSearch] = useState("");
  const productsQuery = useErpProducts({ limit: 500 });
  const products = productsQuery.data ?? [];

  const filtered = useMemo(() => {
    if (!search.trim()) return products;
    const s = search.toLowerCase();
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(s) ||
        p.sku?.toLowerCase().includes(s) ||
        p.category?.toLowerCase().includes(s),
    );
  }, [products, search]);

  return {
    products: filtered,
    allProducts: products,
    search,
    setSearch,
    isLoading: productsQuery.isLoading,
    isError: productsQuery.isError,
    refetch: productsQuery.refetch,
  };
}
