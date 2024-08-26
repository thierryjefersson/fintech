import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mt-6">
      <h2 className="text-2xl mb-2">Página não encontrada</h2>
      <Link href="/">
        <Button>Volte para a página inicial</Button>
      </Link>
    </div>
  );
}
