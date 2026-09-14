/**
 * Navio Homero — interações acessíveis
 * - Menu mobile com aria-expanded, fecho por Esc e por clique fora
 * - Submenus de segundo nível (máx. 2 níveis de profundidade)
 * - Trilha de navegação (breadcrumb) dinâmica
 * - Foco movido para o alvo ao navegar (útil para leitores de tela)
 * - Marcação do link ativo conforme a rolagem (aria-current)
 * - Validação de formulário com mensagens de erro específicas e feedback
 *   de carregamento/confirmação em região aria-live
 */

/** Mapa de navegação: seção principal → rótulo e subseções */
const NAV_MAP = {
  inicio: { label: "Início", parent: null },
  "o-navio": {
    label: "O Navio",
    parent: null,
    children: {
      "o-navio-conves-principal": "Convés Principal",
      "o-navio-conves-superior": "Convés Superior",
      "o-navio-conves-flybridge": "Convés Flybridge",
      "o-navio-acessibilidade": "Acessibilidade",
    },
  },
  roteiros: {
    label: "Roteiros",
    parent: null,
    children: {
      "roteiro-descobrindo": "Descobrindo o Rio Tietê",
      "roteiro-sao-manuel": "Barra Bonita – São Manuel",
    },
  },
  gastronomia: {
    label: "Gastronomia",
    parent: null,
    children: {
      "menu-principal": "Prato principal",
      "menu-entradas": "Entradas e petiscos",
      "menu-bebidas": "Bebidas e adega",
      "menu-infantil": "Menu infantil",
    },
  },
  contato: {
    label: "Contato",
    parent: null,
    children: {
      "contato-info": "Informações",
      "contato-formulario": "Formulário",
    },
  },
};

/** Resolve id → { sectionId, sectionLabel, subLabel } */
function resolveNavTarget(id) {
  if (id === "inicio") {
    return { sectionId: "inicio", sectionLabel: "Início", subLabel: null };
  }

  for (const [sectionId, section] of Object.entries(NAV_MAP)) {
    if (sectionId === id) {
      return { sectionId, sectionLabel: section.label, subLabel: null };
    }
    if (section.children && section.children[id]) {
      return {
        sectionId,
        sectionLabel: section.label,
        subLabel: section.children[id],
      };
    }
  }

  return { sectionId: "inicio", sectionLabel: "Início", subLabel: null };
}

document.addEventListener("DOMContentLoaded", () => {
  setupMobileNav();
  setupSubmenuToggles();
  setupSectionFocus();
  setupActiveLinkTracking();
  setupBreadcrumb();
  setupContactForm();
  handleInitialHash();
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

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 780px)").matches) closeMenu();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (!isOpen) return;
    if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });
}

/* ---------------------------------------------------------------------
 * Submenus de segundo nível (mobile: botão expande; desktop: hover/focus)
 * ------------------------------------------------------------------- */
function setupSubmenuToggles() {
  document.querySelectorAll(".submenu-toggle").forEach((btn) => {
    const parentLi = btn.closest(".nav-item-has-children");
    if (!parentLi) return;

    btn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const isExpanded = btn.getAttribute("aria-expanded") === "true";
      const nextState = !isExpanded;

      // Fecha outros submenus abertos no mobile
      if (nextState && window.matchMedia("(max-width: 780px)").matches) {
        document.querySelectorAll(".nav-item-has-children.is-submenu-open").forEach((item) => {
          if (item !== parentLi) {
            item.classList.remove("is-submenu-open");
            const otherBtn = item.querySelector(".submenu-toggle");
            if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
          }
        });
      }

      btn.setAttribute("aria-expanded", String(nextState));
      parentLi.classList.toggle("is-submenu-open", nextState);
    });
  });
}

/* ---------------------------------------------------------------------
 * Move o foco para o alvo ao clicar em um link interno.
 * Abre acordeões de gastronomia quando necessário.
 * ------------------------------------------------------------------- */
function setupSectionFocus() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.getAttribute("href").slice(1);
      if (!id) return;

      openMenuAccordionIfNeeded(id);

      window.setTimeout(() => {
        const target = document.getElementById(id);
        if (!target) return;
        if (!target.hasAttribute("tabindex")) {
          target.setAttribute("tabindex", "-1");
        }
        target.focus({ preventScroll: true });
      }, 400);
    });
  });
}

function openMenuAccordionIfNeeded(id) {
  const menuItem = document.getElementById(id);
  if (!menuItem || menuItem.tagName !== "DETAILS") return;

  menuItem.open = true;
  document.querySelectorAll(".menu-item[open]").forEach((item) => {
    if (item !== menuItem) item.open = false;
  });
}

function handleInitialHash() {
  const id = window.location.hash.slice(1);
  if (!id) return;
  openMenuAccordionIfNeeded(id);
  updateBreadcrumb(id);
}

/* ---------------------------------------------------------------------
 * Trilha de navegação (breadcrumb)
 * ------------------------------------------------------------------- */
function setupBreadcrumb() {
  window.addEventListener("hashchange", () => {
    updateBreadcrumb(window.location.hash.slice(1) || "inicio");
  });
}

function updateBreadcrumb(id) {
  const breadcrumb = document.getElementById("breadcrumb");
  if (!breadcrumb) return;

  const { sectionId, sectionLabel, subLabel } = resolveNavTarget(id || "inicio");
  breadcrumb.innerHTML = "";

  const homeLi = document.createElement("li");
  if (sectionId === "inicio" && !subLabel) {
    homeLi.setAttribute("aria-current", "page");
    homeLi.textContent = "Início";
  } else {
    const homeLink = document.createElement("a");
    homeLink.href = "#inicio";
    homeLink.textContent = "Início";
    homeLi.appendChild(homeLink);
  }
  breadcrumb.appendChild(homeLi);

  if (sectionId !== "inicio" || subLabel) {
    const sectionLi = document.createElement("li");
    if (!subLabel) {
      sectionLi.setAttribute("aria-current", "page");
      sectionLi.textContent = sectionLabel;
    } else {
      const sectionLink = document.createElement("a");
      sectionLink.href = `#${sectionId}`;
      sectionLink.textContent = sectionLabel;
      sectionLi.appendChild(sectionLink);
    }
    breadcrumb.appendChild(sectionLi);
  }

  if (subLabel) {
    const subLi = document.createElement("li");
    subLi.setAttribute("aria-current", "page");
    subLi.textContent = subLabel;
    breadcrumb.appendChild(subLi);
  }
}

/* ---------------------------------------------------------------------
 * Destaca o link do menu correspondente à seção/subseção visível
 * ------------------------------------------------------------------- */
function setupActiveLinkTracking() {
  const targets = [
    ...document.querySelectorAll("main section[id]"),
    ...document.querySelectorAll(
      "[id^='o-navio-'], [id^='roteiro-'], [id^='menu-'], #contato-info, #contato-formulario"
    ),
  ];

  const links = document.querySelectorAll('.main-nav a[href^="#"]');
  if (!targets.length || !links.length || !("IntersectionObserver" in window)) return;

  const linkFor = (id) =>
    [...links].find((link) => link.getAttribute("href") === `#${id}`);

  const visible = new Map();

  /** Prioridade maior = alvo mais específico (subseção > seção > início) */
  function navPriority(id) {
    if (id === "inicio") return 1;
    for (const [sectionId, section] of Object.entries(NAV_MAP)) {
      if (section.children && section.children[id]) return 3;
      if (sectionId === id) return 2;
    }
    return 0;
  }

  function syncActiveFromVisible() {
    if (visible.size === 0) return;

    let bestId = "inicio";
    let bestScore = -1;

    visible.forEach((ratio, id) => {
      const score = navPriority(id) * 100 + ratio;
      if (score > bestScore) {
        bestScore = score;
        bestId = id;
      }
    });

    links.forEach((l) => l.removeAttribute("aria-current"));

    const activeLink = linkFor(bestId);
    if (activeLink) {
      activeLink.setAttribute("aria-current", "true");
    } else {
      const { sectionId } = resolveNavTarget(bestId);
      const parentLink = linkFor(sectionId);
      if (parentLink) parentLink.setAttribute("aria-current", "true");
    }

    updateBreadcrumb(bestId);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible.set(entry.target.id, entry.intersectionRatio);
        } else {
          visible.delete(entry.target.id);
        }
      });
      syncActiveFromVisible();
    },
    { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.1, 0.25, 0.5] }
  );

  targets.forEach((target) => observer.observe(target));
}

/* ---------------------------------------------------------------------
 * Formulário de contato — validação acessível
 * ------------------------------------------------------------------- */
function setupContactForm() {
  const form = document.getElementById("contato-formulario");
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

    btn.disabled = true;
    btnLabel.textContent = "Enviando…";
    statusEl.textContent = "Enviando sua mensagem…";
    statusEl.className = "form-status";

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
