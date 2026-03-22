import { useState } from "react";
import { PageLayout } from "@gaqno-development/frontcore/components/layout";
import { initI18n, I18nProvider, useTranslation } from "@gaqno-development/frontcore/i18n";
import { PdvLayout } from "./components/layout/PdvLayout";
import CashRegisterPage from "./pages/CashRegisterPage";
import SalesHistoryPage from "./pages/SalesHistoryPage";
import CashClosingPage from "./pages/CashClosingPage";
import SettingsPage from "./pages/SettingsPage";
import { ShoppingCart, History, Lock, Settings } from "lucide-react";

initI18n();

const TAB_KEYS = [
  { id: "caixa", icon: <ShoppingCart className="h-4 w-4" /> },
  { id: "historico", icon: <History className="h-4 w-4" /> },
  { id: "fechamento", icon: <Lock className="h-4 w-4" /> },
  { id: "configuracoes", icon: <Settings className="h-4 w-4" /> },
] as const;

const TAB_LABELS: Record<string, string> = {
  caixa: "Caixa",
  historico: "Histórico",
  fechamento: "Fechamento",
  configuracoes: "Configurações",
};

const TAB_COMPONENTS: Record<string, React.ComponentType> = {
  caixa: CashRegisterPage,
  historico: SalesHistoryPage,
  fechamento: CashClosingPage,
  configuracoes: SettingsPage,
};

export default function App() {
  const { t } = useTranslation("navigation");
  const [activeTab, setActiveTab] = useState("caixa");

  const tabs = TAB_KEYS.map((tab) => ({
    id: tab.id,
    label: TAB_LABELS[tab.id] ?? tab.id,
    icon: tab.icon,
  }));

  const ActivePage = TAB_COMPONENTS[activeTab] ?? CashRegisterPage;

  return (
    <I18nProvider>
      <PdvLayout>
        <PageLayout
          title="Ponto de Venda"
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          layoutId="pdvActiveTab"
        >
          <ActivePage />
        </PageLayout>
      </PdvLayout>
    </I18nProvider>
  );
}
