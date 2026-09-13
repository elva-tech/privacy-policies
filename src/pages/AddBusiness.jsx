import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import HubSiteNav from '../components/HubSiteNav';
import PolicyEditor from '../components/PolicyEditor';
import ProtectedRoute from '../components/ProtectedRoute';
import { listPrivacyPolicies } from '../data/privacyPolicies';
import { HUB_DOCUMENT_TITLE } from '../constants/documentTitle';
import { restoreDefaultFavicon } from '../utils/favicon';
import { slugify, isValidSlug } from '../utils/slugify';
import { htmlToPolicySections } from '../utils/policyContent';
import { onboardBusiness } from '../utils/hubApi';
import { setHubAuthenticated } from '../auth/hubAuth';

const RESERVED_SLUGS = new Set(['404', 'add-business', 'privacy-policy']);
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

function formatLastUpdatedDate(date = new Date()) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = () => reject(new Error('Could not read logo file.'));
    reader.readAsDataURL(file);
  });
}

function AddBusinessForm() {
  const navigate = useNavigate();

  const existingSlugs = useMemo(
    () => new Set([...listPrivacyPolicies().map((policy) => policy.slug), ...RESERVED_SLUGS]),
    [],
  );

  const [companyName, setCompanyName] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(formatLastUpdatedDate());
  const [policyHtml, setPolicyHtml] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  function handleSignOut() {
    setHubAuthenticated(false);
    navigate('/');
  }

  useEffect(() => {
    restoreDefaultFavicon();
    document.title = `Add business · ${HUB_DOCUMENT_TITLE}`;
  }, []);

  function handleCompanyNameChange(value) {
    setCompanyName(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  }

  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  function handleLogoChange(event) {
    const file = event.target.files?.[0];
    setError('');

    if (!file) {
      setLogoFile(null);
      setLogoPreview('');
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError('Logo must be a PNG, JPG, JPEG, or WEBP image.');
      setLogoFile(null);
      setLogoPreview('');
      return;
    }

    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
    }

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  }

  function validateForm() {
    const trimmedName = companyName.trim();
    const trimmedSlug = slug.trim();
    const trimmedDate = lastUpdated.trim();

    if (!trimmedName) {
      return 'Business name is required.';
    }

    if (!trimmedSlug) {
      return 'URL slug is required.';
    }

    if (!isValidSlug(trimmedSlug)) {
      return 'URL slug must contain only lowercase letters, numbers, and hyphens.';
    }

    if (existingSlugs.has(trimmedSlug)) {
      return `The slug "${trimmedSlug}" is already in use.`;
    }

    if (!trimmedDate) {
      return 'Last updated date is required.';
    }

    if (!logoFile) {
      return 'Logo is required.';
    }

    if (!policyHtml || policyHtml === '<p></p>') {
      return 'Privacy policy content is required.';
    }

    try {
      htmlToPolicySections(policyHtml);
    } catch (sectionError) {
      return sectionError.message;
    }

    return '';
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);

    try {
      const sections = htmlToPolicySections(policyHtml);
      const base64 = await fileToBase64(logoFile);

      const result = await onboardBusiness({
        companyName: companyName.trim(),
        slug: slug.trim(),
        lastUpdated: lastUpdated.trim(),
        website: '',
        supportEmail: '',
        sections,
        logo: {
          contentType: logoFile.type,
          base64,
        },
      });

      setSuccess(result);
    } catch (submitError) {
      setError(submitError.message || 'Failed to onboard business.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <>
        <HubSiteNav onSignOut={handleSignOut} />
        <div className="min-h-screen bg-[#f8fafc] py-10 sm:py-16 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto bg-white rounded-[2rem] border border-slate-100 shadow-2xl p-8 sm:p-12 text-center">
            <h1 className="text-2xl sm:text-3xl font-black text-[#1e293b] uppercase tracking-tight italic">
              Business onboarded successfully.
            </h1>

            <div className="mt-8 space-y-4 text-left bg-[#f8fafc] rounded-2xl border border-slate-100 p-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Business</p>
                <p className="mt-1 text-lg font-black text-[#1e293b]">{success.companyName}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">URL</p>
                <a
                  href={success.policyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-base font-black text-[#4b6f9e] break-all hover:underline"
                >
                  {success.policyUrl}
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={success.policyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center px-6 py-3 rounded-xl bg-[#1e293b] text-white text-[11px] font-black uppercase tracking-widest hover:bg-[#4b6f9e] transition-colors"
              >
                View Policy
              </a>
              <Link
                to="/"
                className="inline-flex justify-center px-6 py-3 rounded-xl border border-slate-200 text-slate-600 text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors"
              >
                Back to Home
              </Link>
            </div>

            <p className="mt-6 text-sm text-slate-500 font-semibold italic">
              Vercel will deploy the updated repository automatically. The new policy URL may take a minute to become available.
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <HubSiteNav onSignOut={handleSignOut} />
      <div className="min-h-screen bg-[#f8fafc] py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-black text-[#1e293b] uppercase tracking-tight italic">
              Add New Business
            </h1>
            <p className="mt-3 text-sm text-slate-500 font-semibold italic">
              Upload a logo, write the privacy policy, and publish a new public policy page.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-[2rem] border border-slate-100 shadow-2xl p-6 sm:p-10 space-y-8"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="company-name" className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  Business Name
                </label>
                <input
                  id="company-name"
                  value={companyName}
                  onChange={(event) => handleCompanyNameChange(event.target.value)}
                  placeholder="Venkatesh Traders"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[#1e293b] font-semibold outline-none focus:border-[#4b6f9e] focus:ring-2 focus:ring-[#4b6f9e]/20"
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  URL Slug
                </label>
                <input
                  id="slug"
                  value={slug}
                  onChange={(event) => {
                    setSlugTouched(true);
                    setSlug(event.target.value);
                  }}
                  placeholder="venkatesh-traders"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[#1e293b] font-semibold outline-none focus:border-[#4b6f9e] focus:ring-2 focus:ring-[#4b6f9e]/20"
                />
                <p className="mt-2 text-xs text-slate-400 font-semibold">
                  Public URL: /{slug || 'your-slug'}
                </p>
              </div>

              <div>
                <label htmlFor="last-updated" className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  Last Updated
                </label>
                <input
                  id="last-updated"
                  value={lastUpdated}
                  onChange={(event) => setLastUpdated(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[#1e293b] font-semibold outline-none focus:border-[#4b6f9e] focus:ring-2 focus:ring-[#4b6f9e]/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="logo" className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                Logo
              </label>
              <input
                id="logo"
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleLogoChange}
                className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-[#1e293b] file:px-4 file:py-2.5 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:text-white hover:file:bg-[#4b6f9e]"
              />
              {logoPreview ? (
                <div className="mt-4 flex justify-center">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-28 h-28 object-contain rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                  />
                </div>
              ) : null}
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                Privacy Policy
              </label>
              <p className="mb-3 text-xs text-slate-500 font-semibold italic">
                Use headings for each section title. Paragraphs, lists, bold text, and links are supported.
              </p>
              <PolicyEditor value={policyHtml} onChange={setPolicyHtml} />
            </div>

            {error ? (
              <p className="text-sm font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                {error}
              </p>
            ) : null}

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <Link
                to="/"
                className="inline-flex justify-center px-6 py-3 rounded-xl border border-slate-200 text-slate-600 text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex justify-center px-8 py-3.5 rounded-xl bg-[#1e293b] text-white text-[11px] font-black uppercase tracking-widest hover:bg-[#4b6f9e] transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting…' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

function AddBusiness() {
  return (
    <ProtectedRoute>
      <AddBusinessForm />
    </ProtectedRoute>
  );
}

export default AddBusiness;
