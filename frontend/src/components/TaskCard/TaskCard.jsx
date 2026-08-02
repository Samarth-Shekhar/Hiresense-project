import { FiCheck, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import {
  PRIORITY_STYLES,
  STATUS_STYLES,
} from '../../utils/constants.js';
import {
  formatDate,
  formatStatus,
  isTaskOverdue,
} from '../../utils/helpers.js';

const TaskCard = ({ task, isBusy, onComplete, onDelete }) => {
  const overdue = isTaskOverdue(task);

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-semibold text-slate-900 dark:text-white">{task.title}</h2>
          {task.description && (
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {task.description}
            </p>
          )}
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
            PRIORITY_STYLES[task.priority]
          }`}
        >
          {formatStatus(task.priority)}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            STATUS_STYLES[task.status]
          }`}
        >
          {formatStatus(task.status)}
        </span>
        <span className={overdue ? 'font-medium text-red-600 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'}>
          Due {formatDate(task.dueDate)}{overdue ? ' · Overdue' : ''}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-end gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
        {task.status !== 'completed' && (
          <button
            type="button"
            disabled={isBusy}
            onClick={() => onComplete(task._id)}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50 disabled:opacity-50 dark:text-emerald-400 dark:hover:bg-emerald-950/50"
          >
            <FiCheck aria-hidden="true" />
            Complete
          </button>
        )}
        <Link
          to={`/tasks/${task._id}/edit`}
          className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <FiEdit2 aria-hidden="true" />
          Edit
        </Link>
        <button
          type="button"
          disabled={isBusy}
          onClick={() => onDelete(task)}
          className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-950/50"
        >
          <FiTrash2 aria-hidden="true" />
          Delete
        </button>
      </div>
    </article>
  );
};

export default TaskCard;
