# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript (strict) with Next.js App Router [confirm or NEEDS CLARIFICATION if deviating]  
**Primary Dependencies**: Next.js, React, Tailwind CSS, Zod [extend with feature-specific libraries or mark NEEDS CLARIFICATION]  
**Storage**: [e.g., PostgreSQL, SQLite, external API, or N/A — MUST be explicitly stated for features that touch data]  
**Testing**: [e.g., Jest, Testing Library, Playwright or NEEDS CLARIFICATION]  
**Target Platform**: Web application (Next.js)  
**Project Type**: Web app (Expense Tracker)  
**Performance Goals**: [domain-specific, e.g., dashboard load under X ms, filters apply under Y ms, or NEEDS CLARIFICATION]  
**Constraints**: [domain-specific, e.g., <200ms p95 for key flows, <100MB memory, offline-capable sections, or NEEDS CLARIFICATION]  
**Scale/Scope**: [domain-specific, e.g., number of users, volume of expenses, number of concurrent sessions or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Technology Stack & Architecture**: Confirms feature uses Next.js App Router, TypeScript (strict), Tailwind CSS, React
  Server Components for data fetching, and Server Actions for mutations unless a justified exception is documented.
- **Coding Standards & Validation**: Confirms functional arrow components, naming conventions, no `any` types, and Zod
  validation for all external inputs and Server Actions.
- **UI/UX & Accessibility**: Confirms mobile-first responsive design, semantic HTML, keyboard accessibility, and clear
  loading/success/error feedback for all async flows.
- **Testing & Quality**: Confirms unit tests for complex logic, appropriate use of Next.js error boundaries, and that
  quality gates (type-checking, linting, tests as required) are planned.
- **Documentation & Spec Compliance**: Confirms the feature spec, plan, and tasks remain the source of truth and will be
  updated when implementation details change.

If any gate cannot be satisfied, the violation MUST be recorded with rationale and follow-up tasks in the plan.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
