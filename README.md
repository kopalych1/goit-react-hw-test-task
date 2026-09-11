# RentalCar

A frontend web application for a car rental company. Users can browse a home page, search and filter
a catalog of available cars, and view detailed information about a specific car with the option to
submit a booking request.

Built as a test task using Next.js App Router and TypeScript.

## Features

- **Home page** — hero section with a call to action leading to the catalog.
- **Catalog page** — browse all available cars with:
  - Server-side filtering by brand, price, and mileage range (min/max)
  - Infinite "Load more" pagination powered by TanStack Query's `useInfiniteQuery`
  - Loading state while cars are being fetched
  - Empty state with a "Reset filters" action when no cars match the current filters
- **Car details page** — opens in a new browser tab and displays:
  - Car photo, description, rental conditions, specifications, and features
  - A booking form with client-side validation
  - Success notification after a booking request is submitted

## Tech stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Query](https://tanstack.com/query/latest) — data fetching, caching, and infinite
  pagination
- [Axios](https://axios-http.com/) — HTTP requests
- [React Icons](https://react-icons.github.io/react-icons/) — icon set
- [React Hot Toast](https://react-hot-toast.com/) — notifications
- CSS Modules — styling

## Getting started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kopalych1/goit-react-hw-test-task/
   cd rental-car
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm run start
```

## Project structure

```
app/
├── layout.tsx              Root layout, global styles, fonts, providers
├── page.tsx                Home page
├── catalog/
│   ├── page.tsx             Catalog page (SSR prefetch)
│   ├── Catalog.client.tsx   Catalog client logic (filters, infinite query)
│   └── [carId]/
│       ├── page.tsx             Car details page (SSR prefetch)
│       └── CarDetails.client.tsx Car details client logic
components/                 Reusable UI components (Header, CarCard, FilterBar,
                             Loader, EmptyState, BookingForm, TanStackProvider)
lib/api/                    API layer (cars, booking requests)
types/                      Shared TypeScript types
```

## API

The application consumes a public car rental API providing endpoints for listing cars with filters
and pagination, fetching a single car by ID, retrieving available filter options, and submitting
booking requests.
