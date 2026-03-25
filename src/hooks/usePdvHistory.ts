import { useMemo, useState, useCallback } from "react";
import type { ErpOrder } from "@gaqno-development/types";
import { useErpOrders } from "@gaqno-development/frontcore/hooks/erp";
import {
  getShiftStartedAt,
  setShiftStartedAt,
  effectiveShiftStartISO,
} from "../utils/pdvShiftStorage";
import { isPdvOrder } from "../utils/pdvOrderPayment";

export function usePdvHistory() {
  const ordersQuery = useErpOrders({ limit: 500 });
  const allOrders = ordersQuery.data ?? [];
  const [shiftStartedAt, setShiftStartedAtState] = useState(() => getShiftStartedAt());

  const bumpShiftAfterClose = useCallback(() => {
    const next = new Date().toISOString();
    setShiftStartedAt(next);
    setShiftStartedAtState(next);
  }, []);

  const pdvOrders = useMemo(
    () => allOrders.filter((o) => isPdvOrder(o as ErpOrder)),
    [allOrders],
  );

  const effectiveShift = useMemo(
    () => effectiveShiftStartISO(shiftStartedAt),
    [shiftStartedAt],
  );

  const todaySales = useMemo(() => {
    return pdvOrders.filter((o) => o.createdAt && o.createdAt >= effectiveShift);
  }, [pdvOrders, effectiveShift]);

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
    refetch: ordersQuery.refetch,
    bumpShiftAfterClose,
  };
}
