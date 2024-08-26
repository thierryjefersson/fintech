import {
  Settings,
  LucideIcon,
  Home,
  ShoppingBag,
  LayoutList,
  LogOut,
} from 'lucide-react';

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
};

export function getMenuList(pathname: string): Menu[] {
  return [
    {
      href: '/',
      label: 'Resumo',
      active: pathname === '/',
      icon: Home,
    },
    {
      href: '/vendas',
      label: 'Vendas',
      active: pathname.startsWith('/vendas'),
      icon: ShoppingBag,
    },
    {
      href: '#',
      label: 'Webhooks',
      active: false,
      icon: LayoutList,
    },
    {
      href: '#',
      label: 'Configurações',
      active: false,
      icon: Settings,
    },
    {
      href: '#',
      label: 'Sair',
      active: false,
      icon: LogOut,
    },
  ];
}
