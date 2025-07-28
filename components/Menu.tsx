'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Menu({
  pages,
}: {
  pages: { slug: string; title: string }[];
}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col md:flex-row w-full flex-wrap text-sm p-4 bg-white/70 backdrop-opacity-15">
      <Link
        href="/"
        className={`inline-block px-3 py-1 hover:bg-stone-100 transition ease-in duration-100 ${
          pathname === '/' ? 'bg-stone-200' : 'bg-transparent'
        }`}
      >
        Home
      </Link>
      {pages.map((page) => (
        <Link
          key={page.slug}
          href={'/' + page.slug}
          className={`inline-block px-3 py-1 hover:bg-stone-100 transition ease-in duration-100 ${
            pathname.includes(page.slug) ? 'bg-stone-200' : 'bg-transparent'
          }`}
        >
          {page.title}
        </Link>
      ))}
    </nav>
  );
}
