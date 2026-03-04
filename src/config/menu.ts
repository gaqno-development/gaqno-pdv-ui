import { FeatureModule, FeaturePermissionLevel } from '@gaqno-development/frontcore/types/user';
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
    label: 'Caixa',
    href: '/dashboard',
    icon: Home,
    requiredFeature: FeatureModule.PDV,
    requiredPermission: FeaturePermissionLevel.ACCESS,
  },
  {
    label: 'Nova Venda',
    href: '/dashboard/sales',
    icon: ShoppingCart,
    requiredFeature: FeatureModule.PDV,
    requiredPermission: FeaturePermissionLevel.ACCESS,
  },
  {
    label: 'Produtos',
    href: '/dashboard/products',
    icon: Package,
    requiredFeature: FeatureModule.PDV,
    requiredPermission: FeaturePermissionLevel.ACCESS,
  },
  {
    label: 'Histórico',
    href: '/dashboard/history',
    icon: History,
    requiredFeature: FeatureModule.PDV,
    requiredPermission: FeaturePermissionLevel.ACCESS,
  },
  {
    label: 'Fechamento',
    href: '/dashboard/closing',
    icon: History,
    requiredFeature: FeatureModule.PDV,
    requiredPermission: FeaturePermissionLevel.ADMIN,
  },
  {
    label: 'Configurações',
    href: '/dashboard/settings',
    icon: Settings,
    requiredFeature: FeatureModule.PDV,
    requiredPermission: FeaturePermissionLevel.ADMIN,
  },
];

