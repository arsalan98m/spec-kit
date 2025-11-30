import {
  type DashboardSummary,
  type DateRangeSelection,
  type Expense,
  type ExpenseInput,
} from "../types/expense";

const parseDate = (value: string): Date => new Date(value);

const isWithinRange = (
  date: string,
  range: DateRangeSelection,
): boolean => {
  const time = parseDate(date).getTime();
  const from = parseDate(range.from).getTime();
  const to = parseDate(range.to).getTime();
  return time >= from && time <= to;
};

export const createExpense = (
  input: ExpenseInput,
  now: Date = new Date(),
): Expense => {
  const timestamp = now.toISOString();
  return {
    id: crypto.randomUUID(),
    amount: input.amount,
    currency: input.currency,
    date: input.date,
    category: input.category,
    description: input.description ?? "",
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

export const filterExpensesByRange = (
  expenses: Expense[],
  range: DateRangeSelection,
): Expense[] =>
  expenses
    .filter((expense) => isWithinRange(expense.date, range))
    .sort(
      (a, b) =>
        parseDate(b.date).getTime() - parseDate(a.date).getTime(),
    );

export const calculateTotalAmount = (expenses: Expense[]): number =>
  expenses.reduce((sum, expense) => sum + expense.amount, 0);

export const buildDashboardSummary = (
  expenses: Expense[],
  range: DateRangeSelection,
  currency: string,
): DashboardSummary => {
  const inRange = filterExpensesByRange(expenses, range);
  const totalAmount = calculateTotalAmount(inRange);

  return {
    from: range.from,
    to: range.to,
    totalAmount,
    currency,
    expenses: inRange,
  };
};


