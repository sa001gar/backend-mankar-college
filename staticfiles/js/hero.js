document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".slider-image");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  let currentImageIndex = 0;

  function showImage(index) {
    images.forEach((img) => img.classList.remove("active"));
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

  leftArrow.addEventListener("click", prevImage);
  rightArrow.addEventListener("click", nextImage);

  // Auto-advance the slider
  setInterval(nextImage, 5000);

  
});
