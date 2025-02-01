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
  'placeholder-message': { 'pt-BR': 'Sua mensagem', en: 'Your message' }
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
  const carousel = document.querySelector(".project-carousel");
  const inner = carousel.querySelector(".carousel-inner");
  const items = carousel.querySelectorAll(".carousel-item");
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

  carousel.querySelector(".carousel-control.prev").addEventListener("click", function() {
    showSlide(currentIndex - 1);
  });
  carousel.querySelector(".carousel-control.next").addEventListener("click", function() {
    showSlide(currentIndex + 1);
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const carouselContainer = document.querySelector('.carousel-container');
  const slides = document.querySelectorAll('.carousel-slide');
  const totalSlides = slides.length;
  const visibleSlides = 2; 
  let currentIndex = 0;
  const intervalTime = 5000; 
  
  function updateCarousel() {
    const slideWidthPercent = 100 / visibleSlides;
    carouselContainer.style.transform = 'translateX(-' + (currentIndex * slideWidthPercent) + '%)';
  }
  
  function nextSlide() {
    if (currentIndex < totalSlides - visibleSlides) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  }
  
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = totalSlides - visibleSlides;
    }
    updateCarousel();
  }
  
  let autoSlide = setInterval(nextSlide, intervalTime);
  
  document.querySelector('.carousel-control.next').addEventListener('click', function() {
    clearInterval(autoSlide);
    nextSlide();
    autoSlide = setInterval(nextSlide, intervalTime);
  });
  
  document.querySelector('.carousel-control.prev').addEventListener('click', function() {
    clearInterval(autoSlide);
    prevSlide();
    autoSlide = setInterval(nextSlide, intervalTime);
  });
});


