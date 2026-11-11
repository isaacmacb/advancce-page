// ============================================
// NAVBAR SCROLL
// ============================================
const navbar = document.querySelector('.navbar');

// Verifica se a navbar existe na página antes de adicionar o evento
if (navbar) {
    // Checa a posição inicial (caso a página seja recarregada no meio)
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Ignora se o link for apenas "#" ou se abrir em nova aba
        if (targetId === '#' || this.getAttribute('target') === '_blank') return;

        e.preventDefault();
        const target = document.querySelector(targetId);
        
        if (target) {
            // Rola suavemente para o elemento
            target.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// COUNTER ANIMATION (MÉTRICAS)
// ============================================
const counters = document.querySelectorAll('.metric-number');
const speed = 200; // Quanto menor, mais rápido

const animateCounter = (counter) => {
    // Pega apenas os números do texto (ex: "R$ 150" vira "150", "99%" vira "99")
    const targetText = counter.innerText;
    const numericMatch = targetText.replace(/\D/g, '');
    const target = parseInt(numericMatch) || 0;
    
    // Se o valor for 0 ou não for número, não anima
    if (target === 0) return;

    let current = 0;
    const increment = target / speed;

    const update = () => {
        current += increment;
        if (current < target) {
            // Mantém o formato original se tiver prefixo/sufixo (ex: R$ ou +)
            const suffix = targetText.includes('+') ? '+' : '';
            const prefix = targetText.includes('R$') ? 'R$ ' : '';
            
            counter.innerText = prefix + Math.ceil(current) + suffix;
            requestAnimationFrame(update);
        } else {
            counter.innerText = targetText; // Restaura o texto original no final
        }
    };
    update();
};

// Observer para animar apenas quando o elemento aparecer na tela
if (counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // Para de observar após animar uma vez
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ============================================
// DASHBOARD LIVE NUMBERS (PAINEL HERO)
// ============================================
// Atualiza os números do painel simulando um sistema em tempo real
const dashboardInterval = setInterval(() => {
    const dashboardNumbers = document.querySelectorAll('.dashboard-card h2');
    
    if (dashboardNumbers.length === 0) return; // Se não existir, ignora

    dashboardNumbers.forEach(item => {
        const current = parseInt(item.innerText);
        
        // Verifica se é um número válido
        if (!isNaN(current) && current < 999) {
            const variation = Math.floor(Math.random() * 3) + 1; // Variação de 1 a 3
            item.innerText = current + variation;
        }
    });
}, 5000);

// ============================================
// FORM SUBMIT (CONTATO)
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Efeito visual no botão (opcional)
        const btn = this.querySelector('.contact-btn');
        if (btn) {
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
            btn.disabled = true;
            
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                this.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1000); // Simula o tempo de envio
        } else {
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
        }
    });
}