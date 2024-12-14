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
        'pt-BR': 'Desenvolvedor FullStack',
        'en': 'FullStack Developer'
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
            if (id === 'send-button' && element.tagName === 'BUTTON') {
                element.textContent = texts[currentLanguage];
            } else {
                element.textContent = texts[currentLanguage];
            }
        }
    }

    const formStatus = document.getElementById('form-status');
    if (formStatus && formStatus.textContent.includes(elementsToTranslate['form-status-success']['pt-BR'])) {
        formStatus.textContent = elementsToTranslate['form-status-success'][currentLanguage];
    } else if (formStatus && formStatus.textContent.includes(elementsToTranslate['form-status-error']['pt-BR'])) {
        formStatus.textContent = elementsToTranslate['form-status-error'][currentLanguage];
    }

    const footerText = document.getElementById('footer-rights');
    if (footerText) {
        footerText.innerHTML = `&copy; 2024 Caio - ${elementsToTranslate['footer-rights'][currentLanguage]}`;
    }
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'pt-BR' ? 'en' : 'pt-BR';
    updateLanguage();
    languageToggle.textContent = currentLanguage === 'pt-BR' ? 'EN' : 'PT';
    localStorage.setItem('language', currentLanguage);
}

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

let currentSection = 'home'; 
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
    setActiveNav('nav-skills');
    
    if (currentSection === 'home') {
        rotatingIcons.classList.add('align-icons');

        setTimeout(() => {
            heroSection.style.display = 'none';

            skillsSection.style.display = 'block';

            projetosSection.style.display = 'none';
            contactSection.style.display = 'none';

            skillCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('show');
                }, index * 200); 
            });

            
            currentSection = 'skills';

            
            rotatingIcons.classList.remove('align-icons');
        }, 1000); 
    } else {
        
        heroSection.style.display = 'none';
        skillsSection.style.display = 'block';
        projetosSection.style.display = 'none';
        contactSection.style.display = 'none';

        
        skillCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('show');
            }, index * 200); 
        });

        currentSection = 'skills';
    }
}

function showProjetosSection() {
    setActiveNav('nav-projetos');
    
    if (currentSection === 'home') {
        rotatingIcons.classList.add('align-icons');

        setTimeout(() => {
            heroSection.style.display = 'none';

            projetosSection.style.display = 'block';

            skillsSection.style.display = 'none';
            contactSection.style.display = 'none';

            projetoCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('show');
                }, index * 200); 
            });

            currentSection = 'projetos';

            rotatingIcons.classList.remove('align-icons');
        }, 1000); 
    } else {
        heroSection.style.display = 'none';
        projetosSection.style.display = 'block';
        skillsSection.style.display = 'none';
        contactSection.style.display = 'none';

        projetoCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('show');
            }, index * 200); 
        });

        currentSection = 'projetos';
    }
}

function showContactSection() {
    setActiveNav('nav-contact');
    
    if (currentSection === 'home') {
        rotatingIcons.classList.add('align-icons');

        setTimeout(() => {
            heroSection.style.display = 'none';

            contactSection.style.display = 'block';

            skillsSection.style.display = 'none';
            projetosSection.style.display = 'none';

            currentSection = 'contact';

            rotatingIcons.classList.remove('align-icons');
        }, 1000); 
    } else {
        heroSection.style.display = 'none';
        contactSection.style.display = 'block';
        skillsSection.style.display = 'none';
        projetosSection.style.display = 'none';

        currentSection = 'contact';
    }
}

function showHeroSection() {
    setActiveNav('nav-home');
    
    if (currentSection === 'home') {
        return;
    }

    // Navegação sem atraso
    skillsSection.style.display = 'none';
    projetosSection.style.display = 'none';
    contactSection.style.display = 'none';
    heroSection.style.display = 'flex'; 

    rotatingIcons.classList.remove('align-icons');

    rotatingIcons.style.transform = '';
    rotatingIcons.style.opacity = '';

    void rotatingIcons.offsetWidth; 

    skillCards.forEach((card) => {
        card.classList.remove('show');
    });

    projetoCards.forEach((card) => {
        card.classList.remove('show');
    });

    currentSection = 'home';
}

navSkills.addEventListener('click', (e) => {
    e.preventDefault(); 
    showSkillsSection();
});

navProjetos.addEventListener('click', (e) => {
    e.preventDefault(); 
    showProjetosSection();
});

navHome.addEventListener('click', (e) => {
    e.preventDefault(); 
    showHeroSection();
});

navContact.addEventListener('click', (e) => {
    e.preventDefault(); 
    showContactSection();
});

// =========================
// Configuração do EmailJS
// =========================

(function() {
    emailjs.init("K2tkb-9FAioyrKLsx"); // 
})();

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// Função para lidar com o envio do formulário
contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir comportamento padrão

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

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
        tecnologias: ['React.js', 'Node.js', 'SCSS', 'Sequelize', 'SQLite'],
        site: 'https://www.ecofoto.eco.ufrj.br/',
        repositorio: 'https://github.com/caiog19/'
    },
    'Dashboard Interativo Disney+': {
        imagens: [
            'assets/disney.png',
            'assets/disney1.png',
            'assets/disney2.png'
        ],
        descricao: 'Um dashboard interativo para Disney+, desenvolvido com Streamlit, proporcionando uma visualização detalhada dos dados da plataforma.',
        tecnologias: ['Streamlit'],
        site: 'https://orgdados-disneyplus.streamlit.app/',
        repositorio: 'https://github.com/caiog19/org_dados'
    },
    'Dashboard Interativo Spotify': {
        imagens: [
            'assets/spotify.png',
            'assets/spotify1.png',
            'assets/spotify2.png'
        ],
        descricao: 'Dashboard interativo para Spotify, criado com Streamlit, oferecendo insights sobre padrões de escuta e tendências musicais.',
        tecnologias: ['Streamlit'],
        site: 'https://spotifysongs-caiog19.streamlit.app/',
        repositorio: 'https://github.com/caiog19/spotify_streamlit'
    },
    'DeiaMandalas(Em Construção)': {
        imagens: [
            'assets/deiamandalas.png',
            'assets/deiamandalas.png'
        ],
        descricao: 'DeiaMandalas é um projeto em desenvolvimento, está sendo criado para se tornar uma loja especializada em venda de mandalas e produtos relacionados.',
        tecnologias: ['Vue.js', 'Node.js'],
        site: '#', 
        repositorio: 'https://github.com/caiog19/deiamandalas'
    },
    'DevConnected(Em Construção)': {
        imagens: [
            'assets/dev.png',
            'assets/dev1.png',
            'assets/dev2.png'
        ],
        descricao: 'DevConnected é uma plataforma em construção inspirada no StackOverflow, em que usuários podem criar posts, comentar e se ajudar em relação as últimas tecnologias do mercado de desenvolvimento de software.',
        tecnologias: ['Next.js', 'Tailwind', 'Nest.js', 'PostgreSQL', 'Prisma'],
        site: 'https://dev-connected.vercel.app/', 
        repositorio: 'https://github.com/caiog19/DevConnected'
    },
    'Meu Portfólio': {
        imagens: [
            'assets/port.png',
            'assets/port1.png',
            'assets/port2.png'
        ],
        descricao: 'A ideia do meu portfólio é ser um projeto simples, utilizando apenas HTML, CSS e JavaScript para poder expor o meu trabalho ao longo do tempo.',
        tecnologias: ['HTML', 'CSS', "JavaScript"],
        site: 'https://caiog19.github.io/portfolio/', 
        repositorio: 'https://github.com/caiog19/portfolio'
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

    modalTitulo.textContent = projetoNome;
    modalDescricao.textContent = projeto.descricao;

    modalTecnologias.innerHTML = '';
    projeto.tecnologias.forEach(tech => {
        const li = document.createElement('li');
        li.textContent = tech;
        modalTecnologias.appendChild(li);
    });

    modalAcessarSite.href = projeto.site;
    modalAcessarRepo.href = projeto.repositorio;

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
    showHeroSection();
    loadDarkModePreference();
});

// =========================
// Responsividade do Menu Hamburger
// =========================
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    hamburgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(item => {
        item.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
});

