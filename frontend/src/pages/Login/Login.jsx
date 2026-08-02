import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

import ThemeToggle from '../../components/ThemeToggle/ThemeToggle.jsx';
import useAuth from '../../hooks/useAuth/useAuth.js';
import {
  getErrorMessage,
  getSafeRedirectPath,
} from '../../utils/helpers.js';

const inputClassName =
  'mt-1 w-full rounded-2xl border border-black/10 bg-[#f6f7f2] px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#9dcc20] focus:ring-2 focus:ring-[#b9f227]/30 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-slate-500';

const Login = () => {
  const { user, loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const submitLogin = async (credentials) => {
    setServerError('');

    try {
      await loginUser(credentials);
      toast.success('Welcome back');
      navigate(getSafeRedirectPath(location.state?.from?.pathname), {
        replace: true,
      });
    } catch (error) {
      setServerError(getErrorMessage(error));
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#f1f2ed] px-4 py-12 dark:bg-[#07110f]">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <section className="grid w-full max-w-4xl overflow-hidden rounded-[32px] bg-white shadow-sm ring-1 ring-black/5 dark:bg-[#10201c] dark:ring-white/10 md:grid-cols-2">
        <aside className="hidden bg-[#15332c] p-10 text-white md:flex md:flex-col md:justify-between">
          <span className="w-fit rounded-full bg-[#b9f227] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#14211d]">
            Taskboard
          </span>
          <div>
            <p className="text-4xl font-bold leading-tight tracking-tight">
              Make space for the work that matters.
            </p>
            <p className="mt-4 text-sm leading-6 text-white/65">
              Plan priorities, follow deadlines, and finish the week with a clear list.
            </p>
          </div>
        </aside>
        <div className="p-6 sm:p-10">
        <p className="text-sm font-bold text-[#739b17] dark:text-[#b9f227]">Taskboard</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
          Sign in to your account
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Keep your work organized and your priorities clear.
        </p>

        {serverError && (
          <p className="mt-5 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
            {serverError}
          </p>
        )}

        <form className="mt-6 space-y-5" onSubmit={handleSubmit(submitLogin)} noValidate>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className={inputClassName}
              placeholder="you@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className={inputClassName}
              placeholder="Enter your password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-[#b9f227] px-4 py-3 font-bold text-[#14211d] hover:bg-[#a8df1d] focus:outline-none focus:ring-2 focus:ring-[#9dcc20] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          New here?{' '}
          <Link className="font-bold text-[#638613] hover:underline dark:text-[#b9f227]" to="/register">
            Create an account
          </Link>
        </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
