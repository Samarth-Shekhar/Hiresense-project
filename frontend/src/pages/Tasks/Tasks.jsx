import { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import FilterBar from '../../components/FilterBar/FilterBar.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import TaskCard from '../../components/TaskCard/TaskCard.jsx';
import TaskTable from '../../components/TaskTable/TaskTable.jsx';
import api from '../../services/api.js';
import { getErrorMessage } from '../../utils/helpers.js';

const initialQuery = {
  search: '',
  priority: '',
  status: '',
  dueDate: '',
  sort: 'newest',
  page: 1,
};
const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState(initialQuery);
  const [searchInput, setSearchInput] = useState('');
  const [pagination, setPagination] = useState({ total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyTaskId, setBusyTaskId] = useState('');
  const loadTasks = async () => {
    setLoading(true);
    setError('');

    try {
      const { data } = await api.get('/tasks', {
        params: {
          ...query,
          search: query.search || undefined,
          priority: query.priority || undefined,
          status: query.status || undefined,
          dueDate: query.dueDate || undefined,
          limit: 10,
        },
      });

      if (query.page > data.pagination.totalPages) {
        setQuery((currentQuery) => ({
          ...currentQuery,
          page: data.pagination.totalPages,
        }));
        return;
      }

      setTasks(data.tasks);
      setPagination(data.pagination);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadTasks();
  }, [query.search, query.priority, query.status, query.dueDate, query.sort, query.page]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const search = searchInput.trim();
      setQuery((currentQuery) =>
        currentQuery.search === search
          ? currentQuery
          : { ...currentQuery, search, page: 1 },
      );
    }, 350);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  const changeFilter = (name, value) => {
    setQuery((currentQuery) => ({
      ...currentQuery,
      [name]: value,
      page: 1,
    }));
  };

  const clearFilters = () => {
    setSearchInput('');
    setQuery(initialQuery);
  };
  const hasActiveFilters = Boolean(
    searchInput.trim() ||
      query.priority ||
      query.status ||
      query.dueDate ||
      query.sort !== 'newest',
  );
  const markComplete = async (taskId) => {
    setBusyTaskId(taskId);

    try {
      await api.patch(`/tasks/${taskId}/complete`);
      toast.success('Task marked as completed');
      await loadTasks();
    } catch (requestError) {
      toast.error(getErrorMessage(requestError));
    } finally {
      setBusyTaskId('');
    }
  };

  const deleteTask = async (task) => {
    if (!window.confirm(`Delete "${task.title}"?`)) {
      return;
    }

    setBusyTaskId(task._id);

    try {
      await api.delete(`/tasks/${task._id}`);
      toast.success('Task deleted successfully');

      if (tasks.length === 1 && query.page > 1) {
        setQuery((currentQuery) => ({
          ...currentQuery,
          page: currentQuery.page - 1,
        }));
      } else {
        await loadTasks();
      }
    } catch (requestError) {
      toast.error(getErrorMessage(requestError));
    } finally {
      setBusyTaskId('');
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f2ed] dark:bg-[#07110f]">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:flex md:gap-8">
        <Sidebar />
        <main className="min-w-0 flex-1 py-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Workboard
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#14211d] dark:text-white sm:text-4xl">
                Task list
              </h1>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Keep every priority and deadline in one clear view.
              </p>
            </div>
            <Link
              to="/tasks/new"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-[#14211d] shadow-sm ring-1 ring-black/5 hover:bg-[#b9f227] dark:bg-white/10 dark:text-white dark:ring-white/10"
            >
              <FiPlus aria-hidden="true" />
              <span className="hidden sm:inline">Create task</span>
            </Link>
          </div>

          <section className="mt-8 space-y-3" aria-label="Task controls">
            <SearchBar value={searchInput} onChange={setSearchInput} />
            <FilterBar
              filters={query}
              onChange={changeFilter}
              onClear={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </section>

          {error && (
            <div className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
              {error}{' '}
              <button type="button" onClick={loadTasks} className="font-semibold">
                Try again
              </button>
            </div>
          )}

          {loading ? (
            <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <section className="mt-8 rounded-[28px] border border-dashed border-black/15 bg-white px-6 py-12 text-center dark:border-white/15 dark:bg-white/5">
              <h2 className="font-semibold text-slate-900 dark:text-white">
                {hasActiveFilters ? 'No matching tasks' : 'No tasks yet'}
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {hasActiveFilters
                  ? 'Try changing or clearing the current filters.'
                  : 'Create your first task to start organizing your work.'}
              </p>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 text-sm font-bold text-[#29463f] hover:underline dark:text-[#b9f227]"
                >
                  Clear filters
                </button>
              ) : (
                <Link
                  to="/tasks/new"
                  className="mt-5 inline-block text-sm font-bold text-[#29463f] hover:underline dark:text-[#b9f227]"
                >
                  Create a task
                </Link>
              )}
            </section>
          ) : (
            <section className="mt-8" aria-label="Task list">
              <div className="space-y-4 md:hidden">
                {tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    isBusy={busyTaskId === task._id}
                    onComplete={markComplete}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
              <div className="hidden md:block">
                <TaskTable
                  tasks={tasks}
                  busyTaskId={busyTaskId}
                  onComplete={markComplete}
                  onDelete={deleteTask}
                />
              </div>
              <Pagination
                pagination={pagination}
                onPageChange={(page) =>
                  setQuery((currentQuery) => ({ ...currentQuery, page }))
                }
                disabled={loading}
              />
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Tasks;
