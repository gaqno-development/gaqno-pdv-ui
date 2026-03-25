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

const PDV_SETTINGS_KEY = "pdv-settings";

type PdvSettingsState = {
  receiptHeader: string;
  receiptFooter: string;
};

function loadPdvSettings(): PdvSettingsState {
  if (typeof window === "undefined") {
    return { receiptHeader: "", receiptFooter: "" };
  }
  try {
    const raw = localStorage.getItem(PDV_SETTINGS_KEY);
    if (!raw) {
      return { receiptHeader: "", receiptFooter: "" };
    }
    const p = JSON.parse(raw) as Record<string, unknown>;
    return {
      receiptHeader: typeof p.receiptHeader === "string" ? p.receiptHeader : "",
      receiptFooter: typeof p.receiptFooter === "string" ? p.receiptFooter : "",
    };
  } catch {
    return { receiptHeader: "", receiptFooter: "" };
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<PdvSettingsState>(() => loadPdvSettings());
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem(PDV_SETTINGS_KEY, JSON.stringify(settings));
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
                value={settings.receiptHeader}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, receiptHeader: e.target.value }))
                }
                placeholder="Ex: Minha Loja — CNPJ 00.000.000/0001-00"
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="receipt-footer">Rodapé do recibo</Label>
              <Input
                id="receipt-footer"
                value={settings.receiptFooter}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, receiptFooter: e.target.value }))
                }
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
