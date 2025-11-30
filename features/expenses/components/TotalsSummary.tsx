import type { DashboardSummary } from "@/features/expenses/types/expense";

type TotalsSummaryProps = {
  summary: DashboardSummary | null;
  isLoading: boolean;
  error: string | null;
  hasAppliedRange: boolean;
};

export default function TotalsSummary({
  summary,
  isLoading,
  error,
  hasAppliedRange,
}: TotalsSummaryProps) {
  if (error) {
    return (
      <p className="text-sm text-red-600" role="status">
        {error}
      </p>
    );
  }

  if (isLoading) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400" role="status">
        Calculating totals for the selected date range…
      </p>
    );
  }

  if (!hasAppliedRange) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Select a date range and apply it to see your total spending.
      </p>
    );
  }

  if (!summary || summary.expenses.length === 0) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        No expenses found for this date range.
      </p>
    );
  }

  const formattedFrom = new Date(summary.from).toLocaleDateString();
  const formattedTo = new Date(summary.to).toLocaleDateString();
  const formattedTotal = summary.totalAmount.toFixed(2);

  return (
    <div className="flex flex-col gap-1 text-sm text-zinc-800 dark:text-zinc-100">
      <p className="font-medium">
        Total spending from{" "}
        <span className="font-semibold">{formattedFrom}</span> to{" "}
        <span className="font-semibold">{formattedTo}</span>:
      </p>
      <p className="text-lg font-semibold">
        {summary.currency} {formattedTotal}
      </p>
      <p className="text-xs text-zinc-600 dark:text-zinc-400">
        Based on {summary.expenses.length} expense
        {summary.expenses.length === 1 ? "" : "s"} in this range.
      </p>
    </div>
  );
}


