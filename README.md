# Portfólio — Ingridy Candido

Portfólio responsivo feito com **HTML, CSS e JavaScript puro**, sem framework e sem etapa de compilação.

**Acesse o portfólio:** [ingridycandido.github.io/Portf-lio](https://ingridycandido.github.io/Portf-lio/)

## Estrutura

```text
portfolio-ingridy/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

## Como executar

1. Baixe ou clone o repositório.
2. Abra a pasta no VS Code.
3. Abra `index.html` no navegador. Para desenvolvimento, também pode usar a extensão **Live Server**.
4. Faça alterações em `index.html`, `css/style.css` e `js/script.js`.

## Funcionalidades

- Navegação por âncoras entre as seções.
- Menu adaptado para dispositivos móveis.
- Carrossel de projetos com links externos.
- Formulário de contato com validação do navegador que prepara uma mensagem por `mailto:`.
- Layout responsivo para computador, tablet e celular.
- Ano do rodapé atualizado automaticamente.

## Projetos apresentados

- [Controle Financeiro](https://web-controle-financeiro.onrender.com/login?redirecionar=/dashboard)
- [Clínica-Escola](https://projeto-clinica-escola.onrender.com/html/index.html)
- [NotaManager](https://github.com/TiNerl/NotaManager)
- [RPG — Adventure Time](https://github.com/IngridyCandido/RPG---Adventure-Time)

## Personalização

- Conteúdo, textos e links: `index.html`.
- Cores, espaçamento e responsividade: `css/style.css`, no início há variáveis CSS.
- Descrições e URLs dos projetos: lista `projetos` em `js/script.js`.

## Observação sobre o formulário

O formulário não envia dados para um servidor. Ele valida os campos e abre o aplicativo de e-mail configurado no dispositivo, com destinatário, assunto e mensagem preenchidos. Para receber mensagens diretamente pelo site, sem abrir o e-mail do visitante, será necessário integrar um serviço de formulário ou criar um backend.
