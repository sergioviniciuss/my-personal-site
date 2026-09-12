'use client';

import { useEffect, useRef, useState } from 'react';
import { portugueseCareer, portugueseProfessionalWork, portugueseSideProjects } from './pt-br-content';

export type Locale = 'en' | 'pt-br';

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;

const professionalWork: [string, string, string, string, string[], string, string][] = [
  ['01', 'Render Multimídia', 'Redesign of all pages, performance and SEO', 'Rebuilt the company\'s pages for a redesign, with a focus on frontend quality, web performance, SEO and a survey feature.', ['Frontend', 'Web Performance','cross-browser compatibility', 'SEO'], '/logos/render.svg', 'E-commerce'],
  ['02', 'Fruition Sciences', 'Tools for optimizing wine production', 'Built an irrigation calculator, replaced CSV templates with proper Excel templates improving customer experience, and introduced role-based access control.', ['Fullstack', 'PHP', 'PHPExcel', 'JavaScript', 'RBAC'], '/logos/fruition.png', 'Online decision-making tool'],
  ['03', 'Neogrid', 'ezMarket', 'Joined the maintenance and enhancements team for ezMarket, helping reduce a 2,000+ bug backlog to around 30 over two years and introducing stronger engineering practices within one of the most mature Agile teams I have worked with. Later, built the award approval flow for its negotiations platform serving major European supermarket chains.', ['Fullstack', 'Java', 'Hibernate', 'Oracle', 'Liquibase', 'Aspose', 'Maven', 'Selenium'], '/logos/neogrid.png', 'E-auction & negotiations software'],
  ['04', 'Infracommerce', 'Interfaces for global brands', 'Built frontend experiences for B2C, B2B and B2E commerce platforms, combining SEO improvements with scalable delivery across a 15+ developer team. Worked with brands including Carrefour, Ubisoft, Ray-Ban, JBL, Sunglass Hut, Oakley, Unilever and Vilanova. Contributed to Scrum adoption, process improvements and maintenance team coordination.', ['JavaScript', 'jQuery', 'Node.js', 'SASS', 'Grunt', 'Gulp', 'SEO', 'Optimizations'], '/logos/infracommerce.svg', 'E-commerce'],
  ['05', 'Raisin DS', 'Online acquisition and web journey', 'Improved the public website and registration journey, introduced i18n from scratch, migrated the offers table from Angular to React, and maintained a Vue.js application. I also created an internal CLI to support Contentstack workflows. We ran A/B tests to optimize registration conversion, including a successful experiment that increased it by 40%.', ['React', 'Next.js', 'TypeScript', 'Node.js', 'PHP', 'WordPress', 'Contentstack', 'Microfrontends', 'Lerna', 'Monorepo', 'i18n', 'Angular', 'Vue.js'], '/logos/raisin.svg', 'Fintech'],
  ['06', 'Nord Security', 'NordVPN User Control Panel', 'As a Nord customer, joined the team behind the User Control Panel for NordVPN and other products. Before stepping into leadership, implemented a Cloudflare Worker layer, built critical experiences such as the plans pages and automated refund flows, and helped improve ways of working, team processes and the release flow. Today, my team owns recurring payments, subscriptions and refunds KPIs.', ['Leadership', 'React', 'TypeScript', 'SPA', 'Headless CMS', 'Agentic', 'Webpack', 'Storyblok', 'Nexos', 'AI enablement'], '/logos/nord.svg', 'Cybersecurity']
];

type SideProject = {
  icon: string;
  color: string;
  title: string;
  description: string;
  tags: string[];
  logo: string;
  url?: string;
  banner?: string;
  featured?: boolean;
  comingSoon?: boolean;
};

const sideProjects: SideProject[] = [
  { icon: '✈', color: 'blue', title: 'Travdraft', description: 'Compare trip ideas, visualize routes and choose the trip that is worth it.', tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'Neon', 'NextAuth', 'OpenAI', 'PWA'], logo: '/logos/travdraft.png', url: 'https://travdraft.com', banner: '/logos/travdraft-banner.png', featured: true },
  { icon: '!', color: 'red', title: 'Emergency Playbook', description: 'Work in progress', tags: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Zod', 'Vitest'], logo: '/logos/emergency-playbook.png', comingSoon: true },
  { icon: '🏫', color: 'blue', title: 'Berlin School Guide', description: 'A practical guide for families trying to understand school system in Germany and comparing primary schools in Berlin.', tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MDX', 'Zod', 'SSG'], logo: '', url: 'https://berlin-school-guide.vercel.app/' },
  { icon: '◌', color: 'green', title: 'Better Habits', description: 'A habit challenge app for building streaks, staying accountable with friends and competing on leaderboards.', tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Prisma', 'next-intl'], logo: '/logos/better-habits.png', url: 'https://better-habits.vercel.app/' },
  { icon: '🗓', color: 'amber', title: 'Family Schedule', description: 'Built to fairly split vacation stays between my parents’ and in-laws’ homes in Brazil. Track each night, adjust plans when needed and keep the balance visible.', tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'NextAuth', 'SQLite'], logo: '' }
];

const career: [string, string, string, string, string][] = [
  ['2010 — 2011', 'Render Multimídia', 'Online education and professional training.', 'Brazil', '🇧🇷'],
  ['2012', 'Fruition Sciences', 'Precision irrigation and vineyard management software.', 'France', '🇫🇷'],
  ['2012 — 2015', 'Neogrid', 'Retail supply chain and B2B commerce technology.', 'Brazil', '🇧🇷'],
  ['2015 — 2018', 'Infracommerce', 'Enterprise e-commerce and digital commerce technology.', 'Brazil', '🇧🇷'],
  ['2018 — 2022', 'Raisin DS', 'Digital savings and investment products.', 'Germany', '🇩🇪'],
  ['2022 — Present', 'Nord Security', 'Cybersecurity and privacy products.', 'Germany', '🇩🇪']
];

export default function Home({ locale = 'en' }: { locale?: Locale }) {
  const timeline = useRef<HTMLDivElement>(null);
  const [timelineBounds, setTimelineBounds] = useState({ canScrollLeft: false, canScrollRight: false });
  const isPortuguese = locale === 'pt-br';
  const currentProfessionalWork = isPortuguese ? portugueseProfessionalWork : professionalWork;
  const currentSideProjects = isPortuguese ? portugueseSideProjects : sideProjects;
  const currentCareer = isPortuguese ? portugueseCareer : career;
  const text = (english: string, portuguese: string) => isPortuguese ? portuguese : english;

  useEffect(() => {
    document.documentElement.lang = isPortuguese ? 'pt-BR' : 'en';
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('reveal-in'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const viewport = timeline.current;
    if (!viewport) return;

    const updateTimelineBounds = () => {
      const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      setTimelineBounds({
        canScrollLeft: viewport.scrollLeft > 1,
        canScrollRight: viewport.scrollLeft < maxScrollLeft - 1
      });
    };

    updateTimelineBounds();
    viewport.addEventListener('scroll', updateTimelineBounds, { passive: true });
    window.addEventListener('resize', updateTimelineBounds);
    const resizeObserver = new ResizeObserver(updateTimelineBounds);
    resizeObserver.observe(viewport);
    if (viewport.firstElementChild) resizeObserver.observe(viewport.firstElementChild);

    return () => {
      viewport.removeEventListener('scroll', updateTimelineBounds);
      window.removeEventListener('resize', updateTimelineBounds);
      resizeObserver.disconnect();
    };
  }, []);

  const scrollTimeline = (direction: number) => {
    const viewport = timeline.current;
    if (!viewport) return;
    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const nextScrollLeft = Math.min(maxScrollLeft, Math.max(0, viewport.scrollLeft + direction * 360));
    viewport.scrollTo({ left: nextScrollLeft, behavior: 'smooth' });
  };

  return <>
    <header className="site-header shell">
      <a className="brand" href="#top" aria-label={text('Sérgio Vinícius home', 'Início de Sérgio Vinícius')}>SV<span>.</span></a>
      <nav className="primary-nav" aria-label={text('Primary navigation', 'Navegação principal')}><a className="is-active" href="#top">{text('Home', 'Início')}</a><a href="#career">{text('Career', 'Carreira')}</a><a href="#work">{text('Work', 'Experiência')}</a><a href="#projects">{text('Projects', 'Projetos')}</a></nav>
      <a className="outline-button header-cta" href="mailto:sergioviniciuss@gmail.com">{text("Let's talk", 'Vamos conversar')} <span aria-hidden="true">↗</span></a>
    </header>

    <main id="top">
      <section className="hero shell">
        <div className="hero-copy"><p className="eyebrow">{text('Engineer · Builder · Berlin', 'Engenheiro · Builder · Berlim')}</p><h1>{text('Turning complex problems into', 'Transformando problemas complexos em')} <em>{text('useful things.', 'coisas úteis.')}</em></h1><p className="hero-intro">{text("I'm Sérgio Vinícius, a software engineer and product-minded builder. I bring deep frontend expertise, a broad understanding of the stack, and a strong focus on performance, maintainability and user experience.", 'Sou Sérgio Vinícius, engenheiro de software com visão de produto. Trago uma forte experiência em frontend, uma visão ampla da stack e foco em performance, manutenção e experiência do usuário.')}</p><div className="hero-actions"><a className="solid-button" href="#work">{text('See my work', 'Ver meu trabalho')} <span aria-hidden="true">↓</span></a><a className="text-button" href="#about">{text('About me', 'Sobre mim')} <span aria-hidden="true">↓</span></a></div><div className="hero-facts"><div className="hero-fact" aria-label={text('Languages', 'Idiomas')}><span className="hero-fact-label">{text('Languages', 'Idiomas')}</span><div><strong>{text('Portuguese · English · French', 'Português · Inglês · Francês')}</strong><small>{text('Fluent in all three', 'Fluente nos três')}</small></div></div><div className="hero-fact" aria-label={text('Education', 'Formação')}><span className="hero-fact-label">{text('Education', 'Formação')}</span><div><strong>{text('BSc Computer Science · UDESC', 'Bacharelado em Ciência da Computação · UDESC')}</strong><strong>{text('Master 1 studies · École nationale supérieure des mines de Saint-Étienne', 'Estudos de Master 1 · École nationale supérieure des mines de Saint-Étienne')}</strong></div></div></div><div className="hero-signals" aria-label={text('Areas of focus', 'Áreas de foco')}><span>{text('Product engineering', 'Engenharia de produto')}</span><span>{text('Performance & scale', 'Performance e escala')}</span><span>{text('People & leadership', 'Pessoas e liderança')}</span><span>{text('Ideas to real solutions', 'Ideias em soluções reais')}</span></div></div>
        <div className="hero-portrait-wrap"><div className="blueprint blueprint-one" aria-hidden="true"></div><div className="blueprint blueprint-two" aria-hidden="true"></div><img className="hero-portrait" src={assetPath('/assets/profile.png')} alt={text('Portrait of Sérgio Vinícius', 'Retrato de Sérgio Vinícius')} /><div className="portrait-caption">{text('Build', 'Construir')}<br />{text('learn', 'aprender')}<br />{text('improve', 'melhorar')}<br />{text('repeat', 'repetir')}</div><div className="location-stamp">Berlin, Germany<br /><small>52.5200° N · 13.4050° E</small></div></div>
      </section>

      <section id="about" className="about-section section shell"><div className="about-copy"><div className="about-lead"><p className="eyebrow">{text('About me', 'Sobre mim')}</p><h2>{text('I build digital products where engineering, product thinking and leadership meet.', 'Construo produtos digitais onde engenharia, visão de produto e liderança se encontram.')}</h2></div><div className="about-details"><p>{text("I'm a software engineer and product-minded builder with 15+ years of experience turning complex problems into useful digital products. I bring deep frontend expertise, a broad understanding of the stack and a strong focus on performance, maintainability and user experience.", 'Sou engenheiro de software com visão de produto, com mais de 15 anos de experiência transformando problemas complexos em produtos digitais úteis. Trago uma forte experiência em frontend, uma visão ampla da stack e foco em performance, manutenção e experiência do usuário.')}</p><p>{text("Across Brazil, France and Germany, I've worked in e-commerce, fintech, cybersecurity and decision-making platforms, contributing across the stack while increasingly taking on technical and people leadership.", 'Ao longo da minha carreira no Brasil, na França e na Alemanha, trabalhei com e-commerce, fintech, cibersegurança e plataformas de tomada de decisão, contribuindo em diferentes camadas e assumindo cada vez mais responsabilidades de liderança técnica e de pessoas.')}</p><p>{text("Today, I'm especially interested in building strong teams, improving how we work, and using AI thoughtfully to automate routines, surface insights and help people deliver better software.", 'Hoje, tenho especial interesse em formar times fortes, melhorar a forma como trabalhamos e usar IA com responsabilidade para automatizar rotinas, gerar insights e ajudar pessoas a entregar software melhor.')}</p><p className="about-personal">{text("Away from the keyboard, I'm a husband, a father, and an enthusiastic volleyball player and cyclist.", 'Longe do teclado, sou marido, pai e um entusiasta de vôlei e ciclismo.')}</p></div></div></section>

      <section id="career" className="career-section section shell"><div className="section-heading career-heading"><div><p className="eyebrow">{text('Career journey', 'Trajetória profissional')}</p><h2>{text('A path built on impact.', 'Um caminho construído com impacto.')}</h2></div><p className="section-note">{text("From Brazil to Berlin, I've worked across products, teams and technologies — always curious, always building.", 'Do Brasil a Berlim, trabalhei com produtos, times e tecnologias diferentes — sempre curioso, sempre agregando valor.')}</p></div><div className="timeline-controls"><span>{text('Scroll sideways to explore', 'Deslize para o lado para explorar')}</span><div className="control-group"><button className="icon-button" onClick={() => scrollTimeline(-1)} disabled={!timelineBounds.canScrollLeft} aria-label={text('Scroll career timeline left', 'Deslizar linha do tempo para a esquerda')}>←</button><button className="icon-button active" onClick={() => scrollTimeline(1)} disabled={!timelineBounds.canScrollRight} aria-label={text('Scroll career timeline right', 'Deslizar linha do tempo para a direita')}>→</button></div></div><div className="timeline-viewport" ref={timeline} tabIndex={0} aria-label={text('Scrollable career timeline', 'Linha do tempo de carreira rolável')}><div className="timeline-track"><div className="timeline-line" aria-hidden="true"></div>{currentCareer.map(([date, title, description, country, flag], index) => <article className={`timeline-item ${index === currentCareer.length - 1 ? 'is-current' : ''}`} key={title}><span className="timeline-flag" role="img" aria-label={`${country} ${text('flag', 'bandeira')}`}>{flag}</span><span className="timeline-dot"></span><p className="timeline-date">{date}</p><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

      <section id="work" className="section shell"><div className="section-heading"><div><p className="eyebrow">{text('Selected experience', 'Experiência selecionada')}</p><h2>{text('Professional work', 'Experiência profissional')}</h2></div><p className="section-note">{text("A few highlights from the products and teams I've helped move forward.", 'Alguns destaques dos produtos e times que ajudei a levar adiante.')}</p></div><div className="project-grid professional-grid">{currentProfessionalWork.map(([, company, title, description, tags, logo, productType], indexPosition) => { const [, , , country, flag] = currentCareer[indexPosition]; return <article className="project-card" data-reveal key={company}><div className="company-mark card-logo"><img src={assetPath(logo)} alt={`${company} ${text('logo', 'logo')}`} loading="lazy" decoding="async" /></div><div><div className="company-line"><p className="card-company">{company}</p><span className="company-flag" role="img" aria-label={`${country} ${text('flag', 'bandeira')}`}>{flag}</span></div><p className="product-type">{productType}</p><h3>{title}</h3><p>{description}</p><div className="tags">{(tags as string[]).map((tag) => <span key={tag}>{tag}</span>)}</div></div></article> })}</div></section>

      <section id="projects" className="section shell side-projects-section"><div className="section-heading"><div><p className="eyebrow">{text('Personal experiments', 'Experimentos pessoais')}</p><h2>{text('Side projects', 'Projetos pessoais')}</h2></div><p className="section-note">{text('Small tools, real problems. Built to learn, explore and make life a bit easier.', 'Pequenas ferramentas, problemas reais. Feitos para aprender, explorar e tornar a vida um pouco mais fácil.')}</p></div><div className="project-grid side-grid">{(() => { const featuredProject = currentSideProjects.find((project) => project.featured); const orderedProjects = featuredProject ? [featuredProject, ...currentSideProjects.filter((project) => project !== featuredProject)] : currentSideProjects; return orderedProjects.map((project) => { const { icon, color, title, description, tags, logo, url, banner, comingSoon } = project; const isFeatured = project === featuredProject; return <a className={`side-card ${isFeatured ? 'is-featured' : ''} ${url ? 'is-linked' : ''} ${comingSoon ? 'is-coming-soon' : ''}`} href={url} target={url ? '_blank' : undefined} rel={url ? 'noreferrer' : undefined} aria-label={url ? `${text('Open', 'Abrir')} ${title}` : undefined} data-reveal key={title}>{isFeatured && banner && <div className="side-card-background"><img src={assetPath(banner)} alt={`${title} ${text('product preview', 'prévia do produto')}`} loading="lazy" decoding="async" /></div>}<div className={`side-card-icon ${color}`}>{logo ? <img src={assetPath(logo)} alt={`${title} ${text('logo', 'logo')}`} loading="lazy" decoding="async" /> : icon}</div><div>{isFeatured && <p className="side-featured-label">{text('Featured project', 'Projeto em destaque')}</p>}<div className="side-card-title-row"><h3>{title}</h3>{comingSoon && <span className="fire-mark" aria-hidden="true">🔥</span>}</div>{description && <p className={comingSoon ? 'coming-soon-copy' : undefined}>{comingSoon && <span className="work-in-progress-icon" aria-hidden="true">⚒</span>}{description}</p>}<div className="tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>{url && <span className="card-arrow">↗</span>}</a>; }); })()}</div></section>
      <section className="closing-section shell"><p>{text('Build useful things.', 'Construa coisas úteis.')}<br /><em>{text('Keep learning.', 'Continue aprendendo.')}</em></p></section>
    </main>

    <footer className="site-footer shell"><div><a className="brand" href="#top">SV<span>.</span></a><p>Sérgio Vinícius<br /><span>{text('Engineer · Builder · Berlin', 'Engenheiro · Builder · Berlim')}</span></p></div><div className="footer-links"><a href="#career">{text('Career', 'Carreira')}</a><a href="#work">{text('Work', 'Experiência')}</a><a href="#projects">{text('Projects', 'Projetos')}</a><a href="mailto:sergioviniciuss@gmail.com">{text('Contact', 'Contato')}</a><a className="social-link" href="https://www.linkedin.com/in/sergioviniciuss" target="_blank" rel="noreferrer" aria-label="LinkedIn" data-tooltip="LinkedIn"><span className="social-icon social-linkedin" aria-hidden="true">in</span></a><a className="social-link" href="https://x.com/sergioviniciuss" target="_blank" rel="noreferrer" aria-label="X" data-tooltip="X"><span className="social-icon social-x" aria-hidden="true">𝕏</span></a></div><p className="copyright">© 2026 Sérgio Vinícius</p></footer>
  </>;
}
