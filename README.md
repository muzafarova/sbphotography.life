# Sarah Barlow Photography

A SEO optimised replacement for Sarah's Photography portfolio website https://www.sbphotography.life.

## Idea

Implement as static website, put it on CDN. Use headless CMS on the backend. Generate static assets on demand (on code change), and automatically (on content change). Focus on SEO, performance (web vitals), visuals (image quality). Stick to free plans. Minimal to no dev maintenance.

## Initial plan

- [ ] Recycle existing visual design as is
- [ ] Use https://tailwindcss.com/blog/tailwindcss-v4 for styling
- [ ] Keep https://storybook.js.org/ to document and test UI
- [x] Use https://strapi.io/ as CMS (provides adimin interface for Sarah)
- [x] Use https://nextjs.org/ under the hood (SSG mode)
- [x] Deploy to https://vercel.com/

## Sarah's existing content migration plan

- [ ] About https://www.sbphotography.life/about
- [ ] Home (grid with links)
- [ ] Price Guide & Bookings https://www.sbphotography.life/contact-2
- [ ] Contact Form https://www.sbphotography.life/contact-2
- [ ] Product and Brand Photography (grid with no links)
- [ ] Weddings (grid with no links)
- [ ] Insta feed
- [ ] Footer (contact details, socials)

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

Deploy is managed by [Vercel CLI](https://vercel.com/docs/cli?package-manager=npm):

```
vercel
```

Links:

- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Next's server features](https://nextjs.org/docs/app/guides/static-exports#unsupported-features) aren't available in the `static exports` mode

## Analytics

[Vercel Web Analytics](https://vercel.com/docs/analytics)

## Speed Insights

[Core Web Vitals](https://vercel.com/docs/speed-insights#core-web-vitals-explained) collected by Vercel.

Note: if self-hosting in the future, refer to this https://vercel.com/docs/frameworks/nextjs?package-manager=npm#reportwebvitals
