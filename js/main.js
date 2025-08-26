// Theme toggle (light/dark) and persist in localStorage
const toggleBtn = document.getElementById('theme-toggle');
const root = document.documentElement;

function setTheme(theme){
  if(theme === 'dark'){
    document.documentElement.setAttribute('data-theme','dark');
    toggleBtn.textContent = '🌙';
  } else {
    document.documentElement.removeAttribute('data-theme');
    toggleBtn.textContent = '☀️';
  }
  localStorage.setItem('site-theme', theme);
}

// initialize
const saved = localStorage.getItem('site-theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(saved === 'dark' ? 'dark' : 'light');

toggleBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// Smooth scroll offset (if you want to account for sticky header)
window.addEventListener('hashchange', () => {
  window.scrollBy(0, -70);
});

// Optionally: Add active nav highlight while scrolling
const navLinks = document.querySelectorAll('.top-nav a');
const sections = [...document.querySelectorAll('main section')];

function onScroll(){
  const pos = window.scrollY + 120; // small offset
  for(const sec of sections){
    if(sec.offsetTop <= pos && sec.offsetTop + sec.offsetHeight > pos){
      const id = sec.id;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    }
  }
}

window.addEventListener('scroll', onScroll);
onScroll();
