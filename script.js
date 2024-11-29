// =========================
// Funções de Alternância de Idioma
// =========================

// Seleção de elementos de idioma
const languageToggle = document.getElementById('language-toggle');
const elementsToTranslate = {
    // Seção Hero
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
    // Navegação
    'nav-home': {
        'pt-BR': 'Início',
        'en': 'Home'
    },
    'nav-skills': {
        'pt-BR': 'Habilidades',
        'en': 'Skills'
    },
    'nav-projetos': {
        'pt-BR': 'Projetos',
        'en': 'Projects'
    },
    'nav-contact': {
        'pt-BR': 'Contato',
        'en': 'Contact'
    },
    // Footer
    'footer-rights': {
        'pt-BR': 'Todos os Direitos Reservados',
        'en': 'All Rights Reserved'
    },
    // Seção Habilidades
    'skills-section-title': {
        'pt-BR': 'Habilidades',
        'en': 'Skills'
    },
    // Seção Projetos
    'projetos-section-title': {
        'pt-BR': 'Projetos',
        'en': 'Projects'
    },
    // Seção Contato
    'contact-section-title': {
        'pt-BR': 'Contato',
        'en': 'Contact'
    },
    'label-name': {
        'pt-BR': 'Nome',
        'en': 'Name'
    },
    'label-email': {
        'pt-BR': 'E-mail',
        'en': 'Email'
    },
    'label-subject': {
        'pt-BR': 'Assunto',
        'en': 'Subject'
    },
    'label-message': {
        'pt-BR': 'Mensagem',
        'en': 'Message'
    },
    'send-button': {
        'pt-BR': 'Enviar',
        'en': 'Send'
    },
    'form-status-success': {
        'pt-BR': 'Mensagem enviada com sucesso!',
        'en': 'Message sent successfully!'
    },
    'form-status-error': {
        'pt-BR': 'Ocorreu um erro. Por favor, tente novamente.',
        'en': 'An error occurred. Please try again.'
    }
};


let currentLanguage = localStorage.getItem('language') || 'pt-BR';

// Função para atualizar os textos de acordo com o idioma selecionado
function updateLanguage() {
    for (const [id, texts] of Object.entries(elementsToTranslate)) {
        const element = document.getElementById(id);
        if (element) {
            // Tratamento especial para o botão do formulário
            if (id === 'send-button' && element.tagName === 'BUTTON') {
                element.textContent = texts[currentLanguage];
            } else {
                element.textContent = texts[currentLanguage];
            }
        }
    }

    // Atualizar texto de mensagens de status do formulário
    const formStatus = document.getElementById('form-status');
    if (formStatus && formStatus.textContent.includes(elementsToTranslate['form-status-success']['pt-BR'])) {
        formStatus.textContent = elementsToTranslate['form-status-success'][currentLanguage];
    } else if (formStatus && formStatus.textContent.includes(elementsToTranslate['form-status-error']['pt-BR'])) {
        formStatus.textContent = elementsToTranslate['form-status-error'][currentLanguage];
    }

    // Atualizar texto do rodapé
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

// =========================
// Funções de Navegação entre Seções
// =========================

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

// Função para definir o item ativo no menu de navegação
function setActiveNav(linkId) {
    const navLinks = document.querySelectorAll('.nav-menu ul li a');
    
    navLinks.forEach(link => {
        if (link.id === linkId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Função para exibir a seção Habilidades
function showSkillsSection() {
    // Atualizar o item ativo no menu
    setActiveNav('nav-skills');
    
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
    // Atualizar o item ativo no menu
    setActiveNav('nav-projetos');

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
    // Atualizar o item ativo no menu
    setActiveNav('nav-contact');

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
    // Atualizar o item ativo no menu
    setActiveNav('nav-home');

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

// Adicionar evento de clique aos links de navegação
navSkills.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir comportamento padrão do link
    showSkillsSection();
});

navProjetos.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir comportamento padrão do link
    showProjetosSection();
});

navHome.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir comportamento padrão do link
    showHeroSection();
});

navContact.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir comportamento padrão do link
    showContactSection();
});

// =========================
// Configuração do EmailJS
// =========================

// Inicializar o EmailJS com seu User ID
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
            formStatus.textContent = elementsToTranslate['form-status-success'][currentLanguage];
            contactForm.reset(); // Resetar o formulário
        }, function(error) {
            console.log('FAILED...', error);
            formStatus.style.color = 'red';
            formStatus.textContent = elementsToTranslate['form-status-error'][currentLanguage];
        });
});

// =========================
// Funcionalidade de Modal para Projetos
// =========================

// Dados dos Projetos
const projetosDados = {
    'Ecofoto': {
        imagens: [
            'assets/ecofoto.png',
            'assets/ecofoto1.png',
            'assets/ecofoto2.png'
        ],
        descricao: 'Ecofoto é um projeto de extensão universitária sobre fotografia contemporânea, realizado pela Escola de Comunicação da UFRJ. Faço parte do time de tecnologia, atuando como desenvolvedor fullstack no site. Iniciei no projeto resolvendo bugs na versão desktop, implementei uma galeria de fotos, desenvolvi a versão responsiva para mobile e, atualmente, trabalho junto à equipe para transformá-lo em um sistema completo.',
        tecnologias: ['React.js', 'Node.js', 'Scss'],
        site: 'https://ecofoto.com',
        repositorio: 'https://github.com/caiog19/ecofoto'
    },
    'Dashboard Interativo Disney+': {
        imagens: [
            'assets/disney.png',
            'assets/disney1.png',
            'assets/disney2.png'
        ],
        descricao: 'Um dashboard interativo para Disney+, desenvolvido com Streamlit, proporcionando uma visualização detalhada dos dados da plataforma.',
        tecnologias: ['Streamlit'],
        site: 'https://dashboard-disney.com',
        repositorio: 'https://github.com/caiog19/dashboard-disney'
    },
    'Dashboard Interativo Spotify': {
        imagens: [
            'assets/spotify.png',
            'assets/spotify1.png',
            'assets/spotify2.png'
        ],
        descricao: 'Dashboard interativo para Spotify, criado com Streamlit, oferecendo insights sobre padrões de escuta e tendências musicais.',
        tecnologias: ['Streamlit'],
        site: 'https://dashboard-spotify.com',
        repositorio: 'https://github.com/caiog19/dashboard-spotify'
    },
    'DeiaMandalas(Em Construção)': {
        imagens: [
            'assets/deiamandalas.png',
            'assets/deiamandalas.png'
        ],
        descricao: 'DeiaMandalas é uma plataforma em construção focada em criar mandalas personalizadas utilizando Vue.js e Node.js.',
        tecnologias: ['Vue.js', 'Node.js'],
        site: '#', // Atualize com o link real quando disponível
        repositorio: 'https://github.com/caiog19/deiamandalas'
    }
};

// Seleção de elementos da modal
const modal = document.getElementById('projeto-modal');
const closeButton = document.querySelector('.close-button');
const modalTitulo = document.getElementById('modal-titulo');
const modalDescricao = document.getElementById('modal-descricao');
const modalTecnologias = document.getElementById('modal-tecnologias');
const modalAcessarSite = document.getElementById('modal-acessar-site');
const modalAcessarRepo = document.getElementById('modal-acessar-repo');
const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let currentSlide = 0;

// Função para abrir a modal com os dados do projeto
function abrirModal(projetoNome) {
    const projeto = projetosDados[projetoNome];
    if (!projeto) return;

    // Atualizar o título e descrição
    modalTitulo.textContent = projetoNome;
    modalDescricao.textContent = projeto.descricao;

    // Atualizar a lista de tecnologias
    modalTecnologias.innerHTML = '';
    projeto.tecnologias.forEach(tech => {
        const li = document.createElement('li');
        li.textContent = tech;
        modalTecnologias.appendChild(li);
    });

    // Atualizar os links dos botões
    modalAcessarSite.href = projeto.site;
    modalAcessarRepo.href = projeto.repositorio;

    // Atualizar o carrossel de imagens
    carousel.innerHTML = '';
    projeto.imagens.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = projetoNome;
        carousel.appendChild(img);
    });

    // Resetar a posição do carrossel
    currentSlide = 0;
    atualizarCarrossel();

    // Exibir a modal
    modal.style.display = 'flex';
}

// Função para fechar a modal
function fecharModal() {
    modal.style.display = 'none';
}

// Função para atualizar a posição do carrossel
function atualizarCarrossel() {
    const totalSlides = carousel.children.length;
    if (totalSlides === 0) return;
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    const offset = -currentSlide * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

// Eventos de clique nos botões de navegação do carrossel
prevButton.addEventListener('click', () => {
    currentSlide--;
    atualizarCarrossel();
});

nextButton.addEventListener('click', () => {
    currentSlide++;
    atualizarCarrossel();
});

// Evento de clique no botão de fechar
closeButton.addEventListener('click', fecharModal);

// Fechar a modal ao clicar fora do conteúdo da modal
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        fecharModal();
    }
});

// Adicionar eventos de clique aos cards de projetos
projetoCards.forEach(card => {
    card.addEventListener('click', () => {
        const projetoNome = card.querySelector('h3').textContent;
        abrirModal(projetoNome);
    });
});

// =========================
// Funcionalidade de Dark Mode
// =========================
// Seleção do botão de Dark Mode
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Função para atualizar o ícone do Dark Mode baseado no estado
function updateDarkModeIcon(isDarkMode) {
    const icon = darkModeToggle.querySelector('i');
    if (isDarkMode) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Função para alternar o Dark Mode
function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    updateDarkModeIcon(isDarkMode);
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}

// Função para carregar o estado do Dark Mode ao iniciar a página
function loadDarkModePreference() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        updateDarkModeIcon(true);
    } else {
        document.body.classList.remove('dark-mode');
        updateDarkModeIcon(false);
    }
}

// Adicionar evento de clique ao botão de Dark Mode
darkModeToggle.addEventListener('click', toggleDarkMode);

// =========================
// Inicialização da Página
// =========================
document.addEventListener('DOMContentLoaded', () => {
    if (currentLanguage === 'pt-BR') {
        languageToggle.textContent = 'EN';
    } else {
        languageToggle.textContent = 'PT';
    }
    updateLanguage();

    // Inicializar a seção ativa
    showHeroSection();

    // Carregar a preferência do Dark Mode
    loadDarkModePreference();
});

// =========================
// Responsividade do Menu Hamburger
// =========================
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    // Alternar visibilidade do menu
    hamburgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em qualquer item
    document.querySelectorAll('.nav-menu a').forEach(item => {
        item.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
});
