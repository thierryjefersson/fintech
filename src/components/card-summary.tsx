'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useData } from '@/context/data-context';
import { CircleDollarSign, Loader, PackageCheck } from 'lucide-react';

export default function CardSummary() {
  const { transacoes } = useData();

  if (transacoes === null) return null;
  return (
    <div className="flex flex-col gap-3 md:row-[3] md:flex-row md:col-span-full *:flex-1 sm:col-span-full">
      <Card className="flex justify-between items-center pr-5">
        <CardHeader>
          <CardTitle className="text-xl">Vendas</CardTitle>
          <CardDescription>
            {transacoes
              .filter((item) => item.status !== 'falha')
              .reduce((acc, item) => acc + item.preco, 0)
              .toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
          </CardDescription>
        </CardHeader>
        <CircleDollarSign className="text-muted-foreground" />
      </Card>
      <Card className="flex justify-between items-center pr-5">
        <CardHeader>
          <CardTitle className="text-xl">Recebido</CardTitle>
          <CardDescription>
            {transacoes
              .filter((item) => item.status === 'pago')
              .reduce((acc, item) => acc + item.preco, 0)
              .toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
          </CardDescription>
        </CardHeader>
        <PackageCheck className="text-muted-foreground" />
      </Card>
      <Card className="flex justify-between items-center pr-5">
        <CardHeader>
          <CardTitle className="text-xl">Processando</CardTitle>
          <CardDescription>
            {transacoes
              .filter((item) => item.status === 'processando')
              .reduce((acc, item) => acc + item.preco, 0)
              .toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
          </CardDescription>
        </CardHeader>
        <Loader className="text-muted-foreground" />
      </Card>
    </div>
  );
}
