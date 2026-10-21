export function validateHubAuth(req) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Basic ')) {
    return false;
  }

  const encoded = header.slice(6);
  let decoded;

  try {
    decoded = Buffer.from(encoded, 'base64').toString('utf8');
  } catch {
    return false;
  }

  const separator = decoded.indexOf(':');
  if (separator === -1) {
    return false;
  }

  const username = decoded.slice(0, separator);
  const password = decoded.slice(separator + 1);
  const expectedUser = process.env.HUB_USERNAME;
  const expectedPass = process.env.HUB_PASSWORD;

  if (!expectedUser || !expectedPass) {
    return false;
  }

  return username === expectedUser && password === expectedPass;
}
