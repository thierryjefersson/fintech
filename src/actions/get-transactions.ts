'use server';

import { format, subDays } from 'date-fns';

export type Transacoes = {
  id: string;
  nome: string;
  preco: number;
  status: 'processando' | 'pago' | 'falha';
  pagamento: 'boleto' | 'cartao' | 'pix';
  parcelas: number | null;
  data: string;
};

export default async function getTransactions(
  dateInitial?: string,
  dateFinal?: string,
) {
  const dateFinalDefault = format(new Date(), 'yyyy/MM/dd');
  const dateInitialDefault = format(subDays(new Date(), 14), 'yyyy/MM/dd');

  try {
    const response = await fetch(
      `https://data.origamid.dev/vendas/?inicio=${
        dateInitial ? dateInitial : dateInitialDefault
      }&final=${dateFinal ? dateFinal : dateFinalDefault}`,
      { next: { revalidate: 165 } },
    );
    if (!response.ok)
      throw new Error('Error ao coletar os dados das transações.');
    const transações = (await response.json()) as Transacoes[];
    return { data: transações, ok: true };
  } catch (error) {
    return {
      ok: false,
      data: null,
      error: error instanceof Error ? error.message : 'Error desconhecido',
    };
  }
}
