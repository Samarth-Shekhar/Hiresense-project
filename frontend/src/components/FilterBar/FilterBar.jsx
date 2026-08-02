import {
  DUE_DATE_OPTIONS,
  PRIORITY_OPTIONS,
  SORT_OPTIONS,
  STATUS_OPTIONS,
} from '../../utils/constants.js';

const selectClassName =
  'w-full rounded-full border border-black/5 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none focus:border-[#9dcc20] focus:ring-2 focus:ring-[#b9f227]/30 dark:border-white/10 dark:bg-white/5 dark:text-slate-200';

const quickFilterClassName = (active) =>
  `shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
    active
      ? 'bg-[#b9f227] text-[#14211d]'
      : 'bg-white text-slate-600 shadow-sm ring-1 ring-black/5 hover:bg-[#e7e9e1] dark:bg-white/5 dark:text-slate-300 dark:ring-white/10 dark:hover:bg-white/10'
  }`;

const FilterBar = ({ filters, onChange, onClear, hasActiveFilters }) => (
  <div className="space-y-3">
    <div className="flex gap-2 overflow-x-auto pb-1">
      <button
        type="button"
        onClick={onClear}
        className={quickFilterClassName(!hasActiveFilters)}
      >
        All tasks
      </button>
      <button
        type="button"
        onClick={() => onChange('dueDate', filters.dueDate === 'today' ? '' : 'today')}
        className={quickFilterClassName(filters.dueDate === 'today')}
      >
        Due today
      </button>
      <button
        type="button"
        onClick={() => onChange('priority', filters.priority === 'high' ? '' : 'high')}
        className={quickFilterClassName(filters.priority === 'high')}
      >
        High priority
      </button>
    </div>

    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <label>
        <span className="sr-only">Priority</span>
        <select
          value={filters.priority}
          onChange={(event) => onChange('priority', event.target.value)}
          className={selectClassName}
        >
          <option value="">All priorities</option>
          {PRIORITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span className="sr-only">Status</span>
        <select
          value={filters.status}
          onChange={(event) => onChange('status', event.target.value)}
          className={selectClassName}
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span className="sr-only">Due date</span>
        <select
          value={filters.dueDate}
          onChange={(event) => onChange('dueDate', event.target.value)}
          className={selectClassName}
        >
          {DUE_DATE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <div className="flex gap-2">
        <label className="min-w-0 flex-1">
          <span className="sr-only">Sort tasks</span>
          <select
            value={filters.sort}
            onChange={(event) => onChange('sort', event.target.value)}
            className={selectClassName}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="shrink-0 rounded-full px-3 text-sm font-bold text-[#29463f] hover:bg-white dark:text-[#b9f227] dark:hover:bg-white/10"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  </div>
);

export default FilterBar;
