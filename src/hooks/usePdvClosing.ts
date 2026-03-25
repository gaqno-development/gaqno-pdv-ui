import { useMemo, useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { ErpOrder } from "@gaqno-development/types";
import { usePdvHistory } from "./usePdvHistory";
import type { PaymentMethod } from "./usePdvSale";
import { getOrderPaymentMethod } from "../utils/pdvOrderPayment";
import {
  appendClosingRecord,
  loadClosingHistory,
  type PdvClosingRecord,
} from "../utils/pdvShiftStorage";

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

function buildBreakdown(sales: ErpOrder[]): PaymentBreakdown[] {
  const map: Record<string, { total: number; count: number }> = {};
  for (const order of sales) {
    const method = getOrderPaymentMethod(order);
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
}

export function usePdvClosing() {
  const queryClient = useQueryClient();
  const {
    todaySales,
    todayTotal,
    isLoading,
    bumpShiftAfterClose,
  } = usePdvHistory();
  const [isClosing, setIsClosing] = useState(false);
  const [historyVersion, setHistoryVersion] = useState(0);

  const closingHistory = useMemo(() => loadClosingHistory(), [historyVersion]);

  const lastClosing = closingHistory[0] ?? null;

  const closeTurn = useCallback(async () => {
    setIsClosing(true);
    try {
      const sales = todaySales as ErpOrder[];
      const breakdown = buildBreakdown(sales);
      const record: PdvClosingRecord = {
        id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `close-${Date.now()}`,
        closedAt: new Date().toISOString(),
        transactionCount: sales.length,
        totalAmount: todayTotal,
        breakdown: breakdown.map((b) => ({
          method: b.method,
          label: b.label,
          total: b.total,
          count: b.count,
        })),
      };
      appendClosingRecord(record);
      bumpShiftAfterClose();
      await queryClient.invalidateQueries({ queryKey: ["erp", "orders"] });
      setHistoryVersion((v) => v + 1);
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error("Não foi possível concluir o fechamento.");
    } finally {
      setIsClosing(false);
    }
  }, [todaySales, todayTotal, bumpShiftAfterClose, queryClient]);

  const breakdown = useMemo<PaymentBreakdown[]>(
    () => buildBreakdown(todaySales as ErpOrder[]),
    [todaySales],
  );

  return {
    todaySalesCount: todaySales.length,
    todayTotal,
    itemsSold: todaySales.length,
    breakdown,
    isLoading,
    isClosing,
    closeTurn,
    lastClosing,
  };
}
