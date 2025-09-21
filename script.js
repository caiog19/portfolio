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
  constructor(
    wrapperSel = ".project-carousel",
    { orientation = "horizontal" } = {}
  ) {
    this.wrapper = $(wrapperSel);
    if (!this.wrapper) return;

    this.inner = $(".carousel-inner", this.wrapper);
    this.items = $$(".carousel-item", this.inner);
    this.prevBtn = $(".carousel-control.prev", this.wrapper);
    this.nextBtn = $(".carousel-control.next", this.wrapper);
    this.index = 0;
    this.timer = null;

    this.vertical = orientation === "vertical";

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

    if (this.inner) {
      const t = this.index * 100;
      this.inner.style.transform = this.vertical
        ? `translateY(-${t}%)`
        : `translateX(-${t}%)`;
    }
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
  constructor(translations) {
    this.i18n = new I18n({
      toggleSel: "#language-toggle",
      texts: translations,
      defaultLang: "pt-BR",
    });

    this.initStaticComponents();

    const hasHome = !!document.querySelector(
      ".projects-carousel .carousel-container"
    );
    const hasProject = !!document.querySelector(".project-detail-wrapper");

    if (hasHome) this.loadHomepageProjects();
    if (hasProject) this.loadProjectDetails();
  }

  initStaticComponents() {
    this.scrollUI = new ScrollUI();
    new SmoothAnchors();
    new Menu();
    new BgSymbols();
    new NavActive();

    const email = new EmailService("K2tkb-9FAioyrKLsx");
    new ContactForm({ emailService: email, i18n: this.i18n });
  }

  // === HOME ===
  async loadHomepageProjects() {
    try {
      const response = await fetch("projects.json", { cache: "no-store" });
      const data = await response.json();

      const wrapper = $(".projects-carousel .carousel-wrapper");
      const container = $(".projects-carousel .carousel-container");
      const dotsContainer = $(".projects-carousel .carousel-dots");

      if (!wrapper || !container || !dotsContainer) {
        console.warn("[HOME] Estrutura do carrossel não encontrada.");
        return;
      }

      const lang = this.i18n.lang;
      const slidesHTML = data.projects
        .map((project) => {
          const projectTitle =
            project.title[lang] || project.title["pt-BR"] || "";
          const techTitle =
            this.i18n.t("project-technologies-title") || "Tecnologias";
          return `
          <div class="carousel-slide">
            <img src="${project.thumbnail}" alt="${
            this.i18n.t("projects-title") || "Projetos"
          } ${projectTitle}" />
            <div class="info-overlay">
              <h3>${projectTitle}</h3>
              <p>${techTitle}: ${project.technologies.join(", ")}</p>
              <a href="project.html?id=${
                project.id
              }" class="btn more-info">More Info</a>
            </div>
          </div>
        `;
        })
        .join("");

      container.innerHTML = slidesHTML;
      dotsContainer.innerHTML = "";
      new HomeCarousel();

      this.i18n.update?.();
      this.scrollUI?.onScroll?.();
    } catch (error) {
      console.error("Erro ao carregar projetos da HOME:", error);
    }
  }

  // === PÁGINA DE PROJETO ===
  async loadProjectDetails() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const projectId = urlParams.get("id");
      if (!projectId) return;

      const response = await fetch("projects.json");
      const data = await response.json();

      const projectIndex = data.projects.findIndex((p) => p.id === projectId);
      if (projectIndex === -1) return;

      const project = data.projects[projectIndex];
      const totalProjects = data.projects.length;
      const prevProject =
        data.projects[(projectIndex - 1 + totalProjects) % totalProjects];
      const nextProject = data.projects[(projectIndex + 1) % totalProjects];
      const lang = this.i18n.lang;

      const projectTitle = project.title[lang] || project.title["pt-BR"];
      const projectDescription =
        project.description[lang] || project.description["pt-BR"];

      document.title = `${projectTitle} - Caio Gullo`;

      const wrapper = $(".project-detail-wrapper");
      if (!wrapper) return;

      const isIxplanabus = project.id === "ixplanabus";

      wrapper.innerHTML = `
        <section class="project-detail">
          <div class="container">
            <h1>${projectTitle}</h1>
            <p class="project-description">${projectDescription}</p>

            <div class="project-technologies">
              <h3 id="project-technologies-title"></h3>
              <ul>
                ${project.technologies
                  .map((tech) => `<li>${tech}</li>`)
                  .join("")}
              </ul>
            </div>

            <div class="project-carousel ${isIxplanabus ? "is-vertical" : ""}">
              <button class="carousel-control prev" aria-label="Anterior">
                <i class="fas fa-chevron-left"></i>
              </button>
              <div class="carousel-inner">
                ${project.images
                  .map(
                    (img) => `
                  <div class="carousel-item">
                    <img src="${img}" alt="${projectTitle}">
                  </div>
                `
                  )
                  .join("")}
              </div>

            <button class="carousel-control next" aria-label="Próximo">
              <i class="fas fa-chevron-right"></i>
            </button>
            </div>

            <div class="project-navigation">
              <a href="project.html?id=${
                prevProject.id
              }" class="btn project-nav-btn" id="project-prev"></a>
              <a href="index.html#projects-carousel" class="btn project-nav-btn" id="project-back"></a>
              <a href="project.html?id=${
                nextProject.id
              }" class="btn project-nav-btn" id="project-next"></a>
            </div>
          </div>
        </section>
      `;

      new ProjectCarousel(".project-carousel", {
        orientation: "horizontal" 
      });

      this.i18n.update();
      this.scrollUI.onScroll();
    } catch (error) {
      console.error("Erro ao carregar detalhes do projeto:", error);
    }
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("translations.json");
    const translations = await response.json();
    new App(translations);
  } catch (error) {
    console.error("Falha ao carregar as traduções:", error);
    new App({});
  }
});
