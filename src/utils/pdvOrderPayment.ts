import type { PaymentMethod } from "../hooks/usePdvSale";

const PDV_NOTE_RE = /Venda PDV\s*-\s*([A-Za-z]+)/;

export function getOrderPaymentMethod(order: {
  notes?: string | null;
  paymentMethod?: string;
}): PaymentMethod {
  const pm = order.paymentMethod;
  if (pm === "cash" || pm === "credit" || pm === "debit" || pm === "pix") return pm;
  const notes = order.notes ?? "";
  const m = notes.match(PDV_NOTE_RE);
  if (m?.[1]) {
    const code = m[1].toLowerCase();
    if (code === "cash" || code === "credit" || code === "debit" || code === "pix") return code;
  }
  return "cash";
}

export function isPdvOrder(order: { notes?: string | null; source?: string }): boolean {
  if (order.source === "pdv") return true;
  return Boolean(order.notes?.includes("Venda PDV"));
}
