import { z } from "zod";

export const expenseInputSchema = z.object({
  amount: z
    .number()
    .nonnegative({ message: "Amount must be greater than or equal to zero" }),
  currency: z.string().min(1, { message: "Currency is required" }),
  date: z
    .string()
    .refine(
      (value) => !Number.isNaN(Date.parse(value)),
      { message: "Invalid date" },
    ),
  category: z.string().min(1, { message: "Category is required" }),
  description: z
    .string()
    .max(500, { message: "Description is too long" })
    .optional()
    .or(z.literal("")),
});

export const expenseSchema = expenseInputSchema.extend({
  id: z.string().min(1),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const dateRangeSelectionSchema = z
  .object({
    from: z
      .string()
      .refine(
        (value) => !Number.isNaN(Date.parse(value)),
        { message: "Invalid from date" },
      ),
    to: z
      .string()
      .refine(
        (value) => !Number.isNaN(Date.parse(value)),
        { message: "Invalid to date" },
      ),
  })
  .refine(
    (range) => Date.parse(range.from) <= Date.parse(range.to),
    {
      message: "`from` must be before or equal to `to`",
      path: ["to"],
    },
  );

export const dashboardSummarySchema = z.object({
  from: z.string(),
  to: z.string(),
  totalAmount: z
    .number()
    .nonnegative({ message: "Total amount cannot be negative" }),
  currency: z.string().min(1),
  expenses: z.array(expenseSchema),
});

export const deleteExpenseInputSchema = z.object({
  id: z.string().min(1, { message: "Expense id is required" }),
});

export const dashboardSummaryInputSchema = z.object({
  from: z
    .string()
    .refine(
      (value) => !Number.isNaN(Date.parse(value)),
      { message: "Invalid from date" },
    ),
  to: z
    .string()
    .refine(
      (value) => !Number.isNaN(Date.parse(value)),
      { message: "Invalid to date" },
    ),
  expenses: z.array(expenseSchema),
});


