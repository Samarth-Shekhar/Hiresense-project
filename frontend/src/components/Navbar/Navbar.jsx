import { FiLogOut } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth/useAuth.js';
import { getErrorMessage } from '../../utils/helpers.js';
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await logoutUser();
      toast.success('Logged out successfully');
      navigate('/login', { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">
            Task Management
          </p>
          <p className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
            {user.email}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden text-sm font-medium text-slate-700 dark:text-slate-200 sm:block">
            {user.name}
          </span>
          <ThemeToggle />
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-offset-slate-900"
          >
            <FiLogOut aria-hidden="true" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
