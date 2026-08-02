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
    <div className="mt-6 flex flex-col gap-3 border-t border-black/10 pt-5 text-sm dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-slate-500 dark:text-slate-400">
        Showing {firstTask}-{lastTask} of {pagination.total} tasks
      </p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={disabled || !pagination.hasPreviousPage}
          onClick={() => onPageChange(pagination.page - 1)}
          className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 font-bold text-slate-700 shadow-sm ring-1 ring-black/5 hover:bg-[#e7e9e1] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white/5 dark:text-slate-200 dark:ring-white/10 dark:hover:bg-white/10"
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
          className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 font-bold text-slate-700 shadow-sm ring-1 ring-black/5 hover:bg-[#e7e9e1] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white/5 dark:text-slate-200 dark:ring-white/10 dark:hover:bg-white/10"
        >
          Next
          <FiChevronRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
