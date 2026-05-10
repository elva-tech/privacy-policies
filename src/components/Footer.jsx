function Footer() {
  return (
   <footer className="border-t border-slate-100 bg-white py-6 px-6 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">© 2026 ELVA Technologies. All rights reserved.</p>
        <a href="https://www.elvatech.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#1e293b] flex items-center justify-center text-white font-black"><img src="/logos/Elva.svg" alt="Elva" /></div>
          <div>
            <p className="text-xs font-black text-[#1e293b] uppercase tracking-widest group-hover:text-[#4b6f9e] transition-colors">Powered & Managed by ELVA</p>
            <p className="text-[10px] text-slate-400 font-semibold">Commerce Infrastructure Platform</p>
          </div>
        </a>
      </div>
    </footer>
  );
}

export default Footer;