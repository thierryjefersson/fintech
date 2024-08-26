'use client';
import React from 'react';
import { useData } from '@/context/data-context';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

export default function TransactionsTable() {
  const { transacoes } = useData();
  const [search, setSearch] = React.useState('');
  if (transacoes === null) return null;
  return (
    <div className="flex flex-col mt-3">
      <div className="my-3 self-start flex items-center gap-4">
        <Input
          type="text"
          placeholder="Buscar pedido ou nome..."
          id="search"
          name="search"
          value={search}
          className="w-[240px] sm:w-72"
          onChange={(e) => setSearch(e.target.value)}
        />
        <label
          htmlFor="search"
          className="font-semibold text-sm flex items-center gap-2"
        >
          <Search className="size-5" />
          Filtrar resultados
        </label>
      </div>
      <Table>
        <TableCaption>Lista de transações</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Pedido</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Forma de pagamento</TableHead>
            <TableHead className="text-right">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transacoes
            .filter(
              (transacao) =>
                transacao.id.toLowerCase().includes(search.toLowerCase()) ||
                transacao.nome.toLowerCase().includes(search.toLowerCase()),
            )
            .map((transacao) => (
              <TableRow key={transacao.id}>
                <TableCell className="font-mono">{transacao.id}</TableCell>
                <TableCell className="capitalize">{transacao.status}</TableCell>
                <TableCell className="font-semibold ">
                  {transacao.nome}
                </TableCell>
                <TableCell className="capitalize">
                  {transacao.pagamento === 'cartao'
                    ? 'Cartão'
                    : transacao.pagamento}
                </TableCell>
                <TableCell className="text-right">
                  {transacao.preco.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">
              {transacoes
                .filter(
                  (transacao) =>
                    transacao.id.toLowerCase().includes(search.toLowerCase()) ||
                    transacao.nome.toLowerCase().includes(search.toLowerCase()),
                )

                .reduce((acc, item) => acc + item.preco, 0)
                .toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
