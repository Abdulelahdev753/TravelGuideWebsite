// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== Mobile Menu Toggle ====================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ==================== Navbar Scroll Effect ====================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Auto-hide navbar on scroll down (mobile only)
        if (window.innerWidth <= 768) {
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScroll = currentScroll;
    });

    // ==================== Smooth Scroll for Navigation Links ====================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 60;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== Day Cards Expansion ====================
    const dayCards = document.querySelectorAll('.day-card');

    dayCards.forEach(card => {
        const header = card.querySelector('.day-header');
        const expandBtn = card.querySelector('.expand-btn');
        
        header.addEventListener('click', function() {
            // Close all other cards
            dayCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active');
                }
            });
            
            // Toggle current card
            card.classList.toggle('active');
            
            // Animate expand button
            if (card.classList.contains('active')) {
                expandBtn.textContent = '×';
                // Scroll to card header smoothly
                setTimeout(() => {
                    const offsetTop = card.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }, 300);
            } else {
                expandBtn.textContent = '+';
            }
        });

        // Add touch feedback for mobile
        header.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });

        header.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // ==================== Intersection Observer for Scroll Animations ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all day cards
    dayCards.forEach(card => {
        observer.observe(card);
    });

    // Observe tip categories
    const tipCategories = document.querySelectorAll('.tip-category');
    tipCategories.forEach(category => {
        observer.observe(category);
    });

    // ==================== Button Ripple Effect ====================
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add ripple effect to all buttons
    const buttons = document.querySelectorAll('.link-button, .booking-button, .cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
        
        // Add ripple styles dynamically
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
    });

    // Add ripple CSS
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ==================== Scroll Progress Indicator ====================
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: #000;
        z-index: 9999;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // ==================== Link Hover Effects ====================
    const locationLinks = document.querySelectorAll('.location-link');
    locationLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // ==================== Transport Cards Stagger Animation ====================
    const transportCards = document.querySelectorAll('.transport-card');
    const transportObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                transportObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    transportCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        transportObserver.observe(card);
    });

    // ==================== Timeline Items Slide-in Animation ====================
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(30px)';
        item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        timelineObserver.observe(item);
    });

    // ==================== Cost Cards Scale Animation ====================
    const costCards = document.querySelectorAll('.cost-card');
    const costObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, index * 150);
                costObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    costCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        costObserver.observe(card);
    });

    // ==================== Info Cards Flip Animation ====================
    const infoCards = document.querySelectorAll('.info-card');
    const infoObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'rotateY(0deg)';
                }, index * 200);
                infoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    infoCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'rotateY(90deg)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        infoObserver.observe(card);
    });

    // ==================== Brand Tags Bounce Animation ====================
    const brandTags = document.querySelectorAll('.brand-tag');
    brandTags.forEach((tag, index) => {
        tag.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s ease-in-out';
        });
        
        tag.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // ==================== Scroll to Top Button ====================
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #000;
        color: #fff;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    `;
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.transform = 'scale(1)';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.transform = 'scale(0)';
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });

    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    // ==================== Touch Gestures for Mobile ====================
    let touchStartX = 0;
    let touchEndX = 0;

    dayCards.forEach(card => {
        card.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        card.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe(card);
        });
    });

    function handleSwipe(card) {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold && card.classList.contains('active')) {
            // Swipe left - close card
            card.classList.remove('active');
            card.querySelector('.expand-btn').textContent = '+';
        }
    }

    // ==================== Active Section Highlight in Nav ====================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Add active link style
    const activeStyle = document.createElement('style');
    activeStyle.textContent = `
        .nav-link.active {
            color: #666;
            font-weight: 700;
        }
    `;
    document.head.appendChild(activeStyle);

    // ==================== Lazy Loading for Images (if any added later) ====================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ==================== Parallax Effect on Hero ====================
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset < window.innerHeight) {
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // ==================== Copy to Clipboard for Links (Future Enhancement) ====================
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('تم نسخ الرابط!');
        });
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 50%;
            transform: translateX(50%);
            background: #000;
            color: #fff;
            padding: 15px 30px;
            border-radius: 50px;
            z-index: 10000;
            animation: slideUp 0.3s ease-out;
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideDown 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    // Add toast animations
    const toastStyle = document.createElement('style');
    toastStyle.textContent = `
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translate(50%, 20px);
            }
            to {
                opacity: 1;
                transform: translate(50%, 0);
            }
        }
        
        @keyframes slideDown {
            from {
                opacity: 1;
                transform: translate(50%, 0);
            }
            to {
                opacity: 0;
                transform: translate(50%, 20px);
            }
        }
    `;
    document.head.appendChild(toastStyle);

    // ==================== Performance Optimization ====================
    // Debounce scroll events
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

    // Apply debounce to heavy scroll listeners
    window.addEventListener('scroll', debounce(function() {
        // Optimized scroll handling
    }, 10));

    // ==================== Accessibility Enhancements ====================
    // Add keyboard navigation for day cards
    dayCards.forEach((card, index) => {
        const header = card.querySelector('.day-header');
        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('aria-label', `اليوم ${index + 1}`);

        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
                this.setAttribute('aria-expanded', card.classList.contains('active'));
            }
        });
    });

    // Focus management
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });

    // Add focus styles for keyboard navigation
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .keyboard-nav *:focus {
            outline: 2px solid #000;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(focusStyle);

    // ==================== Loading Animation Complete ====================
    console.log('✅ Barcelona Guide Website Loaded Successfully!');
    console.log('🌟 All micro interactions and animations are active');
});

// ==================== Service Worker for PWA (Optional) ====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker can be registered here for offline support
        console.log('Service Worker support detected');
    });
}

// ==================== Error Handling ====================
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// ==================== Resize Handler ====================
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Handle resize events
        if (window.innerWidth > 768) {
            document.getElementById('navMenu').classList.remove('active');
            document.getElementById('menuToggle').classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250);
});
