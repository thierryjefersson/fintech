import CardSummary from '@/components/card-summary';
import TransactionsChart from '@/components/chart/chart-transitions';

export default function Home() {
  return (
    <section className="mt-3">
      <CardSummary />
      <TransactionsChart />
    </section>
  );
}
