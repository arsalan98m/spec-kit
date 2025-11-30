# Contracts: Personal Expense Tracker (Expenses)

**Branch**: `001-expense-tracker`  
**Spec**: `specs/001-expense-tracker/spec.md`

The feature is primarily implemented via Next.js Server Actions and client-side localStorage rather than public HTTP
APIs. The contracts below describe the logical operations that Server Actions must implement.

## Logical Operations (Server Actions)

### 1. `addExpense`

- **Purpose**: Validate and accept a new expense from the client, returning the normalized record to be persisted in
  localStorage on the client.
- **Input (payload)**:
  - `amount`: number (>= 0, required)
  - `currency`: string (optional; defaults to a configured currency)
  - `date`: string (ISO date, required)
  - `category`: string (required)
  - `description`: string (optional)
- **Output**:
  - `expense`: normalized `Expense` object, including generated `id`, `createdAt`, and `updatedAt`.
- **Error Cases**:
  - Validation error → return a structured error indicating which fields are invalid and why.

### 2. `deleteExpense`

- **Purpose**: Confirm that a requested expense id is valid to remove and return the id to be removed from localStorage.
- **Input (payload)**:
  - `id`: string (required)
- **Output**:
  - `id`: the same id, indicating successful logical deletion.
- **Error Cases**:
  - Unknown id → return a structured error indicating that the expense could not be found (client may treat this as
    already-deleted).

### 3. `getDashboardSummary`

- **Purpose**: Given a requested date range and a list of expenses (e.g., loaded from localStorage), compute a
  `DashboardSummary` including filtered expenses and totals.
- **Input (payload)**:
  - `from`: string (ISO date, required)
  - `to`: string (ISO date, required)
  - `expenses`: array of `Expense` objects loaded from localStorage
- **Output**:
  - `summary`: `DashboardSummary` object (from, to, totalAmount, currency, expenses in range).
- **Error Cases**:
  - Invalid date range (`from` > `to`) → structured error for date range selection.


