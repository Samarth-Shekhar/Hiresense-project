import { FiHome, FiList, FiPlusSquare } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: FiHome },
  { to: '/tasks', label: 'Tasks', icon: FiList },
  { to: '/tasks/new', label: 'Create task', icon: FiPlusSquare },
];

const Sidebar = () => (
  <aside className="border-b border-slate-200 py-4 md:w-52 md:shrink-0 md:border-b-0 md:py-8">
    <nav className="flex gap-2 overflow-x-auto md:flex-col" aria-label="Main navigation">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/dashboard' || to === '/tasks'}
          className={({ isActive }) =>
            `flex shrink-0 items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              isActive
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
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
