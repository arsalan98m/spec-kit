"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseInputSchema } from "@/features/expenses/schemas/expense.schema";
import type { ExpenseInput, Expense } from "@/features/expenses/types/expense";
import { addExpense } from "@/server/expenses/actions";

type ExpenseFormProps = {
  onAdded: (expense: Expense) => void;
};

export function ExpenseForm({ onAdded }: ExpenseFormProps) {
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseInput>({
    resolver: zodResolver(expenseInputSchema),
    defaultValues: {
      amount: 0,
      currency: "USD",
      date: new Date().toISOString().slice(0, 10),
      category: "",
      description: "",
    },
  });

  const onSubmit = (values: ExpenseInput) => {
    setSubmitError(null);

    startTransition(async () => {
      try {
        const expense = await addExpense(values);
        onAdded(expense);
        reset({
          ...values,
          amount: 0,
          description: "",
        });
      } catch (error) {
        console.error(error);
        setSubmitError(
          "Could not save your expense. Please try again.",
        );
      }
    });
  };

  const disabled = isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-100">
            Amount
          </label>
          <input
            type="number"
            step="0.01"
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-0 transition-colors placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-50"
            {...register("amount", { valueAsNumber: true })}
            disabled={disabled}
          />
          {errors.amount && (
            <p className="text-xs text-red-600">
              {errors.amount.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-100">
            Date
          </label>
          <input
            type="date"
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-0 transition-colors placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-50"
            {...register("date")}
            disabled={disabled}
          />
          {errors.date && (
            <p className="text-xs text-red-600">
              {errors.date.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-100">
            Category
          </label>
          <input
            type="text"
            placeholder="e.g., Groceries"
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-0 transition-colors placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-50"
            {...register("category")}
            disabled={disabled}
          />
          {errors.category && (
            <p className="text-xs text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-100">
            Currency
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-0 transition-colors placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-50"
            {...register("currency")}
            disabled={disabled}
          />
          {errors.currency && (
            <p className="text-xs text-red-600">
              {errors.currency.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-100">
          Description (optional)
        </label>
        <textarea
          rows={3}
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-0 transition-colors placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-50"
          placeholder="Add a short note about this expense"
          {...register("description")}
          disabled={disabled}
        />
        {errors.description && (
          <p className="text-xs text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      {submitError && (
        <p
          className="text-sm text-red-600"
          role="status"
          aria-live="polite"
        >
          {submitError}
        </p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={disabled}
          className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
        >
          {isPending ? "Adding..." : "Add expense"}
        </button>
      </div>
    </form>
  );
}


