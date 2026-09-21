# SOCIALIZE — Developer Collaboration Platform

SOCIALIZE is a social platform built for software developers, open-source maintainers, and tech communities.

## Architecture & Tech Stack

- **Framework:** Next.js (App Router, React 19, Server Components)
- **Database & Auth:** Supabase (PostgreSQL, Supabase Auth, Row Level Security)
- **Data Access:** Supabase Data API (`@supabase/ssr`)
- **Styling:** Tailwind CSS, Lucide Icons
- **Validation:** Zod
- **Testing:** Vitest

## Getting Started

### 1. Prerequisites
- Node.js >= 20.9.0
- npm >= 10.0.0

### 2. Environment Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Setup & Migrations
Using Supabase CLI:
```bash
supabase init
supabase start
supabase db reset
```

### 5. Running Local Development Server
```bash
npm run dev
```

### 6. Quality Checks & Testing
```bash
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript type checker
npm run test       # Run Vitest test suite
npm run build      # Production Next.js build
```

## Security & Architecture Highlights
- **Row Level Security (RLS):** All runtime database operations use RLS policies with `auth.uid()`.
- **Data API Only:** Direct SQL or traditional ORMs are avoided in favor of Supabase Data API.
- **Type Safety:** Generated database types directly match PostgreSQL schema migrations.
