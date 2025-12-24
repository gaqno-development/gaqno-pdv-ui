

import { FeatureGuard } from '@gaqno-dev/frontcore/components/guards'
import { FeatureModule, FeaturePermissionLevel } from '@gaqno-dev/frontcore/types/user'

export function PdvLayout({ children }: { children: React.ReactNode }) {
  return (
    <FeatureGuard feature={FeatureModule.PDV} minRole={FeaturePermissionLevel.ACCESS}>
      {children}
    </FeatureGuard>
  )
}

