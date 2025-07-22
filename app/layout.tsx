import Image from 'next/image';
import Link from 'next/link';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { fetchAllPortfolios } from '../lib/api';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: portfolios } = await fetchAllPortfolios();
  const pages = [];

  if (Array.isArray(portfolios)) {
    pages.push(
      ...portfolios.map(({ slug, title }) => ({ slug, title })),
      { slug: 'booking', title: 'Booking' },
      { slug: 'about', title: 'About' }
    );
  }

  // TODO add default meta tags

  return (
    <html lang="en">
      <body>
        <Link href="/">
          <h1>
            <Image
              src="/logo.avif"
              alt="Sarah Barlow Photography"
              width={202}
              height={202}
            />
          </h1>
        </Link>
        <nav>
          <li>
            <Link href="/">Home</Link>
          </li>
          {pages.map((page) => (
            <li key={page.slug}>
              <Link href={'/' + page.slug}>{page.title}</Link>
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
