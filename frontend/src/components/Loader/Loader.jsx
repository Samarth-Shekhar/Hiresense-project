const Loader = () => (
  <div
    className="flex min-h-screen items-center justify-center bg-[#f1f2ed] dark:bg-[#07110f]"
    role="status"
  >
    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-[#7da914] dark:border-slate-700 dark:border-t-[#b9f227]" />
      Loading...
    </div>
  </div>
);

export default Loader;
