function PolicyPageHeader({ policy }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <nav
        className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-center sm:justify-start"
        aria-label={`${policy.companyName} policy`}
      >
        <a
          href={policy.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 min-w-0 group max-w-full"
        >
          <img
            src={policy.logo}
            alt=""
            className="w-11 h-11 object-contain rounded-xl border border-slate-100 bg-white p-1 shrink-0"
            width={44}
            height={44}
          />
          <div className="min-w-0 text-left">
            <p className="text-[11px] font-black uppercase tracking-widest text-[#1e293b] truncate group-hover:text-[#4b6f9e] transition-colors">
              {policy.companyName}
            </p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider truncate">
              Privacy policy
            </p>
          </div>
        </a>
      </nav>
    </header>
  );
}

export default PolicyPageHeader;
