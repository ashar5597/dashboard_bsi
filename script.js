document.addEventListener("DOMContentLoaded", function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll(".slide");
    // const slideKe6 = 13;
    const logo = document.getElementById("logoslide1");
    const text = document.getElementById("textslide1");

    slides.forEach((slide, index) => {
        if (index === slideKe6) {
            slide.classList.add("active");
            slide.style.display = "block";
        } else {
            slide.classList.remove("active");
            slide.style.display = "none";
        }
    });

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");

        // Jika kembali ke slide pertama, reset animasi
        if (index === 0) {
            resetAnimation(logo);
            resetAnimation(text);
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function resetAnimation(element) {
        element.style.animation = "none";
        setTimeout(() => {
            element.style.animation = ""; // Memaksa ulang animasi
        }, 10);
    }

    setInterval(nextSlide, 5000);
    
    
});
