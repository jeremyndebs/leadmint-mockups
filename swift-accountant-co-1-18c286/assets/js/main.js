const smoothScrollTo = selector => {
  const target = document.querySelector(selector);
  if (!target) return false;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return true;
};

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const href = link.getAttribute('href');
    if (!href || href === '#') {
      event.preventDefault();
      smoothScrollTo('#home');
      return;
    }
    if (document.querySelector(href)) {
      event.preventDefault();
      smoothScrollTo(href);
    }
  });
});

document.querySelectorAll('[data-whatsapp]').forEach(link => {
  link.addEventListener('click', event => {
    const raw = (link.dataset.whatsapp || '').trim();
    const hasRealLink = raw && !raw.includes('{{') && (raw.startsWith('http') || raw.startsWith('https') || raw.startsWith('wa.me'));
    if (hasRealLink) {
      event.preventDefault();
      window.open(raw.startsWith('http') ? raw : `https://${raw}`, '_blank', 'noopener');
      return;
    }
    event.preventDefault();
    smoothScrollTo('#quote');
  });
});

const nav = document.querySelector('.nav');
const updateNav = () => nav && nav.classList.toggle('scrolled', window.scrollY > 20);
updateNav();
window.addEventListener('scroll', updateNav, { passive: true });

const revealTargets = document.querySelectorAll('.section, .card, .photo, .gallery img, .hero-card, .quote');
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => observer.observe(el));
