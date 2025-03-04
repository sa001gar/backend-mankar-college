// Header JS file for toggle..
document.addEventListener("DOMContentLoaded", function () {

  // Lazy Loading
  var lazyLoader = document.getElementById("cs-lazy-loader");
  window.addEventListener("load", function() {
    setTimeout(function() {
      lazyLoader.style.display = "none";
    }, 500);
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const closeMenu = document.querySelector(".close-menu");
  const navWrapper = document.querySelector(".nav-wrapper");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  // Toggle mobile menu
  function toggleMenu() {
    navWrapper.classList.toggle("active");
    document.body.style.overflow = navWrapper.classList.contains("active")
      ? "hidden"
      : "";

    // Animate hamburger to X
    if (navWrapper.classList.contains("active")) {
      menuToggle.classList.add("active");
      menuToggle.querySelector("span:first-child").style.transform =
        "rotate(45deg) translate(5px, 5px)";
      menuToggle.querySelector("span:nth-child(2)").style.opacity = "0";
      menuToggle.querySelector("span:last-child").style.transform =
        "rotate(-45deg) translate(5px, -5px)";
    } else {
      menuToggle.classList.remove("active");
      menuToggle.querySelector("span:first-child").style.transform = "none";
      menuToggle.querySelector("span:nth-child(2)").style.opacity = "1";
      menuToggle.querySelector("span:last-child").style.transform = "none";
    }
  }

  menuToggle.addEventListener("click", toggleMenu);
  closeMenu.addEventListener("click", toggleMenu);

  // Handle dropdown menus on mobile
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdownMenu = toggle.nextElementSibling;
        const icon = toggle.querySelector("i");

        // Close other dropdowns
        dropdownToggles.forEach((otherToggle) => {
          if (otherToggle !== toggle) {
            otherToggle.nextElementSibling.style.display = "none";
            otherToggle.querySelector("i").style.transform = "rotate(0)";
          }
        });

        // Toggle current dropdown
        dropdownMenu.style.display =
          dropdownMenu.style.display === "block" ? "none" : "block";
        icon.style.transform =
          dropdownMenu.style.display === "block"
            ? "rotate(180deg)"
            : "rotate(0)";
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".nav-wrapper") &&
      !e.target.closest(".menu-toggle") &&
      navWrapper.classList.contains("active")
    ) {
      toggleMenu();
    }
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navWrapper.classList.remove("active");
      document.body.style.overflow = "";
      menuToggle.classList.remove("active");
      menuToggle.querySelector("span:first-child").style.transform = "none";
      menuToggle.querySelector("span:nth-child(2)").style.opacity = "1";
      menuToggle.querySelector("span:last-child").style.transform = "none";

      // Reset all dropdowns
      dropdownToggles.forEach((toggle) => {
        toggle.nextElementSibling.style.display = "";
        toggle.querySelector("i").style.transform = "rotate(0)";
      });
    }
  });


  // Scroll to Top Button
  var scrollTopBtn = document.getElementById("cs-scroll-top");

  if (scrollTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener("scroll", function() {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    });

    // Smooth scroll to top
    scrollTopBtn.addEventListener("click", function() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Add smooth scrolling to all links
  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  for (var i = 0; i < anchorLinks.length; i++) {
    anchorLinks[i].addEventListener("click", function(e) {
      e.preventDefault();

      var targetId = this.getAttribute("href");
      if (targetId === "#") return;

      var targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  }
  

  
});


