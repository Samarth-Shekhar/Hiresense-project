import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ value, onChange }) => (
  <div className="relative">
    <label className="sr-only" htmlFor="task-search">
      Search tasks
    </label>
    <FiSearch
      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
      aria-hidden="true"
    />
    <input
      id="task-search"
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-md border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      placeholder="Search title or description"
    />
    {value && (
      <button
        type="button"
        onClick={() => onChange('')}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        aria-label="Clear search"
      >
        <FiX aria-hidden="true" />
      </button>
    )}
  </div>
);

export default SearchBar;
