//Upload image button functionality
const uploadButton = document.getElementById('uploadButton');
const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;

if (uploadButton && fileInput) {
  uploadButton.addEventListener('click', () => {
    fileInput.click();
  });
}

// Smooth-scroll for in-page anchor links
document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const targetId = a.getAttribute('href')!;
      if (targetId.length > 1) {
        e.preventDefault();
        const el = document.querySelector(targetId);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav after click
        nav?.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
  
  // Mobile nav toggle
  const navToggle = document.querySelector<HTMLButtonElement>('.nav-toggle')!;
  const nav = document.querySelector<HTMLElement>('.nav');
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav?.classList.toggle('open');
  });
  
  // FAQ accordion (accessible)
  const accordion = document.querySelector<HTMLElement>('[data-accordion]');
  accordion?.querySelectorAll<HTMLButtonElement>('.acc-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const panel = document.getElementById(btn.getAttribute('aria-controls')!);
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
      panel?.toggleAttribute('hidden');
    });
  });
  
  // “Read to Bottom” helper inside About
  document.querySelectorAll<HTMLButtonElement>('[data-scroll-to-end]').forEach(btn => {
    const targetSel = btn.getAttribute('data-scroll-to-end')!;
    const scope = document.querySelector<HTMLElement>(targetSel)?.querySelector<HTMLElement>('[data-overflow]');
    btn.addEventListener('click', () => {
      if (!scope) return;
      scope.scrollTo({ top: scope.scrollHeight, behavior: 'smooth' });
    });
  });
  