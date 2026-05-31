// Preloader
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add("hidden");
        }, 500);
    }
});

document.addEventListener("DOMContentLoaded", () => {

    // Theme Toggle
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        if (localStorage.getItem("theme") === "light") {
            document.body.classList.add("light-mode");
        }
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            if (document.body.classList.contains("light-mode")) {
                localStorage.setItem("theme", "light");
            } else {
                localStorage.setItem("theme", "dark");
            }
        });
    }

    // Intersection Observer for card animations
    const cards = document.querySelectorAll(".card");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.1
    });
    cards.forEach((card) => observer.observe(card));

    // Hero CTA Smooth Scroll
    const heroCta = document.getElementById("hero-cta");
    const contactSection = document.querySelector(".contact");
    if (heroCta && contactSection) {
        heroCta.addEventListener("click", () => {
            contactSection.scrollIntoView({ behavior: "smooth" });
        });
    }

    // Lightbox Functionality
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxClose = document.getElementById("lightbox-close");
    const posterImgs = document.querySelectorAll(".poster-card img");

    if (lightbox && lightboxImg && lightboxClose) {
        posterImgs.forEach(img => {
            img.addEventListener("click", () => {
                lightbox.classList.add("active");
                lightboxImg.src = img.src;
            });
        });

        lightboxClose.addEventListener("click", () => {
            lightbox.classList.remove("active");
        });

        lightbox.addEventListener("click", (e) => {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove("active");
            }
        });
    }

});