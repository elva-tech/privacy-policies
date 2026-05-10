import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HubSiteNav from '../components/HubSiteNav';
import HubLogin from '../components/HubLogin';
import { listPrivacyPolicies } from '../data/privacyPolicies';
import { HUB_DOCUMENT_TITLE } from '../constants/documentTitle';
import { restoreDefaultFavicon } from '../utils/favicon';
import { isHubAuthenticated } from '../auth/hubAuth';

function Home() {
  const policies = listPrivacyPolicies();
  const [authed, setAuthed] = useState(() => isHubAuthenticated());

  useEffect(() => {
    restoreDefaultFavicon();
    document.title = authed ? HUB_DOCUMENT_TITLE : 'Sign in · Privacy policies hub';
  }, [authed]);

  if (!authed) {
    return <HubLogin onSuccess={() => setAuthed(true)} />;
  }

  return (
    <>
      <HubSiteNav onSignOut={() => setAuthed(false)} />
      <div className="min-h-screen bg-[#f8fafc]">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8 text-center">
          <a
            href="https://www.elvatech.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-center"
          >
            <div className="shadow-2xl">
              <img
                src="/logos/Elva.svg"
                alt="Elva"
                className="w-28 h-28 object-contain"
              />
            </div>
            <p className="mt-4 text-[10px] font-black tracking-widest text-slate-400 uppercase">
              Powered by ELVA
            </p>
          </a>
          <h1 className="mt-10 text-3xl sm:text-5xl md:text-7xl font-black text-[#1e293b] leading-tight italic uppercase tracking-tighter">
            Modern Commerce Infrastructure
          </h1>
          <p className="mt-8 max-w-3xl mx-auto text-lg text-slate-600 leading-9 font-semibold italic">
            This is a flexible commerce platform that enables businesses, vendors, and partners to create and manage their own online stores, digital operations, and commerce experiences with scalability and simplicity.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
          <div className="bg-white border border-slate-100 rounded-[2rem] sm:rounded-[3rem] shadow-xl p-8 sm:p-12">
            <h2 className="text-center text-lg sm:text-2xl font-black text-[#1e293b] uppercase tracking-tight italic">
              Company privacy policies
            </h2>
            <p className="mt-3 text-center text-sm text-slate-500 font-semibold max-w-xl mx-auto leading-relaxed">
              Select a brand to open its public privacy policy. These links are not shown on individual policy pages.
            </p>

            {policies.length > 0 ? (
              <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
                {policies.map(({ slug, companyName, logo }) => (
                  <li key={slug}>
                    <Link
                      to={`/${slug}`}
                      className="flex flex-col items-center text-center gap-4 rounded-2xl border border-slate-100 bg-[#f8fafc] p-6 sm:p-8 hover:border-[#4b6f9e]/40 hover:shadow-lg hover:bg-white transition-all group"
                    >
                      <img
                        src={logo}
                        alt=""
                        className="w-20 h-20 object-contain rounded-2xl border border-slate-100 bg-white p-2 shadow-sm"
                      />
                      <div>
                        <p className="text-base font-black text-[#1e293b] uppercase tracking-tight group-hover:text-[#4b6f9e] transition-colors">
                          {companyName}
                        </p>
                        <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                          View privacy policy →
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-10 text-center text-slate-500 font-semibold">No policies configured.</p>
            )}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Store Management',
              'Inventory Handling',
              'Location-Based Services',
              'Order Processing',
              'White-Label Solutions',
              'Vendor Platforms',
            ].map((item) => (
              <div
                key={item}
                className="bg-white border border-slate-100 rounded-[2rem] p-5 sm:p-8 shadow-sm hover:shadow-xl transition-all hover:border-[#4b6f9e]/20"
              >
                <h3 className="text-base sm:text-lg font-black text-[#1e293b] mb-3 uppercase tracking-tight">
                  {item}
                </h3>
                <p className="text-slate-500 leading-7 font-semibold italic">
                  Built for scalable digital commerce operations with modern infrastructure and flexible integrations.
                </p>
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
