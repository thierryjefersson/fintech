'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { getMenuList } from '@/lib/menu-list';
import { usePathname } from 'next/navigation';
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from '../ui/tooltip';
import { ModeToggle } from '../mode-theme/mode-toggle';
import { Cpu } from 'lucide-react';

export default function SideBar() {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  return (
    <aside className="hidden fixed sm:flex justify-center inset-y-0 left-0 border-r w-14 z-20 py-5 bg-background">
      <nav className="flex flex-col justify-between h-full">
        <Link href="/" className="flex justify-center mb-6">
          <Cpu size={30} />
          <span className="sr-only">Logo FINTECH</span>
        </Link>
        <ul className="flex flex-col items-center gap-4">
          {menuList.map(({ active, href, icon: Icon, label }, index) => (
            <li key={index}>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant={active ? 'default' : 'ghost'}
                      className="px-2.5"
                      asChild
                    >
                      <Link href={href}>
                        <Icon size={22} />
                        <span className="sr-only">{label}</span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{label}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
        <div className="mt-auto mx-auto">
          <ModeToggle side="right" />
        </div>
      </nav>
    </aside>
  );
}
