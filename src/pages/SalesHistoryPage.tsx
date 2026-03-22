import {
  Card,
  CardContent,
  DataTable,
  ColumnDef,
  Badge,
  AnimatedEntry,
  EmptyState,
  LoadingSkeleton,
  StatCard,
} from "@gaqno-development/frontcore/components/ui";
import { formatCurrency, formatDateTime } from "@gaqno-development/frontcore/utils";
import { usePdvHistory } from "../hooks/usePdvHistory";
import type { ErpOrder, ErpOrderStatus } from "@gaqno-development/types";
import { Receipt, DollarSign, ShoppingCart } from "lucide-react";

const STATUS_LABEL: Record<string, string> = {
  pending: "Pendente", confirmed: "Confirmado", processing: "Em processamento",
  shipped: "Enviado", delivered: "Entregue", cancelled: "Cancelado",
};

const STATUS_VARIANT: Record<string, "secondary" | "default" | "destructive" | "outline"> = {
  pending: "secondary", confirmed: "outline", processing: "default",
  shipped: "default", delivered: "default", cancelled: "destructive",
};

export default function SalesHistoryPage() {
  const { orders, todayTotal, todaySales, isLoading } = usePdvHistory();

  const columns: ColumnDef<ErpOrder>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <span className="font-mono text-xs text-muted-foreground">
          {row.original.id.slice(0, 8)}
        </span>
      ),
    },
    {
      accessorKey: "customerName",
      header: "Cliente",
      cell: ({ row }) => (
        <span className="text-sm font-medium">
          {row.original.customerName || "Venda balcão"}
        </span>
      ),
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => {
        const t = typeof row.original.total === "string" ? parseFloat(row.original.total) : row.original.total;
        return <span className="tabular-nums font-medium">{formatCurrency(Number.isNaN(t) ? 0 : t)}</span>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const s = row.original.status as ErpOrderStatus;
        return (
          <Badge variant={STATUS_VARIANT[s] ?? "secondary"} className="font-normal">
            {STATUS_LABEL[s] ?? s}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Data",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm tabular-nums">
          {formatDateTime(row.original.createdAt, { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AnimatedEntry direction="fade" duration={0.2}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard title="Vendas hoje" value={todaySales.length} icon={Receipt} variant="compact" size="sm" isLoading={isLoading} />
          <StatCard title="Total do dia" value={formatCurrency(todayTotal)} icon={DollarSign} variant="compact" size="sm" isLoading={isLoading} />
          <StatCard title="Total de vendas" value={orders.length} icon={ShoppingCart} variant="compact" size="sm" isLoading={isLoading} />
        </div>
      </AnimatedEntry>

      <AnimatedEntry direction="up" delay={0.1}>
        <Card className="border-0 shadow-sm bg-card/50">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6">
                <LoadingSkeleton count={8} variant="table" />
              </div>
            ) : orders.length === 0 ? (
              <div className="p-8 sm:p-12">
                <EmptyState
                  title="Nenhuma venda registrada"
                  description="As vendas do PDV aparecerão aqui."
                  icon={Receipt}
                />
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={{ data: orders, isLoading: false }}
                initialPageSize={20}
                cardStyle={false}
                showPagination={orders.length > 10}
              />
            )}
          </CardContent>
        </Card>
      </AnimatedEntry>
    </div>
  );
}
