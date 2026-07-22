// Highlight the current section in the nav as the user scrolls.
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

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
const toggleLabel = toggleBtn ? toggleBtn.querySelector('.theme-toggle-label') : null;

const applyTheme = (theme) => {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (toggleLabel) toggleLabel.textContent = 'Dark';
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (toggleLabel) toggleLabel.textContent = 'Light';
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
