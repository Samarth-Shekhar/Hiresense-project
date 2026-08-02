import { FiMoon, FiSun } from 'react-icons/fi';

import useTheme from '../../hooks/useTheme/useTheme.js';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border border-black/10 bg-white p-2.5 text-slate-600 hover:bg-[#e7e9e1] dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
    </button>
  );
};

export default ThemeToggle;
