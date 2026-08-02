import { useEffect, useState } from 'react';
import { FiCheckCircle, FiClipboard, FiClock } from 'react-icons/fi';

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

const StatCard = ({ icon: Icon, label, value, color }) => (
  <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
      </div>
      <span className={`rounded-lg p-3 ${color}`}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
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
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: FiCheckCircle,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: FiClock,
      color: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:flex md:gap-8">
        <Sidebar />
        <main className="min-w-0 flex-1 py-8">
          <div>
            <p className="text-sm font-medium text-blue-600">Overview</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">
              Welcome back, {user.name}
            </h1>
            <p className="mt-2 text-slate-600">
              Here is a summary of your current workload.
            </p>
          </div>

          {error && (
            <div
              className="mt-6 flex items-center justify-between gap-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
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
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
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
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
