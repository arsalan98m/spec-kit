// End-to-end scenario outline for the Personal Expense Tracker.
//
// This file describes the flows that should be automated with a browser
// testing framework such as Playwright. The scenarios are written in a way
// that they can be translated into concrete tests later.
//
// Scenario 1: Add an expense
//  - Navigate to /expenses.
//  - Fill in amount, date, category, description.
//  - Submit the form.
//  - Verify the overview shows the total count of expenses updated.
//
// Scenario 2: View totals for a date range
//  - With multiple expenses in different months, navigate to /expenses.
//  - Select a date range that covers some of the expenses.
//  - Apply the range.
//  - Verify that the list shows only expenses within that range.
//  - Verify that the total matches the sum of visible expenses.
//
// Scenario 3: Delete an expense
//  - With at least one expense in the selected range, navigate to /expenses.
//  - Apply a date range that includes the expense.
//  - Click Delete on the target expense.
//  - Verify that the expense disappears from the list and that the total
//    updates to exclude the deleted amount.


