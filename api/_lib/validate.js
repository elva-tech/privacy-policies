const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ALLOWED_IMAGE_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
]);

const EXTENSION_BY_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/webp': 'webp',
};

export function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

export function isValidSlug(slug) {
  return SLUG_PATTERN.test(slug);
}

export function getLogoExtension(contentType) {
  return EXTENSION_BY_TYPE[contentType] || null;
}

export function validateOnboardPayload(body) {
  const errors = [];

  const companyName = typeof body.companyName === 'string' ? body.companyName.trim() : '';
  const slug = typeof body.slug === 'string' ? body.slug.trim() : '';
  const lastUpdated = typeof body.lastUpdated === 'string' ? body.lastUpdated.trim() : '';
  const website = typeof body.website === 'string' ? body.website.trim() : '';
  const supportEmail = typeof body.supportEmail === 'string' ? body.supportEmail.trim() : '';
  const logo = body.logo;

  if (!companyName) {
    errors.push('Business name is required.');
  }

  if (!slug) {
    errors.push('URL slug is required.');
  } else if (!isValidSlug(slug)) {
    errors.push('URL slug must contain only lowercase letters, numbers, and hyphens.');
  }

  if (!lastUpdated) {
    errors.push('Last updated date is required.');
  }

  if (!logo || typeof logo !== 'object') {
    errors.push('Logo is required.');
  } else {
    const contentType = typeof logo.contentType === 'string' ? logo.contentType.toLowerCase() : '';
    const base64 = typeof logo.base64 === 'string' ? logo.base64.trim() : '';

    if (!ALLOWED_IMAGE_TYPES.has(contentType)) {
      errors.push('Logo must be a PNG, JPG, JPEG, or WEBP image.');
    }

    if (!base64) {
      errors.push('Logo file data is missing.');
    }
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const contentType = logo.contentType.toLowerCase();
  const extension = getLogoExtension(contentType);
  const logoPath = `public/logos/${slug}.${extension}`;

  if (logoPath.includes('..') || logoPath.includes('\\')) {
    errors.push('Invalid logo path.');
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      companyName,
      slug,
      lastUpdated,
      website,
      supportEmail,
      logo: {
        contentType,
        base64: logo.base64.trim(),
        path: logoPath,
        publicPath: `/logos/${slug}.${extension}`,
      },
    },
  };
}
