import Footer from '../components/Footer';

function Home() {
  return (
    <>
   <div className="min-h-screen bg-[#f8fafc]">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <a href="https://www.elvatech.in/" target="_blank" rel="noopener noreferrer" className="inline-flex flex-col items-center">
            <div className="shadow-2xl">
  <img
    src="/logos/Elva.svg"
    alt="Elva"
    className="w-28 h-28 object-contain"
  />
</div>
            <p className="mt-4 text-[10px] font-black tracking-widest text-slate-400 uppercase">Powered by ELVA</p>
          </a>
          <h1 className="mt-10 text-3xl sm:text-5xl md:text-7xl font-black text-[#1e293b] leading-tight italic uppercase tracking-tighter">
            Modern Commerce Infrastructure
          </h1>
          <p className="mt-8 max-w-3xl mx-auto text-lg text-slate-600 leading-9 font-semibold italic">
            This is a flexible commerce platform that enables businesses, vendors, and partners to create and manage their own online stores, digital operations, and commerce experiences with scalability and simplicity.
          </p>
        </section>
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['Store Management','Inventory Handling','Location-Based Services','Order Processing','White-Label Solutions','Vendor Platforms'].map((item) => (
              <div key={item} className="bg-white border border-slate-100 rounded-[2rem] p-5 sm:p-8 shadow-sm hover:shadow-xl transition-all hover:border-[#4b6f9e]/20">
                <h3 className="text-base sm:text-lg font-black text-[#1e293b] mb-3 uppercase tracking-tight">{item}</h3>
                <p className="text-slate-500 leading-7 font-semibold italic">Built for scalable digital commerce operations with modern infrastructure and flexible integrations.</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Home;