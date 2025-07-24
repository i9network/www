
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header background on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.feature-card, .timeline-item, .dashboard-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// AI visualization enhancement
document.addEventListener('DOMContentLoaded', function() {
    const nodes = document.querySelectorAll('.ai-node');
    let currentActive = 0;
    
    setInterval(() => {
        nodes.forEach(node => node.classList.remove('active'));
        nodes[currentActive].classList.add('active');
        currentActive = (currentActive + 1) % nodes.length;
    }, 2000);
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-open');
}

// Loading animation for preview button
document.querySelector('.preview-btn')?.addEventListener('click', function(e) {
    const btn = e.target;
    const originalText = btn.textContent;
    btn.textContent = 'Loading...';
    btn.style.opacity = '0.7';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.opacity = '1';
    }, 1000);
});

// Contact form handling (placeholder for future implementation)
function handleContactForm(event) {
    event.preventDefault();
    // Add your contact form logic here
    console.log('Contact form submitted');
}

// Metrics counter animation
function animateCounter(element, target, duration = 2000) {
    const start = parseInt(element.textContent) || 0;
    const increment = (target - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
}

// Initialize counters when they come into view
const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const metric = entry.target.querySelector('.metric');
            if (metric && !metric.classList.contains('animated')) {
                metric.classList.add('animated');
                const text = metric.textContent;
                if (text.includes('98.5%')) {
                    animateCounter(metric, 98.5);
                } else if (text.includes('85%')) {
                    animateCounter(metric, 85);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.dashboard-card').forEach(card => {
        counterObserver.observe(card);
    });
});
