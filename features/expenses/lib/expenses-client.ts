"use client";

import { z } from "zod";
import {
  LOCAL_STORAGE_KEY_EXPENSES,
  type Expense,
} from "../types/expense";
import { expenseSchema } from "../schemas/expense.schema";

const expensesArraySchema = z.array(expenseSchema);

export const loadExpenses = (): Expense[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY_EXPENSES);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return expensesArraySchema.parse(parsed);
  } catch {
    // If data is malformed, fail gracefully and treat as empty.
    return [];
  }
};

export const saveExpenses = (expenses: Expense[]): void => {
  if (typeof window === "undefined") {
    return;
  }

  const serialized = JSON.stringify(expenses);
  window.localStorage.setItem(LOCAL_STORAGE_KEY_EXPENSES, serialized);
};

export const resetExpenses = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(LOCAL_STORAGE_KEY_EXPENSES);
};


