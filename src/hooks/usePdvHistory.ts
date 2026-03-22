import { useMemo } from "react";
import { useErpOrders } from "@gaqno-development/frontcore/hooks/erp";

export function usePdvHistory() {
  const ordersQuery = useErpOrders({ limit: 500 });
  const allOrders = ordersQuery.data ?? [];

  const pdvOrders = useMemo(
    () => allOrders.filter((o) => (o as any).source === "pdv" || o.notes?.includes("Venda PDV")),
    [allOrders],
  );

  const todaySales = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return pdvOrders.filter((o) => o.createdAt?.startsWith(today));
  }, [pdvOrders]);

  const todayTotal = useMemo(
    () =>
      todaySales.reduce((sum, o) => {
        const t = typeof o.total === "string" ? parseFloat(o.total) : o.total;
        return sum + (Number.isNaN(t) ? 0 : t);
      }, 0),
    [todaySales],
  );

  return {
    orders: pdvOrders,
    todaySales,
    todayTotal,
    totalSales: pdvOrders.length,
    isLoading: ordersQuery.isLoading,
    isError: ordersQuery.isError,
  };
}
