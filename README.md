# Contact CRUD App

[![Release](https://img.shields.io/github/v/release/pramahaditamaputra/contact-management-react-with-nextjs)](https://github.com/pramahaditamaputra/contact-management-react-with-nextjs/releases/tag/v0.1.0)
![Node](https://img.shields.io/badge/node-%3E%3D_18-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-16.2.6-000000?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Vitest](https://img.shields.io/badge/tests-vitest-ff69b4)
![CI](https://github.com/pramahaditamaputra/contact-management-react-with-nextjs/actions/workflows/ci.yml/badge.svg)

A modern Contact CRUD application built with Next.js, TypeScript, Redux Toolkit and TanStack Query following a feature-based clean architecture.

Key points:
- Next.js 16 + React 19
- TypeScript 5
- Redux Toolkit for UI state
- TanStack Query for server state

## Quick status

- Project version: `0.1.0`
- Private package (not published to npm)

## Tech Stack

- Framework: Next.js 16
- Language: TypeScript 5
- State Management: Redux Toolkit
- Server State: TanStack Query
- Forms: React Hook Form + Zod
- Styling: Tailwind CSS (configured)
- Testing: Vitest + Testing Library

## Getting Started

Prerequisites:

- Node.js 18+
- npm / yarn / pnpm

Install dependencies:

```bash
npm install
```

Environment variables (create `.env.local`):

```bash
NEXT_PUBLIC_API_BASE_URL=https://contact.herokuapp.com
```

Run development server:

```bash
npm run dev
```

Open http://localhost:3000

## Available Scripts

```bash
npm run dev        # start dev server
npm run build      # build for production
npm run start      # start production server
npm run lint       # run eslint
npm run test       # run vitest (watch mode depends on your config)
npm run coverage   # run tests with coverage
```

## API

This app expects a contacts API. Default base URL used in development:

- `NEXT_PUBLIC_API_BASE_URL=https://contact.herokuapp.com`

Main endpoints used:

- `GET /contact`
- `GET /contact/:id`
- `POST /contact`
- `PUT /contact/:id`
- `DELETE /contact/:id`

## Project Structure (high level)

```
src/
├── app/           # Next.js routes
├── providers/     # App providers (Redux, QueryClient)
├── store/         # Redux store + hooks
├── shared/        # Shared UI, api client, utilities
└── features/      # Feature modules (contact)
```

## Testing

Unit and component tests are implemented with Vitest and Testing Library. Run:

```bash
npm run test
npm run coverage
```

## Notes

- The app is structured for maintainability and testability using a feature-based clean architecture.
- Redux handles local/UI state (search/filter), while TanStack Query handles server state and caching.

---

If you'd like, I can also add a GitHub Actions workflow and CI status badge, or update the badges to point to your repository. Want me to do that next?
CI badge points to `pramahaditamaputra/contact-management-react-with-nextjs`.