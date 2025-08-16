// Tyler Moxley Real Estate v3 - Main JavaScript

// === INITIALIZATION === 
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeImageGallery();
    initializeBackToTop();
    initializePropertyFilters();
    initializeTestimonialSlider();
    initializeLazyLoading();
    initializeFormValidation();
    initializeVideoControls();
});

// === NAVIGATION === 
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        }
    });
    
    // Active link highlighting
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// === SCROLL ANIMATIONS === 
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
}

// === IMAGE GALLERY === 
function initializeImageGallery() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;
            openImageModal(imgSrc, imgAlt);
        });
    });
}

function openImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal(this)">&times;</button>
            <img src="${src}" alt="${alt}" style="width: 100%; height: auto;">
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal.querySelector('.modal-close'));
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal(modal.querySelector('.modal-close'));
        }
    });
}

function closeModal(button) {
    const modal = button.closest('.modal');
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
}

// === BACK TO TOP === 
function initializeBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// === PROPERTY FILTERS === 
function initializePropertyFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter properties
            propertyCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// === TESTIMONIAL SLIDER === 
function initializeTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    if (!slider) return;
    
    const track = slider.querySelector('.testimonial-track');
    const slides = slider.querySelectorAll('.testimonial-slide');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    const dots = slider.querySelectorAll('.dot');
    
    let currentSlide = 0;
    
    function updateSlider() {
        const translateX = -currentSlide * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });
    
    // Auto-play slider
    setInterval(nextSlide, 5000);
}

// === LAZY LOADING === 
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// === FORM VALIDATION === 
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('.form-input');
        
        inputs.forEach(input => {
            input.addEventListener('blur', validateInput);
            input.addEventListener('input', clearValidation);
        });
        
        form.addEventListener('submit', handleFormSubmit);
    });
}

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    // Remove existing validation
    clearValidation(e);
    
    let isValid = true;
    let message = '';
    
    // Required field validation
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        message = 'This field is required';
    }
    
    // Email validation
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (input.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/\D/g, ''))) {
            isValid = false;
            message = 'Please enter a valid phone number';
        }
    }
    
    // Apply validation styles
    if (!isValid) {
        input.classList.add('form-error');
        showFieldMessage(input, message, 'error');
    } else if (value) {
        input.classList.add('form-success');
        showFieldMessage(input, 'Looks good!', 'success');
    }
}

function clearValidation(e) {
    const input = e.target;
    input.classList.remove('form-error', 'form-success');
    
    const existingMessage = input.parentNode.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
}

function showFieldMessage(input, message, type) {
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    messageEl.textContent = message;
    input.parentNode.appendChild(messageEl);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Validate all fields
    let isFormValid = true;
    const inputs = form.querySelectorAll('.form-input[required]');
    
    inputs.forEach(input => {
        const event = { target: input };
        validateInput(event);
        if (input.classList.contains('form-error')) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showNotification('Please correct the errors above', 'error');
        return;
    }
    
    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        showNotification('Thank you! Tyler will contact you within 24 hours.', 'success');
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Clear validation states
        inputs.forEach(input => {
            clearValidation({ target: input });
        });
    }, 2000);
}

// === NOTIFICATIONS === 
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="hideNotification(this)">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto-hide after 5 seconds
    setTimeout(() => hideNotification(notification.querySelector('.notification-close')), 5000);
}

function hideNotification(closeBtn) {
    const notification = closeBtn.closest('.notification');
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
}

// === PROPERTY INTERACTIONS === 
function initializePropertyCards() {
    const propertyCards = document.querySelectorAll('.property-card');
    
    propertyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = 'var(--shadow-heavy)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-light)';
        });
    });
}

// === CONTACT INTERACTIONS === 
function initializeContactInteractions() {
    const phoneNumbers = document.querySelectorAll('.phone-number, .contact-value');
    
    phoneNumbers.forEach(phone => {
        if (phone.textContent.includes('925')) {
            phone.addEventListener('click', function() {
                window.location.href = `tel:${this.textContent.replace(/\D/g, '')}`;
            });
            phone.style.cursor = 'pointer';
            phone.title = 'Click to call';
        }
    });
}

// === PROPERTY SEARCH === 
function initializePropertySearch() {
    const searchInput = document.querySelector('.property-search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const properties = document.querySelectorAll('.property-card');
        
        properties.forEach(property => {
            const address = property.querySelector('.property-address').textContent.toLowerCase();
            const description = property.querySelector('.property-description').textContent.toLowerCase();
            
            if (address.includes(query) || description.includes(query)) {
                property.style.display = 'block';
            } else {
                property.style.display = 'none';
            }
        });
    });
}

// === SCROLL TO TOP === 
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// === EXTERNAL LINKS === 
function initializeExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
}

// === PERFORMANCE OPTIMIZATION === 
function initializePerformanceOptimizations() {
    // Preload critical images
    const criticalImages = [
        'Tyler-Moxley-pic.jpg',
        'hero-video.mp4'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = src.includes('.mp4') ? 'video' : 'image';
        link.href = src;
        document.head.appendChild(link);
    });
    
    // Service Worker for caching (if supported)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('Service Worker registration failed:', err);
        });
    }
}

// === ANALYTICS === 
function trackPageView(page) {
    // Google Analytics or other tracking
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
}

function trackEvent(action, category, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// === UTILITY FUNCTIONS === 
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// === ERROR HANDLING === 
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Optionally send error to analytics
});

// === VIDEO CONTROLS === 
let currentVideoIndex = 0;
let isVideoPlaying = true;
let autoRotateInterval;

// 4 videos in new order: Start with video 3, move video 1 to last, remove video 2
const videoPlaylist = [
    '4770380-hd_1920_1080_30fps.mp4',     // Video 3 (now first)
    '7578540-uhd_3840_2160_30fps.mp4',    // Video 4 (now second)
    '7578550-uhd_3840_2160_30fps.mp4',    // Video 5 (now third)
    'hero-video.mp4'                       // Video 1 (now last)
    // Removed: 'hero-video-Demo Video.mp4' (video 2)
];

function initializeVideoControls() {
    const videoPlayer = document.getElementById('hero-video-player');
    if (!videoPlayer) return;
    
    // Update total videos indicator
    const totalVideosEl = document.getElementById('total-videos');
    if (totalVideosEl) {
        totalVideosEl.textContent = videoPlaylist.length;
    }
    
    // Handle video ended event to auto-advance
    videoPlayer.addEventListener('ended', () => {
        console.log('Video ended, advancing to next...');
        nextVideo();
    });
    
    // Set maximum duration per video (force advance after 20 seconds)
    videoPlayer.addEventListener('loadedmetadata', () => {
        console.log(`Video loaded: ${videoPlayer.duration} seconds`);
        // Force advance after 20 seconds max
        setTimeout(() => {
            if (!videoPlayer.paused && currentVideoIndex < videoPlaylist.length) {
                console.log('20 second timeout reached, advancing video...');
                nextVideo();
            }
        }, 20000);
    });
    
    // Global error handler for videos
    videoPlayer.addEventListener('error', (e) => {
        console.error('Video error:', e);
        setTimeout(nextVideo, 1000);
    });
    
    // Update current video indicator
    updateVideoIndicator();
    
    console.log(`Video system initialized with ${videoPlaylist.length} videos`);
    
    // Start first video
    switchToVideo(0);
}

function updateVideoIndicator() {
    const currentVideoEl = document.getElementById('current-video');
    if (currentVideoEl) {
        currentVideoEl.textContent = currentVideoIndex + 1;
    }
}

function startAutoRotation() {
    // Auto-rotation now handled by video 'ended' event
    // No need for interval timer
    console.log('Auto-rotation active - videos will advance when they end');
}

function stopAutoRotation() {
    // Pause the video to stop auto-rotation
    const videoPlayer = document.getElementById('hero-video-player');
    if (videoPlayer) {
        videoPlayer.pause();
    }
}

function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videoPlaylist.length;
    switchToVideo(currentVideoIndex);
}

function previousVideo() {
    currentVideoIndex = (currentVideoIndex - 1 + videoPlaylist.length) % videoPlaylist.length;
    switchToVideo(currentVideoIndex);
}

function switchToVideo(index) {
    const videoPlayer = document.getElementById('hero-video-player');
    
    if (!videoPlayer) return;
    
    // Update current index
    currentVideoIndex = index;
    const videoSrc = videoPlaylist[index];
    
    console.log(`Attempting to load video ${index + 1}/${videoPlaylist.length}: ${videoSrc}`);
    
    // Update video source with error handling
    videoPlayer.src = videoSrc;
    
    // Add error handling
    videoPlayer.onerror = function() {
        console.error(`Failed to load video: ${videoSrc}`);
        // Skip to next video if current one fails
        setTimeout(() => {
            nextVideo();
        }, 1000);
    };
    
    videoPlayer.onloadstart = function() {
        console.log(`Loading video: ${videoSrc}`);
    };
    
    videoPlayer.oncanplay = function() {
        console.log(`Video ready to play: ${videoSrc}`);
        if (isVideoPlaying) {
            videoPlayer.play().catch(e => {
                console.error('Video play failed:', e);
                // Try next video if play fails
                setTimeout(nextVideo, 1000);
            });
        }
    };
    
    videoPlayer.load();
    
    // Update indicator
    updateVideoIndicator();
}

function toggleVideo() {
    const videoPlayer = document.getElementById('hero-video-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    
    if (!videoPlayer || !playPauseBtn) return;
    
    if (videoPlayer.paused) {
        videoPlayer.play().catch(e => console.log('Video play failed:', e));
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        isVideoPlaying = true;
        startAutoRotation();
    } else {
        videoPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        isVideoPlaying = false;
        stopAutoRotation();
    }
}

// === INITIALIZATION CALLS === 
document.addEventListener('DOMContentLoaded', function() {
    initializePropertyCards();
    initializeContactInteractions();
    initializePropertySearch();
    initializeExternalLinks();
    initializePerformanceOptimizations();
    trackPageView('home');
});