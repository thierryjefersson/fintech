import TransactionsTable from '@/components/transactions-table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vendas | Fintech',
};

export default function VendasPage() {
  return (
    <section className="my-3">
      <TransactionsTable />
    </section>
  );
}
