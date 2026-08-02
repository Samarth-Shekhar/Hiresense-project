import { useEffect, useState } from 'react';
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiClipboard,
  FiClock,
  FiPlus,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import useAuth from '../../hooks/useAuth/useAuth.js';
import api from '../../services/api.js';
import { getErrorMessage } from '../../utils/helpers.js';

const initialStats = {
  total: 0,
  completed: 0,
  pending: 0,
};

const StatCard = ({ icon: Icon, label, value, className, iconClassName }) => (
  <article className={`rounded-[28px] p-6 ${className}`}>
    <div className="flex h-full min-h-36 flex-col justify-between">
      <span className={`grid h-12 w-12 place-items-center rounded-2xl ${iconClassName}`}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <p className="text-4xl font-bold tracking-tight">{value}</p>
        <p className="mt-1 text-sm font-medium opacity-70">{label}</p>
      </div>
    </div>
  </article>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadStats = async () => {
    setLoading(true);
    setError('');

    try {
      const { data } = await api.get('/tasks/stats');
      setStats(data.stats);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const summaryCards = [
    {
      label: 'Total tasks',
      value: stats.total,
      icon: FiClipboard,
      className: 'bg-[#15332c] text-white sm:col-span-2',
      iconClassName: 'bg-white/10 text-[#b9f227]',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: FiCheckCircle,
      className: 'bg-white text-[#14211d] shadow-sm dark:bg-white/10 dark:text-white',
      iconClassName: 'bg-[#eef1e8] text-[#15332c] dark:bg-white/10 dark:text-[#b9f227]',
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: FiClock,
      className: 'bg-[#b9f227] text-[#14211d]',
      iconClassName: 'bg-[#14211d] text-[#b9f227]',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f1f2ed] dark:bg-[#07110f]">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:flex md:gap-8">
        <Sidebar />
        <main className="min-w-0 flex-1 py-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Overview
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#14211d] dark:text-white sm:text-4xl">
                Welcome back, {user.name.split(' ')[0]}
              </h1>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                A clear view of what needs your attention.
              </p>
            </div>
            <Link
              to="/tasks/new"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-[#14211d] shadow-sm ring-1 ring-black/5 hover:bg-[#b9f227] dark:bg-white/10 dark:text-white dark:ring-white/10"
              aria-label="Create task"
            >
              <FiPlus className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>

          {error && (
            <div
              className="mt-6 flex items-center justify-between gap-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
              role="alert"
            >
              <span>{error}</span>
              <button
                type="button"
                onClick={loadStats}
                className="shrink-0 font-semibold hover:text-red-900"
              >
                Try again
              </button>
            </div>
          )}

          <section
            className="mt-8 grid gap-4 sm:grid-cols-2"
            aria-busy={loading}
            aria-label="Task summary"
          >
            {summaryCards.map((card) => (
              <StatCard
                key={card.label}
                {...card}
                value={loading ? '...' : card.value}
              />
            ))}
          </section>

          <Link
            to="/tasks"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#29463f] hover:underline dark:text-[#b9f227]"
          >
            View all tasks
            <FiArrowUpRight aria-hidden="true" />
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
