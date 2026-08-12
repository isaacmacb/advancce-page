// ============================================
// NAVBAR SCROLL
// ============================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// COUNTER ANIMATION
// ============================================
const counters = document.querySelectorAll('.metric-number');
const speed = 200;

const animateCounter = (counter) => {
    const target = parseInt(counter.innerText.replace(/\D/g, ''));
    let current = 0;
    const increment = target / speed;

    const update = () => {
        current += increment;
        if (current < target) {
            counter.innerText = Math.ceil(current) + '+';
            requestAnimationFrame(update);
        } else {
            counter.innerText = target + '+';
        }
    };
    update();
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));

// ============================================
// DASHBOARD LIVE NUMBERS
// ============================================
setInterval(() => {
    document.querySelectorAll('.dashboard-card h2').forEach(item => {
        const current = parseInt(item.innerText);
        if (!isNaN(current) && current < 999) {
            const variation = Math.floor(Math.random() * 5) + 1;
            item.innerText = current + variation;
        }
    });
}, 5000);

// ============================================
// FORM SUBMIT
// ============================================
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    this.reset();
});