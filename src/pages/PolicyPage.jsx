import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { privacyPolicies } from '../data/privacyPolicies';
import PolicyPageHeader from '../components/PolicyPageHeader';
import Footer from '../components/Footer';
import NotFound from './NotFound';
import { restoreDefaultFavicon, setAppFavicon } from '../utils/favicon';
import {
  HUB_DOCUMENT_TITLE,
  NOT_FOUND_DOCUMENT_TITLE,
} from '../constants/documentTitle';

function PolicyPage() {
  const { slug } = useParams();

  const policy = privacyPolicies[slug];

  useEffect(() => {
    if (!policy) {
      document.title = NOT_FOUND_DOCUMENT_TITLE;
      restoreDefaultFavicon();
      return undefined;
    }

    document.title = `${policy.companyName} - Privacy Policy`;

    const isPng = policy.logo.toLowerCase().endsWith('.png');
    setAppFavicon(policy.logo, isPng ? 'image/png' : 'image/svg+xml');

    return () => {
      document.title = HUB_DOCUMENT_TITLE;
      restoreDefaultFavicon();
    };
  }, [policy]);

  if (!policy) {
    return <NotFound />;
  }

  return (
    <>
      <PolicyPageHeader policy={policy} />
      <div className="min-h-screen bg-[#f8fafc] py-10 sm:py-16 px-4 sm:px-6 flex flex-col">
        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] sm:rounded-[3rem] shadow-2xl border border-slate-100 p-5 sm:p-8 md:p-12 flex-1">

          <div className="flex flex-col items-center text-center mb-10">
            <img
              src={policy.logo}
              alt={policy.companyName}
              className="w-28 h-28 object-contain rounded-2xl shadow-md border border-slate-100 bg-white p-4 mb-8"
            />

            <h1 className="text-3xl sm:text-5xl font-black text-[#1e293b] mb-3 italic uppercase tracking-tighter leading-none">
              {policy.companyName} Privacy Policy
            </h1>

            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Last Updated: May 2026
            </p>
          </div>

          <div className="mb-12 bg-blue-50 border border-blue-100 rounded-2xl p-5">
            <p className="text-[10px] font-black text-[#4b6f9e] uppercase tracking-widest mb-2">
              Customer Support
            </p>

            <a
              href={`mailto:${policy.supportEmail}`}
              className="text-lg font-black text-[#1e293b] hover:text-[#4b6f9e] transition-colors break-all"
            >
              {policy.supportEmail}
            </a>
          </div>

          <div className="space-y-10">
            {policy.sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-xl font-black text-[#1e293b] mb-3 uppercase tracking-tight">
                  {section.title}
                </h2>

                <p className="text-slate-600 leading-8 font-semibold italic">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

        </div>

        <Footer />
      </div>
    </>
  );
}

export default PolicyPage;
