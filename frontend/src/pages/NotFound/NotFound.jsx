import { Link } from 'react-router-dom';

import ThemeToggle from '../../components/ThemeToggle/ThemeToggle.jsx';

const NotFound = () => (
  <main className="relative flex min-h-screen items-center justify-center bg-[#f1f2ed] px-4 dark:bg-[#07110f]">
    <div className="absolute right-4 top-4">
      <ThemeToggle />
    </div>
    <section className="rounded-[32px] bg-white px-8 py-12 text-center shadow-sm ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10">
      <p className="text-sm font-bold text-[#739b17] dark:text-[#b9f227]">404</p>
      <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
        Page not found
      </h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">
        The page you requested does not exist.
      </p>
      <Link
        className="mt-6 inline-block rounded-full bg-[#b9f227] px-5 py-2.5 font-bold text-[#14211d] hover:bg-[#a8df1d]"
        to="/dashboard"
      >
        Return to dashboard
      </Link>
    </section>
  </main>
);

export default NotFound;
