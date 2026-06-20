// Preloader
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add("hidden");
        }, 2800);
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

    // Category Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    const categories = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || (categories && categories.includes(filterValue))) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }

});