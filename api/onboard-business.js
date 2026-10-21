import { validateHubAuth } from './_lib/auth.js';
import { readPoliciesFile, writeOnboardFiles } from './_lib/storage.js';
import {
  appendBusinessPolicy,
  parsePrivacyPoliciesSource,
  serializePrivacyPoliciesSource,
} from './_lib/privacyPoliciesFile.js';
import { validateOnboardPayload } from './_lib/validate.js';
import { validateSections } from './_lib/sections.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  if (!validateHubAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  try {
    const body = req.body || {};
    const validation = validateOnboardPayload(body);

    if (!validation.ok) {
      return res.status(400).json({ error: validation.errors.join(' ') });
    }

    const sectionValidation = validateSections(body.sections);
    if (!sectionValidation.ok) {
      return res.status(400).json({ error: sectionValidation.error });
    }

    const {
      companyName,
      slug,
      lastUpdated,
      website,
      supportEmail,
      logo,
    } = validation.data;

    const policiesFile = await readPoliciesFile();
    if (!policiesFile) {
      return res.status(500).json({ error: 'Could not read privacyPolicies.js from the repository.' });
    }

    const existingPolicies = parsePrivacyPoliciesSource(policiesFile.content);

    if (existingPolicies[slug]) {
      return res.status(409).json({ error: `A business with slug "${slug}" already exists.` });
    }

    const newPolicy = {
      companyName,
      website,
      supportEmail,
      lastUpdated,
      logo: logo.publicPath,
      sections: sectionValidation.sections,
    };

    const updatedPolicies = appendBusinessPolicy(existingPolicies, slug, newPolicy);
    const updatedSource = serializePrivacyPoliciesSource(updatedPolicies);
    const logoBinary = Buffer.from(logo.base64, 'base64');

    if (logoBinary.length === 0) {
      return res.status(400).json({ error: 'Logo file data is invalid.' });
    }

    if (logoBinary.length > 5 * 1024 * 1024) {
      return res.status(400).json({ error: 'Logo file must be 5 MB or smaller.' });
    }

    await writeOnboardFiles(
      [
        {
          path: logo.path,
          content: logo.base64,
          encoding: 'base64',
        },
        {
          path: 'src/data/privacyPolicies.js',
          content: updatedSource,
        },
      ],
      `Add business: ${companyName}`,
    );

    const configuredSiteUrl = process.env.PUBLIC_SITE_URL || 'https://privacy-policy.elvatech.in';
    const requestHost = req.headers.host || req.headers['x-forwarded-host'];
    const localDevUrl = requestHost ? `http://${requestHost}` : 'http://localhost:5173';
    const siteUrl = process.env.GITHUB_TOKEN ? configuredSiteUrl : localDevUrl;
    const policyUrl = `${siteUrl.replace(/\/$/, '')}/${slug}`;

    return res.status(200).json({
      success: true,
      slug,
      companyName,
      policyUrl,
      message: process.env.GITHUB_TOKEN
        ? 'Business onboarded successfully.'
        : 'Business saved locally. Restart the dev server or refresh to see the new policy page.',
    });
  } catch (error) {
    console.error('onboard-business error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to onboard business.',
    });
  }
}
