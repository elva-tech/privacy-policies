import { getHubCredentials } from '../auth/hubAuth';

export async function onboardBusiness(payload) {
  const credentials = getHubCredentials();

  if (!credentials) {
    throw new Error('You must be signed in to onboard a business.');
  }

  const response = await fetch('/api/onboard-business', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`,
    },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();
  let data;

  try {
    data = responseText ? JSON.parse(responseText) : {};
  } catch {
    const preview = responseText.slice(0, 80).replace(/\s+/g, ' ');
    throw new Error(
      response.ok
        ? 'Unexpected server response.'
        : `Server error (${response.status}). ${preview.startsWith('<!') ? 'The API route is not available — restart with npm run dev.' : preview}`,
    );
  }

  if (!response.ok) {
    throw new Error(data.error || 'Failed to onboard business.');
  }

  return data;
}
