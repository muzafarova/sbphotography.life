import Image from 'next/image';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { fetchAllPages, fetchAllPortfolios } from '../lib/api';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: pages } = await fetchAllPages();
  const { data: portfolios } = await fetchAllPortfolios();
  const items = [];
  if (Array.isArray(pages)) {
    items.push(...pages);
  }
  if (Array.isArray(portfolios)) {
    items.push(...portfolios);
  }

  return (
    <html lang="en">
      <body>
        <a href="/">
          <h1>
            <Image
              src="/logo.avif"
              alt="Sarah Barlow Photography"
              width={202}
              height={202}
            />
          </h1>
        </a>
        <nav>
          <li>
            <a href="/">Home</a>
          </li>

          {items.map((item) => (
            <li key={item.slug}>
              <a href={'/' + item.slug}>{item.title}</a>
            </li>
          ))}
        </nav>
        {children}

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
