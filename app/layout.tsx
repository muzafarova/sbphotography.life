import Image from 'next/image';
import Link from 'next/link';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { fetchAllPortfolios, StrapiRequest } from '../lib/api';

import './globals.css';

export async function generateMetadata() {
  const defaultMeta = {
    siteName: 'Sarah Barlow, Photographic Artist',
    siteDescription:
      'Documenting The Art of Life. Family, motherhood and weddings. Essex, United Kingdom',
  };
  try {
    const { data: global } = await StrapiRequest<{
      siteName: string;
      siteDescription: string;
    }>('/global');

    return {
      title: global?.siteName || defaultMeta.siteName,
      description: global?.siteDescription || defaultMeta.siteDescription,
    };
  } catch (err) {
    return defaultMeta;
  }
}

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
