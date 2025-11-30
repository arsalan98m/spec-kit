# Quickstart: Personal Expense Tracker Feature

**Branch**: `001-expense-tracker`  
**Spec**: `specs/001-expense-tracker/spec.md`  
**Plan**: `specs/001-expense-tracker/plan.md`

## What this feature does

This feature adds a personal expense tracker to the app that lets a person:

- Add expenses with amount, date, category, and an optional description.
- See a dashboard of expenses for a selected date range, including a total.
- Delete expenses that were added by mistake.

Data is stored locally in the browser using `localStorage` and is not shared across devices or users. No authentication
is required.

## Running the app

1. Install dependencies (from project root):

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open the app in a browser (default `http://localhost:3000`) and navigate to the expenses dashboard route
   at `/expenses`.

## Core flows to test

1. **Add an expense**

   - Open the expenses dashboard.
   - Fill in amount, date, category, and description.
   - Submit and verify the expense appears in the list for the currently selected date range.

2. **View totals for a date range**

   - Select a date range that includes several expenses.
   - Apply the range.
   - Confirm that the list shows only expenses within that range.
   - Confirm that the total matches the sum of the visible expenses.

3. **Delete an expense**
   - From the list, choose an expense to delete.
   - Confirm the expense disappears from the list and that the total is updated.

## Notes & Constraints

- Data is stored in browser `localStorage` for a single person using a single browser; clearing storage or switching
  browsers/devices will remove or hide existing data.
- There is no authentication; this is intentionally a personal tracker.
- The UI should remain usable and feel fast for up to a few thousand expenses per person.
