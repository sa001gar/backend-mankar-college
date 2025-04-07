// Enhanced Scripts for CS Department Website
document.addEventListener("DOMContentLoaded", function() {
  // Image Slider
  var images = document.querySelectorAll(".cs-slider-image");
  var leftArrow = document.querySelector(".cs-left-arrow");
  var rightArrow = document.querySelector(".cs-right-arrow");
  var currentImageIndex = 0;
  var sliderInterval;

  function showImage(index) {
    for (var i = 0; i < images.length; i++) {
      images[i].classList.remove("active");
    }
    images[index].classList.add("active");
  }

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex);
  }

  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(currentImageIndex);
  }

  if (leftArrow && rightArrow) {
    leftArrow.addEventListener("click", prevImage);
    rightArrow.addEventListener("click", nextImage);

    // Auto-advance the slider
    sliderInterval = setInterval(nextImage, 5000);

    // Pause auto-advance when hovering over slider
    var imageSlider = document.querySelector(".cs-image-slider");
    if (imageSlider) {
      imageSlider.addEventListener("mouseenter", function() {
        clearInterval(sliderInterval);
      });

      imageSlider.addEventListener("mouseleave", function() {
        sliderInterval = setInterval(nextImage, 5000);
      });
    }
  }

  // Initialize Swiper for Student Achievements
  if (document.querySelector(".cs-achievements-swiper")) {
    var Swiper = window.Swiper || {}; // Check if Swiper is already defined
    var achievementsSwiper = new Swiper(".cs-achievements-swiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: ".cs-achievements-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".cs-achievements-button-next",
        prevEl: ".cs-achievements-button-prev"
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
    });
  }

  // Statistics Counter Animation
  var statisticNumbers = document.querySelectorAll(".cs-stat-number, .cs-category-number, .cs-percentage");

  // Function to animate counting
  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-count") || el.textContent, 10);
    var duration = 2000; // 2 seconds
    var step = target / (duration / 16); // 60fps
    var current = 0;
    var suffix = el.textContent.includes("+") ? "+" : "";
    var prefix = el.textContent.includes("%") ? "" : "";

    var timer = setInterval(function() {
      current += step;
      if (current >= target) {
        el.textContent = prefix + target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = prefix + Math.floor(current) + suffix;
      }
    }, 16);
  }

  // Intersection Observer for statistics section
  var observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var counters = entry.target.querySelectorAll(".cs-stat-number, .cs-category-number, .cs-percentage");
          counters.forEach(function(counter) {
            animateCounter(counter);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  var statSections = document.querySelectorAll(".cs-statistics-section, .cs-students-working, .cs-hero-stats");
  statSections.forEach(function(section) {
    if (section) {
      observer.observe(section);
    }
  });

  // Add animation to elements on scroll
  var animatedElements = document.querySelectorAll(".cs-feature, .cs-stat-box, .cs-student-card, .cs-category-box, .cs-info-box");

  var elementObserver = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          elementObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Set initial state and observe elements
  if (animatedElements.length > 0) {
    for (let i = 0; i < animatedElements.length; i++) {
      animatedElements[i].style.opacity = "0";
      animatedElements[i].style.transform = "translateY(20px)";
      animatedElements[i].style.transition = "all 0.5s ease " + (i % 3 * 0.1) + "s";
      animatedElements[i].classList.add("cs-animate");
      
      elementObserver.observe(animatedElements[i]);
    }
  }

  // Add animation class to elements
  document.addEventListener("scroll", function() {
    document.querySelectorAll(".cs-animate").forEach(function(element) {
      if (isElementInViewport(element)) {
        element.style.opacity = "1";
        element.style.transform = "translate(0, 0)";
      }
    });
  });

  // Helper function to check if element is in viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }

  // Scroll to top functionality
  var scrollTopBtn = document.querySelector(".cs-scroll-top");
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Trigger animations for elements already in viewport on page load
  setTimeout(function() {
    document.querySelectorAll(".cs-animate").forEach(function(element) {
      if (isElementInViewport(element)) {
        element.style.opacity = "1";
        element.style.transform = "translate(0, 0)";
      }
    });
  }, 300);
});