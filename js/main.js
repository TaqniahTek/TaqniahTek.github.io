document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile menu toggle functionality can be added here
    
    // Animation for elements when they come into view
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card, .hero-content, .newsletter-content').forEach(el => {
        observer.observe(el);
    });


    // Toggling language functionality
    const languageToggle = document.getElementById('languageToggle');
    const currentLangSpan = document.getElementById('currentLang');
    const htmlElement = document.documentElement;
    
    // Get saved language preference or default to 'en'
    let currentLanguage = localStorage.getItem('preferredLanguage') || 'en';
    
    // Apply saved language on page load
    applyLanguage(currentLanguage);
    
    // Toggle language on button click
    languageToggle.addEventListener('click', function() {
        currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
        applyLanguage(currentLanguage);
        localStorage.setItem('preferredLanguage', currentLanguage);
    });
    
    function applyLanguage(lang) {
        // Update HTML attributes
        htmlElement.setAttribute('lang', lang);
        htmlElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        
        // Update button text

        if (lang === 'en') {
            currentLangSpan.textContent = 'AR';
        } else {
            currentLangSpan.textContent = 'EN';
        }

        
        // Update all translatable elements
        const translatableElements = document.querySelectorAll('[data-en][data-ar]');
        translatableElements.forEach(element => {
            const translation = element.getAttribute(`data-${lang}`);
            element.textContent = translation;
        });

        const translatableElementswithPlaceholder = document.querySelectorAll('[data-placeholder-en][data-placeholder-ar]');
        translatableElementswithPlaceholder.forEach(element => {
            const translation = element.getAttribute(`data-placeholder-${lang}`);
            element.placeholder = translation;
            }
        );


    }

});
