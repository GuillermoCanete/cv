import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { EXPERIENCES, CERTS, CERT_CATEGORIES, ACHIEVEMENTS, SKILLS, PROJECTS } from './src/data.ts';

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
    achievementsTitle: "Resultados destacados",
    bghGroupHeader: "Grupo BGH · 12 años y 6 posiciones en planta",
    bghGroupSub: "Crecimiento continuo desde calidad en nuevos lanzamientos hasta ingeniería de procesos, metrología y gestión de calidad",
    experienceTitle: "Experiencia Laboral",
    projectsTitle: "Herramientas digitales que desarrollé",
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
    achievementsTitle: "Key Results",
    bghGroupHeader: "Grupo BGH · 12 years, 6 roles on the plant floor",
    bghGroupSub: "Progression from new product launches to process design, metrology laboratory, and quality management",
    experienceTitle: "Work Experience",
    projectsTitle: "Digital tools I built",
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
    achievementsTitle: "Resultados em destaque",
    bghGroupHeader: "Grupo BGH · 12 anos e 6 cargos na fábrica",
    bghGroupSub: "Evolução contínua desde qualidade em novos lançamentos até projeto de processos, metrologia e gestão da qualidade",
    experienceTitle: "Experiência Profissional",
    projectsTitle: "Ferramentas digitais que desenvolvi",
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
  console.log("Launching headless browser for 3-page spacious, executive PDF generation...");
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  const languages: Array<"es" | "en" | "pt"> = ['es', 'en', 'pt'];
  for (const lang of languages) {
    console.log(`Generating spacious 3-page resume PDF for: ${lang}...`);
    const trans = translations[lang];

    // Filter skills (grouped by category for clean presentation)
    const skillsHtml = `
      <div class="skills-grid">
        <div class="skill-category-item">
          <strong>${lang === 'es' ? 'Sistemas y Normas' : lang === 'pt' ? 'Sistemas e Normas' : 'Systems & Standards'}:</strong>
          ${lang === 'es'
            ? 'Auditor Interno ISO 9001 / 14001 / 45001 · IATF 16949 · ISO 17025 (Metrología) · Auditorías de Proceso y Producto'
            : lang === 'pt'
              ? 'Auditor Interno ISO 9001 / 14001 / 45001 · IATF 16949 · ISO 17025 (Metrologia) · Auditorias de Processo e Produto'
              : 'ISO 9001 / 14001 / 45001 Internal Auditor · IATF 16949 · ISO 17025 (Metrology) · Process & Product Audits'}
        </div>
        <div class="skill-category-item">
          <strong>${lang === 'es' ? 'Ingeniería de Procesos' : lang === 'pt' ? 'Engenharia de Processos' : 'Process Engineering'}:</strong>
          ${lang === 'es'
            ? 'Diseño de Manufactura · Balanceo de Líneas Lean · APQP / FMEA de Proceso · Trabajo Estándar y Ergonomía de Puesto'
            : lang === 'pt'
              ? 'Projeto de Manufatura · Balanceamento de Linhas Lean · APQP / FMEA de Processo · Trabalho Padrão e Ergonomia'
              : 'Manufacturing Process Design · Lean Line Balancing · APQP / Process FMEA · Standard Work & Workstation Ergonomics'}
        </div>
        <div class="skill-category-item">
          <strong>${lang === 'es' ? 'Resolución de Problemas' : lang === 'pt' ? 'Solução de Problemas' : 'Problem Solving'}:</strong>
          ${lang === 'es'
            ? 'Análisis de Causa Raíz (RCA: 8D, 5 Porqués, Ishikawa) · Acciones Correctivas (CAPA) · Control Estadístico (SPC/MSA)'
            : lang === 'pt'
              ? 'Análise de Causa Raiz (RCA: 8D, 5 Porquês, Ishikawa) · Ações Corretivas (CAPA) · Controle Estatístico (SPC/MSA)'
              : 'Root Cause Analysis (RCA: 8D, 5 Whys, Ishikawa) · Closed-Loop CAPA · Statistical Process Control (SPC/MSA)'}
        </div>
        <div class="skill-category-item">
          <strong>${lang === 'es' ? 'Digitalización y Datos' : lang === 'pt' ? 'Digitalização e Dados' : 'Digitalization & Data'}:</strong>
          ${lang === 'es'
            ? 'Registro Digital en Planta (Sin Papel) · Trazabilidad de Lotes · Desarrollo Rápido de Aplicaciones (Python, React) · Automatización'
            : lang === 'pt'
              ? 'Registro Digital na Fábrica (Sem Papel) · Rastreabilidade de Lotes · Desenvolvimento Rápido de Aplicações (Python, React) · Automação'
              : 'Paperless Shop-Floor Logging · Lot Traceability · Rapid Local Tooling Development (Python, React) · Workflow Automation'}
        </div>
      </div>
    `;

    // Achievements Html
    const achievementsHtml = ACHIEVEMENTS.map(a => {
      const text = a.text[lang];
      return `<div class="achievement-item"><strong>${a.accent}:</strong> ${text}</div>`;
    }).join('\n');

    // Projects Html (Page 3)
    const projectsHtml = PROJECTS.map(p => {
      const tag = p.tag[lang];
      const desc = p.desc[lang];
      const features = p.features ? p.features.slice(0, 2).map(f => `<li>${f[lang]}</li>`).join('') : '';
      return `
        <div class="project-card">
          <div class="project-header">
            <span class="project-title">${p.title}</span>
            <span class="project-tag">${tag}</span>
          </div>
          <div class="project-desc">${desc}</div>
          ${features ? `<ul class="project-features">${features}</ul>` : ''}
        </div>
      `;
    }).join('\n');

    // Experience Items (Page 2)
    const experiencesHtml = EXPERIENCES.map((e, idx) => {
      const role = e.role[lang];
      const dates = e.dates[lang];
      const desc = cleanHtmlDescription(e.desc[lang]);
      const highlight = e.highlight ? `<div class="exp-highlight">★ ${e.highlight[lang]}</div>` : '';
      
      // Add banner before first BGH experience
      const bghBanner = (idx === 0) ? `
        <div class="bgh-group-header">
          <div class="bgh-title">${trans.bghGroupHeader}</div>
          <div class="bgh-sub">${trans.bghGroupSub}</div>
        </div>
      ` : '';

      return `
        ${bghBanner}
        <div class="experience-item">
          <div class="exp-header">
            <span class="exp-title">${role}</span>
            <span class="exp-date">${dates}</span>
          </div>
          <div class="exp-company">${e.company}</div>
          <div class="exp-desc-container">${desc}</div>
          ${highlight}
        </div>
      `;
    }).join('\n');

    // Group certifications by category with clean presentation (Page 3)
    const certsCategoriesHtml = CERT_CATEGORIES.map(cat => {
      const categoryCerts = CERTS.filter(c => c.category === cat.id);
      const itemsHtml = categoryCerts.map(c => `
        <div class="cert-item">
          <span class="cert-icon">${c.icon}</span>
          <div class="cert-text">
            <strong>${c.name[lang]}</strong> — <span class="cert-org">${c.org[lang]}</span>
          </div>
        </div>
      `).join('\n');

      return `
        <div class="cert-category-block">
          <div class="cert-cat-title">${cat.title[lang]}</div>
          <div class="certs-grid">
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
      line-height: 1.3;
      margin: 0;
      padding: 0;
      font-size: 8.4pt;
    }
    .page {
      width: 100%;
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
      padding-bottom: 5px;
      margin-bottom: 6px;
    }
    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .header h1 {
      font-size: 21pt;
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
      padding: 2px 6px;
      border-radius: 3px;
    }
    .header h2 {
      font-size: 9.6pt;
      font-weight: 700;
      color: #c84b1a;
      margin: 2.5px 0 1.5px 0;
      letter-spacing: 0.3px;
    }
    .subtitle {
      font-size: 8pt;
      color: #555;
      font-style: italic;
      margin-bottom: 4px;
    }
    .contact-info {
      font-size: 7.6pt;
      color: #444;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      padding-top: 2px;
    }
    .contact-info a {
      color: #c84b1a;
      text-decoration: none;
    }

    /* SECTION TITLES */
    .section-title {
      font-size: 8.6pt;
      font-weight: 700;
      color: #1a1814;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      border-bottom: 1.5px solid #c84b1a;
      padding-bottom: 1.5px;
      margin-top: 7px;
      margin-bottom: 4.5px;
    }

    /* SUMMARY */
    .profile-desc {
      font-size: 8.2pt;
      line-height: 1.32;
      color: #2b2b2b;
      margin: 0 0 6px 0;
      text-align: justify;
    }

    /* SKILLS */
    .skills-grid {
      display: flex;
      flex-direction: column;
      gap: 2.5px;
      margin-bottom: 5px;
    }
    .skill-category-item {
      font-size: 7.8pt;
      line-height: 1.25;
      color: #333;
    }
    .skill-category-item strong {
      color: #c84b1a;
    }

    /* ACHIEVEMENTS */
    .achievements-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 5px;
    }
    .achievement-item {
      font-size: 7.8pt;
      line-height: 1.26;
      color: #333;
      padding-left: 8px;
      border-left: 2px solid #c84b1a;
    }
    .achievement-item strong {
      color: #1a1814;
    }

    /* BGH GROUP HEADER (PAGE 2) */
    .bgh-group-header {
      background: #fdf9f6;
      border: 1px solid #f0d5c8;
      border-left: 3.5px solid #c84b1a;
      padding: 3.5px 8px;
      margin-bottom: 4px;
      border-radius: 2px;
    }
    .bgh-title {
      font-size: 8.4pt;
      font-weight: 800;
      color: #1a1814;
      letter-spacing: 0.2px;
    }
    .bgh-sub {
      font-size: 7.2pt;
      color: #666;
      font-style: italic;
    }

    /* EXPERIENCE (PAGE 2) */
    .experience-container {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .experience-item {
      margin-bottom: 1.5px;
      page-break-inside: avoid;
    }
    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .exp-title {
      font-size: 8.2pt;
      font-weight: 700;
      color: #1a1814;
    }
    .exp-date {
      font-size: 7.2pt;
      color: #666;
      font-weight: 500;
    }
    .exp-company {
      font-size: 7.6pt;
      font-weight: 700;
      color: #c84b1a;
      display: inline-block;
      margin-bottom: 1px;
    }
    .exp-intro {
      font-size: 7.6pt;
      color: #333;
      line-height: 1.2;
      margin-bottom: 1.5px;
    }
    .exp-bullets {
      margin: 0;
      padding-left: 12px;
      font-size: 7.4pt;
      line-height: 1.18;
      color: #2b2b2b;
    }
    .exp-bullets li {
      margin-bottom: 1px;
    }
    .exp-highlight {
      font-size: 7pt;
      font-weight: 600;
      color: #c84b1a;
      margin-top: 1px;
      padding-left: 12px;
    }

    /* PROJECTS (PAGE 3) */
    .projects-list {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-bottom: 8px;
    }
    .project-card {
      background: #fdfcf8;
      border: 1px solid #dcd7ce;
      border-left: 3px solid #2b4c7e;
      border-radius: 3px;
      padding: 5px 8px;
    }
    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
    }
    .project-title {
      font-size: 8.4pt;
      font-weight: 700;
      color: #1a1814;
    }
    .project-tag {
      font-size: 6.8pt;
      color: #c84b1a;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .project-desc {
      font-size: 7.6pt;
      line-height: 1.24;
      color: #333;
      margin-bottom: 2px;
    }
    .project-features {
      margin: 0;
      padding-left: 12px;
      font-size: 7.2pt;
      line-height: 1.18;
      color: #555;
    }
    .project-features li {
      margin-bottom: 0.5px;
    }

    /* CERTS (PAGE 3) */
    .certs-container {
      margin-bottom: 8px;
    }
    .cert-category-block {
      margin-bottom: 5px;
      page-break-inside: avoid;
    }
    .cert-cat-title {
      font-size: 7.8pt;
      font-weight: 700;
      color: #c84b1a;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      margin-bottom: 2px;
      border-bottom: 1px solid #e8e4dc;
      padding-bottom: 1px;
    }
    .certs-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.5px 10px;
    }
    .cert-item {
      font-size: 7.4pt;
      color: #3a3630;
      line-height: 1.16;
      display: flex;
      align-items: flex-start;
      gap: 3.5px;
    }
    .cert-icon {
      font-size: 7.6pt;
      flex-shrink: 0;
    }
    .cert-org {
      font-size: 7pt;
      color: #666;
    }

    /* CTA BOX (PAGE 3 FOOTER) */
    .cta-box {
      margin-top: 6px;
      padding: 5px 8px;
      background: #1a1814;
      color: #fdfcf8;
      border-radius: 3px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      page-break-inside: avoid;
    }
    .cta-content {
      flex: 1;
    }
    .cta-title {
      font-size: 8pt;
      font-weight: 700;
      color: #f4a261;
      margin-bottom: 1.5px;
    }
    .cta-sub {
      font-size: 7.2pt;
      color: #ddd;
      line-height: 1.18;
    }
    .cta-action {
      text-align: right;
      font-size: 7.2pt;
      white-space: nowrap;
      border-left: 1px solid rgba(255,255,255,0.25);
      padding-left: 8px;
    }
    .cta-action a {
      color: #f4a261;
      text-decoration: none;
      font-weight: bold;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: HEADER, VALUE PROPOSITION, CORE COMPETENCIES & MEASURED IMPACT -->
  <div class="page">
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

    <div class="section-title">${trans.summaryTitle}</div>
    <p class="profile-desc">${trans.summary}</p>

    <div class="section-title">${trans.skillsTitle}</div>
    ${skillsHtml}

    <div class="section-title">${trans.achievementsTitle}</div>
    <div class="achievements-list">
      ${achievementsHtml}
    </div>
  </div>

  <!-- EXACT PAGE BREAK -->
  <div class="page-break"></div>

  <!-- PAGE 2: COMPLETE INDUSTRIAL WORK EXPERIENCE & VERTICAL PROGRESSION -->
  <div class="page">
    <div class="section-title" style="margin-top: 0;">${trans.experienceTitle}</div>
    <div class="experience-container">
      ${experiencesHtml}
    </div>
  </div>

  <!-- EXACT PAGE BREAK -->
  <div class="page-break"></div>

  <!-- PAGE 3: PROPRIETARY SHOP-FLOOR TOOLS, EDUCATION & CERTIFICATIONS, DIAGNOSTIC CTA -->
  <div class="page">
    <div class="section-title" style="margin-top: 0;">${trans.projectsTitle}</div>
    <div class="projects-list">
      ${projectsHtml}
    </div>

    <div class="section-title">${trans.certsTitle}</div>
    <div class="certs-container">
      ${certsCategoriesHtml}
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

    // Load HTML directly into Puppeteer
    await page.setContent(htmlContent, { waitUntil: 'load' });

    const pageHeights = await page.evaluate(() => {
      const pages = Array.from(document.querySelectorAll('.page'));
      return pages.map((p, i) => ({
        page: i + 1,
        rectHeight: p.getBoundingClientRect().height
      }));
    });
    console.log(`[${lang}] Page element heights (px):`, pageHeights);

    const pdfPath = path.join(__dirname, 'public', `Guillermo_Canete_CV_${lang}.pdf`);
    
    // Print the page as PDF
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
    console.log(`Saved clean 3-page PDF: Guillermo_Canete_CV_${lang}.pdf`);
  }

  await browser.close();
  console.log("All 3-page PDF resumes generated successfully!");
}

run().catch(err => {
  console.error("PDF generation failed:", err);
  process.exit(1);
});
