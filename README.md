# Navio Homero — Projeto Web Acessível

Projeto do **Bootcamp Desenvolvimento de Sistemas Web Avançados — Front-End**.

Site institucional acessível, inspirado no navio de cruzeiro fluvial **NM
Homero Krähenbühl**, que navega no Rio Tietê e tem porto em Barra Bonita
(SP). O conteúdo (textos, roteiros e cardápio) foi adaptado do site oficial
[naviohomero.com.br](https://naviohomero.com.br) exclusivamente para fins
didáticos deste bootcamp — **não é o site oficial da empresa** e não deve ser
publicado como tal. Para reservas reais, use sempre o site oficial.

## 1. Descrição do projeto

O objetivo foi desenvolver uma aplicação web de página única (`index.html`)
com navegação intuitiva, inclusiva e agradável, aplicando princípios de
acessibilidade, usabilidade e design universal, conforme o guia do bootcamp.

O site tem **5 seções principais**, todas em um único nível de navegação
(sem submenus):

1. **Início** — apresentação do navio e números da embarcação.
2. **O Navio** — os três conveses (Principal, Superior e Flybridge) e o
   destaque de acessibilidade a bordo (elevador e piso tátil direcional).
3. **Roteiros** — os dois passeios disponíveis (sábados/feriados e
   domingos), com horários de embarque, zarpe e retorno.
4. **Gastronomia** — cardápio em formato de acordeão acessível
   (`<details>`/`<summary>` nativos).
5. **Contato** — informações de contato e formulário com validação.

### Requisitos de acessibilidade e usabilidade atendidos

- HTML semântico: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`,
  `<footer>`, `<button>`.
- Link "Pular para o conteúdo principal" como primeiro elemento focável.
- Todos os elementos interativos são acessíveis via `Tab`, com **foco sempre
  visível** (`:focus-visible` com contorno de alto contraste).
- Contraste de cores planejado para o padrão AA do WCAG (revalide com o
  WebAIM Contrast Checker antes da entrega final).
- Fontes legíveis, corpo de texto em 18px e linhas com no máximo ~65
  caracteres para facilitar a leitura.
- Espaçamento generoso entre blocos, linhas e botões.
- Ícones sempre acompanhados de rótulo textual (nunca só ícone).
- Imagens são ilustrações SVG originais com `aria-hidden` (decorativas) —
  não há fotos externas, evitando problemas de direitos autorais do site
  original.
- Formulário de contato com mensagens de erro específicas por campo,
  `aria-describedby`, `aria-invalid` e uma região `aria-live="polite"` que
  anuncia o carregamento e a confirmação do envio.
- Navegação com no máximo dois níveis de profundidade (menu principal sem
  submenus).
- `prefers-reduced-motion` respeitado (rolagem e transições são desativadas
  para quem configurou essa preferência no sistema).
- Sem rolagem lateral e sem menus escondidos por gestos não óbvios.

## 2. Tecnologias utilizadas

- **HTML5** semântico
- **CSS3** (variáveis nativas, Grid e Flexbox — sem frameworks)
- **JavaScript** puro (Vanilla JS, sem dependências)
- Fonte **Fraunces** (títulos) e **Source Sans 3** (texto), via Google Fonts
- Nenhum framework ou build tool é necessário

## 3. Estrutura do projeto

```
projeto-navio-homero/
├── index.html          # Página única com as 5 seções
├── css/
│   └── styles.css      # Tema visual, tipografia e regras de acessibilidade
├── js/
│   └── script.js       # Menu mobile, foco de seção e validação do formulário
├── img/                # Reservado para imagens adicionais (atualmente vazio)
├── README.md
└── .gitignore
```

## 4. Instruções para instalação e execução

Este é um projeto **100% estático**, sem dependências ou build:

1. Baixe ou clone o repositório.
2. Abra o arquivo `index.html` diretamente no navegador,
   **ou**, para simular um servidor local (recomendado para testar bem o
   comportamento de formulários e âncoras):

   ```bash
   # Python 3
   python3 -m http.server 8000

   # depois acesse:
   # http://localhost:8000
   ```

   ```bash
   # ou, com Node.js instalado
   npx serve .
   ```

Nenhuma variável de ambiente, chave de API ou instalação de pacotes é
necessária.

## 5. Como testar a acessibilidade

Conforme sugerido no guia do bootcamp:

- **Lighthouse** (aba *Lighthouse* do Chrome DevTools) — rodar a auditoria
  de Acessibilidade.
- **axe DevTools** — extensão de navegador para varredura de problemas de
  acessibilidade.
- **Validador de HTML** — <https://validator.w3.org>
- **WebAIM Contrast Checker** — <https://webaim.org/resources/contrastchecker>
  para revalidar as cores definidas em `css/styles.css`.
- Teste manual de teclado: navegue pela página inteira usando apenas `Tab`,
  `Shift+Tab`, `Enter` e `Esc`.

## 6. Integrantes

> Preencha com o nome dos integrantes do grupo (quando aplicável):

- [ ] Nome do integrante 1
- [ ] Nome do integrante 2
- [ ] Nome do integrante 3

## 7. Próximos passos sugeridos

- Rodar o Lighthouse e o axe DevTools e corrigir eventuais apontamentos.
- Revalidar o contraste de cores com o WebAIM Contrast Checker.
- Substituir o envio simulado do formulário por uma integração real
  (e-mail, planilha ou backend), se o escopo da entrega exigir.
- Preparar a apresentação do projeto (características de UI e UX) para a
  segunda entrega.
