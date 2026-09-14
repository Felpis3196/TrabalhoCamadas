# Navio Homero — Projeto Web Acessível

Projeto do **Bootcamp Desenvolvimento de Sistemas Web Avançados — Front-End**.

Site institucional acessível, inspirado no navio de cruzeiro fluvial **NM
Homero Krähenbühl**, que navega no Rio Tietê e tem porto em Barra Bonita
(SP). O conteúdo (textos, roteiros e cardápio) foi adaptado do site oficial
[naviohomero.com.br](https://naviohomero.com.br) para fins didáticos deste
bootcamp, com autorização da empresa para uso de fotos oficiais (ver seção
4). Ainda assim, este é um **projeto de estudo, não o site oficial da
empresa** — para reservas reais, use sempre o site oficial.

## 1. Descrição do projeto

O objetivo foi desenvolver uma aplicação web de página única (`index.html`)
com navegação intuitiva, inclusiva e agradável, aplicando princípios de
acessibilidade, usabilidade e design universal, conforme o guia do bootcamp.

O site tem **5 seções principais** (nível 1) com **subseções** (nível 2),
respeitando o limite de **no máximo dois níveis de profundidade** exigido
pelo guia do bootcamp:

| Nível 1 | Nível 2 (subseções) |
|---------|---------------------|
| **Início** | — |
| **O Navio** | Convés Principal · Convés Superior · Flybridge · Acessibilidade |
| **Roteiros** | Descobrindo o Rio Tietê · Barra Bonita – São Manuel |
| **Gastronomia** | Prato principal · Entradas · Bebidas · Menu infantil |
| **Contato** | Informações · Formulário |

A trilha de navegação (*breadcrumb*) no topo do conteúdo indica em qual
nível o visitante está. Os links do menu principal trazem **ícone + rótulo
textual**, conforme o guia.

### Página única ou múltiplas páginas?

O guia do bootcamp exige **no máximo dois níveis de profundidade** na
navegação — ou seja, a **hierarquia** (ex.: Início → O Navio → Convés
Principal), e **não** a quantidade de arquivos `.html`.

Este projeto adota **página única** (`index.html`) de propósito:

- **Nível 1:** seções principais no menu (`.nav-level-1`)
- **Nível 2:** subseções nos submenus (`.nav-level-2`), acessadas por
  âncoras (`#o-navio-conves-principal`, `#roteiro-descobrindo`, etc.)

Isso cumpre o critério do guia da mesma forma que um site com várias páginas
(`index.html` → `o-navio.html`), mas evita duplicar cabeçalho, rodapé e
estilos. **Não é obrigatório** criar um arquivo HTML por seção.

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
- Ícones da interface são SVG originais (decorativos, `aria-hidden`); as
  fotos do navio são reais e autorizadas pela empresa, cada uma com `alt`
  descritivo (ver seção 4 sobre como adicioná-las).
- Formulário de contato com mensagens de erro específicas por campo,
  `aria-describedby`, `aria-invalid` e uma região `aria-live="polite"` que
  anuncia o carregamento e a confirmação do envio.
- Navegação com **dois níveis de profundidade**: menu principal com
  submenus acessíveis (teclado, `aria-expanded`, foco visível) e trilha
  (*breadcrumb*) dinâmica.
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

## 4. Imagens (fotos oficiais autorizadas)

O HTML já está preparado para exibir fotos reais do navio — falta apenas
salvar os arquivos autorizados dentro da pasta `img/`, com **exatamente**
estes nomes (enquanto o arquivo não existe, o navegador mostra o texto do
`alt` no lugar, então nada quebra):

| Arquivo                        | Onde aparece            | Sugestão de conteúdo                          |
|---------------------------------|--------------------------|------------------------------------------------|
| `img/navio-hero.jpg`            | Início (destaque)        | Foto do navio navegando, de longe              |
| `img/conves-principal.jpg`      | O Navio → Convés Principal | Restaurante / pista de dança / palco          |
| `img/conves-superior.jpg`       | O Navio → Convés Superior  | Restaurante-auditório                         |
| `img/conves-flybridge.jpg`      | O Navio → Flybridge        | Lounge do convés mais alto                    |
| `img/gastronomia-prato.jpg`     | Gastronomia               | Um prato do cardápio já montado                |

Recomendações:

- Use fotos na horizontal (paisagem), com boa resolução, mas comprima antes
  de subir ao GitHub (ideal: até ~300 KB por imagem, formato `.jpg` ou
  `.webp`) para o site carregar rápido.
- Ajuste o texto de `alt` de cada `<img>` no `index.html` caso a foto
  escolhida mostre algo diferente do que está descrito ali — o `alt` precisa
  sempre corresponder ao que a imagem realmente mostra.
- Essas fotos pertencem à empresa do Navio Homero; use apenas material que
  vocês têm autorização para publicar.

## 5. Instruções para instalação e execução

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

## 6. Como testar a acessibilidade

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

## 7. Integrantes

> Preencha com o nome dos integrantes do grupo (quando aplicável):

- [ ] Nome do integrante 1
- [ ] Nome do integrante 2
- [ ] Nome do integrante 3

## 8. Como demonstrar a navegação em camadas (segunda entrega)

Use estes passos na apresentação para mostrar os **dois níveis de
profundidade** ao professor:

1. **Submenu no menu principal** — passe o mouse sobre *O Navio* ou
   *Roteiros* (desktop) ou use `Tab` + botão de expandir (mobile).
2. **Breadcrumb dinâmico** — clique em *Convés Principal* e observe a trilha
   no topo: `Início › O Navio › Convés Principal`.
3. **URL com hash** — após clicar em uma subseção, a barra de endereço
   mostra, por exemplo, `#roteiro-descobrindo` (prova do segundo nível).
4. **Navegação por teclado** — percorra o menu com `Tab`, abra o submenu
   com `Enter`, feche o menu mobile com `Esc`.
5. **Limite respeitado** — não há terceiro nível (ex.: Convés → Piano →
   Detalhe técnico); a hierarquia para no nível 2.

Frase sugerida para a apresentação:

> “O site é de página única, mas a navegação tem dois níveis hierárquicos:
> seções principais no menu e subseções nos submenus, com breadcrumb
> indicando a profundidade atual — conforme o guia.”

## 9. Próximos passos sugeridos

- Adicionar as 5 fotos oficiais listadas na seção 4.
- Rodar o Lighthouse e o axe DevTools e corrigir eventuais apontamentos.
- Revalidar o contraste de cores com o WebAIM Contrast Checker.
- Substituir o envio simulado do formulário por uma integração real
  (e-mail, planilha ou backend), se o escopo da entrega exigir.
- Usar a seção 8 como roteiro na apresentação da segunda entrega.
