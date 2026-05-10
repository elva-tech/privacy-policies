import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { NOT_FOUND_DOCUMENT_TITLE } from '../constants/documentTitle';
import { restoreDefaultFavicon } from '../utils/favicon';

function NotFound() {
  useEffect(() => {
    document.title = NOT_FOUND_DOCUMENT_TITLE;
    restoreDefaultFavicon();
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white py-4 px-6">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Privacy hub
        </span>
      </header>
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-8xl font-black text-[#1e293b] tracking-tighter">404</h1>
          <p className="mt-4 text-2xl font-black text-[#1e293b] uppercase tracking-tight italic">
            Page Not Found
          </p>
          <p className="mt-3 text-slate-400 font-semibold max-w-md">
            The page you are looking for does not exist or may have been moved.
          </p>
          {/* <Link
            to="/"
            className="inline-flex mt-8 px-8 py-4 rounded-2xl bg-[#1e293b] text-white font-black text-xs uppercase tracking-widest hover:bg-[#4b6f9e] transition-all shadow-xl"
          >
            Hub sign-in
          </Link> */}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default NotFound;
