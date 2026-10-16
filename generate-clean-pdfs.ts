import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { EXPERIENCES, CERTS, CERT_CATEGORIES, ACHIEVEMENTS, SKILLS, PROJECTS } from './src/data.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const translations = {
  es: {
    title: "ESPECIALISTA EN CALIDAD OPERATIVA & DIGITALIZACIÓN DE PLANTA",
    subtitle: "Reducción del Costo de No Calidad (COPQ) · Rigor Normativo · Herramientas Digitales a Medida",
    contact: "Contacto",
    location: "Tierra del Fuego, Argentina (Disponible para Relocalización)",
    summaryTitle: "Perfil Profesional",
    summary: "En manufactura de alta exigencia, la brecha entre Calidad, Procesos y Sistemas suele costar semanas de desvíos y miles de dólares en planillas manuales y scrap. Con 14+ años en líneas complejas (Motorola, Samsung, Huawei, Sony, Alcatel), cierro esa brecha desde el primer día: estabilizo líneas con balanceo Lean y trabajo estándar, audito bajo estándares internacionales (Auditor Interno ISO 9001 / 14001 / 45001, IATF 16949) y desarrollo herramientas digitales propias para eliminar cuellos de botella sin depender de largos desarrollos de IT.",
    skillsTitle: "Habilidades Clave & Sistemas",
    languagesTitle: "Idiomas & Movilidad",
    languagesText: "<strong>Español:</strong> Nativo &nbsp;|&nbsp; <strong>Inglés:</strong> B2 (Competencia Profesional — Especificaciones técnicas, auditorías internacionales y gestión directa con proveedores en Asia)",
    achievementsTitle: "Qué he mejorado (Problema → Acción → Impacto Financiero & Capacidad)",
    projectsTitle: "Herramientas Digitales Propias Desarrolladas para Planta",
    experienceTitle: "Experiencia Laboral",
    certsTitle: "Educación & Certificaciones (Jerarquía Operativa)",
    ctaTitle: "¿Cuello de botella en línea, auditoría próxima o planillas manuales ralentizando su planta?",
    ctaSub: "Analicemos en 15 minutos cómo simplificar procesos, blindar la conformidad o digitalizar capturas de datos sin burocracia de IT."
  },
  en: {
    title: "OPERATIONAL QUALITY & PLANT DIGITALIZATION SPECIALIST",
    subtitle: "Cost of Poor Quality (COPQ) Reduction · Regulatory Rigor · Custom Digital Tools",
    contact: "Contact Information",
    location: "Tierra del Fuego, Argentina (Open to Relocation)",
    summaryTitle: "Professional Profile",
    summary: "In high-reliability manufacturing, the gap between Quality, Engineering, and IT often costs weeks of deviations and thousands of dollars in manual spreadsheets and scrap. With 14+ years on complex plant floors (Motorola, Samsung, Huawei, Sony, Alcatel), I bridge that gap from day one: stabilizing lines via Lean balancing and standard work, auditing under international standards (ISO 9001 / 14001 / 45001 Internal Auditor, IATF 16949), and developing custom digital tools to eliminate bottlenecks without waiting for corporate IT backlogs.",
    skillsTitle: "Core Competencies & Standards",
    languagesTitle: "Languages & Mobility",
    languagesText: "<strong>English:</strong> B2 (Professional Working Proficiency — Technical documentation, international audits & direct Asian supplier coordination) &nbsp;|&nbsp; <strong>Spanish:</strong> Native Language",
    achievementsTitle: "What I Have Improved (Problem → Action → Financial & Capacity Impact)",
    projectsTitle: "Proprietary Digital Shop-Floor Tools",
    experienceTitle: "Work Experience",
    certsTitle: "Education & Certifications (Operational Hierarchy)",
    ctaTitle: "Line bottlenecks, upcoming audits, or manual spreadsheets slowing down operations?",
    ctaSub: "Let's spend 15 minutes analyzing how to streamline processes, safeguard compliance, or digitize shop-floor data collection without IT delays."
  },
  pt: {
    title: "ESPECIALISTA EM QUALIDADE OPERACIONAL & DIGITALIZAÇÃO INDUSTRIAL",
    subtitle: "Redução do Custo da Não Qualidade (COPQ) · Rigor Normativo · Ferramentas Digitais sob Medida",
    contact: "Informações de Contato",
    location: "Tierra del Fuego, Argentina (Disponível para Relocação)",
    summaryTitle: "Perfil Profissional",
    summary: "Na manufatura de alta exigência, a lacuna entre Qualidade, Processos e TI costuma custar semanas de desvios e milhares de dólares em planilhas manuais e refugo. Com mais de 14 anos em linhas complexas (Motorola, Samsung, Huawei, Sony, Alcatel), fecho essa lacuna desde o primeiro dia: estabilizo linhas com balanceamento Lean e trabalho padronizado, audito sob normas internacionais (Auditor Interno ISO 9001 / 14001 / 45001, IATF 16949) e desenvolvo ferramentas digitais próprias para eliminar gargalos sem depender da burocracia de TI.",
    skillsTitle: "Habilidades Principais & Normas",
    languagesTitle: "Idiomas & Mobilidade",
    languagesText: "<strong>Espanhol:</strong> Língua Materna &nbsp;|&nbsp; <strong>Inglês:</strong> B2 (Proficiência Profissional — Especificações técnicas, auditorias e gestão de fornecedores na Ásia) &nbsp;|&nbsp; <strong>Português:</strong> Iniciante (Em aprendizado ativo)",
    achievementsTitle: "O que melhorei (Problema → Ação → Impacto Financeiro & Capacidade)",
    projectsTitle: "Ferramentas Digitais Próprias para Fábrica",
    experienceTitle: "Experiência Profissional",
    certsTitle: "Educação & Certificações (Hierarquia Operacional)",
    ctaTitle: "Gargalos na linha, auditoria próxima ou planilhas manuais travando a fábrica?",
    ctaSub: "Vamos analisar em 15 minutos como simplificar processos, blindar a conformidade ou digitalizar a captura de dados sem burocracia de TI."
  }
};

function cleanHtmlDescription(desc: string): string {
  if (desc.includes('●')) {
    const parts = desc.split(/●\s*/);
    const intro = parts[0].replace(/<br\s*\/?>/g, '').trim();
    const bullets = parts.slice(1).map(p => p.replace(/<br\s*\/?>/g, '').trim()).filter(Boolean);
    let result = '';
    if (intro) {
      result += `<div style="margin-bottom: 1.5px; font-size: 7.8pt; color: #333; line-height: 1.2;">${intro}</div>`;
    }
    if (bullets.length > 0) {
      result += '<ul style="margin: 0; padding-left: 13px; font-size: 7.6pt; line-height: 1.18;">' + 
        bullets.map(b => `<li style="margin-bottom: 1px;">${b}</li>`).join('') + 
        '</ul>';
    }
    return result;
  }
  return desc;
}

async function run() {
  console.log("Launching headless browser for 2-page PDF generation...");
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  const languages: Array<"es" | "en" | "pt"> = ['es', 'en', 'pt'];
  for (const lang of languages) {
    console.log(`Generating clean 2-page resume PDF for: ${lang}...`);
    const trans = translations[lang];

    // Filter skills (only name)
    const skillsHtml = SKILLS.map(s => {
      const name = s.id === "s7" ? (
        lang === "es" ? "Herramientas Digitales & IA Aplicada" : lang === "pt" ? "Ferramentas Digitais & IA Aplicada" : "Digital Tools & Applied AI"
      ) : s.id === "s8" ? (
        lang === "es" ? "Instrucciones de Trabajo Digitales (Paperless)" : lang === "pt" ? "Instruções de Trabalho Digitais (Paperless)" : "Digital Work Instructions (Paperless)"
      ) : s.name;
      return `<div class="skill-item">${name}</div>`;
    }).join('\n');

    // Filter achievements
    const achievementsHtml = ACHIEVEMENTS.map(a => {
      const text = a.text[lang];
      return `<div class="achievement-item"><strong>${a.accent}:</strong> ${text}</div>`;
    }).join('\n');

    // Filter projects
    const projectsHtml = PROJECTS.map(p => {
      const tag = p.tag[lang];
      const desc = p.desc[lang];
      return `
        <div class="project-item">
          <div class="project-header">
            <span class="project-title">${p.title}</span>
            <span class="project-tag">${tag}</span>
          </div>
          <div class="project-desc">${desc}</div>
        </div>
      `;
    }).join('\n');

    // Filter experiences
    const experiencesHtml = EXPERIENCES.map(e => {
      const role = e.role[lang];
      const dates = e.dates[lang];
      const desc = cleanHtmlDescription(e.desc[lang]);
      return `
        <div class="experience-item">
          <div class="exp-header">
            <span class="exp-title">${role}</span>
            <span class="exp-date">${dates}</span>
          </div>
          <div class="exp-company">${e.company}</div>
          <div class="exp-desc-container">${desc}</div>
        </div>
      `;
    }).join('\n');

    // Group certifications by category with industrial hierarchy
    const certsCategoriesHtml = CERT_CATEGORIES.map(cat => {
      const categoryCerts = CERTS.filter(c => c.category === cat.id);
      const itemsHtml = categoryCerts.map(c => `
        <div class="cert-item">
          <strong>${c.icon} ${c.name[lang]}</strong> — <span style="font-size: 7.6pt; color: #555;">${c.org[lang]}</span>
        </div>
      `).join('\n');

      return `
        <div class="cert-category-block" style="margin-bottom: 5px;">
          <div style="font-size: 8pt; font-weight: 700; color: #c84b1a; text-transform: uppercase; letter-spacing: 0.3px; margin-bottom: 2px; border-bottom: 1px solid #e8e4dc; padding-bottom: 1px;">
            ${cat.title[lang]}
          </div>
          <div class="certs-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px 10px;">
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
      margin: 8mm 10mm 8mm 10mm;
    }
    * {
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #2c2924;
      line-height: 1.32;
      margin: 0;
      padding: 0;
      font-size: 8.6pt;
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
      margin: 0;
      font-size: 19pt;
      font-weight: 700;
      color: #1a1814;
      letter-spacing: -0.4px;
    }
    .header h2 {
      margin: 2px 0 2px 0;
      font-size: 9.6pt;
      font-weight: 700;
      color: #c84b1a;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    .header .subtitle {
      font-size: 8.4pt;
      font-style: italic;
      color: #4a4640;
      margin-bottom: 3px;
    }
    .contact-info {
      font-size: 8pt;
      color: #444;
      display: flex;
      flex-wrap: wrap;
      gap: 3px 12px;
    }
    .contact-info a {
      color: #1a1814;
      text-decoration: none;
      font-weight: 500;
    }

    /* SECTION TITLES */
    .section-title {
      font-size: 9.5pt;
      font-weight: 700;
      text-transform: uppercase;
      color: #1a1814;
      border-bottom: 1.2px solid #c84b1a;
      padding-bottom: 1px;
      margin-top: 7px;
      margin-bottom: 4px;
      letter-spacing: 0.3px;
    }

    .profile-desc {
      margin: 0 0 5px 0;
      text-align: justify;
      color: #3a3630;
      font-size: 8.5pt;
      line-height: 1.34;
    }

    /* SKILLS */
    .skills-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.5px 8px;
    }
    .skill-item {
      font-size: 8pt;
      background: #fdfcf8;
      padding: 2px 5px;
      border-radius: 2px;
      border: 1px solid #dcd7ce;
      text-align: center;
      font-weight: 500;
      color: #2c2924;
    }

    /* LANGUAGES */
    .languages-box {
      font-size: 8.2pt;
      color: #3a3630;
      background: #fdfcf8;
      padding: 3px 6px;
      border: 1px solid #dcd7ce;
      border-radius: 2px;
    }

    /* ACHIEVEMENTS */
    .achievements-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px 10px;
    }
    .achievement-item {
      font-size: 8.1pt;
      line-height: 1.28;
      color: #3a3630;
      background: #faf8f5;
      padding: 3.5px 6px;
      border-left: 2px solid #c84b1a;
      border-radius: 0 2px 2px 0;
    }

    /* PROJECTS */
    .projects-list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 6px;
    }
    .project-item {
      background: #fdfcf8;
      border: 1px solid #dcd7ce;
      border-top: 2px solid #2b4c7e;
      border-radius: 2px;
      padding: 4px 6px;
    }
    .project-header {
      margin-bottom: 2px;
    }
    .project-title {
      font-size: 8.2pt;
      font-weight: 700;
      color: #1a1814;
      display: block;
    }
    .project-tag {
      font-size: 6.8pt;
      color: #c84b1a;
      font-weight: 600;
      text-transform: uppercase;
      display: block;
    }
    .project-desc {
      font-size: 7.5pt;
      line-height: 1.25;
      color: #444;
    }

    /* EXPERIENCE (PAGE 2) */
    .experience-item {
      margin-bottom: 3.5px;
      page-break-inside: avoid;
    }
    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .exp-title {
      font-size: 8.5pt;
      font-weight: 700;
      color: #1a1814;
    }
    .exp-company {
      font-size: 8pt;
      font-weight: 600;
      color: #c84b1a;
      display: inline-block;
      margin-right: 8px;
    }
    .exp-date {
      font-size: 7.5pt;
      color: #666;
      font-weight: 500;
    }

    /* CERTS */
    .cert-item {
      font-size: 7.5pt;
      color: #3a3630;
      line-height: 1.16;
    }

    /* CTA BOX (PAGE 2 FOOTER) */
    .cta-box {
      margin-top: 5px;
      padding: 4px 8px;
      background: #1a1814;
      color: #fdfcf8;
      border-radius: 3px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }
    .cta-content {
      flex: 1;
    }
    .cta-title {
      font-size: 8pt;
      font-weight: 700;
      color: #f4a261;
      margin-bottom: 1px;
    }
    .cta-sub {
      font-size: 7.2pt;
      color: #ddd;
      line-height: 1.16;
    }
    .cta-action {
      text-align: right;
      font-size: 7.2pt;
      white-space: nowrap;
      border-left: 1px solid rgba(255,255,255,0.2);
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

  <!-- PAGE 1: STRATEGIC HOOK, IMPACT ACHIEVEMENTS & PROPRIETARY TOOLS -->
  <div class="page">
    <div class="header">
      <div class="header-top">
        <h1>Guillermo Cañete</h1>
        <div class="contact-info">
          <span>📍 ${trans.location}</span>
        </div>
      </div>
      <h2>${trans.title}</h2>
      <div class="subtitle">${trans.subtitle}</div>
      <div class="contact-info">
        <span>✉️ <a href="mailto:guillermo.canete@hotmail.com">guillermo.canete@hotmail.com</a></span>
        <span>📞 +54 9 2964 413910</span>
        <span>🔗 <a href="https://linkedin.com/in/guillermo-canete">linkedin.com/in/guillermo-canete</a></span>
        <span>🌐 <a href="https://guillermocanete.github.io/cv/">guillermocanete.github.io/cv/</a></span>
      </div>
    </div>

    <div class="section-title">${trans.summaryTitle}</div>
    <p class="profile-desc">${trans.summary}</p>

    <div class="section-title">${trans.skillsTitle}</div>
    <div class="skills-list">
      ${skillsHtml}
    </div>

    <div class="section-title">${trans.languagesTitle}</div>
    <div class="languages-box">
      ${trans.languagesText}
    </div>

    <div class="section-title">${trans.achievementsTitle}</div>
    <div class="achievements-list">
      ${achievementsHtml}
    </div>

    <div class="section-title">${trans.projectsTitle}</div>
    <div class="projects-list">
      ${projectsHtml}
    </div>
  </div>

  <!-- EXACT PAGE BREAK -->
  <div class="page-break"></div>

  <!-- PAGE 2: INDUSTRIAL TRACK RECORD, CERTIFICATIONS & DIAGNOSTIC CTA -->
  <div class="page">
    <div class="section-title" style="margin-top: 0;">${trans.experienceTitle}</div>
    <div class="experience-container">
      ${experiencesHtml}
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
        <div><strong>Agenda 15 min:</strong></div>
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
        left: '10mm',
        right: '10mm'
      }
    });
    console.log(`Saved clean PDF: Guillermo_Canete_CV_${lang}.pdf`);
  }

  await browser.close();
  console.log("PDF resume generation complete!");
}

run().catch(err => {
  console.error("PDF generation failed:", err);
  process.exit(1);
});
