import type { Expense } from "@/features/expenses/types/expense";

type ExpenseListProps = {
  expenses: Expense[];
  hasAnyExpenses: boolean;
  hasAppliedRange: boolean;
  onDelete: (expenseId: string) => void;
  deletingId: string | null;
};

const formatDate = (value: string): string =>
  new Date(value).toLocaleDateString();

const formatAmount = (amount: number): string =>
  amount.toFixed(2);

export default function ExpenseList({
  expenses,
  hasAnyExpenses,
  hasAppliedRange,
  onDelete,
  deletingId,
}: ExpenseListProps) {
  if (!hasAnyExpenses) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        You have not recorded any expenses yet. Add your first expense
        using the form above.
      </p>
    );
  }

  if (!hasAppliedRange) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Select a date range and apply it to see the expenses that fall
        within that period.
      </p>
    );
  }

  if (expenses.length === 0) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        There are no expenses in this date range. Try adjusting the
        range to see more results.
      </p>
    );
  }

  return (
    <div className="mt-3 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-zinc-50 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2 text-right">Amount</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr
              key={expense.id}
              className="border-t border-zinc-100 text-zinc-800 dark:border-zinc-800 dark:text-zinc-100"
            >
              <td className="px-4 py-2 align-top">
                {formatDate(expense.date)}
              </td>
              <td className="px-4 py-2 align-top">
                {expense.category}
              </td>
              <td className="px-4 py-2 align-top text-zinc-700 dark:text-zinc-300">
                {expense.description || "—"}
              </td>
              <td className="px-4 py-2 align-top text-right">
                {expense.currency} {formatAmount(expense.amount)}
              </td>
              <td className="px-4 py-2 align-top text-right">
                <button
                  type="button"
                  onClick={() => onDelete(expense.id)}
                  disabled={deletingId === expense.id}
                  className="text-xs font-medium text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deletingId === expense.id ? "Deleting…" : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


