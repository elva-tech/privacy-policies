import Footer from '../components/Footer';

function NotFound() {
  return (
    <>
     <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-8xl font-black text-[#1e293b] tracking-tighter">404</h1>
          <p className="mt-4 text-2xl font-black text-[#1e293b] uppercase tracking-tight italic">Page Not Found</p>
          <p className="mt-3 text-slate-400 font-semibold max-w-md">The page you are looking for does not exist or may have been moved.</p>
          <a href="/" className="inline-flex mt-8 px-8 py-4 rounded-2xl bg-[#1e293b] text-white font-black text-xs uppercase tracking-widest hover:bg-[#4b6f9e] transition-all shadow-xl">Back to Home</a>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default NotFound;