document.addEventListener('DOMContentLoaded', () => {
    // ========== NAVBAR ENHANCEMENTS ==========
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    /* Toggle mobile menu */
    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        navToggle.classList.toggle("open");
    });

    /* Close menu when clicking a link */
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            navToggle.classList.remove("open");
        });
    });

    /* Close menu when clicking outside */
    document.addEventListener("click", (e) => {
        if (!navbar.contains(e.target)) {
            navMenu.classList.remove("open");
            navToggle.classList.remove("open");
        }
    });

    /* Sticky shadow and animation on scroll */
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 20);
    });

    /* Active link detection based on current page */
    function setActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    setActiveNav();

    // 1. Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 2. Expert-Level Reveal animations on scroll (IntersectionObserver)
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of the card is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialize cards for animation
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        observer.observe(card);
    });

    // Initialize service cards for animation (with staggered delay)
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(card);
    });


    // ========== THEME TOGGLE ==========
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            // Animate icon rotation
            toggleBtn.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                toggleBtn.style.transform = 'rotate(0deg)';
            }, 300);
        });

        // On Load: Check for saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);

        // Add smooth transition to theme toggle
        toggleBtn.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    // ========== COLLAPSIBLE PROJECT CARDS (ACCORDION) ==========
    document.querySelectorAll('.collapsible .toggle-btn').forEach(button => {
        button.addEventListener('click', () => {
            const clickedCard = button.closest('.collapsible');
            const allCards = document.querySelectorAll('.collapsible');

            // Close all other cards
            allCards.forEach(card => {
                if (card !== clickedCard && card.classList.contains('open')) {
                    card.classList.remove('open');
                    const otherBtn = card.querySelector('.toggle-btn');
                    if (otherBtn) {
                        otherBtn.innerHTML = '<i class="fas fa-chevron-down"></i> View details';
                    }
                }
            });

            // Toggle the clicked card
            const isOpen = clickedCard.classList.toggle('open');
            if (isOpen) {
                button.innerHTML = '<i class="fas fa-chevron-down"></i> Hide details';
            } else {
                button.innerHTML = '<i class="fas fa-chevron-down"></i> View details';
            }
        });
    });

});