import { FiLogOut } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth/useAuth.js';
import { getErrorMessage } from '../../utils/helpers.js';

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
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div>
          <p className="text-lg font-semibold text-slate-900">Task Management</p>
          <p className="hidden text-sm text-slate-500 sm:block">{user.email}</p>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden text-sm font-medium text-slate-700 sm:block">
            {user.name}
          </span>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
