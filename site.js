// Shared behaviour: mobile navigation and disclosure buttons.
(function () {
  const header = document.querySelector('.site-header');
  const toggle = header && header.querySelector('.nav-toggle');
  const nav = header && document.getElementById(toggle ? toggle.getAttribute('aria-controls') : '');

  if (header && toggle && nav) {
    const label = toggle.querySelector('.nav-toggle-label');

    const setOpen = (open) => {
      header.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (label) label.textContent = open ? 'Close' : 'Menu';
    };

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      setOpen(open);
      if (open) {
        const first = nav.querySelector('a');
        if (first) first.focus();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (header.classList.contains('nav-open') && !header.contains(e.target)) setOpen(false);
    });

    // Close the menu when focus leaves the header (e.g. tabbing past the last link).
    header.addEventListener('focusout', (e) => {
      if (header.classList.contains('nav-open') && e.relatedTarget && !header.contains(e.relatedTarget)) {
        setOpen(false);
      }
    });

    window.matchMedia('(min-width: 861px)').addEventListener('change', (e) => {
      if (e.matches) setOpen(false);
    });
  }

  document.querySelectorAll('[data-disclosure]').forEach((btn) => {
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    const label = btn.querySelector('.disclosure-label');
    if (!panel || !label) return;
    const closedText = label.textContent;
    panel.hidden = btn.getAttribute('aria-expanded') !== 'true';
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      panel.hidden = !open;
      label.textContent = open ? btn.dataset.openLabel : closedText;
    });
  });
})();
