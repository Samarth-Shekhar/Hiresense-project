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
  'mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100';

const TaskForm = ({ initialValues = defaultValues, onSubmit, submitLabel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: initialValues });

  return (
    <form
      className="space-y-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="title">
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
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="description">
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
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="priority">
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
          <label className="text-sm font-medium text-slate-700" htmlFor="status">
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
        <label className="text-sm font-medium text-slate-700" htmlFor="dueDate">
          Due date
        </label>
        <input
          id="dueDate"
          type="date"
          className={fieldClassName}
          {...register('dueDate', { required: 'Due date is required' })}
        />
        {errors.dueDate && (
          <p className="mt-1 text-sm text-red-600">{errors.dueDate.message}</p>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
        <Link
          to="/tasks"
          className="rounded-md border border-slate-300 px-4 py-2.5 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
