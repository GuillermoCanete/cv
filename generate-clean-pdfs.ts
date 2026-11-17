import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { STATS, LANGUAGES, EXPERIENCES, CERTS, CERT_CATEGORIES, ACHIEVEMENTS, PROJECTS } from './src/data.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const translations = {
  es: {
    title: "LÍDER DE CALIDAD Y MEJORA DE PROCESOS",
    subtitle: "16 años en manufactura electrónica · Auditor Interno ISO 9001 / 14001 / 45001 · Herramientas digitales propias",
    contact: "Contacto",
    location: "Tierra del Fuego, Argentina (Disponible para Relocalización)",
    languagesHeader: "Español (Nativo) · Inglés (B2+ Profesional) · Portugués (Básico)",
    summaryTitle: "Perfil Profesional",
    summary: "Trabajo hace más de 16 años en plantas de manufactura electrónica y climatización, con productos de LG, Motorola, Samsung, Huawei, Sony y Alcatel. Empecé en control de calidad de producto terminado y fui creciendo hacia el diseño de procesos, la metrología y la gestión de calidad. Lo que mejor sé hacer es estabilizar líneas de producción: diseñar el proceso, balancear estaciones, encontrar la causa raíz de los defectos y sostener las mejoras en el tiempo. Soy auditor interno de ISO 9001, 14001 y 45001, y desarrollo mis propias herramientas digitales para reemplazar planillas en papel y tener datos de planta en tiempo real.",
    skillsTitle: "Conocimientos Técnicos y Normas",
    achievementsTitle: "Resultados Destacados en Planta",
    languagesTitle: "Idiomas",
    bghGroupHeader: "Grupo BGH · 12 años y 6 posiciones en planta",
    bghGroupSub: "Crecimiento continuo desde calidad en nuevos lanzamientos hasta ingeniería de procesos, metrología y gestión de calidad",
    bghIndustryBadge: "Electrónica de Consumo & Metrología",
    mirgorGroupHeader: "Mirgor · Industria de Climatización (Equipos LG)",
    mirgorGroupSub: "Etapa inicial en aseguramiento de calidad de producto terminado, pruebas funcionales y despacho",
    mirgorIndustryBadge: "Climatización · Control Punta a Punta",
    experienceTitle: "Experiencia Laboral",
    projectsTitle: "Herramientas Digitales que Desarrollé",
    certsTitle: "Educación y Certificaciones",
    ctaTitle: "¿Conversamos?",
    ctaSub: "Si su planta tiene problemas de calidad, una auditoría por delante o datos que todavía se cargan a mano, con gusto le cuento cómo lo encararía. Disponible para relocalización."
  },
  en: {
    title: "QUALITY & PROCESS IMPROVEMENT LEAD",
    subtitle: "16 years in electronics manufacturing · ISO 9001 / 14001 / 45001 Internal Auditor · Custom digital tools",
    contact: "Contact Information",
    location: "Tierra del Fuego, Argentina (Open to Relocation)",
    languagesHeader: "English (B2+ Professional) · Spanish (Native) · Portuguese (Basic)",
    summaryTitle: "Professional Profile",
    summary: "I have spent over 16 years on electronics and HVAC manufacturing floors working with LG, Motorola, Samsung, Huawei, Sony, and Alcatel products. I started in finished-product quality control and grew into process design, metrology, and quality management. What I do best is stabilize production lines: designing the workflow, balancing workstations, finding the root cause of defects, and making improvements stick. I am an ISO 9001, 14001, and 45001 internal auditor, and I build my own digital tools to replace paper spreadsheets with real-time shop-floor data.",
    skillsTitle: "Technical Skills & Standards",
    achievementsTitle: "Key Shop-Floor Results",
    languagesTitle: "Languages",
    bghGroupHeader: "Grupo BGH · 12 years, 6 roles on the plant floor",
    bghGroupSub: "Progression from new product launches to process design, metrology laboratory, and quality management",
    bghIndustryBadge: "Consumer Electronics & Metrology",
    mirgorGroupHeader: "Mirgor · HVAC Manufacturing (LG Air Conditioning)",
    mirgorGroupSub: "Early career role in finished-product quality assurance, functional testing, and dispatch auditing",
    mirgorIndustryBadge: "HVAC · Line-to-Dispatch Quality",
    experienceTitle: "Work Experience",
    projectsTitle: "Digital Tools I Built",
    certsTitle: "Education & Certifications",
    ctaTitle: "Let's talk",
    ctaSub: "If your plant is facing line quality issues, an upcoming audit, or manual spreadsheet bottlenecks, I'd be glad to share how I would approach them. Open to relocation."
  },
  pt: {
    title: "LÍDER DE QUALIDADE E MELHORIA DE PROCESSOS",
    subtitle: "16 anos em manufatura eletrônica · Auditor Interno ISO 9001 / 14001 / 45001 · Ferramentas digitais próprias",
    contact: "Informações de Contato",
    location: "Tierra del Fuego, Argentina (Disponível para Relocação)",
    languagesHeader: "Espanhol (Nativo) · Inglês (B2+ Profissional) · Português (Básico)",
    summaryTitle: "Perfil Profissional",
    summary: "Trabalho há mais de 16 anos em fábricas de manufatura eletrônica e climatização, com produtos da LG, Motorola, Samsung, Huawei, Sony e Alcatel. Comecei no controle de qualidade de produto acabado e cresci para o projeto de processos, metrologia e gestão da qualidade. O que faço de melhor é estabilizar linhas de produção: projetar o processo, balancear postos, encontrar a causa raiz dos defeitos e sustentar as melhorias no tempo. Sou auditor interno ISO 9001, 14001 e 45001, e desenvolvo minhas próprias ferramentas digitais para substituir planilhas de papel e ter dados da fábrica em tempo real.",
    skillsTitle: "Conhecimentos Técnicos e Normas",
    achievementsTitle: "Resultados em Destaque na Fábrica",
    languagesTitle: "Idiomas",
    bghGroupHeader: "Grupo BGH · 12 anos e 6 cargos na fábrica",
    bghGroupSub: "Evolução contínua desde qualidade em novos lançamentos até projeto de processos, metrologia e gestão da qualidade",
    bghIndustryBadge: "Eletrônica de Consumo & Metrologia",
    mirgorGroupHeader: "Mirgor · Indústria de Climatização (Equipamentos LG)",
    mirgorGroupSub: "Etapa inicial em garantia de qualidade de produto acabado, testes funcionais e auditoria de embarque",
    mirgorIndustryBadge: "Climatização · Qualidade de Ponta a Ponta",
    experienceTitle: "Experiência Profissional",
    projectsTitle: "Ferramentas Digitais que Desenvolvi",
    certsTitle: "Educação e Certificações",
    ctaTitle: "Vamos conversar?",
    ctaSub: "Se sua fábrica tem problemas de qualidade, uma auditoria pela frente ou dados que ainda são carregados à mão, terei prazer em contar como eu encararia isso. Disponível para relocação."
  }
};

function cleanHtmlDescription(desc: string): string {
  if (desc.includes('●')) {
    const parts = desc.split(/●\s*/);
    const intro = parts[0].replace(/<br\s*\/?>/g, '').trim();
    const bullets = parts.slice(1).map(p => p.replace(/<br\s*\/?>/g, '').trim()).filter(Boolean);
    let result = '';
    if (intro) {
      result += `<div class="exp-intro">${intro}</div>`;
    }
    if (bullets.length > 0) {
      result += '<ul class="exp-bullets">' + 
        bullets.map(b => `<li>${b}</li>`).join('') + 
        '</ul>';
    }
    return result;
  }
  return desc;
}

async function run() {
  console.log("Launching headless browser for balanced 3-page PDF generation...");
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  // Match A4 printable width (210mm - 22mm side margins = 188mm ≈ 711px at 96dpi)
  await page.setViewport({ width: 711, height: 1062 });

  const languages: Array<"es" | "en" | "pt"> = ['es', 'en', 'pt'];
  for (const lang of languages) {
    console.log(`Generating balanced 3-page resume PDF for: ${lang}...`);
    const trans = translations[lang];

    // 4-Column Key Metrics Strip (Page 1)
    const statsHtml = STATS.map(s => {
      const num = (s.number === '2 hs' && lang === 'en') ? '2 hrs' : s.number;
      return `
      <div class="stat-card">
        <div class="stat-num">${num}</div>
        <div class="stat-label">${s.label[lang]}</div>
        <div class="stat-sub">${s.sub[lang]}</div>
      </div>
    `;
    }).join('\n');

    // 2x2 Grid Skills (Page 1)
    const skillBlocks = [
      {
        title: lang === 'es' ? 'Sistemas y Normas' : lang === 'pt' ? 'Sistemas e Normas' : 'Systems & Standards',
        body: lang === 'es'
          ? 'Auditor Interno ISO 9001 / 14001 / 45001 · IATF 16949 · ISO/IEC 17025 (Metrología) · ANSI/ESD S20.20 · Auditorías de Proceso y Producto'
          : lang === 'pt'
            ? 'Auditor Interno ISO 9001 / 14001 / 45001 · IATF 16949 · ISO/IEC 17025 (Metrologia) · ANSI/ESD S20.20 · Auditorias de Processo e Produto'
            : 'ISO 9001 / 14001 / 45001 Internal Auditor · IATF 16949 · ISO/IEC 17025 (Metrology) · ANSI/ESD S20.20 · Process & Product Audits'
      },
      {
        title: lang === 'es' ? 'Ingeniería de Procesos' : lang === 'pt' ? 'Engenharia de Processos' : 'Process Engineering',
        body: lang === 'es'
          ? 'Diseño de Manufactura · Balanceo de Líneas Lean · APQP / PFMEA y Planes de Control · Trabajo Estándar y Ergonomía de Puesto'
          : lang === 'pt'
            ? 'Projeto de Manufatura · Balanceamento de Linhas Lean · APQP / PFMEA e Planos de Controle · Trabalho Padrão e Ergonomia'
            : 'Manufacturing Process Design · Lean Line Balancing · APQP / PFMEA & Control Plans · Standard Work & Workstation Ergonomics'
      },
      {
        title: lang === 'es' ? 'Resolución de Problemas' : lang === 'pt' ? 'Solução de Problemas' : 'Problem Solving',
        body: lang === 'es'
          ? 'Análisis de Causa Raíz (RCA: 8D, 5 Porqués, Ishikawa) · Acciones Correctivas (CAPA) · Control Estadístico (SPC / MSA) · Análisis de Fallas'
          : lang === 'pt'
            ? 'Análise de Causa Raiz (RCA: 8D, 5 Porquês, Ishikawa) · Ações Corretivas (CAPA) · Controle Estatístico (SPC / MSA) · Análise de Falhas'
            : 'Root Cause Analysis (RCA: 8D, 5 Whys, Ishikawa) · Closed-Loop CAPA · Statistical Process Control (SPC / MSA) · Failure Analysis'
      },
      {
        title: lang === 'es' ? 'Digitalización y Datos' : lang === 'pt' ? 'Digitalização e Dados' : 'Digitalization & Data',
        body: lang === 'es'
          ? 'Registro Digital en Planta (Sin Papel) · Trazabilidad de Lotes · Desarrollo de Apps Operativas (React, Python) · Automatización con IA'
          : lang === 'pt'
            ? 'Registro Digital na Fábrica (Sem Papel) · Rastreabilidade de Lotes · Apps Operacionais (React, Python) · Automação com IA'
            : 'Paperless Shop-Floor Logging · Lot Traceability · Operational Web Apps (React, Python) · Applied AI & Workflow Automation'
      }
    ];

    const skillsHtml = `
      <div class="skills-grid">
        ${skillBlocks.map(sb => `
          <div class="skill-card">
            <div class="skill-card-title">${sb.title}</div>
            <div class="skill-card-body">${sb.body}</div>
          </div>
        `).join('\n')}
      </div>
    `;

    // Achievements Html (Page 1)
    const achievementsHtml = ACHIEVEMENTS.map(a => {
      const text = a.text[lang];
      const badgeText = (a.accent === '2 horas' && lang === 'en') ? '2 hrs' : (a.accent || a.icon);
      return `
        <div class="achievement-card">
          <div class="achievement-badge">${badgeText}</div>
          <div class="achievement-body">${text}</div>
        </div>
      `;
    }).join('\n');

    // Languages Strip (Page 1)
    const visibleLangs = LANGUAGES.filter(l => l.name[lang].trim() !== '');
    const langsHtml = `
      <div class="languages-grid cols-${visibleLangs.length}">
        ${visibleLangs.map(l => `
          <div class="lang-card">
            <div class="lang-card-top">
              <strong>${l.name[lang]}</strong>
              <span class="lang-level-pill">${l.level[lang]}</span>
            </div>
            <div class="lang-card-desc">${l.desc[lang]}</div>
          </div>
        `).join('\n')}
      </div>
    `;

    // Experience Items (Page 2) — Split clearly into Grupo BGH and Mirgor
    const bghExperiences = EXPERIENCES.filter(e => e.company === 'Grupo BGH');
    const mirgorExperiences = EXPERIENCES.filter(e => e.company === 'Mirgor');

    const renderRoleItem = (e: typeof EXPERIENCES[number], isMirgor = false) => {
      const role = e.role[lang];
      const dates = e.dates[lang];
      const desc = cleanHtmlDescription(e.desc[lang]);
      const highlight = e.highlight ? `<div class="exp-highlight ${isMirgor ? 'mirgor-highlight' : ''}">★ ${e.highlight[lang]}</div>` : '';
      return `
        <div class="experience-item ${isMirgor ? 'mirgor-item' : 'bgh-item'}">
          <div class="exp-header">
            <span class="exp-title">${role}</span>
            <span class="exp-date ${isMirgor ? 'mirgor-date' : ''}">${dates}</span>
          </div>
          <div class="exp-desc-container">${desc}</div>
          ${highlight}
        </div>
      `;
    };

    const experiencesHtml = `
      <div class="company-block bgh-block">
        <div class="bgh-group-header">
          <div class="company-header-row">
            <div class="bgh-title">${trans.bghGroupHeader}</div>
            <span class="company-badge bgh-badge">${trans.bghIndustryBadge}</span>
          </div>
          <div class="bgh-sub">${trans.bghGroupSub}</div>
        </div>
        <div class="bgh-roles-timeline">
          ${bghExperiences.map(e => renderRoleItem(e, false)).join('\n')}
        </div>
      </div>

      <div class="company-divider"></div>

      <div class="company-block mirgor-block">
        <div class="mirgor-group-header">
          <div class="company-header-row">
            <div class="mirgor-title">${trans.mirgorGroupHeader}</div>
            <span class="company-badge mirgor-badge">${trans.mirgorIndustryBadge}</span>
          </div>
          <div class="mirgor-sub">${trans.mirgorGroupSub}</div>
        </div>
        <div class="mirgor-roles-timeline">
          ${mirgorExperiences.map(e => renderRoleItem(e, true)).join('\n')}
        </div>
      </div>
    `;

    // Projects Html (Page 3) — Full 3 features + clickable URL
    const projectsHtml = PROJECTS.map(p => {
      const tag = p.tag[lang];
      const desc = p.desc[lang];
      const features = p.features ? p.features.slice(0, 3).map(f => `<li>${f[lang]}</li>`).join('') : '';
      const linkHtml = p.link
        ? `<a class="project-link" href="${p.link}">${p.link.replace(/^https?:\/\//, '')} ↗</a>`
        : '';
      return `
        <div class="project-card">
          <div class="project-header">
            <div class="project-title-group">
              <span class="project-title">${p.title}</span>
              ${linkHtml}
            </div>
            <span class="project-tag">${tag}</span>
          </div>
          <div class="project-desc">${desc}</div>
          ${features ? `<ul class="project-features">${features}</ul>` : ''}
        </div>
      `;
    }).join('\n');

    // Certifications Html (Page 3) — Include descriptions
    const certsCategoriesHtml = CERT_CATEGORIES.map(cat => {
      const categoryCerts = CERTS.filter(c => c.category === cat.id);
      const isSingle = categoryCerts.length === 1;
      const itemsHtml = categoryCerts.map(c => {
        const descText = c.description ? `<div class="cert-desc">${c.description[lang]}</div>` : '';
        return `
          <div class="cert-item">
            <span class="cert-icon">${c.icon}</span>
            <div class="cert-text">
              <div class="cert-name-line"><strong>${c.name[lang]}</strong> · <span class="cert-org">${c.org[lang]}</span></div>
              ${descText}
            </div>
          </div>
        `;
      }).join('\n');

      return `
        <div class="cert-category-block">
          <div class="cert-cat-title">${cat.title[lang]}</div>
          <div class="certs-grid ${isSingle ? 'certs-grid-single' : ''}">
            ${itemsHtml}
          </div>
        </div>
      `;
    }).join('\n');

    const htmlContent = `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>Guillermo Cañete - CV</title>
  <style>
    @page {
      size: A4;
      margin: 8mm 11mm 8mm 11mm;
    }
    * {
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #24221f;
      line-height: 1.35;
      margin: 0;
      padding: 0;
      font-size: 8.6pt;
    }
    .page {
      width: 100%;
    }
    .page-1, .page-3 {
      min-height: 990px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .page-2 {
      height: auto;
    }
    .page-break {
      page-break-after: always;
      break-after: page;
      height: 0;
      display: block;
      clear: both;
    }

    /* HEADER */
    .header {
      border-bottom: 2px solid #c84b1a;
      padding-bottom: 9px;
      margin-bottom: 6px;
    }
    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3px;
    }
    .header h1 {
      font-size: 23pt;
      font-weight: 800;
      color: #1a1814;
      margin: 0;
      letter-spacing: -0.4px;
    }
    .header-lang {
      font-size: 7.8pt;
      font-weight: 600;
      color: #c84b1a;
      background: #fdf6f2;
      border: 1px solid #f2cfbf;
      padding: 3px 8px;
      border-radius: 3px;
    }
    .header h2 {
      font-size: 10.5pt;
      font-weight: 700;
      color: #c84b1a;
      margin: 2px 0 3px 0;
      letter-spacing: 0.4px;
    }
    .subtitle {
      font-size: 8.6pt;
      color: #4f4a42;
      font-style: italic;
      margin-bottom: 6px;
    }
    .contact-info {
      font-size: 8pt;
      color: #3d3932;
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      padding-top: 2px;
    }
    .contact-info a {
      color: #c84b1a;
      text-decoration: none;
      font-weight: 600;
    }

    /* SECTION TITLES */
    .section-title {
      font-size: 9pt;
      font-weight: 700;
      color: #1a1814;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1.5px solid #c84b1a;
      padding-bottom: 2px;
      margin-top: 6px;
      margin-bottom: 6px;
    }

    /* PAGE 1: KEY METRICS STRIP */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 4px;
    }
    .stat-card {
      background: #fdf8f4;
      border: 1px solid #f0d5c8;
      border-top: 2.5px solid #c84b1a;
      border-radius: 4px;
      padding: 7px 9px;
    }
    .stat-num {
      font-size: 14pt;
      font-weight: 800;
      color: #c84b1a;
      line-height: 1.1;
      margin-bottom: 2px;
    }
    .stat-label {
      font-size: 7.8pt;
      font-weight: 700;
      color: #1a1814;
      line-height: 1.2;
      margin-bottom: 2px;
    }
    .stat-sub {
      font-size: 7pt;
      color: #5c564e;
      line-height: 1.22;
    }

    /* SUMMARY */
    .profile-desc {
      font-size: 8.8pt;
      line-height: 1.44;
      color: #2b2823;
      margin: 0;
      text-align: justify;
      background: #faf8f5;
      border-left: 3px solid #c84b1a;
      padding: 9px 13px;
      border-radius: 0 4px 4px 0;
    }

    /* 2x2 SKILLS CARDS */
    .skills-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .skill-card {
      background: #ffffff;
      border: 1px solid #e5dfd5;
      border-top: 2px solid #c84b1a;
      border-radius: 4px;
      padding: 7px 10px;
    }
    .skill-card-title {
      font-size: 8.5pt;
      font-weight: 700;
      color: #c84b1a;
      margin-bottom: 3px;
    }
    .skill-card-body {
      font-size: 8pt;
      line-height: 1.36;
      color: #333;
    }

    /* ACHIEVEMENTS CARDS */
    .achievements-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .achievement-card {
      display: flex;
      align-items: flex-start;
      gap: 9px;
      background: #fdfcf9;
      border: 1px solid #e7e1d7;
      border-left: 3px solid #c84b1a;
      border-radius: 4px;
      padding: 6px 10px;
    }
    .achievement-badge {
      font-size: 7.6pt;
      font-weight: 800;
      color: #c84b1a;
      background: #fdf1eb;
      border: 1px solid #f0cab7;
      border-radius: 3px;
      padding: 2px 6px;
      min-width: 58px;
      text-align: center;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .achievement-body {
      font-size: 8.1pt;
      line-height: 1.34;
      color: #2d2a25;
    }

    /* LANGUAGES STRIP (BOTTOM OF PAGE 1) */
    .languages-grid {
      display: grid;
      gap: 8px;
    }
    .languages-grid.cols-2 {
      grid-template-columns: 1fr 1fr;
    }
    .languages-grid.cols-3 {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .lang-card {
      background: #f8f6f2;
      border: 1px solid #e5dfd5;
      border-radius: 4px;
      padding: 6px 10px;
    }
    .lang-card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 8.2pt;
      color: #1a1814;
      margin-bottom: 2px;
    }
    .lang-level-pill {
      font-size: 7.2pt;
      font-weight: 600;
      color: #c84b1a;
      background: #fdf1eb;
      padding: 1px 6px;
      border-radius: 3px;
    }
    .lang-card-desc {
      font-size: 7.5pt;
      color: #4f4a42;
      line-height: 1.28;
    }

    /* PAGE 2: COMPANY BLOCKS & TIMELINES */
    .company-block {
      width: 100%;
    }
    .company-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5px;
    }
    .company-badge {
      font-size: 7pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      padding: 1.5px 7px;
      border-radius: 3px;
    }
    .bgh-group-header {
      background: #fdf6f2;
      border: 1px solid #f0cbb8;
      border-left: 4px solid #c84b1a;
      padding: 5px 10px;
      margin-bottom: 5px;
      border-radius: 4px;
    }
    .bgh-title {
      font-size: 9pt;
      font-weight: 800;
      color: #1a1814;
      letter-spacing: 0.2px;
    }
    .bgh-badge {
      background: #c84b1a;
      color: #ffffff;
    }
    .bgh-sub {
      font-size: 7.5pt;
      color: #5c524a;
      font-style: italic;
    }
    .bgh-roles-timeline {
      border-left: 2px solid #ecd3c5;
      margin-left: 5px;
      padding-left: 11px;
      display: flex;
      flex-direction: column;
      gap: 4.5px;
    }

    .company-divider {
      border-top: 1.5px dashed #d4cec4;
      margin: 8px 0;
    }

    .mirgor-block {
      margin-top: 0;
    }
    .mirgor-group-header {
      background: #eef3f9;
      border: 1px solid #bfd0e6;
      border-left: 4px solid #1e3a5f;
      padding: 5px 10px;
      margin-bottom: 5px;
      border-radius: 4px;
    }
    .mirgor-title {
      font-size: 9pt;
      font-weight: 800;
      color: #132842;
      letter-spacing: 0.2px;
    }
    .mirgor-badge {
      background: #1e3a5f;
      color: #ffffff;
    }
    .mirgor-sub {
      font-size: 7.5pt;
      color: #3c4f66;
      font-style: italic;
    }
    .mirgor-roles-timeline {
      border-left: 2px solid #bfd0e6;
      margin-left: 5px;
      padding: 5px 10px 5px 11px;
      background: #f8fafd;
      border-radius: 0 4px 4px 0;
    }

    .experience-item {
      page-break-inside: avoid;
      padding-bottom: 5px;
      border-bottom: 1px solid #f0ece4;
    }
    .experience-item:last-child {
      padding-bottom: 0;
      border-bottom: none;
    }
    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1px;
    }
    .exp-title {
      font-size: 8.4pt;
      font-weight: 700;
      color: #1a1814;
    }
    .exp-date {
      font-size: 7.2pt;
      color: #7c3818;
      background: #fdf4ef;
      border: 1px solid #f2dacd;
      padding: 1px 6px;
      border-radius: 3px;
      font-weight: 600;
      white-space: nowrap;
    }
    .exp-date.mirgor-date {
      color: #1e3a5f;
      background: #eaf0f7;
      border-color: #c5d4e8;
    }
    .exp-intro {
      font-size: 7.7pt;
      color: #2f2c27;
      line-height: 1.22;
      margin-bottom: 1.5px;
    }
    .exp-bullets {
      margin: 0;
      padding-left: 12px;
      font-size: 7.55pt;
      line-height: 1.22;
      color: #2b2b2b;
    }
    .exp-bullets li {
      margin-bottom: 1.4px;
    }
    .exp-highlight {
      font-size: 7.1pt;
      font-weight: 700;
      color: #c84b1a;
      margin-top: 1.5px;
      padding-left: 12px;
    }
    .exp-highlight.mirgor-highlight {
      color: #1e3a5f;
    }

    /* PAGE 3: PROJECTS */
    .projects-list {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-bottom: 2px;
    }
    .project-card {
      background: #fdfcf8;
      border: 1px solid #ddd6ca;
      border-left: 3.5px solid #2b4c7e;
      border-radius: 4px;
      padding: 6px 10px;
    }
    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
      gap: 8px;
    }
    .project-title-group {
      display: flex;
      align-items: baseline;
      gap: 8px;
      flex-wrap: wrap;
    }
    .project-title {
      font-size: 8.8pt;
      font-weight: 700;
      color: #1a1814;
    }
    .project-link {
      font-size: 7.1pt;
      color: #2b4c7e;
      text-decoration: none;
      font-weight: 600;
    }
    .project-wip {
      font-size: 6.9pt;
      color: #666;
      font-style: italic;
    }
    .project-tag {
      font-size: 6.8pt;
      color: #c84b1a;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      white-space: nowrap;
    }
    .project-desc {
      font-size: 7.8pt;
      line-height: 1.25;
      color: #2d2a25;
      margin-bottom: 2px;
    }
    .project-features {
      margin: 0;
      padding-left: 13px;
      font-size: 7.4pt;
      line-height: 1.2;
      color: #4f4a42;
    }
    .project-features li {
      margin-bottom: 1px;
    }

    /* PAGE 3: CERTS WITH DESCRIPTIONS */
    .certs-container {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .cert-category-block {
      page-break-inside: avoid;
    }
    .cert-cat-title {
      font-size: 7.7pt;
      font-weight: 700;
      color: #c84b1a;
      text-transform: uppercase;
      letter-spacing: 0.35px;
      margin-bottom: 3px;
      border-bottom: 1px solid #e6e0d5;
      padding-bottom: 1px;
    }
    .certs-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px 10px;
    }
    .certs-grid.certs-grid-single {
      grid-template-columns: 1fr;
    }
    .cert-item {
      font-size: 7.5pt;
      color: #3a3630;
      line-height: 1.18;
      display: flex;
      align-items: flex-start;
      gap: 5px;
      background: #faf9f6;
      border: 1px solid #ece7de;
      border-radius: 3px;
      padding: 3.5px 6px;
    }
    .cert-icon {
      font-size: 8pt;
      flex-shrink: 0;
      margin-top: 0.5px;
    }
    .cert-name-line {
      font-size: 7.4pt;
      color: #1a1814;
      line-height: 1.18;
      margin-bottom: 1px;
    }
    .cert-org {
      font-size: 6.9pt;
      color: #666;
      font-weight: 500;
    }
    .cert-desc {
      font-size: 6.7pt;
      color: #555049;
      line-height: 1.15;
    }

    /* PAGE 3: CTA BOX FOOTER */
    .cta-box {
      margin-top: 4px;
      padding: 8px 12px;
      background: #1a1814;
      color: #fdfcf8;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      page-break-inside: avoid;
    }
    .cta-content {
      flex: 1;
    }
    .cta-title {
      font-size: 9pt;
      font-weight: 700;
      color: #f4a261;
      margin-bottom: 1.5px;
    }
    .cta-sub {
      font-size: 7.7pt;
      color: #e2ded7;
      line-height: 1.26;
    }
    .cta-action {
      text-align: right;
      font-size: 7.8pt;
      line-height: 1.4;
      white-space: nowrap;
      border-left: 1px solid rgba(255,255,255,0.25);
      padding-left: 12px;
    }
    .cta-action a {
      color: #f4a261;
      text-decoration: none;
      font-weight: bold;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: HEADER, KEY METRICS, PROFILE, CORE COMPETENCIES, MEASURED IMPACT & LANGUAGES -->
  <div class="page page-1">
    <div>
      <div class="header">
        <div class="header-top">
          <h1>Guillermo Cañete</h1>
          <div class="header-lang">${trans.languagesHeader}</div>
        </div>
        <h2>${trans.title}</h2>
        <div class="subtitle">${trans.subtitle}</div>
        <div class="contact-info">
          <span>📍 ${trans.location}</span>
          <span>✉️ <a href="mailto:guillermo.canete@hotmail.com">guillermo.canete@hotmail.com</a></span>
          <span>📞 +54 9 2964 413910</span>
          <span>🔗 <a href="https://linkedin.com/in/guillermo-canete">linkedin.com/in/guillermo-canete</a></span>
          <span>🌐 <a href="https://guillermocanete.github.io/cv/">guillermocanete.github.io/cv/</a></span>
        </div>
      </div>

      <div class="stats-grid">
        ${statsHtml}
      </div>

      <div class="section-title">${trans.summaryTitle}</div>
      <p class="profile-desc">${trans.summary}</p>
    </div>

    <div>
      <div class="section-title">${trans.skillsTitle}</div>
      ${skillsHtml}
    </div>

    <div>
      <div class="section-title">${trans.achievementsTitle}</div>
      <div class="achievements-list">
        ${achievementsHtml}
      </div>
    </div>

    <div>
      <div class="section-title">${trans.languagesTitle}</div>
      ${langsHtml}
    </div>
  </div>

  <!-- EXACT PAGE BREAK -->
  <div class="page-break"></div>

  <!-- PAGE 2: COMPLETE INDUSTRIAL WORK EXPERIENCE (GRUPO BGH VS MIRGOR) -->
  <div class="page page-2">
    <div class="section-title" style="margin-top: 0;">${trans.experienceTitle}</div>
    <div class="experience-container">
      ${experiencesHtml}
    </div>
  </div>

  <!-- EXACT PAGE BREAK -->
  <div class="page-break"></div>

  <!-- PAGE 3: SHOP-FLOOR TOOLS, EDUCATION & CERTIFICATIONS, DIAGNOSTIC CTA -->
  <div class="page page-3">
    <div>
      <div class="section-title" style="margin-top: 0;">${trans.projectsTitle}</div>
      <div class="projects-list">
        ${projectsHtml}
      </div>
    </div>

    <div>
      <div class="section-title">${trans.certsTitle}</div>
      <div class="certs-container">
        ${certsCategoriesHtml}
      </div>
    </div>

    <div class="cta-box">
      <div class="cta-content">
        <div class="cta-title">${trans.ctaTitle}</div>
        <div class="cta-sub">${trans.ctaSub}</div>
      </div>
      <div class="cta-action">
        <div><strong>${lang === 'es' ? 'Contacto:' : lang === 'pt' ? 'Contato:' : 'Contact:'}</strong></div>
        <div><a href="mailto:guillermo.canete@hotmail.com">guillermo.canete@hotmail.com</a></div>
        <div>+54 9 2964 413910</div>
      </div>
    </div>
  </div>

</body>
</html>
    `;

    await page.setContent(htmlContent, { waitUntil: 'load' });

    const pageHeights = await page.evaluate(() => {
      const pages = Array.from(document.querySelectorAll('.page'));
      return pages.map((p, i) => {
        const childrenHeight = Array.from(p.children).reduce(
          (sum, el) => sum + el.getBoundingClientRect().height,
          0
        );
        return {
          page: i + 1,
          rectHeight: Math.round(p.getBoundingClientRect().height * 10) / 10,
          childrenHeight: Math.round(childrenHeight * 10) / 10
        };
      });
    });
    console.log(`[${lang}] Page element heights (px):`, pageHeights);

    const pdfPath = path.join(__dirname, 'public', `Guillermo_Canete_CV_${lang}.pdf`);
    
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '8mm',
        bottom: '8mm',
        left: '11mm',
        right: '11mm'
      }
    });
    console.log(`Saved balanced 3-page PDF: Guillermo_Canete_CV_${lang}.pdf`);
  }

  await browser.close();
  console.log("All 3-page PDF resumes generated successfully!");
}

run().catch(err => {
  console.error("PDF generation failed:", err);
  process.exit(1);
});
