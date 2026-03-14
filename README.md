# MJ Concierge Services

Premium marketing website for MJ Concierge Services — cleaning, private chauffeurs, and photography in Orlando, FL.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Editing Content

All business content (name, phone, email, services, copy) lives in:

```
src/content/site-data.ts
```

Edit that file to update anything on the site without touching components.

## Stack

- Next.js 16 (App Router)
- TypeScript (strict)
- Tailwind CSS v4
- Framer Motion
- CSS 3D transforms for the business card hero

## Project Structure

```
src/
├── app/           → pages, layout, global styles
├── components/    → all UI components
└── content/       → editable site data
```
