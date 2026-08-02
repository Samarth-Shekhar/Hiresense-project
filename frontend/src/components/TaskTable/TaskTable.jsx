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

const TaskTable = ({ tasks, busyTaskId, onComplete, onDelete }) => (
  <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-5 py-3 font-semibold">Task</th>
            <th className="px-5 py-3 font-semibold">Priority</th>
            <th className="px-5 py-3 font-semibold">Status</th>
            <th className="px-5 py-3 font-semibold">Due date</th>
            <th className="px-5 py-3 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {tasks.map((task) => {
            const isBusy = busyTaskId === task._id;
            const overdue = isTaskOverdue(task);

            return (
              <tr key={task._id} className="hover:bg-slate-50/70">
                <td className="max-w-xs px-5 py-4">
                  <p className="font-medium text-slate-900">{task.title}</p>
                  {task.description && (
                    <p className="mt-1 truncate text-slate-500">
                      {task.description}
                    </p>
                  )}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      PRIORITY_STYLES[task.priority]
                    }`}
                  >
                    {formatStatus(task.priority)}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      STATUS_STYLES[task.status]
                    }`}
                  >
                    {formatStatus(task.status)}
                  </span>
                </td>
                <td
                  className={`whitespace-nowrap px-5 py-4 ${
                    overdue ? 'font-medium text-red-600' : 'text-slate-600'
                  }`}
                >
                  {formatDate(task.dueDate)}
                  {overdue && <span className="block text-xs">Overdue</span>}
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-1">
                    {task.status !== 'completed' && (
                      <button
                        type="button"
                        title="Mark complete"
                        disabled={isBusy}
                        onClick={() => onComplete(task._id)}
                        className="rounded-md p-2 text-emerald-700 hover:bg-emerald-50 disabled:opacity-50"
                      >
                        <FiCheck aria-hidden="true" />
                      </button>
                    )}
                    <Link
                      to={`/tasks/${task._id}/edit`}
                      title="Edit task"
                      className="rounded-md p-2 text-slate-600 hover:bg-slate-100"
                    >
                      <FiEdit2 aria-hidden="true" />
                    </Link>
                    <button
                      type="button"
                      title="Delete task"
                      disabled={isBusy}
                      onClick={() => onDelete(task)}
                      className="rounded-md p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      <FiTrash2 aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default TaskTable;
