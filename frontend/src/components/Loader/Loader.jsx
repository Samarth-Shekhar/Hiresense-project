const Loader = () => (
  <div
    className="flex min-h-screen items-center justify-center bg-slate-50"
    role="status"
  >
    <div className="flex items-center gap-3 text-sm text-slate-600">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
      Loading...
    </div>
  </div>
);

export default Loader;
