window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  const timelineFill = document.getElementById('timeline-fill');
  if (timelineFill) {
    timelineFill.style.height = scrollPercent + '%';
  }
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.style.display = scrollTop > 100 ? 'block' : 'none';
  }
});

document.getElementById('back-to-top')?.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const languageToggle = document.getElementById('language-toggle');

const textsToTranslate = {
  'hello-text': { 'pt-BR': 'Olá', en: 'Hello' },
  'i-am-text': { 'pt-BR': 'Eu sou', en: "I’m" },
  'name-text': { 'pt-BR': 'Caio', en: 'Caio' },
  'role-text': { 'pt-BR': 'Desenvolvedor FullStack', en: 'Software Developer' },
  'btn-project-text': { 'pt-BR': 'Tem um projeto?', en: 'Got a project?' },
  'btn-resume-text': { 'pt-BR': 'Meu currículo', en: 'My resume' },
  'about-title': { 'pt-BR': 'Sobre mim', en: 'About me' },
  'stat-projects-text': { 'pt-BR': 'Projetos Concluídos', en: 'Completed Projects' },
  'about-description': { 
  'pt-BR': 'Logo após ingressar na UFRJ, encontrei na Empresa Júnior EJCM um ambiente inspirador para iniciar minha trajetória como desenvolvedor front-end. Foi nesse espaço que aprendi a programar e comecei a desenvolver meus primeiros websites, despertando minha paixão pelo desenvolvimento e pela inovação digital. Posteriormente, migrei de curso para Ciência da Computação, reafirmando meu compromisso com o universo da tecnologia. Durante minha jornada acadêmica, tive a oportunidade de integrar um projeto de extensão no time de tecnologia, experiência que ampliou meus conhecimentos e fortaleceu minha prática profissional, motivando-me a me tornar um desenvolvedor fullstack. Além disso, desenvolvi projetos pessoais relevantes que ilustram minha evolução e criatividade – trabalhos que você poderá conferir nas próximas seções.',
  en: 'Shortly after enrolling at UFRJ, I joined the Junior Enterprise EJCM at the university, which offered an inspiring environment to kick-start my journey as a front-end developer. It was there that I learned how to program and began developing my first websites, igniting my passion for digital innovation and development. Later, I switched my major to Computer Science, reaffirming my commitment to the technology field. During my academic journey, I had the opportunity to participate in an extension project with the technology team—a valuable experience that broadened my knowledge and strengthened my practical skills, motivating me to become a fullstack developer. Additionally, I developed several personal projects that showcase my growth and creativity, projects that you will have the chance to explore in the upcoming sections.'
},
  'stat-clients-text': { 'pt-BR': 'Satisfação de Clientes', en: 'Client Satisfaction' },
  'stat-years-text': { 'pt-BR': 'Anos de Experiência', en: 'Years of Experience' },
  'projects-title': { 'pt-BR': 'Projetos', en: 'Projects' },
  'contact-title': { 'pt-BR': 'Contato', en: 'Contact' },
  'contact-instructions': { 'pt-BR': 'Se você tem alguma proposta...', en: 'If you have any proposal...' },
  'project-text': { 'pt-BR': 'Alguns projetos que criei ou participei...', en: 'If you have any proposal...' },
  'label-name': { 'pt-BR': 'Nome', en: 'Name' },
  'label-email': { 'pt-BR': 'E-mail', en: 'Email' },
  'label-subject': { 'pt-BR': 'Assunto', en: 'Subject' },
  'label-message': { 'pt-BR': 'Mensagem', en: 'Message' },
  'send-button': { 'pt-BR': 'Envie sua mensagem', en: 'Send your message' },
  'form-status-success': { 'pt-BR': 'Mensagem enviada com sucesso!', en: 'Message sent successfully!' },
  'form-status-error': { 'pt-BR': 'Ocorreu um erro...', en: 'An error occurred...' },
  'footer-text': { 'pt-BR': '© 2025 Caio Gullo. Todos os direitos reservados.', en: '© 2025 Caio Gullo. All rights reserved.' },
  'placeholder-name': { 'pt-BR': 'Seu nome', en: 'Your name' },
  'placeholder-email': { 'pt-BR': 'Seu e-mail', en: 'Your email' },
  'placeholder-subject': { 'pt-BR': 'Assunto', en: 'Subject' },
  'placeholder-message': { 'pt-BR': 'Sua mensagem', en: 'Your message' },
  'nav-home': { 'pt-BR': 'Início', en: 'Home' },
  'nav-about': { 'pt-BR': 'Sobre', en: 'About' },
  'nav-projects': { 'pt-BR': 'Projetos', en: 'Projects' },
  'nav-contact': { 'pt-BR': 'Contato', en: 'Contact' },
  'project-prev': { 'pt-BR': 'Projeto Anterior', en: 'Previous Project' },
  'project-back': { 'pt-BR': 'Voltar para Projetos', en: 'Back to Projects' },
  'project-next': { 'pt-BR': 'Próximo Projeto', en: 'Next Project' },
  'project-technologies-title': { 'pt-BR': 'Tecnologias Utilizadas', en: 'Technologies Used' },
  'project-disney-title': { 
    'pt-BR': 'Dashboard Interativo Disney+',
    en: 'Interactive Dashboard Disney+'
  },
  'project-disney-description': {
    'pt-BR': 'Projeto de dashboard interativo para o Disney+ desenvolvido utilizando Streamlit, que permite a visualização dinâmica de dados e insights sobre o serviço.',
    en: 'Interactive dashboard project for Disney+ developed using Streamlit, which allows dynamic visualization of data and insights about the service.'
  },

  'project-spotify-title': {
    'pt-BR': 'Dashboard Interativo Spotify',
    en: 'Interactive Dashboard Spotify'
  },
  'project-spotify-description': {
    'pt-BR': 'Projeto de dashboard interativo para o Spotify desenvolvido com Streamlit, que exibe estatísticas e insights relevantes sobre a plataforma.',
    en: 'Interactive dashboard project for Spotify developed with Streamlit, displaying relevant statistics and insights about the platform.'
  },

  'project-deiamandalas-title': {
    'pt-BR': 'DeiaMandalas (Em Construção)',
    en: 'DeiaMandalas (Under Construction)'
  },
  'project-deiamandalas-description': {
    'pt-BR': 'Projeto em desenvolvimento utilizando Vue.js e Node.js, voltado para a criação de uma experiência digital inovadora.',
    en: 'Project under development using Vue.js and Node.js, aimed at creating an innovative digital experience.'
  },

  'project-dev-title': {
    'pt-BR': 'DevConnected (Em Construção)',
    en: 'DevConnected (Under Construction)'
  },
  'project-dev-description': {
    'pt-BR': 'Projeto em desenvolvimento utilizando Next.js, Tailwind, Nest.js, PostgreSQL e Prisma, que tem como objetivo conectar desenvolvedores e promover a colaboração.',
    en: 'Project under development using Next.js, Tailwind, Nest.js, PostgreSQL, and Prisma, aimed at connecting developers and promoting collaboration.'
  },

  'project-port-title': {
    'pt-BR': 'Meu Portfólio',
    en: 'My Portfolio'
  },
  'project-port-description': {
    'pt-BR': 'Projeto do meu portfólio pessoal desenvolvido com HTML, CSS e JavaScript. Esta página demonstra minhas habilidades e apresenta meus projetos de forma dinâmica e interativa.',
    en: 'My personal portfolio project developed with HTML, CSS, and JavaScript. This page showcases my skills and presents my projects in a dynamic and interactive way.'
  },
  'project-ecofoto-title': {
    'pt-BR': 'Ecofoto',
    en: 'Ecofoto'
  },
  'project-ecofoto-description': {
    'pt-BR': 'Projeto de extensão universitária sobre fotografia contemporânea. Este projeto foi desenvolvido utilizando React.js no front-end, Node.js no back-end e SCSS para a estilização.',
    en: 'University extension project on contemporary photography. This project was developed using React.js on the front-end, Node.js on the back-end, and SCSS for styling.'
  }
};

let currentLanguage = localStorage.getItem('language') || 'pt-BR';

function updateLanguage() {
  for (let id in textsToTranslate) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = textsToTranslate[id][currentLanguage];
    }
  }
  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const subjectField = document.getElementById('subject');
  const messageField = document.getElementById('message');
  
  if (nameField) nameField.placeholder = textsToTranslate['placeholder-name'][currentLanguage];
  if (emailField) emailField.placeholder = textsToTranslate['placeholder-email'][currentLanguage];
  if (subjectField) subjectField.placeholder = textsToTranslate['placeholder-subject'][currentLanguage];
  if (messageField) messageField.placeholder = textsToTranslate['placeholder-message'][currentLanguage];

  if (languageToggle) {
    languageToggle.textContent = currentLanguage === 'pt-BR' ? 'EN' : 'PT';
  }
}

function toggleLanguage() {
  currentLanguage = currentLanguage === 'pt-BR' ? 'en' : 'pt-BR';
  localStorage.setItem('language', currentLanguage);
  updateLanguage();
}

languageToggle?.addEventListener('click', toggleLanguage);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

const hamburgerMenu = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.nav-menu');
hamburgerMenu?.addEventListener('click', () => {
  navMenu?.classList.toggle('active');
});
document.querySelectorAll('.nav-menu a').forEach((item) => {
  item.addEventListener('click', () => {
    navMenu?.classList.remove('active');
  });
});

(function() {
  if (window.emailjs) {
    emailjs.init("K2tkb-9FAioyrKLsx");
  }
})();

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm?.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
  };
  if (window.emailjs) {
    emailjs.send('service_vgb1h7i', 'template_agci0zr', formData)
      .then(function() {
        if (formStatus) {
          formStatus.style.color = 'green';
          formStatus.textContent = textsToTranslate['form-status-success'][currentLanguage];
        }
        contactForm.reset();
      }, function() {
        if (formStatus) {
          formStatus.style.color = 'red';
          formStatus.textContent = textsToTranslate['form-status-error'][currentLanguage];
        }
      });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  updateLanguage();
});

function createBgSymbols() {
  const container = document.getElementById("bg-symbols");
  if (!container) return;
  const symbols = ["</>", "{}", "[]", "<!>", "#", "/* */"];
  const count = 50;
  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");
    span.className = "bg-symbol";
    span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    span.style.left = Math.random() * 100 + "vw";
    span.style.top = Math.random() * 100 + "vh";
    span.style.fontSize = 16 + Math.random() * 20 + "px";
    span.style.animationDuration = 8 + Math.random() * 5 + "s";
    container.appendChild(span);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", createBgSymbols);
} else {
  createBgSymbols();
}

document.addEventListener("DOMContentLoaded", function() {
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  const inner = carouselWrapper.querySelector('.carousel-container');
  const items = inner.querySelectorAll('.carousel-slide');
  const dotsContainer = carouselWrapper.querySelector('.carousel-dots');
  
  let currentIndex = 0;
  const visibleSlides = 2; 
  const dotCount = Math.ceil(items.length / visibleSlides);

  function createDots() {
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', function() {
        showPage(i);
      });
      dotsContainer.appendChild(dot);
      console.log('Dot criado', dot);
    }
    console.log('Total de dots:', dotsContainer.children.length);
  }

  function updateDots(pageIndex) {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === pageIndex);
    });
  }

  function showPage(pageIndex) {
    currentIndex = pageIndex * visibleSlides;
    items.forEach((item, i) => {
      if (i >= currentIndex && i < currentIndex + visibleSlides) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
    inner.style.transform = `translateX(-${pageIndex * 100}%)`;
    updateDots(pageIndex);
  }

  const prevBtn = carouselWrapper.querySelector(".carousel-control.prev");
  const nextBtn = carouselWrapper.querySelector(".carousel-control.next");

  if (prevBtn) {
    prevBtn.addEventListener("click", function() {
      let pageIndex = Math.floor(currentIndex / visibleSlides) - 1;
      if (pageIndex < 0) {
        pageIndex = dotCount - 1;
      }
      showPage(pageIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function() {
      let pageIndex = Math.floor(currentIndex / visibleSlides) + 1;
      if (pageIndex >= dotCount) {
        pageIndex = 0;
      }
      showPage(pageIndex);
    });
  }

  createDots();

  let autoSlide = setInterval(() => {
    let pageIndex = Math.floor(currentIndex / visibleSlides) + 1;
    if (pageIndex >= dotCount) {
      pageIndex = 0;
    }
    showPage(pageIndex);
  }, 5000);

  if (prevBtn) {
    prevBtn.addEventListener("click", function() {
      clearInterval(autoSlide);
      autoSlide = setInterval(() => {
        let pageIndex = Math.floor(currentIndex / visibleSlides) + 1;
        if (pageIndex >= dotCount) {
          pageIndex = 0;
        }
        showPage(pageIndex);
      }, 5000);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function() {
      clearInterval(autoSlide);
      autoSlide = setInterval(() => {
        let pageIndex = Math.floor(currentIndex / visibleSlides) + 1;
        if (pageIndex >= dotCount) {
          pageIndex = 0;
        }
        showPage(pageIndex);
      }, 5000);
    });
  }
});


document.addEventListener("DOMContentLoaded", function() {
  const carouselWrapper = document.querySelector('.project-carousel');
  if (!carouselWrapper) return;
  
  const inner = carouselWrapper.querySelector('.carousel-inner');
  if (!inner) return; 
  const items = inner.querySelectorAll('.carousel-item');
  
  let currentIndex = 0;
  
  function showSlide(index) {
    if (index < 0) {
      currentIndex = items.length - 1;
    } else if (index >= items.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    
    items.forEach((item, i) => {
      item.classList.toggle("active", i === currentIndex);
    });
    
    inner.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
  
  const prevBtn = carouselWrapper.querySelector('.carousel-control.prev');
  const nextBtn = carouselWrapper.querySelector('.carousel-control.next');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      showSlide(currentIndex - 1);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      showSlide(currentIndex + 1);
    });
  }
  
  let autoSlide = setInterval(() => {
    showSlide(currentIndex + 1);
  }, 5000);
  
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      clearInterval(autoSlide);
      autoSlide = setInterval(() => { showSlide(currentIndex + 1); }, 5000);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      clearInterval(autoSlide);
      autoSlide = setInterval(() => { showSlide(currentIndex + 1); }, 5000);
    });
  }
});
