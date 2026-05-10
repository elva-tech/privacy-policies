const DEFAULT_HREF = '/favicon.svg';
const DEFAULT_TYPE = 'image/svg+xml';

export function setAppFavicon(href, type = DEFAULT_TYPE) {
  let link = document.getElementById('app-favicon');
  if (!link) {
    link = document.createElement('link');
    link.id = 'app-favicon';
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = href;
  link.type = type;
}

export function restoreDefaultFavicon() {
  setAppFavicon(DEFAULT_HREF, DEFAULT_TYPE);
}
