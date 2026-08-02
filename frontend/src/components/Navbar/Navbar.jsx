import { FiCheck, FiLogOut } from 'react-icons/fi';
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
    <header className="border-b border-black/5 bg-[#f1f2ed] dark:border-white/10 dark:bg-[#07110f]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#b9f227] text-[#10231e]">
            <FiCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-bold tracking-tight text-[#14211d] dark:text-white">
              Taskboard
            </p>
            <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
              {user.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="mr-1 hidden items-center gap-3 sm:flex">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#16332d] text-sm font-semibold text-white">
              {user.name.charAt(0).toUpperCase()}
            </span>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {user.name}
            </span>
          </div>
          <ThemeToggle />
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#e7e9e1] focus:outline-none focus:ring-2 focus:ring-[#9dcc20] dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
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
