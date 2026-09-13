const STORAGE_KEY = 'elva_hub_authenticated';
const USERNAME_KEY = 'elva_hub_username';
const PASSWORD_KEY = 'elva_hub_password';

export function isHubAuthenticated() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function getHubCredentials() {
  try {
    const username = sessionStorage.getItem(USERNAME_KEY);
    const password = sessionStorage.getItem(PASSWORD_KEY);
    if (!username || !password) {
      return null;
    }
    return { username, password };
  } catch {
    return null;
  }
}

export function setHubAuthenticated(value, credentials) {
  try {
    if (value) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      if (credentials?.username && credentials?.password) {
        sessionStorage.setItem(USERNAME_KEY, credentials.username);
        sessionStorage.setItem(PASSWORD_KEY, credentials.password);
      }
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(USERNAME_KEY);
      sessionStorage.removeItem(PASSWORD_KEY);
    }
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
