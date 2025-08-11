//Upload image button functionality
var uploadButton = document.getElementById('uploadButton');
var fileInput = document.getElementById('fileInput');
if (uploadButton && fileInput) {
    uploadButton.addEventListener('click', function () {
        fileInput.click();
    });
}
// Smooth-scroll for in-page anchor links
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
        var targetId = a.getAttribute('href');
        if (targetId.length > 1) {
            e.preventDefault();
            var el = document.querySelector(targetId);
            el === null || el === void 0 ? void 0 : el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // close mobile nav after click
            nav === null || nav === void 0 ? void 0 : nav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});
// Mobile nav toggle
var navToggle = document.querySelector('.nav-toggle');
var nav = document.querySelector('.nav');
navToggle.addEventListener('click', function () {
    var expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav === null || nav === void 0 ? void 0 : nav.classList.toggle('open');
});
// FAQ accordion (accessible)
var accordion = document.querySelector('[data-accordion]');
accordion === null || accordion === void 0 ? void 0 : accordion.querySelectorAll('.acc-trigger').forEach(function (btn) {
    btn.addEventListener('click', function () {
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        var panel = document.getElementById(btn.getAttribute('aria-controls'));
        // close others (optional)
        /*accordion.querySelectorAll<HTMLButtonElement>('.acc-trigger').forEach(b => {
          if (b !== btn) {
            b.setAttribute('aria-expanded', 'false');
            const p = document.getElementById(b.getAttribute('aria-controls')!);
            p?.setAttribute('hidden', '');
          }
        });*/
        // toggle current
        btn.setAttribute('aria-expanded', String(!expanded));
        panel === null || panel === void 0 ? void 0 : panel.toggleAttribute('hidden');
    });
});
// “Read to Bottom” helper inside About
document.querySelectorAll('[data-scroll-to-end]').forEach(function (btn) {
    var _a;
    var targetSel = btn.getAttribute('data-scroll-to-end');
    var scope = (_a = document.querySelector(targetSel)) === null || _a === void 0 ? void 0 : _a.querySelector('[data-overflow]');
    btn.addEventListener('click', function () {
        if (!scope)
            return;
        scope.scrollTo({ top: scope.scrollHeight, behavior: 'smooth' });
    });
});
/*
// Optional: hide/show the sticky CTA based on scroll (simple)
const fixedCta = document.querySelector<HTMLElement>('[data-fixed-cta]');
const tech = document.getElementById('technology');
if (fixedCta && tech) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // show CTA when Technology is not in view
      fixedCta.style.opacity = entry.isIntersecting ? '0' : '1';
      fixedCta.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
    });
  }, { threshold: 0.2 });
  io.observe(tech);
}
*/
