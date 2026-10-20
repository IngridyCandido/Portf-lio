// Menu mobile: abre/fecha e recolhe após clicar em uma seção.
const menuToggle = document.querySelector('#menu-toggle');
const navLinks = document.querySelector('#nav-links');

menuToggle.addEventListener('click', () => {
  const aberto = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(aberto));
  menuToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  menuToggle.textContent = aberto ? '×' : '☰';
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    menuToggle.textContent = '☰';
  });
});

// Destaque do item de navegação conforme a seção visível.
const sections = document.querySelectorAll('main section[id]');
const sectionLinks = navLinks.querySelectorAll('a[href^="#"]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    sectionLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => observer.observe(section));

// Projetos do portfólio. Edite esta lista para adicionar novos projetos.
const projetos = [
  {
    titulo: 'Controle Financeiro',
    descricao: 'Aplicação web para organização de finanças pessoais, desenvolvida com Vue.js, TypeScript, NestJS e PostgreSQL. Permite acompanhar contas, receitas, despesas, transferências, cartões, faturas, metas, recorrências, orçamentos e relatórios.',
    tecnologias: 'Vue.js · TypeScript · NestJS · PostgreSQL',
    link: 'https://web-controle-financeiro.onrender.com/login?redirecionar=/dashboard',
    textoLink: 'Acessar projeto',
    imagens: [
      { src: './login controle financeiro.png', alt: 'Tela de login do Controle Financeiro' },
      { src: './dashboard controle financeiro.png', alt: 'Dashboard do sistema Controle Financeiro' }
    ]
  },
  {
    titulo: 'Clínica-Escola',
    descricao: 'Projeto final da disciplina de Desenvolvimento Web Back-end. Aplicação acadêmica para demonstrar conhecimentos de desenvolvimento web.',
    tecnologias: 'Desenvolvimento Web · Back-end · Projeto acadêmico',
    link: 'https://projeto-clinica-escola.onrender.com/html/index.html',
    textoLink: 'Acessar projeto',
    imagens: [
      { src: './login clinica escola.png', alt: 'Tela de login da Clínica-Escola' },
      { src: './painel adm clinica escola.png', alt: 'Painel administrativo da Clínica-Escola' },
      { src: './painel aluno clinica escola.png', alt: 'Painel do aluno da Clínica-Escola' },
      { src: './painel profissional clinica escola.png', alt: 'Painel do profissional da Clínica-Escola' }
    ]
  },
  {
    titulo: 'NotaManager',
    descricao: 'Programa em Shell Script, modularizado, que registra e organiza as tarefas do dia a dia do usuário. O projeto foi desenvolvido para praticar automação e organização de código em ambiente de terminal.',
    tecnologias: 'Shell Script · Linux · Modularização',
    link: 'https://github.com/TiNerl/NotaManager',
    textoLink: 'Ver repositório',
    imagens: []
  },
  {
    titulo: 'RPG — Adventure Time',
    descricao: 'This is an RPG-inspired project, developed for an English class in the TSI course.',
    descricaoComplementar: 'Projeto inspirado em RPG, desenvolvido para a disciplina de Inglês do curso de Tecnologia em Sistemas para Internet.',
    tecnologias: 'Projeto acadêmico · RPG',
    link: 'https://github.com/IngridyCandido/RPG---Adventure-Time',
    textoLink: 'Ver repositório',
    imagens: [
      { src: './rpg - adventure time.png', alt: 'Imagem em destaque do projeto RPG — Adventure Time' }
    ]
  }
];

let projetoAtual = 0;
const tituloProjeto = document.querySelector('#project-title');
const descricaoProjeto = document.querySelector('#project-description');
const descricaoComplementarProjeto = document.querySelector('#project-description-translation');
const tecnologiasProjeto = document.querySelector('#project-tech');
const linkProjeto = document.querySelector('#project-link');
const contadorProjeto = document.querySelector('#project-count');
const galeriaProjeto = document.querySelector('#project-gallery');

function renderizarGaleria(projeto) {
  galeriaProjeto.replaceChildren();
  galeriaProjeto.classList.toggle('single-image', projeto.imagens.length === 1);

  if (projeto.imagens.length === 0) {
    const ilustracao = document.createElement('div');
    ilustracao.className = 'project-placeholder';
    ilustracao.setAttribute('role', 'img');
    ilustracao.setAttribute('aria-label', 'Ilustração do NotaManager em ambiente de terminal');
    const simboloTerminal = document.createElement('span');
    simboloTerminal.setAttribute('aria-hidden', 'true');
    simboloTerminal.textContent = '>_';
    const legendaTerminal = document.createElement('small');
    legendaTerminal.textContent = 'NotaManager';
    ilustracao.append(simboloTerminal, legendaTerminal);
    galeriaProjeto.append(ilustracao);
    return;
  }

  projeto.imagens.forEach((imagem) => {
    const imagemLink = document.createElement('a');
    imagemLink.className = 'project-image-link';
    imagemLink.href = imagem.src;
    imagemLink.target = '_blank';
    imagemLink.rel = 'noopener noreferrer';
    imagemLink.setAttribute('aria-label', `Abrir imagem em tamanho original: ${imagem.alt}`);

    const imagemProjeto = document.createElement('img');
    imagemProjeto.className = 'project-image';
    imagemProjeto.src = imagem.src;
    imagemProjeto.alt = imagem.alt;
    imagemProjeto.loading = 'lazy';
    imagemProjeto.decoding = 'async';

    imagemLink.append(imagemProjeto);
    galeriaProjeto.append(imagemLink);
  });
}

function renderizarProjeto() {
  const projeto = projetos[projetoAtual];
  tituloProjeto.textContent = projeto.titulo;
  descricaoProjeto.textContent = projeto.descricao;
  descricaoComplementarProjeto.textContent = projeto.descricaoComplementar || '';
  descricaoComplementarProjeto.hidden = !projeto.descricaoComplementar;
  tecnologiasProjeto.textContent = projeto.tecnologias;
  linkProjeto.href = projeto.link;
  linkProjeto.textContent = `${projeto.textoLink} ↗`;
  contadorProjeto.textContent = `${String(projetoAtual + 1).padStart(2, '0')} / ${String(projetos.length).padStart(2, '0')}`;
  renderizarGaleria(projeto);
}

document.querySelector('#project-prev').addEventListener('click', () => {
  projetoAtual = (projetoAtual - 1 + projetos.length) % projetos.length;
  renderizarProjeto();
});
document.querySelector('#project-next').addEventListener('click', () => {
  projetoAtual = (projetoAtual + 1) % projetos.length;
  renderizarProjeto();
});

const imagemTimeline = document.querySelector('#timeline-image');
const fallbackTimeline = document.querySelector('#timeline-fallback');
if (imagemTimeline && fallbackTimeline) {
  const mostrarFallbackTimeline = () => {
    imagemTimeline.hidden = true;
    fallbackTimeline.hidden = false;
  };
  imagemTimeline.addEventListener('error', mostrarFallbackTimeline);
  if (imagemTimeline.complete && imagemTimeline.naturalWidth === 0) mostrarFallbackTimeline();
}

// O formulário abre o aplicativo de e-mail padrão. Não precisa de servidor,
// mas o usuário precisa ter um aplicativo/serviço de e-mail configurado.
document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const dados = new FormData(form);
  const nome = String(dados.get('nome')).trim();
  const email = String(dados.get('email')).trim();
  const mensagem = String(dados.get('mensagem')).trim();
  const assunto = encodeURIComponent(`Contato pelo portfólio — ${nome}`);
  const corpo = encodeURIComponent(`Olá, Ingridy!\n\n${mensagem}\n\nMeu nome: ${nome}\nMeu e-mail: ${email}`);
  document.querySelector('#form-status').textContent = 'Abrindo seu aplicativo de e-mail…';
  window.location.href = `mailto:ingridyluzzia@gmail.com?subject=${assunto}&body=${corpo}`;
});

document.querySelector('#year').textContent = new Date().getFullYear();
renderizarProjeto();
