const filterButtons = document.querySelectorAll('.vv-pillBtn');
const photoItems = document.querySelectorAll('.vv-item-photo');
const videoItems = document.querySelectorAll('.vv-item-video');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filterButtons.forEach(b => b.setAttribute('aria-pressed', 'false'));
        btn.setAttribute('aria-pressed', 'true');

        if (filter === 'photos') {
            photoItems.forEach(item => {
                item.style.display = 'block';
                item.style.animation = 'none';
                item.offsetHeight;
                item.style.animation = 'fadeInUp 0.6s ease-out forwards';
            });

            videoItems.forEach(item => item.style.display = 'none');

        } else {
            photoItems.forEach(item => item.style.display = 'none');

            videoItems.forEach((item, index) => {
                item.style.display = 'block';
                item.style.animation = 'none';
                item.offsetHeight;
                item.style.animation = 'fadeInUp 0.6s ease-out forwards';
                item.style.animationDelay = `${index * 0.1}s`;
            });
        }
    });
});

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;

            if (el.dataset.animate === 'portfolio') {
                const siblings = [...el.parentElement.children].filter(
                    child => child.dataset.animate === 'portfolio'
                );
                el.style.setProperty('--index', siblings.indexOf(el));
            }

            el.style.opacity = '1';
            observer.unobserve(el);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

const bg = document.querySelector('.bg-oranage');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    bg.style.transform = `translateY(${scrollY * 0.15}px) scale(1.05)`;

    document.querySelectorAll('.vv-stat').forEach(stat => {
        const rect = stat.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            stat.style.opacity = '1';
        }
    });
}, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-animate]').forEach(el => {
        el.style.opacity = '1';
    });
});