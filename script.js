// script.js

// Seleção de elementos de idioma
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

    // Inicializar a seção ativa
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    heroSection.classList.add('active');
});

// Seleção de elementos de navegação e seções
const navHome = document.getElementById('nav-home');
const navSkills = document.getElementById('nav-skills');
const navProjetos = document.getElementById('nav-projetos');
const navContact = document.getElementById('nav-contact');
const heroSection = document.querySelector('.hero');
const skillsSection = document.querySelector('.skills-section');
const projetosSection = document.querySelector('.projetos-section');
const contactSection = document.querySelector('.contato-section');
const rotatingIcons = document.querySelector('.rotating-icons');
const skillCards = document.querySelectorAll('.skill-card');
const projetoCards = document.querySelectorAll('.projeto-card');

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

        // Esconder as seções Projetos e Contato, se estiverem visíveis
        projetosSection.style.display = 'none';
        contactSection.style.display = 'none';

        // Animar os cards das habilidades
        skillCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('show');
            }, index * 200); // Delay entre os cards
        });
    }, 1000); // Duração da animação dos ícones
}

// Função para exibir a seção Projetos
function showProjetosSection() {
    // Adicionar classe para animar os ícones
    rotatingIcons.classList.add('align-icons');

    // Aguardar a animação terminar
    setTimeout(() => {
        // Esconder as seções Hero e Habilidades
        heroSection.style.display = 'none';
        skillsSection.style.display = 'none';
        contactSection.style.display = 'none';

        // Exibir a seção Projetos
        projetosSection.style.display = 'block';

        // Opcional: adicionar animações aos projetos
        projetoCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('show');
            }, index * 200); // Delay entre os cards
        });
    }, 1000); // Duração da animação dos ícones
}

// Função para exibir a seção Contato
function showContactSection() {
    // Adicionar classe para animar os ícones rotativos
    rotatingIcons.classList.add('align-icons');

    // Aguardar a animação terminar
    setTimeout(() => {
        // Esconder as seções Hero, Habilidades e Projetos
        heroSection.style.display = 'none';
        skillsSection.style.display = 'none';
        projetosSection.style.display = 'none';

        // Exibir a seção Contato
        contactSection.style.display = 'block';
    }, 1000); // Tempo da animação dos ícones
}

// Função para exibir a seção Hero
function showHeroSection() {
    // Esconder as seções Habilidades, Projetos e Contato
    skillsSection.style.display = 'none';
    projetosSection.style.display = 'none';
    contactSection.style.display = 'none';

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

    // Remover a classe 'show' dos projeto cards
    projetoCards.forEach((card) => {
        card.classList.remove('show');
    });
}

// Adicionar evento de clique ao link Habilidades
navSkills.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir comportamento padrão do link
    showSkillsSection();
});

// Adicionar evento de clique ao link Projetos
navProjetos.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir comportamento padrão do link
    showProjetosSection();
});

// Adicionar evento de clique ao link Início
navHome.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir comportamento padrão do link
    showHeroSection();
});

// Adicionar evento de clique ao link Contato
navContact.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir comportamento padrão do link
    showContactSection();
});

// Configuração do EmailJS
(function() {
    emailjs.init("K2tkb-9FAioyrKLsx"); // Substitua com o seu User ID do EmailJS
})();

// Selecionar o formulário e o elemento de status
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// Função para lidar com o envio do formulário
contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir comportamento padrão

    // Coletar os dados do formulário
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Enviar o formulário usando EmailJS
    emailjs.send('service_vgb1h7i', 'template_agci0zr', formData)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            formStatus.style.color = 'green';
            formStatus.textContent = 'Mensagem enviada com sucesso!';
            contactForm.reset(); // Resetar o formulário
        }, function(error) {
            console.log('FAILED...', error);
            formStatus.style.color = 'red';
            formStatus.textContent = 'Ocorreu um erro. Por favor, tente novamente.';
        });
});
