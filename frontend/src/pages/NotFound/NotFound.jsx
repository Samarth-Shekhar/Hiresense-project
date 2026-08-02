import { Link } from 'react-router-dom';

import ThemeToggle from '../../components/ThemeToggle/ThemeToggle.jsx';

const NotFound = () => (
  <main className="relative flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
    <div className="absolute right-4 top-4">
      <ThemeToggle />
    </div>
    <section className="text-center">
      <p className="text-sm font-semibold text-blue-600">404</p>
      <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
        Page not found
      </h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">
        The page you requested does not exist.
      </p>
      <Link
        className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700"
        to="/dashboard"
      >
        Return to dashboard
      </Link>
    </section>
  </main>
);

export default NotFound;
