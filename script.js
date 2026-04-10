document.addEventListener('DOMContentLoaded', function () {
    const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
    const sections = Array.from(document.querySelectorAll('section[id]'));

    // Smooth scrolling with slight offset for sticky header.
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) {
                return;
            }

            e.preventDefault();
            const y = target.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top: y, behavior: 'smooth' });
        });
    });

    // Reveal section content progressively as user scrolls.
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.16, rootMargin: '0px 0px -35px 0px' });

    document.querySelectorAll('section > .container').forEach(container => {
        container.style.opacity = '0';
        container.style.transform = 'translateY(18px)';
        container.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
        revealObserver.observe(container);
    });

    // Keep nav context-aware by highlighting current section.
    const navObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }

            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
        });
    }, { threshold: 0.55 });

    sections.forEach(section => navObserver.observe(section));

});