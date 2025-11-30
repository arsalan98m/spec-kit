"use client";

import { useEffect, useState } from "react";
import type {
  DashboardSummary,
  Expense,
} from "@/features/expenses/types/expense";
import {
  loadExpenses,
  saveExpenses,
} from "@/features/expenses/lib/expenses-client";
import {
  deleteExpense as deleteExpenseAction,
  getDashboardSummary,
} from "@/server/expenses/actions";
import { ExpenseForm } from "./ExpenseForm";
import TotalsSummary from "./TotalsSummary";
import ExpenseList from "./ExpenseList";

export default function ExpensesShell() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [from, setFrom] = useState<string>(
    new Date().toISOString().slice(0, 10),
  );
  const [to, setTo] = useState<string>(
    new Date().toISOString().slice(0, 10),
  );
  const [hasAppliedRange, setHasAppliedRange] = useState(false);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(
    null,
  );
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    setExpenses(loadExpenses());
  }, []);

  const refreshSummary = async (
    currentExpenses: Expense[],
    currentFrom: string,
    currentTo: string,
  ) => {
    if (!currentFrom || !currentTo) {
      return;
    }

    setIsLoadingSummary(true);
    setSummaryError(null);

    try {
      const result = await getDashboardSummary({
        from: currentFrom,
        to: currentTo,
        expenses: currentExpenses,
      });
      setSummary(result);
    } catch (error) {
      console.error(error);
      setSummaryError(
        "Could not calculate totals for this date range. Please try again.",
      );
    } finally {
      setIsLoadingSummary(false);
    }
  };

  const handleAdded = (expense: Expense) => {
    setExpenses((previous) => {
      const updated = [expense, ...previous];
      saveExpenses(updated);

      if (hasAppliedRange) {
        void refreshSummary(updated, from, to);
      }

      return updated;
    });
  };

  const handleDelete = async (id: string) => {
    setDeleteError(null);

    const existing = expenses.find((expense) => expense.id === id);
    if (!existing) {
      setDeleteError(
        "This expense was already removed. Refresh the page to see the latest data.",
      );
      return;
    }

    setDeletingId(id);
    try {
      await deleteExpenseAction({ id });

      const updated = expenses.filter(
        (expense) => expense.id !== id,
      );
      setExpenses(updated);
      saveExpenses(updated);

      if (hasAppliedRange) {
        await refreshSummary(updated, from, to);
      } else {
        setSummary(null);
      }
    } catch (error) {
      console.error(error);
      setDeleteError(
        "Could not delete this expense. Please try again.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleApplyRange = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setHasAppliedRange(true);

    if (expenses.length === 0) {
      setSummary(null);
      setSummaryError(
        "You have no expenses yet. Add an expense before applying a date range.",
      );
      return;
    }

    await refreshSummary(expenses, from, to);
  };

  return (
    <div className="space-y-4">
      <ExpenseForm onAdded={handleAdded} />

      <section className="space-y-4 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <header className="space-y-1">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Overview
          </h2>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            You have recorded{" "}
            <span className="font-semibold">{expenses.length}</span>{" "}
            expense{expenses.length === 1 ? "" : "s"} on this device.
            Choose a date range to see matching expenses and totals.
          </p>
        </header>

        <form
          onSubmit={handleApplyRange}
          className="grid gap-3 md:grid-cols-[1fr,1fr,auto]"
          aria-label="Select date range for expenses"
        >
          <div className="space-y-1">
            <label
              htmlFor="from"
              className="block text-xs font-medium uppercase tracking-wide text-zinc-600 dark:text-zinc-300"
            >
              From
            </label>
            <input
              id="from"
              type="date"
              value={from}
              onChange={(event) => setFrom(event.target.value)}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-0 transition-colors placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-50"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="to"
              className="block text-xs font-medium uppercase tracking-wide text-zinc-600 dark:text-zinc-300"
            >
              To
            </label>
            <input
              id="to"
              type="date"
              value={to}
              onChange={(event) => setTo(event.target.value)}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-0 transition-colors placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-50"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
            >
              Apply range
            </button>
          </div>
        </form>

        <TotalsSummary
          summary={summary}
          isLoading={isLoadingSummary}
          error={summaryError}
          hasAppliedRange={hasAppliedRange}
        />

        {deleteError && (
          <p className="text-sm text-red-600">{deleteError}</p>
        )}

        <ExpenseList
          expenses={summary?.expenses ?? []}
          hasAnyExpenses={expenses.length > 0}
          hasAppliedRange={hasAppliedRange}
          onDelete={handleDelete}
          deletingId={deletingId}
        />
      </section>
    </div>
  );
}


