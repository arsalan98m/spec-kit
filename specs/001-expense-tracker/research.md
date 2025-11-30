# Research & Decisions: Personal Expense Tracker

**Branch**: `001-expense-tracker`  
**Date**: 2025-11-30  
**Spec**: `specs/001-expense-tracker/spec.md`

## Technology & Architecture

### Decision: Next.js App Router with Server Actions

- **Decision**: Use Next.js (App Router) with React Server Components for data-fetching views and Next.js Server Actions
  for all mutations related to expenses (add, delete) and for computing derived values (totals for a date range).
- **Rationale**: Aligns with the project Constitution (server-first architecture, Server Actions for mutations) and takes
  advantage of built-in Next.js patterns for modern React apps.
- **Alternatives considered**:
  - Classic Pages Router with API routes: rejected to stay aligned with App Router-first architecture.
  - Client-only state with no Server Actions: rejected because the Constitution requires Server Actions for mutations.

### Decision: Device-Local Persistence via `localStorage`

- **Decision**: Use browser `localStorage` as the primary persistence mechanism for expenses, scoped to the current
  browser/device and single user, accessed from client components via a small helper module.
- **Rationale**: The spec explicitly calls for a personal tracker with no authentication and persistence that is local
  to the user. `localStorage` satisfies this need with minimal setup and no additional backend infrastructure.
- **Alternatives considered**:
  - Server-side database (SQLite/PostgreSQL): rejected as unnecessary complexity for a single-user, no-auth tracker.
  - File-based JSON storage on the server: rejected for similar reasons and potential deployment limitations.
  - IndexedDB: more flexible than `localStorage` but overkill for simple key-value style storage of a modest number of
    expense records.

### Decision: Balance with Constitution (Server Actions + localStorage)

- **Decision**: Keep business rules (validation, totals, basic transformations) in Server Actions and shared pure
  utility functions, while treating `localStorage` as the persistence layer on the client side.
- **Rationale**: This approach keeps the mutation “traffic” flowing through Server Actions conceptually while honoring
  the user requirement that persistence live in `localStorage`. Server Actions can be used to validate and normalize
  data before it is written to `localStorage` by the client.
- **Alternatives considered**:
  - Ignoring Server Actions and performing all logic in the client: rejected to avoid violating the Constitution.
  - Introducing a full backend database only to satisfy the Constitution: rejected as disproportionate to the
    single-user, personal scope.

## Testing Stack

### Decision: Jest + React Testing Library + Playwright (Light E2E)

- **Decision**: Use Jest with React Testing Library for unit and component tests, and Playwright for a small number of
  end-to-end tests that cover the main flows (add, view, delete within a chosen date range).
- **Rationale**: These tools are common in the Next.js ecosystem, work well with TypeScript, and provide a good balance
  between confidence and setup cost for a small feature.
- **Alternatives considered**:
  - Cypress instead of Playwright: viable but Playwright has strong first-class support for modern browsers and
    integrates well with CI.
  - No E2E tests: rejected because the core flows are simple enough to validate end-to-end, and the Constitution
    emphasizes quality.

## Performance & Offline Behavior

### Decision: Optimized for a Few Thousand Expenses

- **Decision**: Target smooth behavior for up to roughly 2,000 expenses per device; beyond that, performance tuning or
  pagination may be needed in future iterations.
- **Rationale**: This limit is reasonable for a personal tracker and keeps implementation straightforward without heavy
  optimization or virtualization from day one.
- **Alternatives considered**:
  - Designing for 10,000+ expenses from the start: rejected as premature optimization for the current scope.

### Decision: Basic Offline Tolerance (Deferred Detailed Strategy)

- **Decision**: The app should continue to work for core flows (add, view, delete expenses) if the page is already
  loaded, leveraging `localStorage`. A more formal offline/caching strategy (e.g., service workers) is deferred.
- **Rationale**: The spec and user input do not require full offline-first behavior; localStorage naturally helps
  preserve data offline without extra complexity.
- **Alternatives considered**:
  - Implementing full PWA with service worker caching: deferred to avoid complexity for this initial feature.


