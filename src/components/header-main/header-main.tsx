'use client';

import * as React from 'react';

import { Card, CardContent, CardTitle } from '../ui/card';

import InputDate from './input-date';
import { useData } from '@/context/data-context';
import MonthButtons from './month-buttons';
import { usePathname } from 'next/navigation';

export default function HeaderMain() {
  const { initial, final, setFinal, setInitial } = useData();
  const pathname = usePathname();
  return (
    <div className="grid sm:grid-cols-2 gap-3 2xl:grid-cols-3">
      <Card className="w-full sm:col-span-full md:col-[1]">
        <CardTitle className="p-4 md:text-3xl">
          {pathname.includes('vendas') ? 'Vendas' : 'Resumo'}
        </CardTitle>
      </Card>
      <Card className="md:col-[2] md:row-[1]">
        <CardContent className="flex flex-col gap-4 mt-3 lg:flex-row lg:flex-wrap">
          <InputDate
            value={initial}
            setValue={setInitial}
            label="Data inicial"
          />
          <InputDate value={final} setValue={setFinal} label="Data final" />
        </CardContent>
      </Card>
      <MonthButtons />
    </div>
  );
}
