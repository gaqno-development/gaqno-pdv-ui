import { PageLayout } from '@gaqno-development/frontcore/components/layout'
import { useTranslation } from '@gaqno-development/frontcore/i18n'
import { ShoppingCart } from 'lucide-react'

const TAB_KEYS = [
  { id: 'pdv', icon: <ShoppingCart className="h-4 w-4" />, tKey: 'pdv.pdv' },
] as const

export default function App() {
  const { t } = useTranslation('navigation')

  const tabs = TAB_KEYS.map((tab) => ({
    id: tab.id,
    label: t(tab.tKey),
    icon: tab.icon,
  }))

  return (
    <PageLayout
      title={t('pdv.title')}
      tabs={tabs}
      activeTab="pdv"
      onTabChange={() => {}}
      layoutId="pdvActiveTab"
    >
      <p className="text-muted-foreground mt-2">PDV functionality coming soon...</p>
    </PageLayout>
  )
}
