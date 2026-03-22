import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  AnimatedEntry,
} from "@gaqno-development/frontcore/components/ui";
import { Settings, Save } from "lucide-react";

export default function SettingsPage() {
  const [receiptHeader, setReceiptHeader] = useState("");
  const [receiptFooter, setReceiptFooter] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <AnimatedEntry direction="fade" duration={0.2}>
        <div>
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Settings className="h-5 w-5 text-muted-foreground" />
            Configurações do PDV
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Personalize o comportamento e a aparência do ponto de venda.
          </p>
        </div>
      </AnimatedEntry>

      <AnimatedEntry direction="up" delay={0.05}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recibo</CardTitle>
            <CardDescription>Texto exibido no cabeçalho e rodapé do recibo de venda.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="receipt-header">Cabeçalho do recibo</Label>
              <Input
                id="receipt-header"
                value={receiptHeader}
                onChange={(e) => setReceiptHeader(e.target.value)}
                placeholder="Ex: Minha Loja — CNPJ 00.000.000/0001-00"
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="receipt-footer">Rodapé do recibo</Label>
              <Input
                id="receipt-footer"
                value={receiptFooter}
                onChange={(e) => setReceiptFooter(e.target.value)}
                placeholder="Ex: Obrigado pela preferência!"
                className="h-10"
              />
            </div>
          </CardContent>
        </Card>
      </AnimatedEntry>

      <AnimatedEntry direction="up" delay={0.1}>
        <div className="flex items-center gap-3">
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Salvar configurações
          </Button>
          {saved && (
            <span className="text-sm text-emerald-600 dark:text-emerald-400">
              Salvo!
            </span>
          )}
        </div>
      </AnimatedEntry>
    </div>
  );
}
