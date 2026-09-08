/**
 * Navio Homero — interações acessíveis
 * - Menu mobile com aria-expanded, fecho por Esc e por clique fora
 * - Foco movido para o título da seção ao navegar (útil para leitores de tela)
 * - Marcação do link ativo conforme a rolagem (aria-current)
 * - Validação de formulário com mensagens de erro específicas e feedback
 *   de carregamento/confirmação em região aria-live
 */

document.addEventListener("DOMContentLoaded", () => {
  setupMobileNav();
  setupSectionFocus();
  setupActiveLinkTracking();
  setupContactForm();
});

/* ---------------------------------------------------------------------
 * Menu mobile
 * ------------------------------------------------------------------- */
function setupMobileNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("menuPrincipal");
  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  // Fecha o menu ao ativar um link (mobile)
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 780px)").matches) closeMenu();
    });
  });

  // Fecha com Esc e devolve o foco ao botão
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      toggle.focus();
    }
  });

  // Fecha ao clicar fora do menu (mobile)
  document.addEventListener("click", (event) => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (!isOpen) return;
    if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });
}

/* ---------------------------------------------------------------------
 * Move o foco para o título da seção ao clicar em um link do menu.
 * Ajuda pessoas que navegam por teclado ou leitor de tela a saberem
 * onde estão depois do salto — sem quebrar a rolagem nativa da âncora.
 * ------------------------------------------------------------------- */
function setupSectionFocus() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      // pequeno atraso para não competir com a rolagem suave
      window.setTimeout(() => {
        if (!target.hasAttribute("tabindex")) {
          target.setAttribute("tabindex", "-1");
        }
        target.focus({ preventScroll: true });
      }, 400);
    });
  });
}

/* ---------------------------------------------------------------------
 * Destaca o link do menu correspondente à seção visível (aria-current)
 * ------------------------------------------------------------------- */
function setupActiveLinkTracking() {
  const sections = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll('.main-nav a[href^="#"]');
  if (!sections.length || !links.length || !("IntersectionObserver" in window)) return;

  const linkFor = (id) =>
    [...links].find((link) => link.getAttribute("href") === `#${id}`);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = linkFor(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach((l) => l.removeAttribute("aria-current"));
          link.setAttribute("aria-current", "true");
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------------------------------
 * Formulário de contato — validação acessível
 * ------------------------------------------------------------------- */
function setupContactForm() {
  const form = document.getElementById("formContato");
  if (!form) return;

  const statusEl = document.getElementById("statusFormulario");
  const btn = document.getElementById("btnEnviar");
  const btnLabel = btn.querySelector(".btn-label");

  const fields = {
    nome: {
      input: document.getElementById("nome"),
      error: document.getElementById("erro-nome"),
      validate: (value) =>
        value.trim().length >= 3 ? "" : "Informe seu nome completo (mínimo 3 letras).",
    },
    email: {
      input: document.getElementById("email"),
      error: document.getElementById("erro-email"),
      validate: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
          ? ""
          : "Informe um e-mail válido, no formato nome@dominio.com.",
    },
    mensagem: {
      input: document.getElementById("mensagem"),
      error: document.getElementById("erro-mensagem"),
      validate: (value) =>
        value.trim().length >= 10 ? "" : "Escreva uma mensagem com pelo menos 10 caracteres.",
    },
  };

  function showFieldError(field, message) {
    const wrapper = field.input.closest(".form-field");
    if (message) {
      field.error.textContent = message;
      field.error.hidden = false;
      field.input.setAttribute("aria-invalid", "true");
      wrapper.classList.add("has-error");
    } else {
      field.error.textContent = "";
      field.error.hidden = true;
      field.input.removeAttribute("aria-invalid");
      wrapper.classList.remove("has-error");
    }
  }

  // Validação ao sair do campo (feedback imediato, sem esperar o envio)
  Object.values(fields).forEach((field) => {
    field.input.addEventListener("blur", () => {
      showFieldError(field, field.validate(field.input.value));
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let firstInvalid = null;
    let hasError = false;

    Object.values(fields).forEach((field) => {
      const message = field.validate(field.input.value);
      showFieldError(field, message);
      if (message && !firstInvalid) firstInvalid = field.input;
      if (message) hasError = true;
    });

    if (hasError) {
      statusEl.textContent = "Corrija os campos destacados antes de enviar.";
      statusEl.className = "form-status error";
      firstInvalid.focus();
      return;
    }

    // Estado de carregamento visível e anunciado
    btn.disabled = true;
    btnLabel.textContent = "Enviando…";
    statusEl.textContent = "Enviando sua mensagem…";
    statusEl.className = "form-status";

    // Simulação de envio (sem backend neste projeto inicial)
    window.setTimeout(() => {
      btn.disabled = false;
      btnLabel.textContent = "Enviar mensagem";
      statusEl.textContent =
        "Mensagem enviada! Nossa equipe entrará em contato em breve.";
      statusEl.className = "form-status success";
      form.reset();
      Object.values(fields).forEach((field) => showFieldError(field, ""));
    }, 900);
  });
}
