/* =============================================
   PetWorld – script.js
   ============================================= */

// ─── SIDEBAR ──────────────────────────────────
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

// window.X garantiza que sean globales y accesibles
// desde los atributos onclick="" del HTML
window.openSidebar = function () {
  sidebar.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeSidebar = function () {
  sidebar.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
};

// Cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') window.closeSidebar();
});


// ─── SLIDER ───────────────────────────────────
const slides = document.querySelectorAll('.slide');
const dots   = document.querySelectorAll('.dot');
let currentSlide = 0;
let autoSlide;

window.goToSlide = function (index) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');

  currentSlide = (index + slides.length) % slides.length;

  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
};

function nextSlide() {
  window.goToSlide(currentSlide + 1);
}

function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 4500);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    window.goToSlide(i);
    resetAutoSlide();
  });
});

startAutoSlide();


// ─── LOGO FLOTANTE – efecto parallax ─────────
const logoInner = document.querySelector('.logo-inner');

if (logoInner) {
  window.addEventListener('scroll', () => {
    const offset = Math.min(window.scrollY * 0.15, 20);
    logoInner.style.transform = `translateY(${offset}px)`;
  });
}


// ─── ANIMACIONES AL HACER SCROLL ─────────────
const animTargets = document.querySelectorAll(
  '.producto-card, .mv-card, .footer-col'
);

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animTargets.forEach((el, i) => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(28px)';
  el.style.transition = `opacity .55s ease ${i * 0.08}s, transform .55s ease ${i * 0.08}s`;
  observer.observe(el);
});

document.head.insertAdjacentHTML('beforeend', `
  <style>
    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  </style>
`);


// ─── BOTÓN "VER MÁS" – feedback visual ────────
document.querySelectorAll('.btn-comprar').forEach((btn) => {
  btn.addEventListener('click', function () {
    const original = this.textContent;
    this.textContent = '✓ Agregado';
    this.style.background = '#4caf7d';
    setTimeout(() => {
      this.textContent = original;
      this.style.background = '';
    }, 1800);
  });
});
