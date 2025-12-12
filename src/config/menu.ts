import { FeatureModule, FeaturePermissionLevel } from '@gaqno-dev/frontcore/types/user';
import { Home, ShoppingCart, Package, History, Settings } from 'lucide-react';

export interface MenuItem {
  label: string;
  href: string;
  icon: any;
  requiredFeature: FeatureModule;
  requiredPermission: FeaturePermissionLevel;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    requiredFeature: FeatureModule.PDV,
    requiredPermission: FeaturePermissionLevel.ACCESS,
  },
  {
    label: 'Venda (PDV)',
    href: '/dashboard/sales',
    icon: ShoppingCart,
    requiredFeature: FeatureModule.PDV,
    requiredPermission: FeaturePermissionLevel.ACCESS, // User/Manager/Admin can sell
  },
  {
    label: 'Produtos',
    href: '/dashboard/products',
    icon: Package,
    requiredFeature: FeatureModule.PDV,
    requiredPermission: FeaturePermissionLevel.ACCESS, // Or MANAGER? Let's say ACCESS for looking up
  },
  {
    label: 'Histórico',
    href: '/dashboard/history',
    icon: History,
    requiredFeature: FeatureModule.PDV,
    requiredPermission: FeaturePermissionLevel.ACCESS,
  },
  {
    label: 'Configurações',
    href: '/dashboard/settings',
    icon: Settings,
    requiredFeature: FeatureModule.PDV,
    requiredPermission: FeaturePermissionLevel.ADMIN,
  },
];

