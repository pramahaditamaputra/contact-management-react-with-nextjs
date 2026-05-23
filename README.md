# Contact CRUD App

A modern Contact CRUD application built with **Next.js**, **TypeScript**, **Redux Toolkit**, and **TanStack Query** using a **feature-based clean architecture** approach.

This project was created as a frontend coding test submission with a focus on:
- clean and scalable architecture,
- strong UI/UX,
- reusable feature structure,
- unit-testable logic,
- maintainable data flow.

## Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **State Management:** Redux Toolkit
- **Server State:** TanStack Query
- **Forms:** React Hook Form + Zod
- **Styling:** Tailwind CSS / your preferred styling solution
- **Testing:** Vitest / Jest + React Testing Library
- **Architecture:** Feature-based Clean Architecture + ViewModel

## Features

- Contact list
- Contact detail
- Create contact
- Edit contact
- Delete contact
- Search / filter contacts
- Responsive UI
- Loading / empty / error states
- Unit tests for core logic

## Architecture Overview

The project follows a feature-based structure:

```txt
src/
├── app/
├── providers/
├── store/
├── shared/
├── features/
│   └── contact/
│       ├── domain/
│       ├── data/
│       └── presentation/
└── tests/
```

### Layer responsibilities

- `app/`: Next.js route entry points.
- `providers/`: App-wide providers such as Redux and QueryClient.
- `store/`: Root Redux store setup and typed hooks.
- `shared/`: Shared utilities, API client, UI components, and constants.
- `features/contact/domain/`: Entities, repository contracts, and use cases.
- `features/contact/data/`: API calls, mappers, and repository implementations.
- `features/contact/presentation/`: Views, ViewModels, query hooks, forms, components, and local UI state.
- `tests/`: Unit and integration tests.

## Data Flow

The flow is designed to keep UI, state, and data access separated:

```txt
View
→ ViewModel
→ TanStack Query hook
→ Use Case
→ Repository
→ API
→ Mapper
→ Entity
```

For UI state such as search/filter keyword, Redux is used as the source of truth.

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
git clone https://github.com/your-username/contact-crud-app.git
cd contact-crud-app
npm install
```

### Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_API_BASE_URL=https://contact.herokuapp.com
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
npm run test:watch
```

## API Integration

This app uses the provided Contact API for CRUD operations.

Base URL:
- `https://contact.herokuapp.com`

Main endpoints used:
- `GET /contact`
- `GET /contact/:id`
- `POST /contact`
- `PUT /contact/:id`
- `DELETE /contact/:id`

> The app is designed to adapt to the API response structure through mapper functions in the data layer.

## UI State vs Server State

- **Redux Toolkit** is used for UI state such as search/filter keyword and other shared client state.
- **TanStack Query** is used for server state, caching, refetching, and mutation invalidation.

This separation keeps the code easier to maintain and test.

## Testing Strategy

The project includes unit tests for important parts of the architecture:
- mappers,
- repository implementations,
- use cases,
- Redux slices,
- ViewModels.

Example test targets:
- `contact.mapper.test.ts`
- `get-contacts.use-case.test.ts`
- `contact-filter.slice.test.ts`

## Folder Structure

```txt
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── contacts/
│       ├── page.tsx
│       ├── create/page.tsx
│       ├── [id]/page.tsx
│       └── edit/[id]/page.tsx
│
├── providers/
│   ├── AppProvider.tsx
│   ├── ReduxProvider.tsx
│   └── QueryProvider.tsx
│
├── store/
│   ├── index.ts
│   ├── hooks.ts
│   └── types.ts
│
├── shared/
│   ├── api/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── theme/
│   └── constants/
│
├── features/
│   └── contact/
│       ├── domain/
│       ├── data/
│       └── presentation/
│
└── tests/
```

## Screens

- Contacts List
- Contact Detail
- Create Contact
- Edit Contact

## Deployment

You can deploy this app to:
- Vercel,
- Netlify,
- or any platform that supports Next.js.

## Notes

This project was built with a focus on:
- maintainability,
- readability,
- predictable data flow,
- separation of concerns,
- interview-ready code structure.

## License

This project is for educational and assessment purposes.