// Run after page loads
document.addEventListener("DOMContentLoaded", function () {
    const navHeight = document.querySelector("nav").offsetHeight;
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinksContainer = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links a");

    // ======================
    // MOBILE MENU TOGGLE
    // ======================
    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener("click", () => {
            navLinksContainer.classList.toggle("active");
        });
    }

    // ======================
    // SCROLL FUNCTION (WITH OFFSET)
    // ======================
    function scrollWithOffset(section) {
        const y = section.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: y, behavior: "smooth" });
    }

    // ======================
    // NAVBAR SMOOTH SCROLL
    // ======================
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (navLinksContainer.classList.contains("active")) {
                navLinksContainer.classList.remove("active");
            }

            const targetId = this.getAttribute("href").substring(1);
            const section = document.getElementById(targetId);

            if (section) {
                scrollWithOffset(section);
            }
        });
    });

    // ======================
    // SCROLL TO PROJECTS BUTTON
    // ======================
    window.scrollToProjects = function () {
        const section = document.getElementById("projects");
        if (section) {
            scrollWithOffset(section);
        }
    };

    // ======================
    // ACTIVE NAV LINK ON SCROLL
    // ======================
    window.addEventListener("scroll", () => {
        let sections = document.querySelectorAll("section");

        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - navHeight - 20;
            let height = sec.offsetHeight;
            let id = sec.getAttribute("id");

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => link.classList.remove("active"));

                let activeLink = document.querySelector(`nav a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    });

    // ======================
    // PROJECT BUTTON
    // ======================
    const projectBtn = document.querySelector(".project-card button");
    if (projectBtn) {
        projectBtn.addEventListener("click", () => {
            window.open("https://github.com/robin2732006-del", "_blank");
        });
    }

    // ======================
    // SCROLL ANIMATION
    // ======================
    const elements = document.querySelectorAll("section");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));

    // ======================
    // RESIZE EVENT HANDLER
    // ======================
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768 && navLinksContainer.classList.contains("active")) {
            navLinksContainer.classList.remove("active");
        }
    });

});