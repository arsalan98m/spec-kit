'use client';

import { useEffect } from 'react';

type ExpensesErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ExpensesError({
  error,
  reset,
}: ExpensesErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className='flex min-h-screen w-full items-center justify-center bg-background text-foreground'>
      <section className='mx-auto flex max-w-md flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-6 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950'>
        <h1 className='text-lg font-semibold tracking-tight'>
          Something went wrong
        </h1>
        <p
          className='text-sm text-zinc-600 dark:text-zinc-400'
          role='alert'
          aria-live='polite'
        >
          An unexpected error occurred while loading your expenses. You can
          try again, or return to the dashboard.
        </p>
        <button
          type='button'
          onClick={reset}
          className='inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200'
        >
          Try again
        </button>
      </section>
    </main>
  );
}


