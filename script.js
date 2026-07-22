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

// Theme toggle: switches data-theme on <html> between light (default) and dark.
const toggleBtn = document.getElementById('theme-toggle');
const toggleLabel = toggleBtn ? toggleBtn.querySelector('.theme-toggle-label') : null;

const applyTheme = (theme) => {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (toggleLabel) toggleLabel.textContent = 'Light';
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (toggleLabel) toggleLabel.textContent = 'Dark';
  }
};

let savedTheme = 'light';
try {
  savedTheme = localStorage.getItem('theme') || 'light';
} catch (e) {
  // localStorage unavailable (e.g. sandboxed preview) — default to light, toggle still works for the session.
}
applyTheme(savedTheme);

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
  });
}
