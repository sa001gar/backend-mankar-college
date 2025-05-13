// Common Swiper Settings
const getSwiperConfig = (paginationEl, nav = null, autoplayDelay = 5000, breakpoints = {}) => ({
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: autoplayDelay,
        disableOnInteraction: false,
    },
    pagination: {
        el: paginationEl,
        clickable: true,
    },
    ...(nav && {
        navigation: {
            nextEl: nav.next,
            prevEl: nav.prev,
        },
    }),
    breakpoints
});

// Initialize Swiper for Achievements
new Swiper('.achievements-swiper', getSwiperConfig(
    '.achievements-pagination',
    { next: '.achievements-button-next', prev: '.achievements-button-prev' },
    5000,
    {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
    }
));

// Initialize Swiper for Testimonials
new Swiper('.testimonials-swiper', getSwiperConfig(
    '.testimonials-pagination',
    null,
    6000,
    {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
    }
));

// Statistics Counter Animation
const statistics = document.querySelectorAll('.statistic-number');

function animateCount(el, target, duration = 2000) {
    const startTime = performance.now();
    const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = target;
        }
    };
    requestAnimationFrame(update);
}

const observerOptions = { threshold: 0.5 };

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statistics.forEach(stat => {
                const target = parseInt(stat.dataset.count);
                animateCount(stat, target);
            });
            obs.unobserve(entry.target);
        }
    });
}, observerOptions);

const statContainer = document.querySelector('.statistics-container');
if (statContainer) observer.observe(statContainer);

// Faculty Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const facultyCards = document.querySelectorAll('.faculty-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filter = button.dataset.filter;

        facultyCards.forEach(card => {
            const matches = filter === 'all' || card.dataset.category === filter;
            if (matches) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Creative Image Hover Effect
const creativeImages = document.querySelectorAll('.creative-image-item');

creativeImages.forEach(item => {
    item.addEventListener('mouseenter', () => {
        creativeImages.forEach(other => {
            if (other !== item) {
                other.style.opacity = '0.6';
                other.style.transform = 'scale(0.95)';
            }
        });
    });

    item.addEventListener('mouseleave', () => {
        creativeImages.forEach(other => {
            other.style.opacity = '1';
            other.style.transform = 'scale(1)';
        });
    });
});
