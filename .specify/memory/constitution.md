<!--
Sync Impact Report
- Version change: N/A → 1.0.0
- Modified principles:
  - [PRINCIPLE_1_NAME] → I. Technology Stack & Architecture (NON-NEGOTIABLE)
  - [PRINCIPLE_2_NAME] → II. Coding Standards (NON-NEGOTIABLE)
  - [PRINCIPLE_3_NAME] → III. User Interface & User Experience (NON-NEGOTIABLE)
  - [PRINCIPLE_4_NAME] → IV. Testing & Quality (NON-NEGOTIABLE)
  - [PRINCIPLE_5_NAME] → V. Documentation & Spec Compliance (NON-NEGOTIABLE)
- Added sections:
  - Application Constraints & Technology Standards
  - Development Workflow & Review Process
- Removed sections:
  - None
- Templates requiring updates:
  - .specify/templates/plan-template.md ✅ updated
  - .specify/templates/spec-template.md ✅ aligned (no structural changes required)
  - .specify/templates/tasks-template.md ✅ updated
  - .specify/templates/agent-file-template.md ✅ aligned (no structural changes required)
  - .specify/templates/checklist-template.md ✅ aligned (no structural changes required)
  - .specify/templates/commands/* ⚠ pending (commands directory not present in this repository)
- Follow-up TODOs:
  - None
-->

# Expense Tracker Constitution

## Core Principles

### I. Technology Stack & Architecture (NON-NEGOTIABLE)

The Expense Tracker application MUST conform to the following technology and architectural rules:

- **Framework**: Next.js (latest stable) using the **App Router** under the `app/` directory for all user-facing routes.
- **Language**: TypeScript with `strict` mode enabled. The `any` type is forbidden; use precise types, generics, or Zod schemas.
- **Styling**: Tailwind CSS is the default styling system. Use Tailwind utility classes directly in JSX. CSS modules or other styling solutions MAY only be used when Tailwind cannot reasonably express a requirement (e.g., complex, reusable animations).
- **Data Fetching**: Prefer React Server Components (RSC) for data fetching and rendering. Client components SHOULD only be used when interactivity or browser-only APIs are required, and this MUST be explicit in the design.
- **State Management**: Use local `useState` / `useReducer` and React Context for client-side UI state. External global state libraries (Redux, Zustand, etc.) are prohibited unless explicitly justified in the plan and approved as a governance exception.
- **Data Mutation**: All in-app data mutations MUST be implemented via **Next.js Server Actions**. API routes (in `app/api` or `pages/api`) MAY only be created for external integrations (e.g., webhooks) where Server Actions are not applicable.
- **Feature Structure**: Organize features around the Expense Tracker domain (e.g., `expenses`, `budgets`, `reports`). Co-locate components, tests, and related logic inside feature folders (for example, `features/expenses/components/`, `features/expenses/lib/`, and route segments referencing those features).

Rationale: Locking the stack and architecture ensures a consistent, modern, and maintainable Next.js application that
is optimized for server rendering, clear separation between server and client concerns, and predictable feature
organization.

### II. Coding Standards (NON-NEGOTIABLE)

Code throughout the Expense Tracker MUST follow these standards:

- **Components**: All React components MUST be written as functional components using arrow functions.
- **Naming**:
  - Components use `PascalCase` (e.g., `ExpenseCard`, `DashboardLayout`).
  - Variables, functions, and hooks use `camelCase` (e.g., `formatCurrency`, `useExpenseFilters`).
  - Component file names MUST match the main exported component name (e.g., `ExpenseCard.tsx` defines `ExpenseCard`).
- **Type Safety**:
  - TypeScript `strict` mode MUST remain enabled.
  - The `any` type is not allowed; use interfaces, type aliases, discriminated unions, or Zod schemas instead.
  - Shared data contracts (e.g., `Expense`, `Budget`, `Category`) MUST live in reusable TypeScript types or Zod schemas
    under clearly defined shared modules (for example, `features/shared/types` or `features/shared/schemas`).
- **Validation**:
  - All input entering the system (forms, query params, route params, Server Actions, and external payloads) MUST be
    validated using **Zod**.
  - Server Actions MUST validate their input with Zod before performing any side effects or database operations.
- **Comments & Readability**:
  - Comments MUST explain **why** a non-obvious decision was made, not restate **what** the code does.
  - Complex functions, algorithms, or non-trivial architectural patterns MUST include a brief rationale comment and/or
    a reference to the relevant spec/plan section.

Rationale: Strict, consistent coding standards and validation reduce defects, make intent explicit, and allow the
Expense Tracker to evolve safely over time.

### III. User Interface & User Experience (NON-NEGOTIABLE)

The UI/UX of the Expense Tracker MUST meet the following requirements:

- **Responsiveness**:
  - Layouts follow a **mobile-first** approach and MUST render correctly on small screens up to large desktops.
  - Navigation, tables, charts, and forms MUST gracefully adapt to different breakpoints (no horizontal scrolling on
    mobile for primary flows).
- **Accessibility**:
  - Use semantic HTML elements (`button`, `nav`, `main`, `header`, `footer`, `section`, `form`, etc.) for structure and
    interactivity.
  - All interactive elements MUST be keyboard accessible (focusable, operable via keyboard only).
  - Provide accessible names/labels for controls via `aria-label`, `aria-labelledby`, or visible labels where
    appropriate.
  - Color choices MUST maintain sufficient contrast for readability.
- **Feedback & States**:
  - All asynchronous operations (form submissions, server actions, data loads) MUST provide immediate visual feedback,
    such as loading indicators, disabled buttons with spinners, or skeleton states.
  - Success and error outcomes MUST be clearly communicated, typically using toast notifications or inline validation
    messages tied to form fields.
  - Errors MUST be phrased in user-friendly language and, where possible, indicate how the user can resolve them.
- **Consistency**:
  - Reuse shared UI primitives (buttons, inputs, modals, dialogs, toasts) rather than re-implementing styling in each
    feature.
  - Information architecture (navigation, breadcrumbs, filter placement) MUST remain consistent across the app to avoid
    surprising users.

Rationale: A production-ready Expense Tracker must be pleasant, accessible, and predictable to use, minimizing friction
when users record and review financial information.

### IV. Testing & Quality (NON-NEGOTIABLE)

Quality practices for the Expense Tracker MUST include:

- **Unit Testing**:
  - Core business logic (e.g., aggregation of expenses, budget calculations, reporting filters, currency formatting)
    MUST be covered by unit tests.
  - Utility functions, hooks with non-trivial logic, and critical formatting/parsing code MUST have tests.
- **Error Handling**:
  - Use Next.js `error.tsx` and `not-found.tsx` for route-level error boundaries and 404 behavior.
  - Server Actions MUST handle and surface errors gracefully, converting low-level exceptions into user-appropriate
    messages while logging technical details where appropriate.
  - Fallback UI (e.g., error states for failed data fetches) MUST be designed, not left as raw exceptions or generic
    crash pages.
- **Quality Gates**:
  - No feature is considered complete until tests for complex logic pass, TypeScript builds cleanly (no `tsc` errors),
    and linting is clean for modified files.
  - Any intentional deviation from these quality gates MUST be documented in the plan (`Complexity Tracking` or risk
    sections) with a clear follow-up task.

Rationale: The financial nature of the Expense Tracker demands correctness and resilience; disciplined testing and
error handling are required to prevent regressions and protect user trust.

### V. Documentation & Spec Compliance (NON-NEGOTIABLE)

Documentation and specification practices MUST follow these rules:

- **Spec-Driven**:
  - All significant features MUST start with a spec under `/specs/...` following the `spec-template.md`.
  - The spec, plan, and tasks documents are the single source of truth for what is being built and why.
- **Documentation**:
  - Comments in code explain **why** an approach was chosen (trade-offs, constraints, alternatives considered), not
    restating straightforward logic.
  - When behavior deviates from or extends the existing spec, the spec and/or plan MUST be updated to remain accurate.
- **Traceability**:
  - Each feature’s implementation (PR, commits, tasks) SHOULD reference its corresponding spec and plan.
  - Complex or cross-cutting decisions (e.g., introducing a new dependency, changing data model shape) MUST be
    documented in the plan or an appropriate `docs/` or `features/*/docs` location.

Rationale: Spec-driven, well-documented development ensures the Expense Tracker remains understandable to future
contributors and to coding agents using this repository.

## Application Constraints & Technology Standards

This section defines additional, explicit constraints for the Expense Tracker application:

- **Scope**:
  - The application’s primary purpose is tracking expenses, budgets, and related financial summaries for users.
  - Features outside this scope (unrelated domains or experiments) MUST NOT be added without an accompanying spec that
    justifies the scope change and a governance-approved amendment if necessary.
- **Technology Constraints**:
  - The primary runtime is the Next.js application defined in this repository.
  - Backend logic SHOULD be colocated with the Next.js app (e.g., via Server Actions and shared libraries) unless
    external services are strictly required; any new service or external process MUST be justified in the plan.
  - Database, authentication, and external API choices MUST be documented in the plan for each feature that touches
    them, including constraints like rate limits, consistency models, and security requirements.
- **Performance & Security**:
  - New features MUST consider performance impact on core flows (loading the main dashboard, listing expenses, and
    running common filters). Any known risks MUST be highlighted in the plan.
  - Sensitive data (e.g., financial details, personally identifiable information) MUST NOT be logged in plaintext.
  - Client-visible identifiers and URLs MUST NOT expose internal implementation details that could leak sensitive
    information.

These constraints complement the core principles and SHOULD be referenced explicitly in specs and plans when designing
new capabilities.

## Development Workflow & Review Process

The development workflow for the Expense Tracker MUST align with spec-kit and this constitution:

- **Workflow Phases**:
  - **Specify**: Capture business requirements and user journeys in `/specs/.../spec.md`.
  - **Plan**: Use `/speckit.plan` to generate and refine `/specs/.../plan.md`, including technical context, data
    models, and Constitution Check outcomes.
  - **Tasks**: Use `/speckit.tasks` to derive actionable tasks in `/specs/.../tasks.md`, organized by user story.
  - **Implement**: Implement changes following the tasks, updating docs as reality diverges from initial assumptions.
- **Constitution Check**:
  - Every plan MUST include an explicit Constitution Check aligning with the five core principles, confirming:
    - The feature uses the approved Next.js + TypeScript + Tailwind + Zod stack.
    - Data fetching and mutations respect RSC and Server Actions rules.
    - Coding standards, validation, UI/UX, and testing expectations are met or consciously deferred with justification.
  - Any deviations MUST be documented with rationale and mitigation or follow-up tasks.
- **Code Review**:
  - Reviewers MUST verify Constitution compliance before approving changes.
  - PR descriptions SHOULD reference the related spec/plan/tasks sections and call out any intentional exceptions.
  - Features that add complexity (new dependencies, major architectural changes) MUST document why simpler options were
    rejected.

This workflow ensures that every feature is grounded in clear requirements, aligned with architectural principles, and
reviewed against non-negotiable standards.

## Governance

The Constitution defines non-negotiable standards for the Expense Tracker and supersedes conflicting practices
elsewhere in the repository.

- **Authority & Scope**:
  - This document governs all changes to the Next.js Expense Tracker application in this repository.
  - All contributors (human or coding agents) MUST comply with this Constitution when adding or modifying features.
- **Amendment Process**:
  - Amendments MUST be proposed via a pull request that:
    - Clearly states the motivation and impact of the change.
    - Updates this Constitution file, including the version and `Last Amended` date.
    - Includes any necessary migration or adaptation plan (e.g., updating templates, feature specs).
  - Backward-incompatible governance or principle changes (e.g., changing the tech stack, relaxing a
    NON-NEGOTIABLE rule) REQUIRE a **MAJOR** version bump and a documented migration strategy.
- **Versioning Policy**:
  - The Constitution uses **Semantic Versioning**:
    - **MAJOR**: Backward-incompatible governance or principle changes.
    - **MINOR**: New principles, sections, or materially expanded guidance.
    - **PATCH**: Clarifications, wording improvements, and typo fixes that do not change meaning.
  - Every merged change to this file MUST update the version number and `Last Amended` date.
- **Compliance & Review**:
  - Plan and task generation commands (`/speckit.plan`, `/speckit.tasks`, `/speckit.checklist`) MUST treat this
    Constitution as the source for Constitution Checks and quality gates.
  - Code reviews MUST explicitly confirm Constitution compliance or document approved exceptions.
  - Exceptions SHOULD be rare, time-boxed, and tracked via follow-up tasks.

**Version**: 1.0.0 | **Ratified**: 2025-11-30 | **Last Amended**: 2025-11-30
