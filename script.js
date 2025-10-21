const nav = document.querySelector('.app-nav');
const toggle = document.querySelector('.nav-toggle');
toggle?.addEventListener('click', () => {
  nav?.classList.toggle('side-left');
});

const sections = Array.from(document.querySelectorAll('main .section'));
const links = Array.from(document.querySelectorAll('.app-nav .nav-item'));

function setActiveByHash(hash) {
  links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === hash));
}

links.forEach(link => {
  link.addEventListener('click', (e) => {
    setActiveByHash(link.getAttribute('href'));
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActiveByHash('#' + entry.target.id);
    }
  });
}, { 
  rootMargin: '0px 0px -60% 0px',
  threshold: 0.2
});

sections.forEach(sec => observer.observe(sec));

const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle?.querySelector('i');

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  
  if (themeIcon) {
    themeIcon.className = newTheme === 'light' ? 'bx bx-moon' : 'bx bx-sun';
  }
  
  localStorage.setItem('theme', newTheme);
}

themeToggle?.addEventListener('click', toggleTheme);

function loadSavedTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  if (themeIcon) {
    themeIcon.className = savedTheme === 'light' ? 'bx bx-moon' : 'bx bx-sun';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  loadSavedTheme();
  const initialHash = location.hash || '#home';
  setActiveByHash(initialHash);
});