# Contact CRUD App

![Node](https://img.shields.io/badge/Node.js-24%20LTS-339933?logo=nodedotjs&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.2.6-000000?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.x-764ABC?logo=redux)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.x-FF4154?logo=reactquery&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-7.x-EC5990?logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3.x-3E67B1)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-06B6D4?logo=tailwindcss&logoColor=white)
![Vitest](https://img.shields.io/badge/tests-vitest-ff69b4)
![Testing Library](https://img.shields.io/badge/Testing%20Library-14.x-E33332?logo=testinglibrary&logoColor=white)
![Coverage](https://img.shields.io/badge/coverage-97.57%25-brightgreen)
![CI](https://github.com/pramahaditamaputra/contact-management-react-with-nextjs/actions/workflows/ci.yml/badge.svg)

A modern Contact CRUD application built with Next.js + React 19, TypeScript, Redux Toolkit and TanStack Query following a feature-based clean architecture.

## Tech Stack

- Framework: Next.js 16 + React 19
- Language: TypeScript 5
- State Management: Redux Toolkit
- Server State: TanStack Query
- Forms: React Hook Form + Zod
- Styling: Tailwind CSS (configured)
- Testing: Vitest + Testing Library

## Getting Started

Prerequisites:

- Node.js 24 LTS
- npm

Install dependencies:

```bash
npm install
```

Environment variables (create `.env`):

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
└── features/
	└── contact/
		├── data/          # Data sources, mappers, repository implementation
		│   ├── api/
		│   ├── mappers/
		│   └── repositories/
		├── domain/        # Entities, repository contracts, use cases
		│   ├── entities/
		│   ├── repositories/
		│   └── usecases/
		└── presentation/  # UI components, views, state, queries, viewmodels
			├── components/
			├── forms/
			├── queries/
			├── state/
			├── viewmodels/
			└── views/
```

## Architecture Diagram

[View Full Diagram](https://drive.google.com/file/d/1ZDjshRsDEX_M5En0DOM41eeZm5PTrCBb/view)

![Clean Architecture Diagram](https://drive.google.com/uc?export=view&id=1ZDjshRsDEX_M5En0DOM41eeZm5PTrCBb)

## Testing

Unit and component tests are implemented with Vitest and Testing Library. Run:

```bash
npm run test
npm run coverage
```

## Notes

- The app is structured for maintainability and testability using a feature-based clean architecture.
- Redux handles local/UI state (search/filter), while TanStack Query handles server state and caching.