import {
  DUE_DATE_OPTIONS,
  PRIORITY_OPTIONS,
  SORT_OPTIONS,
  STATUS_OPTIONS,
} from '../../utils/constants.js';

const selectClassName =
  'w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100';

const FilterBar = ({ filters, onChange, onClear, hasActiveFilters }) => (
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
          className="shrink-0 rounded-md px-3 text-sm font-medium text-blue-600 hover:bg-blue-50"
        >
          Clear
        </button>
      )}
    </div>
  </div>
);

export default FilterBar;
