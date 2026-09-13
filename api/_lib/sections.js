export function validateSections(sections) {
  if (!Array.isArray(sections) || sections.length === 0) {
    return { ok: false, error: 'Privacy policy must include at least one section.' };
  }

  const sanitized = [];

  for (const section of sections) {
    const title = typeof section?.title === 'string' ? section.title.trim() : '';
    const content = typeof section?.content === 'string' ? section.content.trim() : '';

    if (!title) {
      return { ok: false, error: 'Each policy section must have a title.' };
    }

    const stripped = content
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .trim();

    if (!stripped) {
      return { ok: false, error: `Section "${title}" must include content.` };
    }

    sanitized.push({ title, content });
  }

  return { ok: true, sections: sanitized };
}
