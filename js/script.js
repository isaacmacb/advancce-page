// ================================
// NAVBAR SCROLL
// ================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {

    if (window.scrollY > 50) {

        navbar.style.background =
            "rgba(9,13,20,0.95)";

        navbar.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.4)";

    } else {

        navbar.style.background =
            "rgba(0,0,0,.5)";

        navbar.style.boxShadow =
            "none";
    }

});

// ================================
// SMOOTH SCROLL
// ================================

document.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener('click', function(e) {

        e.preventDefault();

        document.querySelector(
            this.getAttribute('href')
        ).scrollIntoView({
            behavior: 'smooth'
        });

    });

});

// ================================
// COUNTER ANIMATION
// ================================

const counters = document.querySelectorAll(
    '.metric-number'
);

const speed = 100;

counters.forEach(counter => {

    const updateCount = () => {

        const target = parseInt(
            counter.innerText.replace(/\D/g, '')
        );

        let count =
            parseInt(counter.dataset.count || 0);

        const increment = target / speed;

        if (count < target) {

            count += increment;

            counter.dataset.count = count;

            counter.innerText =
                Math.ceil(count) + '+';

            requestAnimationFrame(updateCount);

        } else {

            counter.innerText =
                target + '+';
        }

    };

    updateCount();

});

// ================================
// REVEAL ANIMATION
// ================================

const reveals = document.querySelectorAll(
    '.service-card, .pricing-card, .metric-card'
);

const revealObserver =
new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add(
                'show'
            );

        }

    });

}, {
    threshold: .2
});

reveals.forEach(item => {

    item.classList.add('hidden');

    revealObserver.observe(item);

});

// ================================
// TYPING EFFECT
// ================================

const typingText = document.querySelector(
    '.hero-text'
);

if (typingText) {

    const text =
    "Desenvolvemos soluções inteligentes para comunidades, times competitivos, empresas e projetos digitais.";

    typingText.innerHTML = "";

    let i = 0;

    function type() {

        if (i < text.length) {

            typingText.innerHTML += text.charAt(i);

            i++;

            setTimeout(type, 25);

        }

    }

    type();

}

// ================================
// DASHBOARD LIVE NUMBERS
// ================================

const dashboardValues =
document.querySelectorAll('.dashboard h2');

setInterval(() => {

    dashboardValues.forEach(item => {

        let current =
        parseInt(item.innerText);

        if (!isNaN(current)) {

            const variation =
            Math.floor(Math.random() * 5);

            item.innerText =
            current + variation;

        }

    });

}, 5000);

// ================================
// CURSOR GLOW
// ================================

const glow =
document.createElement('div');

glow.classList.add('cursor-glow');

document.body.appendChild(glow);

document.addEventListener('mousemove', e => {

    glow.style.left =
    e.clientX + 'px';

    glow.style.top =
    e.clientY + 'px';

});


const cards = document.querySelectorAll(
    '.service-card, .pricing-card, .metric-card'
);

cards.forEach(card => {

    card.addEventListener('mousemove', e => {

        const rect =
        card.getBoundingClientRect();

        const x =
        e.clientX - rect.left;

        const y =
        e.clientY - rect.top;

        const centerX =
        rect.width / 2;

        const centerY =
        rect.height / 2;

        const rotateX =
        (y - centerY) / 15;

        const rotateY =
        (centerX - x) / 15;

        card.style.transform = `
            perspective(1000px)
            rotateX(${-rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-10px)
        `;

    });

    card.addEventListener('mouseleave', () => {

        card.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            translateY(0)
        `;

    });

});

document.querySelectorAll(
'.btn-primary-custom'
).forEach(button => {

    button.addEventListener('mousemove', e => {

        const rect =
        button.getBoundingClientRect();

        const x =
        e.clientX - rect.left;

        const y =
        e.clientY - rect.top;

        const moveX =
        (x - rect.width / 2) / 8;

        const moveY =
        (y - rect.height / 2) / 8;

        button.style.transform =
        `translate(${moveX}px,${moveY}px)`;

    });

    button.addEventListener('mouseleave', () => {

        button.style.transform =
        'translate(0,0)';

    });

});

document
.querySelectorAll('.testimonial-card')
.forEach(card => {

    card.addEventListener('mousemove', e => {

        const rect =
        card.getBoundingClientRect();

        const x =
        e.clientX - rect.left;

        const y =
        e.clientY - rect.top;

        card.style.setProperty(
            '--x',
            `${x}px`
        );

        card.style.setProperty(
            '--y',
            `${y}px`
        );

    });

});

document
.querySelectorAll('.eco-card')
.forEach(card => {

    card.addEventListener('mousemove', e => {

        const rect =
        card.getBoundingClientRect();

        const x =
        e.clientX - rect.left;

        const y =
        e.clientY - rect.top;

        card.style.setProperty(
            '--x',
            `${x}px`
        );

        card.style.setProperty(
            '--y',
            `${y}px`
        );

    });

});