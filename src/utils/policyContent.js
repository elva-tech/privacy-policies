const HEADING_TAGS = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6']);

function normalizeHtml(html) {
  return html
    .replace(/<p><br><\/p>/g, '')
    .replace(/<p>\s*<\/p>/g, '')
    .trim();
}

function isMeaningfulHtml(html) {
  const stripped = html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim();
  return stripped.length > 0;
}

export function htmlToPolicySections(policyHtml) {
  const normalized = normalizeHtml(policyHtml);

  if (!isMeaningfulHtml(normalized)) {
    throw new Error('Privacy policy content is required.');
  }

  const document = new DOMParser().parseFromString(normalized, 'text/html');
  const body = document.body;
  const sections = [];
  let currentSection = null;

  const pushSection = () => {
    if (!currentSection) {
      return;
    }

    const content = normalizeHtml(currentSection.content.join(''));
    if (currentSection.title && isMeaningfulHtml(content)) {
      sections.push({
        title: currentSection.title,
        content,
      });
    }
    currentSection = null;
  };

  body.childNodes.forEach((node) => {
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    const tagName = node.tagName;

    if (HEADING_TAGS.has(tagName)) {
      pushSection();
      const title = node.textContent?.trim();
      if (title) {
        currentSection = {
          title,
          content: [],
        };
      }
      return;
    }

    const html = node.outerHTML?.trim();
    if (!html) {
      return;
    }

    if (!currentSection) {
      currentSection = {
        title: 'Overview',
        content: [],
      };
    }

    currentSection.content.push(html);
  });

  pushSection();

  if (sections.length === 0) {
    throw new Error('Privacy policy must include at least one section. Use headings to create sections.');
  }

  return sections;
}

export function isHtmlContent(content) {
  return /<[a-z][\s\S]*>/i.test(content);
}
