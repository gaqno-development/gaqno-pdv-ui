import { useMemo } from "react";
import { Pie, PieChart, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  StatCard,
  AnimatedEntry,
  Skeleton,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Button,
} from "@gaqno-development/frontcore/components/ui";
import { formatCurrency } from "@gaqno-development/frontcore/utils";
import { usePdvClosing } from "../hooks/usePdvClosing";
import { Receipt, DollarSign, Hash, Lock } from "lucide-react";

const PIE_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"];

export default function CashClosingPage() {
  const { todaySalesCount, todayTotal, breakdown, isLoading } = usePdvClosing();

  const pieData = useMemo(
    () => breakdown.filter((b) => b.total > 0).map((b) => ({ name: b.label, value: b.total })),
    [breakdown],
  );

  const pieConfig = useMemo<ChartConfig>(
    () =>
      breakdown.reduce<ChartConfig>((acc, b, i) => {
        acc[b.label] = { label: b.label, color: PIE_COLORS[i % PIE_COLORS.length] };
        return acc;
      }, {}),
    [breakdown],
  );

  return (
    <div className="space-y-6">
      <AnimatedEntry direction="fade" duration={0.2}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard title="Vendas do turno" value={todaySalesCount} icon={Receipt} isLoading={isLoading} />
          <StatCard title="Total do turno" value={formatCurrency(todayTotal)} icon={DollarSign} isLoading={isLoading} />
          <StatCard title="Formas de pagamento" value={breakdown.filter((b) => b.count > 0).length} icon={Hash} isLoading={isLoading} />
        </div>
      </AnimatedEntry>

      <div className="grid gap-6 lg:grid-cols-2">
        <AnimatedEntry direction="up" delay={0.1}>
          <Card>
            <CardHeader>
              <CardTitle>Pagamentos por método</CardTitle>
              <CardDescription>Distribuição do faturamento do turno</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-[220px] w-full rounded-lg" />
              ) : pieData.length === 0 ? (
                <div className="h-[220px] flex items-center justify-center text-muted-foreground border border-dashed border-foreground/10 rounded-md">
                  Nenhuma venda no turno
                </div>
              ) : (
                <ChartContainer config={pieConfig} className="h-[220px] w-full">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent formatter={(v) => formatCurrency(Number(v))} indicator="dot" />} />
                  </PieChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
        </AnimatedEntry>

        <AnimatedEntry direction="up" delay={0.15}>
          <Card>
            <CardHeader>
              <CardTitle>Detalhamento</CardTitle>
              <CardDescription>Resumo por forma de pagamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {breakdown.map((b, i) => (
                  <div key={b.method} className="flex items-center justify-between rounded-lg bg-muted/30 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                      />
                      <div>
                        <p className="text-sm font-medium">{b.label}</p>
                        <p className="text-xs text-muted-foreground">{b.count} vendas</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold tabular-nums">{formatCurrency(b.total)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedEntry>
      </div>

      <AnimatedEntry direction="up" delay={0.2}>
        <Card>
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-medium">Fechar turno</p>
              <p className="text-xs text-muted-foreground">Encerre o caixa e gere o relatório do turno.</p>
            </div>
            <Button variant="destructive" disabled={todaySalesCount === 0}>
              <Lock className="h-4 w-4 mr-2" />
              Fechar caixa
            </Button>
          </CardContent>
        </Card>
      </AnimatedEntry>
    </div>
  );
}
