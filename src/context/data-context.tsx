'use client';

import React from 'react';
import { format } from 'date-fns';
import getTransactions, { Transacoes } from '@/actions/get-transactions';

type DataContext = {
  transacoes: Transacoes[] | null;
  initial: Date;
  final: Date;
  setInitial: React.Dispatch<React.SetStateAction<Date>>;
  setFinal: React.Dispatch<React.SetStateAction<Date>>;
  pending: boolean;
};

export const DataContext = React.createContext<DataContext | null>(null);

export const useData = () => {
  const context = React.useContext(DataContext);
  if (!context) throw new Error('useData está fora do DataProvider');
  return context;
};

export const DataContextProvider = ({
  children,
  transactionDefault,
  today,
  fourteenDaysAgo,
}: {
  children: React.ReactNode;
  transactionDefault: Transacoes[] | null;
  today: Date;
  fourteenDaysAgo: Date;
}) => {
  const [initial, setInitial] = React.useState<Date>(fourteenDaysAgo);
  const [final, setFinal] = React.useState<Date>(today);
  const [pending, startTransition] = React.useTransition();
  const [transacoes, setTransacoes] = React.useState<Transacoes[] | null>(
    transactionDefault,
  );

  React.useEffect(() => {
    if (!initial && !final) return;
    startTransition(async () => {
      async function getData() {
        const dateInitial = format(initial, 'yyyy/MM/dd');
        const dateFinal = format(final, 'yyyy/MM/dd');
        const { data, ok } = await getTransactions(dateInitial, dateFinal);
        if (ok && data) setTransacoes(data);
      }
      getData();
    });
  }, [initial, final]);

  return (
    <DataContext.Provider
      value={{ final, initial, setFinal, setInitial, transacoes, pending }}
    >
      {children}
    </DataContext.Provider>
  );
};
