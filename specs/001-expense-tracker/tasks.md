---
description: "Task list for Personal Expense Tracker feature implementation"
---

# Tasks: Personal Expense Tracker

**Input**: Design documents from `/specs/001-expense-tracker/`  
**Prerequisites**: `plan.md` (required), `spec.md` (required for user stories), `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: Tests are not listed as separate tasks here. However, the Constitution requires unit tests for core logic
and appropriate error handling; implementers MUST include tests as part of the implementation tasks where relevant.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- This project (Next.js App Router): Use `app/` for routes/layouts, `features/` for feature modules (components, hooks,
  schemas, tests), `lib/` for shared utilities, and `public/` for static assets.
- Other layouts (backend/frontend/mobile) are not used for this feature.
- Paths in generated tasks MUST reflect the actual structure decided in `plan.md` and comply with the Constitution.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure for the expense tracker feature.

- [x] T001 Create `app/expenses/page.tsx` route and basic layout shell wired into `app/layout.tsx`
- [x] T002 Create feature folder structure under `features/expenses/` (`components/`, `lib/`, `schemas/`, `types/`)
- [x] T003 Create `server/expenses/` folder for server-only logic (`actions.ts`, `mappers.ts`)
- [x] T004 [P] Ensure Tailwind CSS is configured and available for `app/expenses/page.tsx`
- [x] T005 [P] Configure TypeScript settings (strict mode) to support `features/expenses` and `server/expenses` paths

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented.  
**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T006 Define `Expense` and related types in `features/expenses/types/expense.ts` based on `data-model.md`
- [x] T007 Define Zod schemas for `Expense` and `DateRangeSelection` in `features/expenses/schemas/expense.schema.ts`
- [x] T008 Implement pure helper functions for adding, deleting, and summarizing expenses in `features/expenses/lib/expenses-utils.ts`
- [x] T009 Implement client-side `localStorage` helpers in `features/expenses/lib/expenses-client.ts` (load, save, reset)
- [x] T010 Implement Next.js Server Actions for add/delete/summary in `server/expenses/actions.ts` using Zod validation and `expenses-utils`
- [x] T011 [P] Add `app/expenses/error.tsx` to handle route-level errors for the expenses dashboard

**Checkpoint**: Foundation ready – user story implementation can now begin in parallel.

---

## Phase 3: User Story 1 - Capture a New Expense (Priority: P1) 🎯 MVP

**Goal**: A person can quickly record a new personal expense with amount, date, category, and description.

**Independent Test**: From the main expenses screen, a person can add a valid expense and later see it listed with the
expected values and included in totals (once User Story 2 is implemented), without any other feature required.

### Implementation for User Story 1

- [x] T012 [P] [US1] Implement `ExpenseForm.tsx` in `features/expenses/components/ExpenseForm.tsx` using React Hook Form and Zod schemas
- [x] T013 [P] [US1] Wire `ExpenseForm` into `app/expenses/page.tsx` so the form renders on the dashboard page
- [x] T014 [US1] Connect `ExpenseForm` submit handler to `addExpense` Server Action in `server/expenses/actions.ts`
- [x] T015 [US1] On successful add, update client-side expenses via `features/expenses/lib/expenses-client.ts` and refresh the visible list
- [x] T016 [P] [US1] Implement inline validation and error messages in `ExpenseForm.tsx` for invalid amount, date, or missing category
- [x] T017 [US1] Provide user feedback (e.g., disabled submit + spinner and success/error toast or inline message) for add expense flow

**Checkpoint**: At this point, User Story 1 (add expense) should be fully functional and testable independently (form
submits, validation works, new items appear in the in-memory/client-side list).

---

## Phase 4: User Story 2 - Review Recent Expenses and Totals (Priority: P2)

**Goal**: A person can see a dashboard of their recent expenses and total spending for a chosen date range.

**Independent Test**: With several expenses already recorded, a person can open the dashboard, select a date range, see
only expenses in that range, and see the total accurately reflect those expenses.

### Implementation for User Story 2

- [x] T018 [P] [US2] Implement `TotalsSummary.tsx` in `features/expenses/components/TotalsSummary.tsx` to display totals and current date range
- [x] T019 [P] [US2] Implement date range selection UI (from/to controls) in `app/expenses/page.tsx` or a dedicated filter component under `features/expenses/components/`
- [x] T020 [US2] Wire date range selection to call `getDashboardSummary` logic in `server/expenses/actions.ts` (or via `expenses-utils`) using current expenses from `localStorage`
- [x] T021 [US2] Implement `ExpenseList.tsx` in `features/expenses/components/ExpenseList.tsx` to render expenses for the selected date range
- [x] T022 [US2] Integrate `ExpenseList` and `TotalsSummary` into `app/expenses/page.tsx` so they update when the date range changes
- [x] T023 [US2] Ensure empty states are handled gracefully (no expenses in range, or no expenses at all) with clear messaging

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently: a person can add expenses and then
review them and the totals for any chosen date range.

---

## Phase 5: User Story 3 - Remove an Incorrect Expense (Priority: P3)

**Goal**: A person can delete an expense they created by mistake and see totals update accordingly.

**Independent Test**: With at least one expense recorded, a person can delete that expense from the list and see it
disappear and no longer be counted in totals, without needing to add or edit any other expenses.

### Implementation for User Story 3

- [x] T024 [P] [US3] Add delete controls (e.g., delete button) to each expense row in `features/expenses/components/ExpenseList.tsx`
- [x] T025 [US3] Wire delete controls to the `deleteExpense` Server Action in `server/expenses/actions.ts`
- [x] T026 [US3] After a successful delete, update `localStorage` via `features/expenses/lib/expenses-client.ts` and refresh the list and totals
- [x] T027 [US3] Implement a confirmation step (e.g., confirm dialog or “are you sure?” UI) before permanently deleting an expense
- [x] T028 [US3] Handle attempted deletion of already-removed or unknown expenses gracefully (e.g., show a friendly message and refresh)

**Checkpoint**: At this point, User Stories 1, 2, and 3 should all be independently functional and testable.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories.

- [x] T029 [P] Review and refine Tailwind styling for `ExpenseForm`, `ExpenseList`, and `TotalsSummary` for mobile-first responsiveness
- [x] T030 Improve accessibility (focus management, ARIA labels, keyboard interactions) across expenses UI components in `features/expenses/components/`
- [x] T031 Add logging and error handling improvements around Server Actions in `server/expenses/actions.ts`
- [x] T032 [P] Add unit tests for `features/expenses/lib/expenses-utils.ts` (calculations, filtering, date range handling)
- [x] T033 [P] Add minimal end-to-end tests for add/view/delete flows in `tests/expenses/e2e/expenses.e2e.test.ts`
- [x] T034 Validate that `quickstart.md` instructions are accurate and update as needed

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies – can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion – BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion.
  - User stories can then proceed in parallel (if staffed).
  - Or sequentially in priority order (P1 → P2 → P3).
- **Polish (Final Phase)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) – no dependencies on other stories.
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) – should be able to run in parallel with US1 once core
  entities and Server Actions are in place, but relies on expenses being creatable to be meaningful.
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) – relies on list rendering and basic flows from US1/US2
  for a smooth UI, but deletion logic is largely independent.

### Within Each User Story

- Forms and UI components before wiring to Server Actions.
- Server Actions wiring before integrating with `localStorage`.
- Core implementation before deletion or error edge cases.
- Story complete before moving to the next priority, if working sequentially.

### Parallel Opportunities

- Setup tasks T001–T005 marked [P] can run in parallel where indicated.
- Foundational tasks such as Zod schemas, utils, and localStorage helpers (T006–T010) can be partially parallelized once
  type definitions are in place.
- Within each user story, tasks marked [P] can run in parallel (e.g., form implementation vs. list rendering).
- Different user stories can be worked on in parallel by different developers after Foundational completion.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational (CRITICAL – blocks all stories).
3. Complete Phase 3: User Story 1 (add expense).
4. **STOP and VALIDATE**: Manually test User Story 1 using `quickstart.md`.
5. Deploy/demo if ready for personal use.

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready.
2. Add User Story 1 → Test independently → Use as a minimal personal tracker.
3. Add User Story 2 → Test independently → Gain dashboard and totals.
4. Add User Story 3 → Test independently → Gain correction capability via delete.
5. Each story adds value without breaking previous stories.

### Parallel Team Strategy

With multiple contributors:

1. Team completes Setup + Foundational together.
2. Once Foundational is done:
   - Developer A: User Story 1 (add expense).
   - Developer B: User Story 2 (dashboard and totals).
   - Developer C: User Story 3 (deletion).
3. Stories complete and integrate independently, then Polish phase refines cross-cutting concerns.
