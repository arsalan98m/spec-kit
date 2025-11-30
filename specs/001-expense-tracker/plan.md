# Implementation Plan: Personal Expense Tracker

**Branch**: `001-expense-tracker` | **Date**: 2025-11-30 | **Spec**: `specs/001-expense-tracker/spec.md`  
**Input**: Feature specification from `specs/001-expense-tracker/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a personal, single-user expense tracker that lets a person add, view, and delete expenses (amount, date,
category, description) and review totals for a chosen date range via a dashboard. The app is implemented as a Next.js
App Router application using TypeScript (strict), Tailwind CSS, React Server Components, and Server Actions, with
frontend localStorage used to persist expenses on the person’s device and no authentication.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript (strict) with Next.js App Router  
**Primary Dependencies**: Next.js, React, Tailwind CSS, Zod, React Hook Form (for forms)  
**Storage**: Browser `localStorage` as the primary persistence mechanism for expenses on a single device; in-memory data
  structures in server actions for validation and business logic  
**Testing**: Jest and React Testing Library for unit/component tests; Playwright for basic end-to-end checks (NEEDS CLARIFICATION: how much E2E coverage is required)  
**Target Platform**: Web application (Next.js)  
**Project Type**: Web app (single-user personal Expense Tracker)  
**Performance Goals**: Dashboard and expenses list should feel instant for up to 2,000 expenses per device; perceived
  load time under ~500 ms for main views under typical conditions  
**Constraints**: No authentication; data is scoped to a single browser/device. Feature should continue to work when
  offline once assets are loaded (NEEDS CLARIFICATION: level of offline support and caching strategy).  
**Scale/Scope**: Single person per device, hundreds to a few thousand expenses per person; no multi-user, no
  server-side aggregation, and no external integrations.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Technology Stack & Architecture**:  
  - Status: ✅ Aligned.  
  - Notes: Uses Next.js App Router, TypeScript (strict), Tailwind CSS, React Server Components for data fetching, and
    Server Actions for all mutations. A `server/expenses` folder will hold server-only helpers that are called from
    Server Actions and route handlers. Browser `localStorage` is used as device-local persistence; business logic
    (validation, shaping) still flows through Server Actions.

- **Coding Standards & Validation**:  
  - Status: ✅ Planned.  
  - Notes: All React components will be functional arrow components with PascalCase naming. Zod schemas will define
    `Expense` and related inputs; all Server Actions and route handlers will validate inputs via Zod before performing
    any logic. No `any` types will be introduced.

- **UI/UX & Accessibility**:  
  - Status: ✅ Planned.  
  - Notes: The main dashboard and expense form will be built mobile-first with Tailwind; buttons, inputs, and lists will
    use semantic HTML and be fully keyboard accessible. Loading, success, and error states for Server Actions will
    surface through disabled buttons, spinners, and toast/inline messages.

- **Testing & Quality**:  
  - Status: ✅ Planned (unit) / ⚠ E2E scope NEEDS CLARIFICATION.  
  - Notes: Core calculations (filtering by date range, totals, formatting) will have unit tests. Next.js `error.tsx` and
    `not-found.tsx` will be used where appropriate. E2E coverage will at minimum include “add expense”, “view dashboard
    totals”, and “delete expense”; exact breadth of E2E tests will be finalized during implementation.

- **Documentation & Spec Compliance**:  
  - Status: ✅ Planned.  
  - Notes: This plan and `spec.md` will remain the source of truth; any deviations (for example, changes in how
    localStorage is structured) will be reflected back into the spec/plan. Complex decisions (e.g., persistence model)
    are documented in `research.md` and `data-model.md`.

No hard Constitution violations are expected. The use of browser `localStorage` as persistence is acceptable for this
single-user personal tracker but will be called out explicitly in research and data model documents.

## Project Structure

### Documentation (this feature)

```text
specs/001-expense-tracker/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
app/
├── layout.tsx                  # App shell
├── page.tsx                    # Default landing page: may redirect to /expenses
└── expenses/
    ├── page.tsx                # Dashboard: list + date range + totals + add form
    └── error.tsx               # Route-level error boundary for expenses feature

features/
└── expenses/
    ├── components/
    │   ├── ExpenseForm.tsx     # Client component: form for adding expenses
    │   ├── ExpenseList.tsx     # Client component: list of expenses
    │   └── TotalsSummary.tsx   # Client component: summary totals for date range
    ├── lib/
    │   ├── expenses-client.ts  # Client-side helpers for localStorage read/write
    │   └── expenses-utils.ts   # Shared pure functions (e.g., totals, filtering)
    ├── schemas/
    │   └── expense.schema.ts   # Zod schemas for Expense, date range, inputs
    └── types/
        └── expense.ts          # TypeScript types derived from schemas

server/
└── expenses/
    ├── actions.ts              # Next.js Server Actions for add/delete/compute totals
    └── mappers.ts              # (Optional) mapping between client models and server DTOs

tests/
└── expenses/
    ├── unit/
    │   └── expenses-utils.test.ts    # Unit tests for calculations and filtering
    └── e2e/
        └── expenses.e2e.test.ts      # End-to-end flows: add, view, delete
```

**Structure Decision**: Single Next.js App Router application with a feature-focused folder under `features/expenses`
for UI and domain logic, a `server/expenses` folder for server-only logic used by Server Actions, and shared tests under
`tests/expenses`. Persistence is device-local via `localStorage` accessed from client components through a small helper
module; server code treats expenses as request-scope data passed from the client and is not responsible for long-term
storage.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
