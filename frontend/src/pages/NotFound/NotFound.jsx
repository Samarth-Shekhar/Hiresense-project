import { Link } from 'react-router-dom';

const NotFound = () => (
  <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
    <section className="text-center">
      <p className="text-sm font-semibold text-blue-600">404</p>
      <h1 className="mt-2 text-3xl font-semibold text-slate-900">
        Page not found
      </h1>
      <p className="mt-3 text-slate-600">
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
