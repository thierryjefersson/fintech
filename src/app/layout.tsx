import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/mode-theme/theme.provider';
import Nav from '@/components/sidenav/nav';
import HeaderMain from '@/components/header-main/header-main';
import { DataContextProvider } from '@/context/data-context';
import getTransactions from '@/actions/get-transactions';
import { subDays } from 'date-fns';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fintech',
  description: 'Site de finanças',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await getTransactions();
  const today = new Date();
  const fourteenDaysAgo = subDays(today, 14);

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background antialiased',
          inter.className,
        )}
      >
        <DataContextProvider
          today={today}
          fourteenDaysAgo={fourteenDaysAgo}
          transactionDefault={data}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Nav />
            <main className="sm:ml-14 px-4 py-3">
              <HeaderMain />
              {children}
            </main>
          </ThemeProvider>
        </DataContextProvider>
      </body>
    </html>
  );
}
