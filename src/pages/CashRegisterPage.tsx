import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  AnimatedEntry,
  Skeleton,
  StatCard,
  Input,
  EmptyState,
} from "@gaqno-development/frontcore/components/ui";
import { formatCurrency } from "@gaqno-development/frontcore/utils";
import { useProductSearch } from "../hooks/useProductSearch";
import { usePdvSale, type PaymentMethod } from "../hooks/usePdvSale";
import { usePdvHistory } from "../hooks/usePdvHistory";
import { toast } from "sonner";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Banknote,
  Smartphone,
  Receipt,
  Package,
  DollarSign,
  Hash,
  CheckCircle2,
  Search,
} from "lucide-react";

const PAYMENT_OPTIONS: { method: PaymentMethod; label: string; icon: typeof CreditCard }[] = [
  { method: "cash", label: "Dinheiro", icon: Banknote },
  { method: "credit", label: "Crédito", icon: CreditCard },
  { method: "debit", label: "Débito", icon: CreditCard },
  { method: "pix", label: "PIX", icon: Smartphone },
];

export default function CashRegisterPage() {
  const { products, search, setSearch, isLoading: isLoadingProducts } = useProductSearch();
  const sale = usePdvSale();
  const { todayTotal, todaySales } = usePdvHistory();
  const [saleComplete, setSaleComplete] = useState(false);

  const handleCompleteSale = async () => {
    if (sale.cart.length === 0) return;
    try {
      await sale.completeSale();
      setSaleComplete(true);
      setTimeout(() => setSaleComplete(false), 3000);
    } catch {
      toast.error("Não foi possível finalizar a venda. Tente novamente.");
    }
  };

  const kpiCards = [
    { title: "Vendas hoje", value: todaySales.length, icon: Receipt },
    { title: "Total do dia", value: formatCurrency(todayTotal), icon: DollarSign },
    { title: "Itens no carrinho", value: sale.itemCount, icon: Hash },
  ];

  return (
    <div className="space-y-6">
      <AnimatedEntry direction="fade" duration={0.2}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {kpiCards.map((card, i) => (
            <StatCard
              key={card.title}
              title={card.title}
              value={card.value}
              icon={card.icon}
              variant="compact"
              size="sm"
            />
          ))}
        </div>
      </AnimatedEntry>

      {saleComplete && (
        <AnimatedEntry direction="fade">
          <div className="flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="h-5 w-5" />
            Venda registrada com sucesso!
          </div>
        </AnimatedEntry>
      )}

      <div className="grid gap-6 lg:grid-cols-5">
        <AnimatedEntry direction="up" delay={0.05} className="lg:col-span-3 space-y-4">
          <div className="relative max-w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar produto por nome, SKU ou categoria…"
              className="pl-9 h-10 bg-background"
            />
          </div>

          {isLoadingProducts ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <EmptyState
              title={search ? "Nenhum produto encontrado" : "Nenhum produto cadastrado"}
              description={search ? "Tente outro termo de busca." : "Cadastre produtos no módulo ERP."}
              icon={Package}
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {products.slice(0, 30).map((product) => (
                <button
                  key={product.id}
                  onClick={() => sale.addToCart(product)}
                  className="rounded-xl border border-border bg-card p-3 text-left transition-all hover:bg-muted/50 hover:shadow-sm active:scale-[0.98] group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      {product.sku && (
                        <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{product.sku}</p>
                      )}
                    </div>
                    <Plus className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                  </div>
                  <p className="text-base font-bold mt-2 tabular-nums">
                    {formatCurrency(product.price ?? 0)}
                  </p>
                  {product.stock != null && (
                    <Badge variant="secondary" className="text-[10px] mt-1">
                      {product.stock} em estoque
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          )}
        </AnimatedEntry>

        <AnimatedEntry direction="up" delay={0.15} className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Carrinho
                {sale.itemCount > 0 && (
                  <Badge variant="secondary" className="text-[10px] ml-auto">{sale.itemCount}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {sale.cart.length === 0 ? (
                <div className="py-8 text-center">
                  <ShoppingCart className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Carrinho vazio</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {sale.cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3 rounded-lg bg-muted/30 px-3 py-2"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground tabular-nums">
                          {formatCurrency(item.product.price ?? 0)} × {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => sale.updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-6 text-center tabular-nums">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => sale.updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-destructive"
                          onClick={() => sale.removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="text-sm font-bold tabular-nums shrink-0">
                        {formatCurrency((item.product.price ?? 0) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {sale.cart.length > 0 && (
            <Card>
              <CardContent className="pt-4 space-y-4">
                <div className="flex items-center justify-between border-b border-border/50 pb-3">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="text-2xl font-bold tabular-nums">{formatCurrency(sale.total)}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {PAYMENT_OPTIONS.map(({ method, label, icon: Icon }) => (
                    <Button
                      key={method}
                      variant={sale.paymentMethod === method ? "default" : "outline"}
                      size="sm"
                      className="justify-start"
                      onClick={() => sale.setPaymentMethod(method)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {label}
                    </Button>
                  ))}
                </div>

                {sale.paymentMethod === "cash" && (
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground font-medium">Valor recebido</label>
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      value={sale.amountPaid || ""}
                      onChange={(e) => sale.setAmountPaid(parseFloat(e.target.value) || 0)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm tabular-nums ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="0,00"
                    />
                    {sale.change > 0 && (
                      <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        Troco: {formatCurrency(sale.change)}
                      </p>
                    )}
                  </div>
                )}

                <Button
                  className="w-full"
                  size="lg"
                  disabled={sale.isSaving || (sale.paymentMethod === "cash" && sale.amountPaid < sale.total)}
                  onClick={handleCompleteSale}
                >
                  {sale.isSaving ? "Processando…" : "Finalizar venda"}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-muted-foreground"
                  onClick={sale.clearCart}
                >
                  Limpar carrinho
                </Button>
              </CardContent>
            </Card>
          )}
        </AnimatedEntry>
      </div>
    </div>
  );
}
