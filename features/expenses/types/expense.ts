import type { z } from "zod";
import {
  dashboardSummaryInputSchema,
  dashboardSummarySchema,
  dateRangeSelectionSchema,
  deleteExpenseInputSchema,
  expenseInputSchema,
  expenseSchema,
} from "../schemas/expense.schema";

export type ExpenseInput = z.infer<typeof expenseInputSchema>;
export type Expense = z.infer<typeof expenseSchema>;
export type DateRangeSelection = z.infer<typeof dateRangeSelectionSchema>;
export type DashboardSummary = z.infer<typeof dashboardSummarySchema>;
export type DeleteExpenseInput = z.infer<typeof deleteExpenseInputSchema>;
export type DashboardSummaryInput = z.infer<
  typeof dashboardSummaryInputSchema
>;

export const LOCAL_STORAGE_KEY_EXPENSES =
  "personal-expense-tracker:expenses";


