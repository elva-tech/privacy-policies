const STORAGE_KEY = 'elva_hub_authenticated';

export function isHubAuthenticated() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setHubAuthenticated(value) {
  try {
    if (value) sessionStorage.setItem(STORAGE_KEY, 'true');
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function hubCredentialsConfigured() {
  const u = import.meta.env.VITE_HUB_USERNAME;
  const p = import.meta.env.VITE_HUB_PASSWORD;
  return typeof u === 'string' && u.length > 0 && typeof p === 'string' && p.length > 0;
}

export function validateHubCredentials(username, password) {
  if (!hubCredentialsConfigured()) return false;
  const u = import.meta.env.VITE_HUB_USERNAME;
  const p = import.meta.env.VITE_HUB_PASSWORD;
  return username === u && password === p;
}
