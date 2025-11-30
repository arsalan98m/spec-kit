import ExpensesShell from "@/features/expenses/components/ExpensesShell";

export default function ExpensesPage() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <section className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-10">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Personal Expense Tracker
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Add, review, and delete your personal expenses. This dashboard
            starts with adding expenses, and later phases will add date-range
            summaries and deletion.
          </p>
        </header>

        <ExpensesShell />
      </section>
    </main>
  );
}
