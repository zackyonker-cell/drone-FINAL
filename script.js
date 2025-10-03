// Custom popup functions
function showSuccessPopup() {
    const popup = document.createElement('div');
    popup.className = 'custom-popup success-popup';
    popup.innerHTML = `
        <div class="popup-overlay" onclick="this.parentElement.remove()"></div>
        <div class="popup-card">
            <div class="popup-icon-wrapper">
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                    <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
            </div>
            <h3 class="popup-title">Message Sent!</h3>
            <p class="popup-message">Thank you for reaching out. We'll get back to you within 2-4 hours during business hours.</p>
            <button class="popup-btn" onclick="this.closest('.custom-popup').remove()">Got it</button>
        </div>
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.classList.add('show'), 10);
    setTimeout(() => popup.remove(), 5000);
}

function showErrorPopup() {
    const popup = document.createElement('div');
    popup.className = 'custom-popup error-popup';
    popup.innerHTML = `
        <div class="popup-overlay" onclick="this.parentElement.remove()"></div>
        <div class="popup-card">
            <div class="popup-icon-wrapper">
                <svg class="error-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="error-circle" cx="26" cy="26" r="25" fill="none"/>
                    <path class="error-cross" fill="none" d="M16 16 36 36 M36 16 16 36"/>
                </svg>
            </div>
            <h3 class="popup-title">Something Went Wrong</h3>
            <p class="popup-message">Please contact us directly:<br><strong>(610) 299-1078</strong> or <strong>aerialskyshot@gmail.com</strong></p>
            <button class="popup-btn" onclick="this.closest('.custom-popup').remove()">Close</button>
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
            firstName: form.firstName.value.trim(),
            lastName: form.lastName.value.trim(),
            phone: form.phone.value.trim(),
            email: form.email.value.trim(),
            brokerage: form.brokerage.value.trim(),
            package: form.package.value,
            address: form.address.value.trim(),
            message: form.message.value.trim()
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
