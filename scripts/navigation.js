// Tyler Moxley Real Estate v3 - Navigation JavaScript

// === MOBILE NAVIGATION === 
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;
    
    console.log('Navigation initialized');
    console.log('Nav toggle element:', navToggle);
    console.log('Nav menu element:', navMenu);
    
    if (navToggle && navMenu) {
        // Multiple event handlers to ensure it works
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Nav toggle clicked');
            
            const isActive = navToggle.classList.contains('active');
            
            if (isActive) {
                // Close menu
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('nav-open');
                console.log('Menu closed');
            } else {
                // Open menu
                navToggle.classList.add('active');
                navMenu.classList.add('active');
                body.classList.add('nav-open');
                console.log('Menu opened');
            }
        });
        
        // Touch events for mobile
        navToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            console.log('Touch start on nav toggle');
        });
        
        navToggle.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Touch end on nav toggle - triggering click');
            
            const isActive = navToggle.classList.contains('active');
            
            if (isActive) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('nav-open');
            } else {
                navToggle.classList.add('active');
                navMenu.classList.add('active');
                body.classList.add('nav-open');
            }
        });
        
        // Fallback method for mobile touch issues
        navToggle.onclick = function() {
            console.log('Fallback onclick triggered');
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('nav-open');
        };
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('nav-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('nav-open');
            }
        });
    }
});

// === NAVBAR SCROLL EFFECTS === 
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// === ACTIVE LINK HIGHLIGHTING === 
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const linkPath = link.getAttribute('href');
        if (linkPath === '../index.html' && currentPage === 'index.html') {
            link.classList.add('active');
        } else if (linkPath && linkPath.includes(currentPage.replace('.html', ''))) {
            link.classList.add('active');
        }
    });
}

// === SMOOTH SCROLLING FOR ANCHOR LINKS === 
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', updateActiveNavLink);