import { useMemo } from "react";
import { usePdvHistory } from "./usePdvHistory";
import type { PaymentMethod } from "./usePdvSale";

export interface PaymentBreakdown {
  method: PaymentMethod;
  label: string;
  total: number;
  count: number;
}

const PAYMENT_LABELS: Record<string, string> = {
  cash: "Dinheiro",
  credit: "Crédito",
  debit: "Débito",
  pix: "PIX",
};

export function usePdvClosing() {
  const { todaySales, todayTotal, isLoading } = usePdvHistory();

  const breakdown = useMemo<PaymentBreakdown[]>(() => {
    const map: Record<string, { total: number; count: number }> = {};
    for (const order of todaySales) {
      const method = (order as any).paymentMethod ?? "cash";
      if (!map[method]) map[method] = { total: 0, count: 0 };
      const t = typeof order.total === "string" ? parseFloat(order.total) : order.total;
      map[method].total += Number.isNaN(t) ? 0 : t;
      map[method].count += 1;
    }
    return (["cash", "credit", "debit", "pix"] as PaymentMethod[]).map((method) => ({
      method,
      label: PAYMENT_LABELS[method] ?? method,
      total: map[method]?.total ?? 0,
      count: map[method]?.count ?? 0,
    }));
  }, [todaySales]);

  return {
    todaySalesCount: todaySales.length,
    todayTotal,
    itemsSold: todaySales.length,
    breakdown,
    isLoading,
  };
}
