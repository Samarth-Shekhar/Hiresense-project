export const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

export const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'completed', label: 'Completed' },
];

export const DUE_DATE_OPTIONS = [
  { value: '', label: 'Any due date' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'today', label: 'Due today' },
  { value: 'upcoming', label: 'Upcoming' },
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'due-soonest', label: 'Due date: soonest' },
  { value: 'due-latest', label: 'Due date: latest' },
  { value: 'title-asc', label: 'Title: A to Z' },
  { value: 'title-desc', label: 'Title: Z to A' },
];

export const PRIORITY_STYLES = {
  low: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  medium: 'bg-lime-100 text-lime-800 dark:bg-lime-950/60 dark:text-lime-300',
  high: 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300',
};

export const STATUS_STYLES = {
  pending: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
  'in-progress': 'bg-lime-100 text-lime-800 dark:bg-lime-950/60 dark:text-lime-300',
  completed: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
};
