import { FiHome, FiList, FiPlusSquare } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: FiHome },
  { to: '/tasks', label: 'Tasks', icon: FiList },
  { to: '/tasks/new', label: 'Create task', icon: FiPlusSquare },
];

const Sidebar = () => (
  <aside className="py-4 md:w-52 md:shrink-0 md:py-8">
    <nav
      className="flex gap-2 overflow-x-auto rounded-full bg-white p-1.5 shadow-sm ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10 md:flex-col md:rounded-[26px] md:p-2"
      aria-label="Main navigation"
    >
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/dashboard' || to === '/tasks'}
          className={({ isActive }) =>
            `flex shrink-0 items-center gap-3 rounded-full px-4 py-2.5 text-sm font-semibold ${
              isActive
                ? 'bg-[#b9f227] text-[#14211d]'
                : 'text-slate-500 hover:bg-[#edf0e7] hover:text-[#14211d] dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white'
            }`
          }
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
          {label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
