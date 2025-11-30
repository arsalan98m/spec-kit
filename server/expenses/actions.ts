'use server';

import {
  dashboardSummaryInputSchema,
  expenseInputSchema,
  deleteExpenseInputSchema,
} from '@/features/expenses/schemas/expense.schema';
import {
  type DashboardSummary,
  type DashboardSummaryInput,
  type DeleteExpenseInput,
  type Expense,
  type ExpenseInput,
} from '@/features/expenses/types/expense';
import {
  buildDashboardSummary,
  createExpense,
} from '@/features/expenses/lib/expenses-utils';

export async function addExpense(
  input: ExpenseInput,
): Promise<Expense> {
  try {
    const parsed = expenseInputSchema.parse(input);
    return createExpense(parsed);
  } catch (error) {
    console.error("[addExpense] Failed to add expense", error);
    throw error;
  }
}

export async function deleteExpense(
  input: DeleteExpenseInput,
): Promise<DeleteExpenseInput> {
  try {
    const parsed = deleteExpenseInputSchema.parse(input);
    return parsed;
  } catch (error) {
    console.error("[deleteExpense] Failed to validate expense id", error);
    throw error;
  }
}

export async function getDashboardSummary(
  input: DashboardSummaryInput,
): Promise<DashboardSummary> {
  try {
    const parsed = dashboardSummaryInputSchema.parse(input);

    const { from, to, expenses } = parsed;
    const range = { from, to };
    const currency = expenses[0]?.currency ?? 'USD';

    return buildDashboardSummary(expenses, range, currency);
  } catch (error) {
    console.error(
      "[getDashboardSummary] Failed to build summary",
      error,
    );
    throw error;
  }
}

