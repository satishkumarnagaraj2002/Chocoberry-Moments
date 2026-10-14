# Chocoberry Moments

A proposed Chocoberry live dessert experiences website built with Next.js App Router, TypeScript, Tailwind CSS 4, Motion for React, React Hook Form, Zod and Resend.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js. Checks: `npm run lint`, `npx tsc --noEmit` and `npm run build`.

## Edit the brand and content

- `src/config/brand.ts` contains the parent website, brand labels, SEO copy, contact placeholders, social accounts, service-area placeholder and optional budget setting.
- `src/data/experiences.ts` and `src/data/occasions.ts` contain the proposed concepts and imagery.
- `src/data/gallery.ts` controls gallery categories, imagery and captions.
- `src/app/globals.css` contains the palette, typography, layout and responsive presentation.
- `public/brand-lockup-light.svg`, `public/brand-lockup-dark.svg`, `public/brand-mark.svg` and `public/favicon.svg` are editable artwork, not copied trademark assets.

Replace the centralized Unsplash URLs with approved Chocoberry photographs before launch. Current images are stock demonstration photography and do not depict verified Chocoberry events.

## Configure enquiry email

Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL` and `ENQUIRY_TO_EMAIL` using a verified sender and approved recipient. Keep secrets in local environment variables or deployment settings; never commit `.env.local`. Without all three settings, `/api/enquiry` returns a not-configured response and the form explicitly confirms that the enquiry was not sent. This application does not persist submissions.

The API route applies a best-effort in-memory limit of 5 requests per 10 minutes per process, a honeypot and payload validation. In-memory limits do not coordinate across serverless instances. Add a managed shared rate limiter (such as Redis/KV) and operational monitoring before relying on this endpoint at production scale.

## Vercel deployment

Import the repository into Vercel and use the default Next.js build settings. Add the environment variables in project settings. Set `NEXT_PUBLIC_SITE_URL` to the approved production origin, redeploy, then connect the approved domain and verify DNS. The `example.com` fallback is a placeholder only; do not launch with it.

## Owner approval required before launch

- Confirm the proposed division name, relationship wording and each listed dessert experience.
- Approve business email, phone, WhatsApp, social profiles, service areas and event coverage.
- Confirm availability, minimum guest count, packages, pricing, deposits and cancellation terms.
- Replace all demo imagery with approved brand photographs and captions.
- Confirm email sender/recipient, enquiry access controls and retention practices.
- Have the privacy notice reviewed by the business owner and a qualified legal adviser.
- Approve the production domain and SEO metadata.
- Configure a distributed rate limiter and verify email delivery in production.

The site intentionally makes no claims about confirmed staffing, prices, awards, prior events, customer reviews or response times.
