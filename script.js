// ============================================
// CodeNova Solutions - Premium JavaScript
// Interactive Features & Animations
// ============================================

// ============================================
// 1. Typing Effect
// ============================================
const typingText = document.getElementById('typingText');
const phrases = [
    'Professional Software Development Solutions',
    'Expert Python & Java Programming',
    'Custom Web & Mobile Development',
    'API Integration & Database Design'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (!isDeleting) {
        // Typing
        if (charIndex < currentPhrase.length) {
            typingText.textContent += currentPhrase[charIndex];
            charIndex++;
            setTimeout(typeEffect, typingSpeed);
        } else {
            // Pause before deleting
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        }
    } else {
        // Deleting
        if (charIndex > 0) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeEffect, 50);
        } else {
            // Move to next phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeEffect, 500);
        }
    }
}

// Start typing effect after page loads
if (typingText) {
    setTimeout(typeEffect, 500);
}

// ============================================
// 2. Navigation & Sticky Header
// ============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when link clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Sticky navigation
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
    }
});

// ============================================
// 3. Smooth Scrolling
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// 4. Animated Counter
// ============================================
const counters = document.querySelectorAll('.stat-number');
const speed = 200; // How long the animation takes in ms

function runCounter() {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        
        // Check if counter is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

runCounter();

// ============================================
// 5. Scroll Reveal Animation
// ============================================
function setupScrollReveal() {
    const revealItems = document.querySelectorAll('.reveal-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = Math.random() * 0.3; // Random delay up to 0.3s
                entry.target.style.animationDelay = delay + 's';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealItems.forEach(item => {
        observer.observe(item);
    });
}

document.addEventListener('DOMContentLoaded', setupScrollReveal);

// ============================================
// 6. FAQ Accordion
// ============================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ============================================
// 7. Contact Form Handling
// ============================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('formName').value.trim();
        const email = document.getElementById('formEmail').value.trim();
        const phone = document.getElementById('formPhone').value.trim();
        const subject = document.getElementById('formSubject').value.trim();
        const message = document.getElementById('formMessage').value.trim();
        
        // Clear previous errors
        document.querySelectorAll('.form-error').forEach(error => {
            error.textContent = '';
        });
        
        // Validation
        let isValid = true;
        
        if (!name) {
            document.getElementById('formName').nextElementSibling.textContent = 'Please enter your name';
            isValid = false;
        }
        
        if (!email || !isValidEmail(email)) {
            document.getElementById('formEmail').nextElementSibling.textContent = 'Please enter a valid email';
            isValid = false;
        }
        
        if (!subject) {
            document.getElementById('formSubject').nextElementSibling.textContent = 'Please enter project title';
            isValid = false;
        }
        
        if (!message) {
            document.getElementById('formMessage').nextElementSibling.textContent = 'Please enter your message';
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                formSuccess.style.display = 'none';
            }, 3000);
            
            // Log form data (in real app, send to server)
            console.log('Form submitted:', { name, email, phone, subject, message });
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// 8. Copy to Clipboard
// ============================================
const copyButtons = document.querySelectorAll('.copy-btn');

copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const text = button.getAttribute('data-text');
        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.textContent;
            button.textContent = '✓ Copied!';
            
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        });
    });
});

// ============================================
// 9. Back to Top Button
// ============================================
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// 10. Loader
// ============================================
const loader = document.getElementById('loader');

if (loader) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.display = 'none';
        }, 2500);
    });
}

// ============================================
// 11. Performance: Lazy Loading
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Preload images for better performance
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
});

// ============================================
// 12. Mobile Menu - Close on Escape
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================================
// 13. Accessibility - Focus Management
// ============================================
// Add visible focus styles
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-focus');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-focus');
});

// ============================================
// 14. Performance Optimization
// ============================================
// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// 15. Analytics Tracking (Optional)
// ============================================
// Track button clicks
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('CTA clicked');
        // Send to analytics service
    });
});

// Track page sections viewed
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            console.log('User viewed section:', sectionId);
            // Send to analytics service
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ============================================
// 16. Progressive Enhancement
// ============================================
// Check if browser supports required features
if (!window.IntersectionObserver) {
    console.warn('IntersectionObserver not supported');
    // Fallback for older browsers
    document.querySelectorAll('.reveal-item').forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    });
}

// ============================================
// 17. Dark Mode Detector (Optional)
// ============================================
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Dark mode is preferred
        console.log('System prefers dark mode');
    }
}

detectSystemTheme();

// Listen for theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    detectSystemTheme();
});

// ============================================
// 18. Service Worker Registration (Optional)
// ============================================
if ('serviceWorker' in navigator) {
    // Service worker registration would go here
    // navigator.serviceWorker.register('sw.js');
}

// ============================================
// 19. Performance Metrics
// ============================================
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime, 'ms');
    });
}

// ============================================
// 20. Utility Functions
// ============================================
function getViewportHeight() {
    return window.innerHeight || document.documentElement.clientHeight;
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= getViewportHeight() &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// 21. Parallax Effect (Optional Enhancement)
// ============================================
function setupParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            parallaxElements.forEach(element => {
                const scrollPosition = window.scrollY;
                const elementOffset = element.offsetTop;
                const distance = scrollPosition - elementOffset;
                const yPos = distance * 0.5;
                element.style.backgroundPosition = `center ${yPos}px`;
            });
        });
    }
}

setupParallax();

// ============================================
// 22. Console Messages for Development
// ============================================
console.log('%cCodeNova Solutions', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cProfessional Software Development & Programming Solutions', 'color: #a855f7; font-size: 12px;');
console.log('%cContact: sales.codenova@gmail.com', 'color: #00d4ff;');

// ============================================
// 23. Page Visibility API
// ============================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page is hidden');
    } else {
        console.log('Page is visible');
    }
});

// ============================================
// 24. Error Handling
// ============================================
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // Send error to monitoring service
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // Send error to monitoring service
});

// ============================================
// 25. Page Ready Confirmation
// ============================================
console.log('CodeNova Solutions website loaded successfully');
console.log('Version: 1.0.0');
console.log('Last updated: 2024');
