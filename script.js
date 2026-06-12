document.addEventListener('DOMContentLoaded', () => {
  
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  const sections = document.querySelectorAll('section[id]');
  sections.forEach(sec => {
    new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          document.querySelectorAll('.navbar-nav .nav-link').forEach(l => l.classList.remove('active-link'));
          const activeItem = document.querySelector(`.navbar-nav .nav-link[href="#${sec.id}"]`);
          if (activeItem) activeItem.classList.add('active-link');
        }
      });
    }, { threshold: 0.4 }).observe(sec);
  });

  const fadeUpElements = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Staggered speed adjusted smoothly for the 4-column inline structure
        entry.target.style.transitionDelay = `${(index % 4) * 0.08}s`;
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeUpElements.forEach(el => fadeObserver.observe(el));
});