import type { Page, Portfolio, Gallery } from './types';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchPageBySlug(slug: string) {
  const res = await StrapiRequest<Page[]>('/pages', {
    populate: ['illustration'],
    filters: [['slug', slug]],
  });
  return fetchBySlugPresetner<Page>(res);
}

export async function fetchAllPortfolios() {
  return StrapiRequest<Portfolio[]>('/portfolios');
}

export async function fetchPortfolioByDocumentId(documentId: string) {
  return StrapiRequest<Portfolio>(
    `/portfolios/${documentId}?populate[gallery][populate][0]=photos`
  );
}

export async function fetchPortfolioBySlug(slug: string) {
  const res = await StrapiRequest<Portfolio[]>(`/portfolios`, {
    populate: ['*'],
    filters: [['slug', slug]],
  });
  return fetchBySlugPresetner<Portfolio>(res);
}

export async function fetchAllGalleries() {
  return StrapiRequest<Gallery[]>('/galleries', {
    populate: ['photos'],
    filters: [['featured', 'true']],
  });
}

export async function fetchGalleryByDocumentId(documentId: string) {
  return StrapiRequest<Gallery>(`/galleries/${documentId}`, {
    populate: ['photos'],
  });
}

type Options = {
  populate?: string[];
  filters?: [string, string][];
};

export async function StrapiRequest<T>(path: string, options?: Options) {
  let url = apiUrl + path;

  if (options?.populate) {
    url =
      url +
      '?' +
      options.populate.map((populate) => `populate=${populate}`).join('&');
  }
  if (options?.filters) {
    url =
      url +
      '&' +
      options.filters
        .map((filter) => `filters[${filter[0]}][$eq]=${filter[1]}`)
        .join('&');
  }

  try {
    console.info('Request:', url);
    const res = await fetch(url);
    return (await res.json()) as {
      data: T | null;
      error: Error | null;
    };
  } catch (err: unknown) {
    console.error(err);
    return {
      data: null,
      error: new Error(
        err instanceof Error
          ? err.message
          : typeof err === 'string'
          ? err
          : 'Something failed'
      ),
    };
  }
}

function fetchBySlugPresetner<T>(res: {
  data: T[] | null;
  error: Error | null;
}) {
  if (res.error) {
    return { data: null, error: res.error };
  } else if (Array.isArray(res.data)) {
    return {
      data: res.data[0],
      error: res.error,
    };
  } else {
    return {
      data: null,
      error: new Error(`Unexpected data type ${typeof res.data}`),
    };
  }
}
