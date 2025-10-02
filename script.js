// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize EmailJS
emailjs.init('jmesb3eV6gsXKyyA0');

// Form submission
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Send email using EmailJS
        emailjs.sendForm('service_m2mnvqb', 'template_ak8dhw5', form)
            .then(() => {
                alert('Thanks for your inquiry! We\'ll respond with a quote within 2 hours during business hours.');
                form.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                alert('There was an error sending your message. Please call or email us directly at (610) 299-1078 or zackyonker@gmail.com');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
    });
}

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Observe elements
document.querySelectorAll('.why-card, .service-card, .portfolio-item, .testimonial').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Set minimum date for booking
const dateInput = document.querySelector('input[type="date"]');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

console.log('SkyShot Aerial loaded');
