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
    descricao: 'Aplicação web completa para organização de finanças pessoais. O sistema permite acompanhar contas, receitas, despesas, transferências, cartões, faturas, metas, recorrências, orçamentos e relatórios em uma única interface.',
    tecnologias: 'Vue.js · TypeScript · NestJS · PostgreSQL',
    link: 'https://web-controle-financeiro.onrender.com/login?redirecionar=/dashboard'
  },
  {
    titulo: 'Clínica-Escola',
    descricao: 'Projeto final da disciplina de Desenvolvimento Web Back-end. Uma aplicação web desenvolvida como projeto acadêmico para praticar a construção de um sistema web.',
    tecnologias: 'Desenvolvimento Web · Back-end · Projeto acadêmico',
    link: 'https://projeto-clinica-escola.onrender.com/html/index.html'
  },
  {
    titulo: 'NotaManager',
    descricao: 'Programa modularizado em Shell Script para registrar e organizar tarefas do dia a dia do usuário. O código-fonte está disponível no GitHub.',
    tecnologias: 'Shell Script · Linux · Modularização',
    link: 'https://github.com/TiNerl/NotaManager'
  }
];

let projetoAtual = 0;
const tituloProjeto = document.querySelector('#project-title');
const descricaoProjeto = document.querySelector('#project-description');
const tecnologiasProjeto = document.querySelector('#project-tech');
const linkProjeto = document.querySelector('#project-link');
const contadorProjeto = document.querySelector('#project-count');

function renderizarProjeto() {
  const projeto = projetos[projetoAtual];
  tituloProjeto.textContent = projeto.titulo;
  descricaoProjeto.textContent = projeto.descricao;
  tecnologiasProjeto.textContent = projeto.tecnologias;
  linkProjeto.href = projeto.link;
  linkProjeto.textContent = projetoAtual === 2 ? 'Ver repositório ↗' : 'Ver projeto ↗';
  contadorProjeto.textContent = `${String(projetoAtual + 1).padStart(2, '0')} / ${String(projetos.length).padStart(2, '0')}`;
}

document.querySelector('#project-prev').addEventListener('click', () => {
  projetoAtual = (projetoAtual - 1 + projetos.length) % projetos.length;
  renderizarProjeto();
});
document.querySelector('#project-next').addEventListener('click', () => {
  projetoAtual = (projetoAtual + 1) % projetos.length;
  renderizarProjeto();
});

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
