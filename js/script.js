// ================================
// NAVBAR SCROLL
// ================================
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(5, 5, 5, 0.95)"; // Fundo Preto Translúcido
            navbar.style.borderBottom = "1px solid rgba(200, 16, 46, 0.3)"; // Linha vermelha sutil
            navbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.6)";
        } else {
            navbar.style.background = "rgba(5, 5, 5, 0.85)";
            navbar.style.borderBottom = "1px solid transparent";
            navbar.style.boxShadow = "none";
        }
    });
}

// ================================
// SMOOTH SCROLL
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Ignora se o link for apenas "#" ou se abrir em nova aba
        if (targetId === '#' || this.getAttribute('target') === '_blank') return;

        e.preventDefault();
        const target = document.querySelector(targetId);

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================
// COUNTER ANIMATION
// ================================
const counters = document.querySelectorAll('.metric-number');
const speed = 100;

if (counters.length > 0) {
    counters.forEach(counter => {
        const updateCount = () => {
            const targetText = counter.innerText;
            const target = parseInt(targetText.replace(/\D/g, ''));
            
            if (isNaN(target)) return;

            let count = parseInt(counter.dataset.count || 0);
            const increment = target / speed;

            if (count < target) {
                count += increment;
                counter.dataset.count = count;
                
                // Mantém o sufixo "+" ou "%" se existir
                const suffix = targetText.includes('+') ? '+' : (targetText.includes('%') ? '%' : '');
                counter.innerText = Math.ceil(count) + suffix;
                
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = targetText; // Restaura o texto original no final
            }
        };

        // Inicia a animação apenas quando o elemento aparecer na tela
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// ================================
// REVEAL ANIMATION
// ================================
// Adicionado 'product-card' e 'why-card' para combinar com a landing page atual
const reveals = document.querySelectorAll('.service-card, .product-card, .why-card, .metric-card');

if (reveals.length > 0) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(item => {
        item.classList.add('hidden');
        revealObserver.observe(item);
    });
}

// ================================
// TYPING EFFECT
// ================================
const typingText = document.querySelector('.hero-text');

if (typingText) {
    const text = "Desenvolvemos soluções inteligentes para comunidades, times competitivos, empresas e projetos digitais.";
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
const dashboardValues = document.querySelectorAll('.dashboard h2');

if (dashboardValues.length > 0) {
    setInterval(() => {
        dashboardValues.forEach(item => {
            let current = parseInt(item.innerText);
            if (!isNaN(current) && current < 999) {
                const variation = Math.floor(Math.random() * 3) + 1; // Variação sutil
                item.innerText = current + variation;
            }
        });
    }, 5000);
}

// ================================
// CURSOR GLOW (Efeito de Luz do Mouse)
// ================================
const glow = document.createElement('div');
glow.classList.add('cursor-glow');
document.body.appendChild(glow);

// Adicionando o estilo do glow via JS para facilitar (Vermelho Carmesim)
glow.style.position = 'fixed';
glow.style.width = '300px';
glow.style.height = '300px';
glow.style.borderRadius = '50%';
glow.style.background = 'radial-gradient(circle, rgba(200, 16, 46, 0.08) 0%, transparent 70%)';
glow.style.pointerEvents = 'none';
glow.style.transform = 'translate(-50%, -50%)';
glow.style.zIndex = '9999';
glow.style.transition = 'opacity 0.3s';

document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// ================================
// 3D TILT EFFECT (Cards)
// ================================
const cards = document.querySelectorAll('.service-card, .product-card, .why-card');

if (cards.length > 0) {
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Reduzi a intensidade da rotação para ficar mais profissional
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;

            card.style.transform = `
                perspective(1000px)
                rotateX(${-rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-5px)
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
}

// ================================
// BUTTON MAGNETIC EFFECT
// ================================
document.querySelectorAll('.btn-primary-custom').forEach(button => {
    button.addEventListener('mousemove', e => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Movimento magnético mais sutil
        const moveX = (x - rect.width / 2) / 12;
        const moveY = (y - rect.height / 2) / 12;
        
        button.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// ================================
// GLOW EFFECT NOS CARDS (Testimonials / Products)
// ================================
// Atualizado para incluir a classe .product-card do novo layout
document.querySelectorAll('.testimonial-card, .product-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});