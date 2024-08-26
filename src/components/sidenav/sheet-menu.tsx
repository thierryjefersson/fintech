'use client';

import { Cpu, Menu } from 'lucide-react';
import { ModeToggle } from '../mode-theme/mode-toggle';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import Link from 'next/link';
import { getMenuList } from '@/lib/menu-list';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

export default function SheetMenu() {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow  dark:shadow-secondary sm:hidden">
      <nav className="flex items-center px-4 py-3 justify-between sm:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu />
            <span className="sr-only">Botão do menu</span>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                <Link
                  href="#"
                  className="flex items-center gap-1 justify-center text-base"
                >
                  <Cpu />
                  <span>FINTECH</span>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <ul className="mt-5 flex flex-col gap-3">
              {menuList.map(({ active, href, icon: Icon, label }, index) => (
                <li key={index}>
                  <SheetClose asChild>
                    <Button
                      variant={active ? 'default' : 'ghost'}
                      className="w-full flex justify-start"
                      asChild
                    >
                      <Link href={href} className="flex items-center gap-2">
                        <Icon size={18} />
                        {label}
                      </Link>
                    </Button>
                  </SheetClose>
                </li>
              ))}
            </ul>
            <SheetDescription hidden></SheetDescription>
          </SheetContent>
        </Sheet>
        <ModeToggle side="bottom" />
      </nav>
    </header>
  );
}
