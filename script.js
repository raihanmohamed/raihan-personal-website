// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== Hide navbar on scroll down, show on scroll up =====
const navbar = document.getElementById('navbar');
let lastY = window.scrollY;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > lastY && y > 120) {
    navbar.classList.add('hide');
  } else {
    navbar.classList.remove('hide');
  }
  lastY = y;
}, { passive: true });

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
  observer.observe(el);
});

// ===== Custom cursor dot (desktop only) =====
const cursorDot = document.getElementById('cursorDot');
if (window.matchMedia('(min-width: 900px)').matches && cursorDot) {
  window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursorDot.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorDot.classList.remove('hover'));
  });
}

// ===== Résumé modal =====
const resumeModal = document.getElementById('resumeModal');
const resumeClose = document.getElementById('resumeClose');
const resumeLinks = document.querySelectorAll('.resume-link');

resumeLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    // Open in-page preview instead of new tab, on larger screens
    if (window.matchMedia('(min-width: 700px)').matches) {
      e.preventDefault();
      resumeModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
});

function closeResume() {
  resumeModal.classList.remove('open');
  document.body.style.overflow = '';
}
resumeClose?.addEventListener('click', closeResume);
resumeModal?.addEventListener('click', (e) => {
  if (e.target === resumeModal) closeResume();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeResume();
});
