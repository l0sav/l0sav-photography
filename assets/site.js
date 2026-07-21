
const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const menu = document.querySelector('[data-menu]');

const syncHeader = () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 30);
};
syncHeader();
addEventListener('scroll', syncHeader, {passive:true});

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    header?.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    header?.classList.remove('menu-open');
    document.body.style.overflow = '';
  }));
}

const reveal = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      reveal.unobserve(entry.target);
    }
  });
}, {threshold: .08});
document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

const modal = document.querySelector('[data-lightbox-modal]');
if (modal) {
  const modalImage = modal.querySelector('img');
  const caption = modal.querySelector('.lightbox-caption');
  const close = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  };
  document.querySelectorAll('[data-lightbox]').forEach(item => {
    item.addEventListener('click', () => {
      const image = item.querySelector('img');
      const title = item.querySelector('h3')?.textContent || '';
      modalImage.src = image.src;
      modalImage.alt = image.alt;
      caption.textContent = title;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow='hidden';
    });
  });
  modal.querySelector('[data-lightbox-close]').addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}


addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.classList.contains('open')) {
    menu.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
    header?.classList.remove('menu-open');
    document.body.style.overflow = '';
    menuButton?.focus();
  }
});
