// Initialize Swiper for Achievements
const achievementsSwiper = new Swiper('.achievements-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.achievements-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.achievements-button-next',
        prevEl: '.achievements-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    }
});

// Initialize Swiper for Testimonials
const testimonialsSwiper = new Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.testimonials-pagination',
        clickable: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    }
});

// Statistics Counter Animation
const statistics = document.querySelectorAll('.statistic-number');

function animateStatistics() {
    statistics.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 20); // Update every 20ms
        let current = 0;
        
        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// Trigger animation when element is in viewport
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStatistics();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (statistics.length > 0) {
    observer.observe(document.querySelector('.statistics-container'));
}

// Faculty Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const facultyCards = document.querySelectorAll('.faculty-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        facultyCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
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
        creativeImages.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.style.opacity = '0.6';
                otherItem.style.transform = 'scale(0.95)';
            }
        });
    });
    
    item.addEventListener('mouseleave', () => {
        creativeImages.forEach(otherItem => {
            otherItem.style.opacity = '1';
            otherItem.style.transform = 'scale(1)';
        });
    });
});