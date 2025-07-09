# Sarah Barlow Photography

A SEO optimised replacement for Sarah's Photography portfolio website https://www.sbphotography.life

## Initial plan

- [ ] Recycle existing visual design as is
- [ ] Use https://tailwindcss.com/blog/tailwindcss-v4 for styling
- [ ] Keep https://storybook.js.org/ to document and test UI
- [ ] Use https://strapi.io/ as CMS (provides adimin interface for Sarah)
- [ ] Use https://nextjs.org/ under the hood (SSG mode)
- [ ] Deploy to https://vercel.com/

## Objectives

- Sarah need to fully own and admin the content
- SEO
- Minimal running costs (custom domain paid by Sarah)

## Development

```
npm i && npm run dev
```

## Deployemnt

The app gets deployes as a [**static site**](https://nextjs.org/docs/app/guides/static-exports)

Deploy is managed by [Vercel CLI](https://vercel.com/docs/cli?package-manager=npm)

See [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs) for more info.

Note Next.js server features aren't available in `static export` mode https://nextjs.org/docs/app/guides/static-exports#unsupported-features

```
vercel
```
