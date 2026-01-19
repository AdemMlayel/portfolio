document.addEventListener('DOMContentLoaded', () => {
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

    // 3. Mobile Menu Toggle logic
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    menuToggle?.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });


    const toggleBtn = document.getElementById('theme-toggle'); // Ensure you have an element with this ID
    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); // Save preference
    });

    // On Load: Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // 4. Collapsible project cards
    document.querySelectorAll('.collapsible .toggle-btn').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.collapsible');
            const isOpen = card.classList.toggle('open');

            button.textContent = isOpen ? 'Hide details' : 'View details';
        });
    });



});