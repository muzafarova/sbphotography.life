import Image from 'next/image';
import Link from 'next/link';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { fetchAllPortfolios, fetchGlobal } from '../lib/api';
import type { Global } from '../lib/types';
import Menu from '../components/Menu';

import './globals.css';
import { title } from 'process';

export async function generateMetadata() {
  const robots = {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  };

  const defaultDescription =
    'Family, motherhood and weddings. Essex, United Kingdom.';
  try {
    const { data: global } = await fetchGlobal();

    const title = {
      template: '%s | Sarah Barlow, Photographic Artist in Essex',
      default: global?.siteName || 'Documenting The Art of Life',
    };

    return {
      title,
      description: global?.siteDescription || defaultDescription,
      robots,
      category: 'photography',
    };
  } catch (err) {
    return {
      title,
      description: defaultDescription,
      robots,
      category: 'photography',
    };
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header className="relative flex flex-row-reverse items-start max-w-7xl mx-auto">
          <Link href="/" className="z-10 ml-auto">
            <Image
              src="/logo.avif"
              alt="Sarah Barlow Photography"
              width={202}
              height={202}
            />
          </Link>
          <div className="py-2 absolute top-0 left-0">
            <Menu pages={pages} />
          </div>
        </header>

        <main className="text-center mx-auto">{children}</main>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
