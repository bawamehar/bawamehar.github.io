// Highlight the current section in the nav as the user scrolls.
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-pill a');

const setActive = () => {
  let current = '';
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.id;
  });
  navLinks.forEach((link) => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
};

window.addEventListener('scroll', setActive, { passive: true });
setActive();

// Theme toggle: dark is the default (no attribute needed).
// Setting data-theme="light" switches to the light theme.
const toggleBtn = document.getElementById('theme-toggle');

const sunIcon = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
const moonIcon = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

const applyTheme = (theme) => {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (toggleBtn) { toggleBtn.innerHTML = moonIcon; toggleBtn.setAttribute('aria-label', 'Switch to dark mode'); }
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (toggleBtn) { toggleBtn.innerHTML = sunIcon; toggleBtn.setAttribute('aria-label', 'Switch to light mode'); }
  }
};

let savedTheme = 'dark';
try {
  savedTheme = localStorage.getItem('theme') || 'dark';
} catch (e) {
  // localStorage unavailable (e.g. sandboxed preview) — default to dark, toggle still works for the session.
}
applyTheme(savedTheme);

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
  });
}
