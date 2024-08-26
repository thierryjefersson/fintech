'use client';

import { useData } from '@/context/data-context';
import { Button } from '../ui/button';
import { format, lastDayOfMonth, startOfMonth, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function MonthButtons() {
  const { setFinal, setInitial } = useData();
  const today = new Date();

  function formatName(period: number): string {
    const date = subMonths(today, period);
    const formattedMonthName = format(date, 'MMMM', { locale: ptBR });

    return (
      formattedMonthName.charAt(0).toUpperCase() + formattedMonthName.slice(1)
    );
  }

  function setMonth(period: number) {
    const date = subMonths(today, period);
    const lastDateOfMonth = lastDayOfMonth(date);
    const firstDateOfMonth = startOfMonth(date);
    setInitial(firstDateOfMonth);
    setFinal(lastDateOfMonth);
  }

  return (
    <div className="grid grid-cols-4 justify-center gap-2 md:col-span-full sm:col-2 sm:grid-cols-1 md:grid-cols-4 sm:items-center md:row-[2] 2xl:col-[3] 2xl:row-[1] 2xl:grid-cols-2">
      <Button onClick={() => setMonth(3)}>{formatName(3)}</Button>
      <Button onClick={() => setMonth(2)}>{formatName(2)}</Button>
      <Button onClick={() => setMonth(1)}>{formatName(1)}</Button>
      <Button onClick={() => setMonth(0)}>{formatName(0)}</Button>
    </div>
  );
}
