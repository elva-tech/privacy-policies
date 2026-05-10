import { setHubAuthenticated } from '../auth/hubAuth';

function HubSiteNav({ onSignOut }) {
  function handleSignOut() {
    setHubAuthenticated(false);
    onSignOut();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-row items-center justify-between gap-4"
        aria-label="Hub"
      >
        <div className="flex items-center gap-3 min-w-0">
          <img src="/logos/Elva.svg" alt="" className="w-9 h-9 object-contain shrink-0" width={36} height={36} />
          <div className="min-w-0">
            <p className="text-[11px] font-black uppercase tracking-widest text-[#1e293b] truncate">
              Privacy policies hub
            </p>
            <p className="text-[10px] font-semibold text-slate-500 truncate">
              Internal directory — use the grid below to open a policy.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="shrink-0 text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors"
        >
          Sign out
        </button>
      </nav>
    </header>
  );
}

export default HubSiteNav;
