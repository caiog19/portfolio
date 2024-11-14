// script.js

const languageToggle = document.getElementById('language-toggle');
const elementsToTranslate = {
    'greeting': {
        'pt-BR': 'Olá, eu sou Caio',
        'en': 'Hello, I\'m Caio'
    },
    'job-title': {
        'pt-BR': 'Desenvolvedor Frontend',
        'en': 'Frontend Developer'
    },
    'description': {
        'pt-BR': 'Tenho experiência em desenvolvimento web, produzindo trabalho de qualidade com as tecnologias mais recentes do mercado.',
        'en': 'I have experience in web development, producing quality work with the latest technologies on the market.'
    },
    'download-cv': {
        'pt-BR': 'Baixar Currículo',
        'en': 'Download CV'
    },
    'nav-home': {
        'pt-BR': 'Início',
        'en': 'Home'
    },
    'nav-about': {
        'pt-BR': 'Sobre',
        'en': 'About'
    },
    'nav-skills': {
        'pt-BR': 'Habilidades',
        'en': 'Skills'
    },
    'nav-services': {
        'pt-BR': 'Serviços',
        'en': 'Services'
    },
    'nav-portfolio': {
        'pt-BR': 'Portfólio',
        'en': 'Portfolio'
    },
    'nav-contact': {
        'pt-BR': 'Contato',
        'en': 'Contact'
    },
    'footer-rights': {
        'pt-BR': 'Todos os Direitos Reservados',
        'en': 'All Rights Reserved'
    }
};

let currentLanguage = localStorage.getItem('language') || 'pt-BR';

// Função para atualizar os textos de acordo com o idioma selecionado
function updateLanguage() {
    for (const [id, texts] of Object.entries(elementsToTranslate)) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = texts[currentLanguage];
        }
    }

    // Atualizar o texto do rodapé
    const footerText = document.getElementById('footer-rights');
    if (footerText) {
        footerText.innerHTML = `&copy; 2024 Caio - ${elementsToTranslate['footer-rights'][currentLanguage]}`;
    }
}

// Função para alternar o idioma e atualizar os textos
function toggleLanguage() {
    currentLanguage = currentLanguage === 'pt-BR' ? 'en' : 'pt-BR';
    updateLanguage();
    languageToggle.textContent = currentLanguage === 'pt-BR' ? 'EN' : 'PT';
    localStorage.setItem('language', currentLanguage);
}

// Adicionar evento de clique ao botão de alternância de idioma
languageToggle.addEventListener('click', toggleLanguage);

// Carregar o idioma preferido do usuário ao inicializar a página
document.addEventListener('DOMContentLoaded', () => {
    if (currentLanguage === 'pt-BR') {
        languageToggle.textContent = 'EN';
    } else {
        languageToggle.textContent = 'PT';
    }
    updateLanguage();
});

const navHome = document.getElementById('nav-home');
const navSkills = document.getElementById('nav-skills');
const heroSection = document.querySelector('.hero');
const skillsSection = document.querySelector('.skills-section');
const rotatingIcons = document.querySelector('.rotating-icons');
const skillCards = document.querySelectorAll('.skill-card');

// Função para exibir a seção Habilidades
function showSkillsSection() {
    // Adicionar classe para animar os ícones
    rotatingIcons.classList.add('align-icons');

    // Aguardar a animação terminar
    setTimeout(() => {
        // Esconder a seção Hero
        heroSection.style.display = 'none';

        // Exibir a seção Habilidades
        skillsSection.style.display = 'block';

        // Animar os cards das habilidades
        skillCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('show');
            }, index * 200); // Delay entre os cards
        });
    }, 1000); // Duração da animação dos ícones
}

// Função para exibir a seção Hero
function showHeroSection() {
    // Esconder a seção Habilidades
    skillsSection.style.display = 'none';

    // Mostrar a seção Hero
    heroSection.style.display = 'flex'; // Use 'flex' em vez de 'block'

    // Remover a classe de alinhamento dos ícones para reiniciar a animação
    rotatingIcons.classList.remove('align-icons');

    // Redefinir transformações e opacidade dos ícones rotativos
    rotatingIcons.style.transform = '';
    rotatingIcons.style.opacity = '';

    // Reiniciar a animação dos ícones rotativos
    void rotatingIcons.offsetWidth; // Forçar reflow

    // Remover a classe 'show' dos skill cards
    skillCards.forEach((card) => {
        card.classList.remove('show');
    });
}

// Adicionar evento de clique ao link Habilidades
navSkills.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir comportamento padrão do link
    showSkillsSection();
});

// Adicionar evento de clique ao link Início
navHome.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir comportamento padrão do link
    showHeroSection();
});

// Adicionar evento de clique ao link Início
navHome.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir comportamento padrão do link
    showHeroSection();
});