const LIST_FUNCTION = `export function listPrivacyPolicies() {
  return Object.entries(privacyPolicies).map(([slug, policy]) => ({
    slug,
    companyName: policy.companyName,
    logo: policy.logo,
    website: policy.website,
  }));
}`;

export function parsePrivacyPoliciesSource(source) {
  const marker = 'export const privacyPolicies = ';
  const markerIndex = source.indexOf(marker);

  if (markerIndex === -1) {
    throw new Error('Could not find privacyPolicies export.');
  }

  const objectStart = source.indexOf('{', markerIndex);
  if (objectStart === -1) {
    throw new Error('Could not parse privacyPolicies object.');
  }

  let depth = 0;
  let inString = false;
  let stringChar = '';
  let escaped = false;

  for (let i = objectStart; i < source.length; i += 1) {
    const char = source[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === stringChar) {
        inString = false;
        stringChar = '';
      }
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      inString = true;
      stringChar = char;
      continue;
    }

    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        const objectLiteral = source.slice(objectStart, i + 1);
        const policies = new Function(`return (${objectLiteral});`)();
        return policies;
      }
    }
  }

  throw new Error('Could not parse privacyPolicies object.');
}

function serializeString(value) {
  return JSON.stringify(value);
}

function serializeSection(section, indent) {
  const pad = ' '.repeat(indent);
  const inner = ' '.repeat(indent + 2);
  const lines = [
    `${pad}{`,
    `${inner}title: ${serializeString(section.title)},`,
    `${inner}content:`,
    `${inner}  ${serializeString(section.content)},`,
    `${pad}},`,
  ];
  return lines.join('\n');
}

function serializePolicy(policy, indent) {
  const pad = ' '.repeat(indent);
  const inner = ' '.repeat(indent + 2);
  const lines = [`${pad}{`];

  lines.push(`${inner}companyName: ${serializeString(policy.companyName)},`);

  if (policy.website !== undefined) {
    lines.push(`${inner}website: ${serializeString(policy.website)},`);
  }

  if (policy.supportEmail !== undefined) {
    lines.push(`${inner}supportEmail: ${serializeString(policy.supportEmail)},`);
  }

  if (policy.phone) {
    lines.push(`${inner}phone: ${serializeString(policy.phone)},`);
  }

  if (policy.supportHours) {
    lines.push(`${inner}supportHours: ${serializeString(policy.supportHours)},`);
  }

  if (policy.address) {
    lines.push(`${inner}address: ${serializeString(policy.address)},`);
  }

  if (policy.lastUpdated) {
    lines.push(`${inner}lastUpdated: ${serializeString(policy.lastUpdated)},`);
  }

  lines.push(`${inner}logo: ${serializeString(policy.logo)},`);
  lines.push('');
  lines.push(`${inner}sections: [`);

  policy.sections.forEach((section, index) => {
    lines.push(serializeSection(section, indent + 4));
    if (index < policy.sections.length - 1) {
      lines.push('');
    }
  });

  lines.push(`${inner}],`);
  lines.push(`${pad}},`);

  return lines.join('\n');
}

function formatSlugKey(slug) {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(slug) ? slug : serializeString(slug);
}

export function serializePrivacyPoliciesSource(policies) {
  const entries = Object.entries(policies).map(([slug, policy]) => {
    const key = formatSlugKey(slug);
    return `${key}: ${serializePolicy(policy, 0)}`;
  });

  return `export const privacyPolicies = {\n${entries.join('\n\n')}\n};\n\n${LIST_FUNCTION}\n`;
}

export function appendBusinessPolicy(existingPolicies, slug, policy) {
  if (existingPolicies[slug]) {
    throw new Error(`A business with slug "${slug}" already exists.`);
  }

  return {
    ...existingPolicies,
    [slug]: policy,
  };
}
