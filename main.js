document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial styles for animated elements
    const animatedElements = document.querySelectorAll('.hero-text, .goods, .about-content, .section-title');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
        observer.observe(el);
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = '1rem 0';
            nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
        } else {
            nav.style.padding = '1.5rem 0';
            nav.style.boxShadow = 'none';
        }
    });

    // Before/After Slider logic
    const slider = document.getElementById('comparison-slider');
    const afterDiv = document.getElementById('comparison-after-div');
    const handle = document.getElementById('comparison-handle');
    const afterImg = document.getElementById('comparison-after-img');
    const container = document.querySelector('.comparison-container');

    if (slider && afterDiv && handle && container) {
        const updateSlider = () => {
            const value = slider.value;
            // Reveal the illustration (top layer) from the left
            // Moving slider to the left (0) reveals more of the bottom layer (before.png)
            // Moving slider to the right (100) reveals more of the top layer (illustration)
            afterDiv.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
            handle.style.left = `${value}%`;
        };

        slider.addEventListener('input', updateSlider);
        window.addEventListener('resize', updateSlider);
        
        updateSlider();
    }
});
