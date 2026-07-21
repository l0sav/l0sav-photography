
const header = document.querySelector('[data-header]');
const menu = document.querySelector('[data-menu]');
const button = document.querySelector('[data-menu-button]');

function updateHeader(){
  if(window.scrollY > 40 || !document.body.classList.contains('home')) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
}
updateHeader();
window.addEventListener('scroll', updateHeader, {passive:true});

button?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  button.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});
menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  document.body.style.overflow = '';
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
