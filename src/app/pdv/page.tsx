export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard PDV</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-6 bg-card rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Vendas Hoje</h3>
          <p className="text-2xl font-bold">R$ 0,00</p>
        </div>
        <div className="p-6 bg-card rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Transações</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="p-6 bg-card rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Ticket Médio</h3>
          <p className="text-2xl font-bold">R$ 0,00</p>
        </div>
      </div>
    </div>
  )
}

