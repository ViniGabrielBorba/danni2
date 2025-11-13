// Menu Hambúrguer
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav) {
            nav.classList.remove('active');
        }
        if (menuToggle) {
            menuToggle.classList.remove('active');
        }
    });
});

// Header fixo com efeito ao rolar
const header = document.getElementById('header');
let lastScroll = 0;

if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// Destacar link ativo no menu
function setActiveLink() {
    if (navLinks.length === 0) return;
    
    let currentPage = window.location.pathname.split('/').pop();
    
    // Se estiver na raiz ou index.html
    if (!currentPage || currentPage === '' || currentPage === 'index.html') {
        currentPage = 'index.html';
    }
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        link.classList.remove('active');
        
        // Comparar o nome do arquivo
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
}

// Executar ao carregar a página
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setActiveLink);
} else {
    setActiveLink();
}

// Animação de scroll para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar cards de produtos
const produtoCards = document.querySelectorAll('.produto-card');
const produtoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

produtoCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    produtoObserver.observe(card);
});

// Efeito de parallax suave no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && window.location.pathname.includes('index.html')) {
        hero.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Animação de botões ao clicar
const buttons = document.querySelectorAll('.btn-comprar, .cta-button');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Criar efeito de ripple
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Adicionar estilo de ripple via JavaScript
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Adicionar efeito de loading suave
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Fechar menu ao clicar fora dele (mobile)
document.addEventListener('click', (e) => {
    if (nav && menuToggle && nav.classList.contains('active')) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    }
});

// Adicionar animação fade-in para conteúdo da página
const pageContent = document.querySelector('.produtos-page, .sobre-page, .contato-page');
if (pageContent) {
    pageContent.style.opacity = '0';
    pageContent.style.transform = 'translateY(20px)';
    pageContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            pageContent.style.opacity = '1';
            pageContent.style.transform = 'translateY(0)';
        }, 200);
    });
}
