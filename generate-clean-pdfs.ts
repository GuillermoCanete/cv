import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import { EXPERIENCES, CERTS, ACHIEVEMENTS, SKILLS } from './src/data.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const translations = {
  es: {
    title: "QUALITY & PROCESS IMPROVEMENT SPECIALIST | SOLVING OPERATIONAL PROBLEMS THROUGH DATA, SIMPLIFICATION & DIGITAL TOOLS",
    contact: "Contacto",
    location: "Tierra del Fuego, Argentina",
    summaryTitle: "Perfil Profesional",
    summary: "Especialista en Calidad y Mejora de Procesos con más de 14 años identificando problemas operativos, encontrando su causa raíz, implementando soluciones prácticas y dejando el sistema mejor que antes en manufactura compleja y de alta confiabilidad (Motorola, Samsung, Huawei, Sony, Alcatel). ISO 9001 / 14001 / 45001 Internal Auditor y conocimientos de TS16949, ANSI/ESD S20.20, con aplicación directa de herramientas Lean (balanceo de línea, trabajo estandarizado, VSM). Actúo como puente directo entre Calidad, Ingeniería y Producción en planta. Además de la mejora de procesos, desarrollo herramientas digitales y aplico soluciones de IA para automatizar tareas repetitivas, asegurar trazabilidad, reducir defectos y mejorar la confiabilidad del proceso. Disponible para relocalización.",
    skillsTitle: "Habilidades Clave & Sistemas",
    achievementsTitle: "Qué he mejorado (Problema → Acción → Impacto)",
    experienceTitle: "Experiencia Profesional",
    certsTitle: "Educación y Certificaciones",
    certBgh: "Auditor Interno de Sistemas de Gestión Integrados: ISO 9001, ISO 14001, ISO 45001 — BGH"
  },
  en: {
    title: "QUALITY & PROCESS IMPROVEMENT SPECIALIST | SOLVING OPERATIONAL PROBLEMS THROUGH DATA, SIMPLIFICATION & DIGITAL TOOLS",
    contact: "Contact Information",
    location: "Tierra del Fuego, Argentina",
    summaryTitle: "Professional Profile",
    summary: "Quality & Process Improvement Specialist with 14+ years identifying shop-floor problems, finding root causes, implementing practical solutions, and leaving systems better than before in complex, high-reliability manufacturing (Motorola, Samsung, Huawei, Sony, Alcatel). ISO 9001 / 14001 / 45001 Internal Auditor & working knowledge of TS16949, ANSI/ESD S20.20, applying hands-on Lean methods (line balancing, standard work, VSM). I serve as a direct bridge between Quality, Engineering, and Production on the plant floor. In addition to process optimization, I build custom digital tools and applied AI workflows to automate repetitive tasks, ensure traceability, reduce defects and improve process reliability. Open to relocation and international assignments.",
    skillsTitle: "Core Competencies & Standards",
    achievementsTitle: "What I Have Improved (Problem → Action → Impact)",
    experienceTitle: "Professional Experience",
    certsTitle: "Education & Certifications",
    certBgh: "Internal Auditor of Integrated Management Systems: ISO 9001, ISO 14001, ISO 45001 — BGH"
  },
  pt: {
    title: "QUALITY & PROCESS IMPROVEMENT SPECIALIST | SOLVING OPERATIONAL PROBLEMS THROUGH DATA, SIMPLIFICATION & DIGITAL TOOLS",
    contact: "Informações de Contato",
    location: "Tierra del Fuego, Argentina",
    summaryTitle: "Perfil Profissional",
    summary: "Especialista em Qualidade e Melhoria de Processos com mais de 14 anos identificando problemas na fábrica, encontrando a causa raiz, implementando soluções práticas e deixando o sistema melhor do que antes na manufatura complexa e de alta confiabilidade (Motorola, Samsung, Huawei, Sony, Alcatel). Auditor Interno ISO 9001 / 14001 / 45001 e conhecimentos de TS16949, ANSI/ESD S20.20, com aplicação direta de ferramentas Lean (balanceamento de linha, trabalho padronizado, VSM). Atuo como ponte direta entre Qualidade, Engenharia e Produção na fábrica. Além da otimização operacional, desenvolvo ferramentas digitais próprias e aplico IA para automatizar tarefas repetitivas, assegurar rastreabilidade, reduzir defeitos e melhorar a confiabilidade do processo. Disponível para relocação.",
    skillsTitle: "Habilidades Principais & Normas",
    achievementsTitle: "O que melhorei (Problema → Ação → Impacto)",
    experienceTitle: "Experiência Profissional",
    certsTitle: "Educação e Certificações",
    certBgh: "Auditor Interno de Sistemas de Gestão Integrados: ISO 9001, ISO 14001, ISO 45001 — BGH"
  }
};

function cleanHtmlDescription(desc: string): string {
  if (desc.includes('●')) {
    const parts = desc.split(/●\s*/);
    const intro = parts[0].replace(/<br\s*\/?>/g, '').trim();
    const bullets = parts.slice(1).map(p => p.replace(/<br\s*\/?>/g, '').trim()).filter(Boolean);
    let result = '';
    if (intro) {
      result += `<div style="margin-bottom: 3px; font-size: 9.2pt;">${intro}</div>`;
    }
    if (bullets.length > 0) {
      result += '<ul style="margin: 2px 0 0 0; padding-left: 15px; font-size: 9.1pt;">' + 
        bullets.map(b => `<li style="margin-bottom: 2px;">${b}</li>`).join('') + 
        '</ul>';
    }
    return result;
  }
  return desc;
}

async function run() {
  console.log("Launching headless browser for clean PDF generation...");
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  const languages: Array<"es" | "en" | "pt"> = ['es', 'en', 'pt'];
  for (const lang of languages) {
    console.log(`Generating clean resume PDF for: ${lang}...`);
    const trans = translations[lang];

    // Filter skills (only name)
    const skillsHtml = SKILLS.filter(s => s.id !== "s9" || lang === 'pt').map(s => {
      const name = s.id === "s7" ? (
        lang === "es" ? "Herramientas Digitales & IA Aplicada" : lang === "pt" ? "Ferramentas Digitais & IA Aplicada" : "Digital Tools & Applied AI"
      ) : s.id === "s8" ? (
        lang === "es" ? "Inglés — B2 | Competencia Profesional" : lang === "pt" ? "Inglês — B2 | Proficiência Profissional" : "English — B2 | Professional Working Proficiency"
      ) : s.id === "s9" ? (
        lang === "pt" ? "Português — Iniciante" : s.name
      ) : s.name;
      return `<div class="skill-item">${name}</div>`;
    }).join('\n');

    // Filter achievements
    const achievementsHtml = ACHIEVEMENTS.map(a => {
      const text = a.text[lang];
      return `<div class="achievement-item">● ${text}</div>`;
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

    // Filter certifications
    const certsHtml = CERTS.map(c => {
      const name = c.name[lang];
      const org = c.org[lang];
      return `
        <div class="cert-item">
          <strong>${c.icon} ${name}</strong><br/>
          <span style="font-size: 8.3pt; color: #666;">${org}</span>
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
      margin: 10mm 12mm 10mm 12mm;
    }
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #2c2924;
      line-height: 1.38;
      margin: 0;
      padding: 0;
      font-size: 9.4pt;
    }
    .header {
      border-bottom: 2px solid #c84b1a;
      padding-bottom: 8px;
      margin-bottom: 10px;
    }
    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .header h1 {
      margin: 0;
      font-size: 21pt;
      font-weight: 700;
      color: #1a1814;
      letter-spacing: -0.5px;
    }
    .header h2 {
      margin: 3px 0 6px 0;
      font-size: 10.5pt;
      font-weight: 600;
      color: #c84b1a;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .contact-info {
      font-size: 8.5pt;
      color: #555;
      margin-top: 2px;
    }
    .contact-info span {
      margin-right: 12px;
    }
    .contact-info a {
      color: #555;
      text-decoration: none;
    }
    .section-title {
      font-size: 10.5pt;
      font-weight: 700;
      text-transform: uppercase;
      color: #1a1814;
      border-bottom: 1.5px solid #c84b1a;
      padding-bottom: 2px;
      margin-top: 15px;
      margin-bottom: 6px;
      letter-spacing: 0.3px;
    }
    .profile-desc {
      margin: 0 0 8px 0;
      text-align: justify;
      color: #4a4640;
      font-size: 9.4pt;
    }
    .skills-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px 12px;
    }
    .skill-item {
      font-size: 8.5pt;
      background: #fdfcf8;
      padding: 3px 6px;
      border-radius: 2px;
      border: 1px solid #d0ccc4;
      text-align: center;
      font-weight: 500;
    }
    .achievements-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px 16px;
    }
    .achievement-item {
      font-size: 9.4pt;
      color: #4a4640;
    }
    .experience-item {
      margin-bottom: 10px;
      page-break-inside: avoid;
    }
    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .exp-title {
      font-size: 10pt;
      font-weight: 700;
      color: #1a1814;
    }
    .exp-company {
      font-size: 9.3pt;
      font-weight: 600;
      color: #c84b1a;
      margin-bottom: 2px;
    }
    .exp-date {
      font-size: 8.5pt;
      color: #666;
      font-weight: 500;
    }
    .exp-desc-container ul {
      margin-top: 2px;
      margin-bottom: 0;
    }
    .exp-desc-container li {
      margin-bottom: 2px;
    }
    .certs-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px 16px;
    }
    .cert-item {
      font-size: 8.8pt;
      color: #4a4640;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-top">
      <h1>Guillermo Cañete</h1>
      <div class="contact-info">
        <span>📍 ${trans.location}</span>
      </div>
    </div>
    <h2>${trans.title}</h2>
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

  <div class="section-title">${trans.achievementsTitle}</div>
  <div class="achievements-list">
    ${achievementsHtml}
  </div>

  <div class="section-title">${trans.experienceTitle}</div>
  <div class="experience-container">
    ${experiencesHtml}
  </div>

  <div class="section-title">${trans.certsTitle}</div>
  <div class="certs-grid">
    ${certsHtml}
  </div>
</body>
</html>
    `;

    // Load HTML directly into Puppeteer
    await page.setContent(htmlContent, { waitUntil: 'load' });

    const pdfPath = path.join(__dirname, 'public', `Guillermo_Canete_CV_${lang}.pdf`);
    
    // Print the page as PDF
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10mm',
        bottom: '10mm',
        left: '12mm',
        right: '12mm'
      }
    });
    console.log(`Saved clean PDF: Guillermo_Canete_CV_${lang}.pdf`);
  }

  await browser.close();
  console.log("PDF resume generation complete!");
  process.exit(0);
}

run().catch(err => {
  console.error("PDF generation failed:", err);
  process.exit(1);
});
