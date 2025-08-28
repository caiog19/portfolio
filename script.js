"use strict";

/* =========================
   Helpers
   ========================= */
const $ = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => Array.from(scope.querySelectorAll(sel));
const on = (el, evt, cb, opts) => el && el.addEventListener(evt, cb, opts);

/* =========================
   1) Scroll progress + back to top
   ========================= */
class ScrollUI {
  constructor({
    timelineFillSel = "#timeline-fill",
    backToTopSel = "#back-to-top",
  } = {}) {
    this.timelineFill = $(timelineFillSel);
    this.backToTop = $(backToTopSel);
    on(window, "scroll", () => this.onScroll());
    on(this.backToTop, "click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
    this.onScroll();
  }
  onScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPercent = (docHeight > 0 ? scrollTop / docHeight : 0) * 100;
    if (this.timelineFill) this.timelineFill.style.height = `${scrollPercent}%`;
    if (this.backToTop)
      this.backToTop.style.display = scrollTop > 100 ? "block" : "none";
  }
}

/* =========================
   2) I18n 
   ========================= */
class I18n {
  constructor({
    toggleSel = "#language-toggle",
    texts,
    defaultLang = "pt-BR",
  }) {
    this.toggle = $(toggleSel);
    this.texts = texts || {};
    this.lang = localStorage.getItem("language") || defaultLang;

    on(this.toggle, "click", () => this.toggleLang());
    this.update();
  }

  t(id) {
    const dict = this.texts[id];
    if (!dict) return "";
    return dict[this.lang] ?? dict["pt-BR"] ?? "";
  }

  update() {
    Object.keys(this.texts).forEach((id) => {
      const el = document.getElementById(id);
      if (
        el &&
        !id.startsWith("placeholder-") &&
        !id.startsWith("form-status")
      ) {
        el.textContent = this.t(id);
      }
    });

    const phMap = ["name", "email", "subject", "message"];
    phMap.forEach((base) => {
      const el = document.getElementById(base);
      const key = `placeholder-${base}`;
      if (el && this.texts[key]) el.placeholder = this.t(key);
    });

    if (this.toggle)
      this.toggle.textContent = this.lang === "pt-BR" ? "EN" : "PT";
  }

  toggleLang() {
    this.lang = this.lang === "pt-BR" ? "en" : "pt-BR";
    localStorage.setItem("language", this.lang);
    this.update();
  }
}

/* =========================
   3) Smooth anchors
   ========================= */
class SmoothAnchors {
  constructor(selector = 'a[href^="#"]') {
    $$(selector).forEach((a) =>
      on(a, "click", (e) => {
        const target = $(a.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      })
    );
  }
}

/* =========================
   4) Menu hamburguer
   ========================= */
class Menu {
  constructor({ buttonSel = ".hamburger-menu", menuSel = ".nav-menu" } = {}) {
    this.btn = $(buttonSel);
    this.menu = $(menuSel);
    on(this.btn, "click", (e) => {
      e.stopPropagation();
      this.toggle();
    });
    $$(".nav-menu a").forEach((link) => on(link, "click", () => this.close()));
    on(document, "click", (e) => this.onClickOutside(e));
  }
  toggle() {
    this.menu?.classList.toggle("active");
  }
  close() {
    this.menu?.classList.remove("active");
  }
  onClickOutside(e) {
    if (!this.menu?.classList.contains("active")) return;
    const clickInsideMenu = this.menu.contains(e.target);
    const clickBtn = this.btn?.contains(e.target);
    if (!clickInsideMenu && !clickBtn) this.close();
  }
}

/* =========================
   5) Background symbols
   ========================= */
class BgSymbols {
  constructor({
    containerSel = "#bg-symbols",
    count = 50,
    symbols = ["</>", "{}", "[]", "<!>", "#", "/* */"],
  } = {}) {
    this.container = $(containerSel);
    this.count = count;
    this.symbols = symbols;
    if (this.container) this.render();
  }
  render() {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < this.count; i++) {
      const span = document.createElement("span");
      span.className = "bg-symbol";
      span.textContent = this.pick(this.symbols);
      span.style.left = Math.random() * 100 + "vw";
      span.style.top = Math.random() * 100 + "vh";
      span.style.fontSize = 16 + Math.random() * 20 + "px";
      span.style.animationDuration = 8 + Math.random() * 5 + "s";
      frag.appendChild(span);
    }
    this.container.appendChild(frag);
  }
  pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

/* =========================
   6) Home carousel 
   ========================= */
class HomeCarousel {
  constructor(wrapperSel = ".projects-carousel .carousel-wrapper") {
    this.wrapper = $(wrapperSel);
    if (!this.wrapper) return;

    this.inner = $(".carousel-container", this.wrapper);
    this.items = $$(".carousel-slide", this.inner);
    this.dotsContainer = $(".carousel-dots", this.wrapper);
    this.prevBtn = $(".carousel-control.prev", this.wrapper);
    this.nextBtn = $(".carousel-control.next", this.wrapper);

    this.isMobile = window.innerWidth <= 768;
    this.visible = this.isMobile ? 1 : 2;
    this.pageCount = Math.ceil(this.items.length / this.visible);
    this.currentIndex = 0;
    this.autoTimer = null;

    this.setup();
  }

  setup() {
    this.createDots();
    this.bindControls();
    this.showPage(0);
    this.startAuto();
    this.bindSwipe();
  }

  createDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = "";
    for (let i = 0; i < this.pageCount; i++) {
      const dot = document.createElement("div");
      dot.className = "dot" + (i === 0 ? " active" : "");
      on(dot, "click", () => this.showPage(i));
      this.dotsContainer.appendChild(dot);
    }
  }

  updateDots(page) {
    if (!this.dotsContainer) return;
    $$(".dot", this.dotsContainer).forEach((d, i) =>
      d.classList.toggle("active", i === page)
    );
  }

  showPage(page) {
    this.currentIndex = page * this.visible;
    this.items.forEach((item, i) =>
      item.classList.toggle(
        "active",
        i >= this.currentIndex && i < this.currentIndex + this.visible
      )
    );
    if (this.inner) this.inner.style.transform = `translateX(-${page * 100}%)`;
    this.updateDots(page);
  }

  nextPage() {
    const next =
      (Math.floor(this.currentIndex / this.visible) + 1) % this.pageCount;
    this.showPage(next);
  }
  prevPage() {
    let prev = Math.floor(this.currentIndex / this.visible) - 1;
    if (prev < 0) prev = this.pageCount - 1;
    this.showPage(prev);
  }

  bindControls() {
    if (!this.isMobile) {
      on(this.prevBtn, "click", () => {
        this.prevPage();
        this.restartAuto();
      });
      on(this.nextBtn, "click", () => {
        this.nextPage();
        this.restartAuto();
      });
    } else {
      this.prevBtn?.remove();
      this.nextBtn?.remove();
    }
  }

  bindSwipe() {
    if (!this.inner) return;
    let startX = 0;
    on(
      this.inner,
      "touchstart",
      (e) => {
        startX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );
    on(
      this.inner,
      "touchend",
      (e) => {
        const dx = e.changedTouches[0].screenX - startX;
        if (dx < -50) this.nextPage();
        else if (dx > 50) this.prevPage();
        this.restartAuto();
      },
      { passive: true }
    );
  }

  startAuto() {
    this.autoTimer = setInterval(() => this.nextPage(), 5000);
  }
  restartAuto() {
    clearInterval(this.autoTimer);
    this.startAuto();
  }
}

/* =========================
   7) Project page carousel 
   ========================= */
class ProjectCarousel {
  constructor(wrapperSel = ".project-carousel") {
    this.wrapper = $(wrapperSel);
    if (!this.wrapper) return;
    this.inner = $(".carousel-inner", this.wrapper);
    this.items = $$(".carousel-item", this.inner);
    this.prevBtn = $(".carousel-control.prev", this.wrapper);
    this.nextBtn = $(".carousel-control.next", this.wrapper);
    this.index = 0;
    this.timer = null;

    this.bind();
    this.show(this.index);
    this.startAuto();
  }

  show(i) {
    if (!this.items.length) return;
    if (i < 0) this.index = this.items.length - 1;
    else if (i >= this.items.length) this.index = 0;
    else this.index = i;

    this.items.forEach((el, idx) =>
      el.classList.toggle("active", idx === this.index)
    );
    if (this.inner)
      this.inner.style.transform = `translateX(-${this.index * 100}%)`;
  }

  next() {
    this.show(this.index + 1);
  }
  prev() {
    this.show(this.index - 1);
  }

  bind() {
    on(this.prevBtn, "click", () => {
      this.prev();
      this.restartAuto();
    });
    on(this.nextBtn, "click", () => {
      this.next();
      this.restartAuto();
    });
  }

  startAuto() {
    this.timer = setInterval(() => this.next(), 5000);
  }
  restartAuto() {
    clearInterval(this.timer);
    this.startAuto();
  }
}

/* =========================
   8) Email (EmailJS) + form
   ========================= */
class EmailService {
  constructor(publicKey) {
    this.enabled = typeof window.emailjs !== "undefined";
    if (this.enabled && publicKey) emailjs.init(publicKey);
  }
  send(serviceId, templateId, data) {
    if (!this.enabled) return Promise.reject(new Error("EmailJS indisponível"));
    return emailjs.send(serviceId, templateId, data);
  }
}

class ContactForm {
  constructor({
    formSel = "#contact-form",
    statusSel = "#form-status",
    emailService,
    i18n,
  }) {
    this.form = $(formSel);
    this.status = $(statusSel);
    this.email = emailService;
    this.i18n = i18n;

    if (this.form) on(this.form, "submit", (e) => this.onSubmit(e));
  }

  setStatus(type) {
    if (!this.status) return;
    const ok = type === "success";
    this.status.style.color = ok ? "green" : "red";
    this.status.textContent =
      this.i18n?.t(ok ? "form-status-success" : "form-status-error") || "";
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.email) return;

    const formData = {
      name: $("#name")?.value || "",
      email: $("#email")?.value || "",
      subject: $("#subject")?.value || "",
      message: $("#message")?.value || "",
    };

    this.email
      .send("service_vgb1h7i", "template_agci0zr", formData)
      .then(() => {
        this.setStatus("success");
        this.form.reset();
      })
      .catch(() => this.setStatus("error"));
  }
}

/* =========================
   Nav Active 
   ========================= */
class NavActive {
  constructor({
    sections = ["home", "about", "projects-carousel", "contact"],
    activeClass = "active",
  } = {}) {
    this.activeClass = activeClass;
    this.linkBySectionId = {
      home: $("#nav-home"),
      about: $("#nav-about"),
      "projects-carousel": $("#nav-projects"),
      contact: $("#nav-contact"),
    };

    const hasAnySection = sections.some((id) => document.getElementById(id));
    if (!hasAnySection) {
      this.setActive(this.linkBySectionId["projects-carousel"]);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const link = this.linkBySectionId[entry.target.id];
            this.setActive(link);
          }
        });
      },
      {
        rootMargin: "-40% 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    ["#nav-home", "#nav-about", "#nav-projects", "#nav-contact"].forEach(
      (sel) => {
        const el = $(sel);
        on(el, "click", () => this.setActive(el));
      }
    );

    const hash = (location.hash || "").replace("#", "");
    if (hash && this.linkBySectionId[hash]) {
      this.setActive(this.linkBySectionId[hash]);
    } else if (!hash) {
      this.setActive(this.linkBySectionId["home"]);
    }
  }

  setActive(linkEl) {
    if (!linkEl) return;
    $$(".nav-menu a").forEach((a) => a.classList.remove(this.activeClass));
    linkEl.classList.add(this.activeClass);
  }
}

/* =========================
   9) App initialization
   ========================= */
class App {
  constructor() {
    new ScrollUI();

    this.i18n = new I18n({
      toggleSel: "#language-toggle",
      texts: App.textsToTranslate,
      defaultLang: "pt-BR",
    });

    new SmoothAnchors();
    new Menu();
    new BgSymbols();

    new HomeCarousel();
    new ProjectCarousel();
    new NavActive();

    const email = new EmailService("K2tkb-9FAioyrKLsx");
    new ContactForm({ emailService: email, i18n: this.i18n });
  }

  static textsToTranslate = {
    "hello-text": { "pt-BR": "Olá", en: "Hello" },
    "i-am-text": { "pt-BR": "Eu sou", en: "I'm" },
    "name-text": { "pt-BR": "Caio", en: "Caio" },
    "role-text": {
      "pt-BR": "Desenvolvedor FullStack",
      en: "Software Developer",
    },
    "btn-project-text": { "pt-BR": "Tem um projeto?", en: "Got a project?" },
    "btn-resume-text": { "pt-BR": "Meu currículo", en: "My resume" },
    "about-title": { "pt-BR": "Sobre mim", en: "About me" },
    "stat-projects-text": {
      "pt-BR": "Projetos Concluídos",
      en: "Completed Projects",
    },
    "about-description": {
      "pt-BR":
        "Logo após ingressar na UFRJ, encontrei na Empresa Júnior EJCM um ambiente inspirador para iniciar minha trajetória como desenvolvedor front-end. Foi nesse espaço que aprendi a programar e comecei a desenvolver meus primeiros websites, despertando minha paixão pelo desenvolvimento e pela inovação digital. Posteriormente, migrei de curso para Ciência da Computação, reafirmando meu compromisso com o universo da tecnologia. Durante minha jornada acadêmica, tive a oportunidade de integrar um projeto de extensão no time de tecnologia, experiência que ampliou meus conhecimentos e fortaleceu minha prática profissional, motivando-me a me tornar um desenvolvedor fullstack. Além disso, desenvolvi projetos pessoais relevantes que ilustram minha evolução e criatividade - trabalhos que você poderá conferir nas próximas seções.",
      en: "Shortly after enrolling at UFRJ, I joined the Junior Enterprise EJCM at the university, which offered an inspiring environment to kick-start my journey as a front-end developer. It was there that I learned how to program and began developing my first websites, igniting my passion for digital innovation and development. Later, I switched my major to Computer Science, reaffirming my commitment to the technology field. During my academic journey, I had the opportunity to participate in an extension project with the technology team—a valuable experience that broadened my knowledge and strengthened my practical skills, motivating me to become a fullstack developer. Additionally, I developed several personal projects that showcase my growth and creativity, projects that you will have the chance to explore in the upcoming sections.",
    },
    "stat-clients-text": {
      "pt-BR": "Satisfação de Clientes",
      en: "Client Satisfaction",
    },
    "stat-years-text": {
      "pt-BR": "Anos de Experiência",
      en: "Years of Experience",
    },
    "projects-title": { "pt-BR": "Projetos", en: "Projects" },
    "contact-title": { "pt-BR": "Contato", en: "Contact" },
    "contact-instructions": {
      "pt-BR": "Se você tem alguma proposta...",
      en: "If you have any proposal...",
    },
    "project-text": {
      "pt-BR": "Alguns projetos que criei ou participei...",
      en: "If you have any proposal...",
    },
    "label-name": { "pt-BR": "Nome", en: "Name" },
    "label-email": { "pt-BR": "E-mail", en: "Email" },
    "label-subject": { "pt-BR": "Assunto", en: "Subject" },
    "label-message": { "pt-BR": "Mensagem", en: "Message" },
    "send-button": { "pt-BR": "Envie sua mensagem", en: "Send your message" },
    "form-status-success": {
      "pt-BR": "Mensagem enviada com sucesso!",
      en: "Message sent successfully!",
    },
    "form-status-error": {
      "pt-BR": "Ocorreu um erro...",
      en: "An error occurred...",
    },
    "footer-text": {
      "pt-BR": "© 2025 Caio Gullo. Todos os direitos reservados.",
      en: "© 2025 Caio Gullo. All rights reserved.",
    },
    "placeholder-name": { "pt-BR": "Seu nome", en: "Your name" },
    "placeholder-email": { "pt-BR": "Seu e-mail", en: "Your email" },
    "placeholder-subject": { "pt-BR": "Assunto", en: "Subject" },
    "placeholder-message": { "pt-BR": "Sua mensagem", en: "Your message" },
    "nav-home": { "pt-BR": "Início", en: "Home" },
    "nav-about": { "pt-BR": "Sobre", en: "About" },
    "nav-projects": { "pt-BR": "Projetos", en: "Projects" },
    "nav-contact": { "pt-BR": "Contato", en: "Contact" },
    "project-prev": { "pt-BR": "Projeto Anterior", en: "Previous Project" },
    "project-back": { "pt-BR": "Voltar para Projetos", en: "Back to Projects" },
    "project-next": { "pt-BR": "Próximo Projeto", en: "Next Project" },
    "project-technologies-title": {
      "pt-BR": "Tecnologias Utilizadas",
      en: "Technologies Used",
    },
    "project-disney-title": {
      "pt-BR": "Dashboard Interativo Disney+",
      en: "Interactive Dashboard Disney+",
    },
    "project-disney-description": {
      "pt-BR":
        "Projeto de dashboard interativo para o Disney+ desenvolvido utilizando Streamlit, que permite a visualização dinâmica de dados e insights sobre o serviço.",
      en: "Interactive dashboard project for Disney+ developed using Streamlit, which allows dynamic visualization of data and insights about the service.",
    },
    "project-spotify-title": {
      "pt-BR": "Dashboard Interativo Spotify",
      en: "Interactive Dashboard Spotify",
    },
    "project-spotify-description": {
      "pt-BR":
        "Projeto de dashboard interativo para o Spotify desenvolvido com Streamlit, que exibe estatísticas e insights relevantes sobre a plataforma.",
      en: "Interactive dashboard project for Spotify developed with Streamlit, displaying relevant statistics and insights about the platform.",
    },
    "project-navegadev-title": { "pt-BR": "Navega dev", en: "Navega dev" },
    "project-navegadev-description": {
      "pt-BR":
        "Este projeto foi desenvolvido com foco na robustez e segurança do backend. Para isso, escolhi o Ruby on Rails...",
      en: "This project was developed with a focus on backend robustness and security. To achieve this, I chose Ruby on Rails...",
    },
    "project-dev-title": {
      "pt-BR": "DevConnected (Em Construção)",
      en: "DevConnected (Under Construction)",
    },
    "project-dev-description": {
      "pt-BR":
        "Projeto em desenvolvimento utilizando Next.js, Tailwind, Nest.js, PostgreSQL e Prisma...",
      en: "Project under development using Next.js, Tailwind, Nest.js, PostgreSQL, and Prisma...",
    },
    "project-port-title": { "pt-BR": "Meu Portfólio", en: "My Portfolio" },
    "project-port-description": {
      "pt-BR":
        "Projeto do meu portfólio pessoal desenvolvido com HTML, CSS e JavaScript...",
      en: "My personal portfolio project developed with HTML, CSS, and JavaScript...",
    },
    "project-ecofoto-title": { "pt-BR": "Ecofoto", en: "Ecofoto" },
    "project-ecofoto-description": {
      "pt-BR":
        "Projeto de extensão universitária sobre fotografia contemporânea...",
      en: "University extension project on contemporary photography...",
    },
  };
}

document.addEventListener("DOMContentLoaded", () => new App());
