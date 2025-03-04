// Enhanced Scripts for CS Department Website
// Note: This assumes Swiper is loaded via <script> tag in the HTML before this code

document.addEventListener("DOMContentLoaded", function() {
  // // Lazy Loading
  // var lazyLoader = document.getElementById("cs-lazy-loader");
  // window.addEventListener("load", function() {
  //   setTimeout(function() {
  //     lazyLoader.style.display = "none";
  //   }, 500);
  // });

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
      },
      effect: "coverflow",
      coverflowEffect: {
        rotate: 5,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false
      }
    });
  }

  // Initialize Swiper for Alumni
  if (document.querySelector(".cs-alumni-swiper")) {
    var alumniSwiper = new Swiper(".cs-alumni-swiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: ".cs-alumni-swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".cs-alumni-swiper-button-next",
        prevEl: ".cs-alumni-swiper-button-prev"
      },
      autoplay: {
        delay: 4000,
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
      },
      effect: "coverflow",
      coverflowEffect: {
        rotate: 5,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false
      }
    });
  }

  // Statistics Counter Animation with Progress Bars
  var statisticNumbers = document.querySelectorAll(".cs-statistic-number");
  var progressBars = document.querySelectorAll(".cs-progress-bar");

  // Function to animate counting
  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var duration = 2000; // 2 seconds
    var step = target / (duration / 16); // 60fps
    var current = 0;

    var timer = setInterval(function() {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 16);
  }

  // Function to animate progress bars
  function animateProgressBars(el) {
    var percentage = el.getAttribute("data-percentage");
    el.style.width = percentage + "%";
  }

  // Intersection Observer for statistics section
  var observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          for (var i = 0; i < statisticNumbers.length; i++) {
            animateCounter(statisticNumbers[i]);
          }

          for (var j = 0; j < progressBars.length; j++) {
            animateProgressBars(progressBars[j]);
          }

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  var statisticsSection = document.querySelector(".cs-statistics-section");
  if (statisticsSection) {
    observer.observe(statisticsSection);
  }

  // Pagination and Load More functionality
  var paginationBtns = document.querySelectorAll(".cs-pagination-btn");
  var loadMoreBtn = document.querySelector(".cs-load-more-btn");

  if (paginationBtns.length > 0) {
    for (var i = 0; i < paginationBtns.length; i++) {
      paginationBtns[i].addEventListener("click", function() {
        // Remove active class from all buttons
        for (var j = 0; j < paginationBtns.length; j++) {
          paginationBtns[j].classList.remove("active");
        }
        // Add active class to clicked button
        this.classList.add("active");

        // Here you would typically fetch new data or change page
        // For demo purposes, we'll just simulate loading
        simulateLoading();
      });
    }
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function() {
      this.classList.add("loading");

      // Simulate loading more content
      setTimeout(function() {
        loadMoreBtn.classList.remove("loading");
        // Here you would typically append new content
      }, 1500);
    });
  }

  function simulateLoading() {
    // Add loading state to pagination container
    var paginationContainer = document.querySelector(".cs-pagination-container");
    if (paginationContainer) {
      paginationContainer.classList.add("loading");

      setTimeout(function() {
        paginationContainer.classList.remove("loading");
      }, 1000);
    }
  }

  // // Scroll to Top Button
  // var scrollTopBtn = document.getElementById("cs-scroll-top");

  // if (scrollTopBtn) {
  //   // Show/hide button based on scroll position
  //   window.addEventListener("scroll", function() {
  //     if (window.pageYOffset > 300) {
  //       scrollTopBtn.classList.add("visible");
  //     } else {
  //       scrollTopBtn.classList.remove("visible");
  //     }
  //   });

  //   // Smooth scroll to top
  //   scrollTopBtn.addEventListener("click", function() {
  //     window.scrollTo({
  //       top: 0,
  //       behavior: "smooth"
  //     });
  //   });
  // }

  // // Add smooth scrolling to all links
  // var anchorLinks = document.querySelectorAll('a[href^="#"]');
  // for (var i = 0; i < anchorLinks.length; i++) {
  //   anchorLinks[i].addEventListener("click", function(e) {
  //     e.preventDefault();

  //     var targetId = this.getAttribute("href");
  //     if (targetId === "#") return;

  //     var targetElement = document.querySelector(targetId);
  //     if (targetElement) {
  //       targetElement.scrollIntoView({
  //         behavior: "smooth"
  //       });
  //     }
  //   });
  // }

  // Add animation to features on scroll
  var features = document.querySelectorAll(".cs-feature");

  var featureObserver = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          featureObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  if (features.length > 0) {
    for (var i = 0; i < features.length; i++) {
      // Set initial state
      features[i].style.opacity = "0";
      features[i].style.transform = "translateY(20px)";
      features[i].style.transition = "all 0.5s ease " + (i * 0.1) + "s";

      featureObserver.observe(features[i]);
    }
  }

  // Add hover effect to program cards
  var programCards = document.querySelectorAll(".cs-program-card");

  if (programCards.length > 0) {
    for (var i = 0; i < programCards.length; i++) {
      programCards[i].addEventListener("mouseenter", function() {
        this.style.transform = "translateY(-10px)";
        this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.1)";
      });

      programCards[i].addEventListener("mouseleave", function() {
        this.style.transform = "translateY(0)";
        this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.05)";
      });
    }
  }

  // Fix card heights to be uniform in each row
  function equalizeCardHeights(selector) {
    var cards = document.querySelectorAll(selector);
    if (cards.length === 0) return;

    // Reset heights first
    for (var i = 0; i < cards.length; i++) {
      cards[i].style.height = "auto";
    }

    // Group cards by rows based on their position
    var viewportWidth = window.innerWidth;
    var cardsPerRow = 3;

    if (viewportWidth < 768) {
      cardsPerRow = 1;
    } else if (viewportWidth < 1024) {
      cardsPerRow = 2;
    }

    // Process in groups
    for (var i = 0; i < cards.length; i += cardsPerRow) {
      var rowCards = Array.prototype.slice.call(cards, i, i + cardsPerRow);
      var heights = rowCards.map(function(card) {
        return card.offsetHeight;
      });
      var maxHeight = Math.max.apply(null, heights);

      for (var j = 0; j < rowCards.length; j++) {
        rowCards[j].style.height = maxHeight + "px";
      }
    }
  }

  // Apply equal heights to student and alumni cards
  function applyEqualHeights() {
    // For visible slides only
    if (document.querySelector(".cs-student-card")) {
      equalizeCardHeights(
        ".swiper-slide-active .cs-student-card, .swiper-slide-next .cs-student-card, .swiper-slide-prev .cs-student-card"
      );
    }

    if (document.querySelector(".cs-alumni-card")) {
      equalizeCardHeights(
        ".swiper-slide-active .cs-alumni-card, .swiper-slide-next .cs-alumni-card, .swiper-slide-prev .cs-alumni-card"
      );
    }

    // For program cards
    equalizeCardHeights(".cs-program-card");
  }

  // Run on load and resize
  window.addEventListener("load", applyEqualHeights);
  window.addEventListener("resize", applyEqualHeights);

  // Also run when Swiper slides change
  document.addEventListener("swiperSlideChangeTransitionEnd", applyEqualHeights);
});

