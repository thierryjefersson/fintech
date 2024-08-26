'use client';

import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Transacoes } from '@/actions/get-transactions';
import { Card, CardContent } from '../ui/card';
import { useData } from '@/context/data-context';

type TransactionDay = {
  data: string;
  pago: number;
  processando: number;
  falha: number;
};

function transformData(data: Transacoes[]): TransactionDay[] {
  const dias = data.reduce((acc: { [key: string]: TransactionDay }, item) => {
    const dia = item.data.split(' ')[0];
    if (!acc[dia]) {
      acc[dia] = {
        data: dia,
        pago: 0,
        processando: 0,
        falha: 0,
      };
    }
    acc[dia][item.status] += item.preco;
    return acc;
  }, {});
  return Object.values(dias).map((dia) => ({
    ...dia,
    data: dia.data.substring(5),
  }));
}

export default function TransactionsChart() {
  const { transacoes, pending } = useData();
  if (transacoes === null) return null;
  const transformDate = transformData(transacoes);

  return (
    <div>
      <Card className="mt-3">
        <CardContent>
          <ResponsiveContainer height={400} width={'99%'} className="pt-5">
            <LineChart data={transformDate}>
              <XAxis dataKey="data" />
              <YAxis dataKey="pago" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pago"
                stroke="#387908"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="falha"
                stroke="red"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
