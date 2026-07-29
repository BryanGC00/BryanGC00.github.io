let slideIndex = 0;
const track = document.querySelector('.carousel-track');
const dots = document.querySelectorAll('.dot');
const totalSlides = document.querySelectorAll('.carousel-slide').length;

function updateCarousel() {
    track.style.transform = `translateX(-${slideIndex * 100}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
}

function moveSlide(direction) {
    slideIndex += direction;
    if (slideIndex >= totalSlides) slideIndex = 0;
    if (slideIndex < 0) slideIndex = totalSlides - 1;
    updateCarousel();
}

function currentSlide(index) {
    slideIndex = index;
    updateCarousel();
}


let autoSlide = setInterval(() => moveSlide(1), 6000);


let startX = 0;
const carouselContainer = document.querySelector('.carousel-container');

carouselContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    clearInterval(autoSlide);
}, { passive: true });

carouselContainer.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (diffX > 50) {
        moveSlide(1); 
    } else if (diffX < -50) {
        moveSlide(-1); 
    }
    autoSlide = setInterval(() => moveSlide(1), 6000);
}, { passive: true });