import { useState, useCallback, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { coreAxiosClient } from "@gaqno-development/frontcore/utils/api";
import type { ErpProduct } from "@gaqno-development/types";

export interface CartItem {
  product: ErpProduct;
  quantity: number;
}

export type PaymentMethod = "cash" | "credit" | "debit" | "pix";

export function usePdvSale() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [amountPaid, setAmountPaid] = useState(0);
  const queryClient = useQueryClient();

  const addToCart = useCallback((product: ErpProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        ),
      );
    }
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setAmountPaid(0);
    setPaymentMethod("cash");
  }, []);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + (item.product.price ?? 0) * item.quantity, 0),
    [cart],
  );

  const itemCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const change = useMemo(
    () => (paymentMethod === "cash" ? Math.max(0, amountPaid - total) : 0),
    [amountPaid, total, paymentMethod],
  );

  const createSaleMutation = useMutation({
    mutationFn: async () => {
      const { data } = await coreAxiosClient.erp.post("/orders", {
        customerName: "Cliente PDV",
        customerEmail: "pdv@loja.local",
        items: cart.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          unitPrice: item.product.price,
        })),
        notes: `Venda PDV - ${paymentMethod.toUpperCase()} | Total: ${total.toFixed(2)}`,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["erp", "orders"] });
      queryClient.invalidateQueries({ queryKey: ["erp", "products"] });
      clearCart();
    },
  });

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    total,
    itemCount,
    change,
    paymentMethod,
    setPaymentMethod,
    amountPaid,
    setAmountPaid,
    completeSale: createSaleMutation.mutateAsync,
    isSaving: createSaleMutation.isPending,
    saleError: createSaleMutation.error,
  };
}
