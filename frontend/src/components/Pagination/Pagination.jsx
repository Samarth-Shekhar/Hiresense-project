import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ pagination, onPageChange, disabled }) => {
  if (!pagination.total) {
    return null;
  }

  const firstTask = (pagination.page - 1) * pagination.limit + 1;
  const lastTask = Math.min(
    pagination.page * pagination.limit,
    pagination.total,
  );

  return (
    <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 text-sm dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-slate-500 dark:text-slate-400">
        Showing {firstTask}-{lastTask} of {pagination.total} tasks
      </p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={disabled || !pagination.hasPreviousPage}
          onClick={() => onPageChange(pagination.page - 1)}
          className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-3 py-2 font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <FiChevronLeft aria-hidden="true" />
          Previous
        </button>
        <span className="text-slate-600 dark:text-slate-300">
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button
          type="button"
          disabled={disabled || !pagination.hasNextPage}
          onClick={() => onPageChange(pagination.page + 1)}
          className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-3 py-2 font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Next
          <FiChevronRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
