export function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

export function isValidSlug(slug) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}
