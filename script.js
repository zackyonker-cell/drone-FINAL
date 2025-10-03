// Custom popup functions
function showSuccessPopup() {
    const popup = document.createElement('div');
    popup.className = 'custom-popup success-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-icon">✓</div>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for your inquiry. We'll respond within 2-4 hours during business hours.</p>
            <button class="popup-close" onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.classList.add('show'), 10);
}

function showErrorPopup() {
    const popup = document.createElement('div');
    popup.className = 'custom-popup error-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-icon">✕</div>
            <h3>Oops! Something went wrong</h3>
            <p>Please call or email us directly:<br>(610) 299-1078 or zackyonker@gmail.com</p>
            <button class="popup-close" onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.classList.add('show'), 10);
}

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

// Form submission
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Get form data
        const formData = {
            name: form.name.value,
            phone: form.phone.value,
            email: form.email.value,
            brokerage: form.brokerage.value,
            package: form.package.value,
            address: form.address.value,
            message: form.message.value
        };

        try {
            // Send to your serverless function
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                showSuccessPopup();
                form.reset();
            } else {
                throw new Error('Failed to send email');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            showErrorPopup();
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
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
