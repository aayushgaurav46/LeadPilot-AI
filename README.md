# LeadPilot AI — Marketing / Demo Site

A portfolio/demo website for **LeadPilot AI**, a concept AI lead-conversion
product for real-estate teams. Built with React, Vite, TypeScript, and
Tailwind CSS. All product data (leads, scores, conversations, ROI figures)
is simulated and clearly labeled as demo/example content — there is no
backend, database, authentication, or real integrations in this version.

## Getting started

Requires [Node.js](https://nodejs.org/) 18+ and npm.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

Other scripts:

```bash
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build locally
```

> **Note:** This project was generated in a sandboxed environment without
> internet access, so `npm install` could not be run or verified here. The
> code was written carefully and passed a TypeScript syntax check, but
> please run it locally and let me know if you hit any dependency-version
> issues — they're usually a one-line fix in `package.json`.

## Project structure

```
src/
  components/    All presentational sections (Navbar, Hero, AIDemo, etc.)
  pages/         Home.tsx — assembles the full page
  data/          demoData.ts (mock content) + types.ts (shared types)
  App.tsx
  main.tsx
```

## What's real vs. simulated

- The **interactive AI demo**, **lead dashboard**, **ROI calculator**, and
  **workflow diagram** are all fully interactive in the browser, but run
  entirely on local mock data — nothing is sent to a server or an AI model.
- No claims of real customers, revenue, or case studies are made anywhere
  on the site. Simulated sections are explicitly labeled ("Demo Data",
  "Example workflow", "Illustrative estimate").
- Intended as a foundation to wire up a real backend, CRM integration, and
  live AI qualification later.

## Design notes

- Palette: near-white canvas, near-black text, deep-blue accent (`#2452E8`).
- Type: Manrope (display/headings) + Inter (body/UI, tabular numbers for data).
- Fully responsive: dedicated mobile nav, stacked mobile cards for the lead
  table, and a horizontally-scrollable canvas for the automation workflow.
