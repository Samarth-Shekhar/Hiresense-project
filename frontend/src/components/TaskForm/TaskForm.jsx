import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../../utils/constants.js';

const defaultValues = {
  title: '',
  description: '',
  priority: 'medium',
  status: 'pending',
  dueDate: '',
};

const fieldClassName =
  'mt-1 w-full rounded-2xl border border-black/10 bg-[#f6f7f2] px-4 py-3 text-slate-900 outline-none focus:border-[#9dcc20] focus:ring-2 focus:ring-[#b9f227]/30 dark:border-white/10 dark:bg-black/20 dark:text-white';

const TaskForm = ({ initialValues = defaultValues, onSubmit, submitLabel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: initialValues });

  return (
    <form
      className="space-y-5 rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10 sm:p-7"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          type="text"
          className={fieldClassName}
          placeholder="What needs to be done?"
          {...register('title', {
            required: 'Title is required',
            maxLength: {
              value: 120,
              message: 'Title cannot exceed 120 characters',
            },
          })}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="description">
          Description <span className="font-normal text-slate-400">(optional)</span>
        </label>
        <textarea
          id="description"
          rows="4"
          className={fieldClassName}
          placeholder="Add any useful details"
          {...register('description', {
            maxLength: {
              value: 1000,
              message: 'Description cannot exceed 1000 characters',
            },
          })}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="priority">
            Priority
          </label>
          <select id="priority" className={fieldClassName} {...register('priority')}>
            {PRIORITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="status">
            Status
          </label>
          <select id="status" className={fieldClassName} {...register('status')}>
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="dueDate">
          Due date
        </label>
        <input
          id="dueDate"
          type="date"
          className={fieldClassName}
          {...register('dueDate', { required: 'Due date is required' })}
        />
        {errors.dueDate && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.dueDate.message}</p>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 dark:border-slate-800 sm:flex-row sm:justify-end">
        <Link
          to="/tasks"
          className="rounded-full border border-black/10 px-5 py-2.5 text-center text-sm font-bold text-slate-700 hover:bg-[#edf0e7] dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-[#b9f227] px-5 py-2.5 text-sm font-bold text-[#14211d] hover:bg-[#a8df1d] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
