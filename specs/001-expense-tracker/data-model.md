# Data Model: Personal Expense Tracker

**Branch**: `001-expense-tracker`  
**Spec**: `specs/001-expense-tracker/spec.md`

## Entities

### Expense

- **Description**: Represents a single personal spending entry created by the person for their own tracking.
- **Fields**:
  - `id`: Stable identifier used to distinguish and delete specific expenses.
  - `amount`: Monetary value of the expense (non-negative).
  - `currency`: Currency code or symbol associated with the amount (for this feature, assume a single currency such as
    the person’s local currency).
  - `date`: Calendar date on which the expense occurred.
  - `category`: High-level category describing the expense (e.g., groceries, transport, rent, entertainment).
  - `description`: Optional free-text description to provide context.
  - `createdAt`: Timestamp recording when the expense was recorded in the app.
  - `updatedAt`: Timestamp recording when the expense was last edited (if editing is added in future).

- **Validation Rules**:
  - `id` MUST be unique among expenses stored on the device.
  - `amount` MUST be greater than or equal to zero.
  - `currency` SHOULD be consistent across all expenses for this personal tracker.
  - `date` MUST be a valid calendar date; future dates SHOULD either be discouraged or clearly surfaced as such.
  - `category` MUST be one of the supported categories or a custom string if custom categories are later allowed.
  - `description` MAY be empty but SHOULD be limited to a reasonable length to avoid UI overflow.

### DashboardSummary

- **Description**: Aggregated view of expenses and totals for a chosen date range.
- **Fields**:
  - `from`: Start date of the selected range (inclusive).
  - `to`: End date of the selected range (inclusive).
  - `totalAmount`: Sum of `amount` of all expenses within the range.
  - `currency`: Currency associated with `totalAmount` (aligned with Expense currency).
  - `expenses`: Ordered list of `Expense` entities filtered to the chosen date range.

- **Validation Rules**:
  - `from` MUST be less than or equal to `to`.
  - `totalAmount` MUST equal the sum of `amount` values for `expenses` within the `[from, to]` range.

### DateRangeSelection

- **Description**: User’s currently selected date range used to filter expenses and totals.
- **Fields**:
  - `from`: Start date (inclusive).
  - `to`: End date (inclusive).

- **Validation Rules**:
  - `from` MUST be less than or equal to `to`.
  - Selection SHOULD be limited to a reasonable span (for example, a few years) to avoid accidental overly large ranges.

## Relationships & Lifecycle

- A `DashboardSummary` is derived from all stored `Expense` records filtered to the currently selected
  `DateRangeSelection`.
- `Expense` lifecycle:
  - **Create**: Person fills out the form and submits; data is validated and then persisted in `localStorage`.
  - **Read**: Expenses are loaded from `localStorage` on app load and when recalculating the dashboard for a new date
    range.
  - **Delete**: Person deletes an expense by id; that entry is removed from `localStorage` and from any in-memory
    collections; the current `DashboardSummary` is then recomputed.

## Storage Representation (localStorage)

- **Key**: A single logical key (e.g., `personal-expense-tracker:expenses`) will hold the serialized list of `Expense`
  objects.
- **Format**: JSON array of Expense records matching the structure above.
- **Considerations**:
  - The app MUST handle malformed JSON gracefully by showing a friendly error and offering a way to reset storage if
    needed.
  - The app SHOULD avoid exceeding reasonable storage limits by keeping attachments or large blobs out of the data
    model.


