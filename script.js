document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    let hasFirstSlideShown = false;
    const transitionDuration = 1000; // Durasi animasi dalam ms
    const slideInterval = 5000; // Waktu tiap slide

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.style.opacity = "0";
                slide.style.display = "block";
                setTimeout(() => {
                    slide.style.opacity = "1";
                }, 50);
            } else {
                slide.style.opacity = "0";
                setTimeout(() => {
                    slide.style.display = "none";
                }, transitionDuration);
            }
        });
    }

    function nextSlide() {
        if (!hasFirstSlideShown) {
            hasFirstSlideShown = true;
            currentSlide = 1;
        } else {
            currentSlide++;
            if (currentSlide >= slides.length) {
                currentSlide = 0; // Kembali ke slide pertama setelah slide terakhir
            }
        }
        showSlide(currentSlide);
    }

    slides.forEach((slide) => {
        slide.style.transition = `opacity ${transitionDuration / 1000}s ease-in-out`;
    });

    showSlide(currentSlide);
    setInterval(nextSlide, slideInterval);
});
