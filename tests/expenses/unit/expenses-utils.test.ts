import {
  calculateTotalAmount,
  filterExpensesByRange,
  buildDashboardSummary,
} from "@/features/expenses/lib/expenses-utils";
import type { Expense } from "@/features/expenses/types/expense";

const makeExpense = (overrides: Partial<Expense>): Expense => ({
  id: overrides.id ?? "id",
  amount: overrides.amount ?? 0,
  currency: overrides.currency ?? "USD",
  date: overrides.date ?? "2025-01-01",
  category: overrides.category ?? "General",
  description: overrides.description ?? "",
  createdAt: overrides.createdAt ?? "2025-01-01T00:00:00.000Z",
  updatedAt: overrides.updatedAt ?? "2025-01-01T00:00:00.000Z",
});

(() => {
  const expenses: Expense[] = [
    makeExpense({ id: "1", amount: 10, date: "2025-01-01" }),
    makeExpense({ id: "2", amount: 15.5, date: "2025-01-05" }),
    makeExpense({ id: "3", amount: 4.5, date: "2025-02-01" }),
  ];

  const total = calculateTotalAmount(expenses);
  console.assert(
    total === 30,
    `Expected total to be 30, received ${total}`,
  );

  const range = { from: "2025-01-01", to: "2025-01-31" };
  const januaryExpenses = filterExpensesByRange(expenses, range);
  console.assert(
    januaryExpenses.length === 2,
    `Expected 2 January expenses, received ${januaryExpenses.length}`,
  );

  const summary = buildDashboardSummary(expenses, range, "USD");
  console.assert(
    summary.totalAmount === 25.5,
    `Expected summary total to be 25.5, received ${summary.totalAmount}`,
  );
})();


