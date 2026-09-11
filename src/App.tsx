import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Mail, 
  Linkedin, 
  Phone, 
  ExternalLink, 
  X, 
  ChevronRight, 
  Award, 
  Zap, 
  Brain, 
  CheckCircle, 
  Activity, 
  Flame, 
  Layers, 
  AlertTriangle, 
  BookOpen, 
  ArrowUpRight,
  Trash2,
  Grid,
  Download,
  Copy
} from "lucide-react";
import { 
  STATS, 
  SKILLS, 
  SKILL_CATEGORIES,
  ACHIEVEMENTS, 
  EXPERIENCES, 
  PROJECTS, 
  CERTS, 
  ARTICLES, 
  Article 
} from "./data";

// @ts-ignore
import guillermoPhoto from "./assets/images/Guille.png";
// @ts-ignore
import pcbBoard from "./assets/images/PCB.jpeg";
// @ts-ignore
import spacexPhoto from "./assets/images/spacex.png";

// Inline SVG flag components to render correctly on all operating systems/browsers (including Windows Chrome)
function FlagAR() {
  return (
    <svg className="w-4.5 h-3 rounded-sm shadow-[0_0_1px_rgba(0,0,0,0.5)] inline-block flex-shrink-0" viewBox="0 0 9 6" style={{ verticalAlign: 'middle' }}>
      <rect fill="#74acdf" width="9" height="6"/>
      <rect fill="#fff" y="2" width="9" height="2"/>
      <circle fill="#f6b40e" cx="4.5" cy="3" r="0.6"/>
    </svg>
  );
}

function FlagUS() {
  return (
    <svg className="w-4.5 h-3 rounded-sm shadow-[0_0_1px_rgba(0,0,0,0.5)] inline-block flex-shrink-0" viewBox="0 0 30 20" style={{ verticalAlign: 'middle' }}>
      <rect width="30" height="20" fill="#b22234"/>
      <path d="M0,1.54h30M0,4.62h30M0,7.69h30M0,10.77h30M0,13.85h30M0,16.92h30" stroke="#fff" stroke-width="1.54"/>
      <rect width="12" height="10.77" fill="#3c3b6e"/>
    </svg>
  );
}

function FlagBR() {
  return (
    <svg className="w-4.5 h-3 rounded-sm shadow-[0_0_1px_rgba(0,0,0,0.5)] inline-block flex-shrink-0" viewBox="0 0 10 7" style={{ verticalAlign: 'middle' }}>
      <rect fill="#009c3b" width="10" height="7"/>
      <path fill="#ffdf00" d="M5,0.7L9.3,3.5L5,6.3L0.7,3.5Z"/>
      <circle fill="#0021ad" cx="5" cy="3.5" r="1.2"/>
    </svg>
  );
}


interface AnimatedCounterProps {
  value: string;
}

function AnimatedCounter({ value }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = React.useRef<HTMLSpanElement | null>(null);
  const animationStarted = React.useRef(false);

  // Parse target and suffix/prefix (supporting + and - / −)
  const normalized = value.replace("−", "-");
  const isPlus = normalized.startsWith("+");
  const isMinus = normalized.startsWith("-");
  const prefix = isPlus ? "+" : isMinus ? "−" : "";
  const match = normalized.match(/^([+-]?\d+)(.*)$/);
  const target = match ? Math.abs(parseInt(match[1].replace("+", "").replace("-", ""), 10)) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const currentElement = elementRef.current;

    const startAnimation = () => {
      if (animationStarted.current) return;
      animationStarted.current = true;

      const duration = 1800; // 1.8 seconds for smooth ease
      const startTime = performance.now();

      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        
        // Easing function: cubic ease-out
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        setCount(Math.round(easeProgress * target));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };

      requestAnimationFrame(animate);
    };

    if (currentElement && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startAnimation();
              if (observer) observer.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(currentElement);
    } else {
      startAnimation();
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [target]);

  return (
    <span ref={elementRef}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function App() {
  const detectDefaultLanguage = (): "es" | "en" | "pt" => {
    // 1. Check URL query parameters (highest priority for SEO/sharing)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get("lang");
      if (urlLang === "es" || urlLang === "en" || urlLang === "pt") return urlLang;
    } catch (e) {}

    // 2. Check local storage
    const saved = localStorage.getItem("gc-lang");
    if (saved === "es" || saved === "en" || saved === "pt") return saved;

    // 3. Try to detect by browser language
    const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || "";
    if (browserLang.toLowerCase().startsWith("pt")) return "pt";
    if (browserLang.toLowerCase().startsWith("es")) return "es";

    // 4. Try to detect by timezone (covering all Brazilian regions)
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      const lowerTz = tz.toLowerCase();
      const brazilTimezones = [
        "sao_paulo", "brazil", "rio_de_janeiro", "recife", "fortaleza", "porto_alegre",
        "noronha", "belem", "maceio", "manaus", "campo_grande", "cuiaba", "porto_velho",
        "boa_vista", "rio_branco", "araguaina", "bahia", "santarem"
      ];
      if (brazilTimezones.some(tzName => lowerTz.includes(tzName))) {
        return "pt";
      }
    } catch (e) {}

    return "en"; // Default fallback
  };

  const [lang, setLang] = useState<"es" | "en" | "pt">(detectDefaultLanguage);

  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [modalLang, setModalLang] = useState<"es" | "en" | "pt">("es");
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [certModalImage, setCertModalImage] = useState<string | null>(null);

  // PCB Defect Recorder Simulator States
  const [simulatedDefects, setSimulatedDefects] = useState<Array<{ id: number; x: number; y: number; type: string }>>([
    { id: 1, x: 30, y: 40, type: "Solder Bridge" },
    { id: 2, x: 75, y: 25, type: "Missing Component" },
  ]);
  const [selectedDefectType, setSelectedDefectType] = useState<string>("Solder Bridge");

  // ISO compliance interactive states
  const [simulatedISOProgress, setSimulatedISOProgress] = useState({
    c41: 88,
    c62: 45,
    c85: 95,
    c91: 60,
  });

  useEffect(() => {
    localStorage.setItem("gc-lang", lang);
  }, [lang]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsPhotoModalOpen(false);
        setActiveArticle(null);
        setCertModalImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLangSwitch = (target: "es" | "en" | "pt") => {
    setLang(target);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", target);
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    } catch (e) {
      console.error("Error updating URL lang parameter:", e);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleOpenArticle = (article: Article) => {
    setActiveArticle(article);
    setModalLang(lang);
  };

  const handleCloseArticle = () => {
    setActiveArticle(null);
  };

  // Click on Simulated PCB board to add defects
  const handlePcbClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    
    const newDefect = {
      id: Date.now(),
      x,
      y,
      type: selectedDefectType,
    };
    
    setSimulatedDefects((prev) => [...prev, newDefect]);
  };

  const clearSimulatedDefects = () => {
    setSimulatedDefects([]);
  };

  return (
    <div className="min-height-screen bg-cv-bg text-cv-ink selection:bg-cv-accent selection:text-cv-white font-sans transition-colors duration-200">
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 py-4 bg-cv-bg/95 backdrop-blur-md border-b border-cv-line gap-4">
        <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-cv-ink">
          GC // QUALITY &amp; PROCESS
        </span>
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          <li>
            <button 
              onClick={() => scrollToSection("about")} 
              className="text-xs font-bold uppercase tracking-wider text-cv-ink2 hover:text-cv-accent transition-colors cursor-pointer"
            >
              {lang === "es" ? "Sobre mí" : lang === "pt" ? "Sobre mim" : "About"}
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection("achievements")} 
              className="text-xs font-bold uppercase tracking-wider text-cv-ink2 hover:text-cv-accent transition-colors cursor-pointer"
            >
              {lang === "es" ? "Qué he mejorado" : lang === "pt" ? "O que melhorei" : "What I improved"}
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection("experience")} 
              className="text-xs font-bold uppercase tracking-wider text-cv-ink2 hover:text-cv-accent transition-colors cursor-pointer"
            >
              {lang === "es" ? "Experiencia" : lang === "pt" ? "Experiência" : "Experience"}
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection("projects")} 
              className="text-xs font-bold uppercase tracking-wider text-cv-ink2 hover:text-cv-accent transition-colors cursor-pointer"
            >
              {lang === "es" ? "Herramientas" : lang === "pt" ? "Ferramentas" : "Tools"}
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection("certs")} 
              className="text-xs font-bold uppercase tracking-wider text-cv-ink2 hover:text-cv-accent transition-colors cursor-pointer"
            >
              {lang === "es" ? "Certificaciones" : lang === "pt" ? "Certificações" : "Certifications"}
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection("writing")} 
              className="text-xs font-bold uppercase tracking-wider text-cv-ink2 hover:text-cv-accent transition-colors cursor-pointer"
            >
              {lang === "es" ? "Insights" : lang === "pt" ? "Insights" : "Insights"}
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="text-xs font-bold uppercase tracking-wider text-cv-ink2 hover:text-cv-accent transition-colors cursor-pointer"
            >
              {lang === "es" ? "Contacto" : lang === "pt" ? "Contato" : "Contact"}
            </button>
          </li>
        </ul>

        {/* Localized switch for ES/EN and links */}
        <div className="flex items-center gap-3">
          <a 
            href={
              lang === "es" 
                ? "/cv/Guillermo_Canete_CV_es.pdf" 
                : lang === "pt" 
                  ? "/cv/Guillermo_Canete_CV_pt.pdf" 
                  : "/cv/Guillermo_Canete_CV_en.pdf"
            }
            download={
              lang === "es" 
                ? "Guillermo_Canete_CV_es.pdf" 
                : lang === "pt" 
                  ? "Guillermo_Canete_CV_pt.pdf" 
                  : "Guillermo_Canete_CV_en.pdf"
            }
            className="flex items-center gap-1.5 border border-cv-line rounded px-2.5 py-1.5 bg-cv-bg2/40 text-xs text-cv-ink hover:bg-cv-accent hover:text-cv-white hover:border-cv-accent transition-all cursor-pointer font-medium"
            title={
              lang === "es" 
                ? "Descargar CV en PDF" 
                : lang === "pt" 
                  ? "Baixar CV em PDF" 
                  : "Download CV in PDF"
            }
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {lang === "es" ? "Descargar CV" : lang === "pt" ? "Baixar CV" : "Download CV"}
            </span>
          </a>

          <div className="flex gap-1.5 border border-cv-line rounded p-1 bg-cv-bg2/40">
            <button 
              onClick={() => handleLangSwitch("es")}
              className={`text-xs px-2.5 py-1 rounded cursor-pointer transition-all flex items-center gap-1.5 ${lang === "es" ? "bg-cv-accent text-cv-white font-medium scale-105" : "opacity-60 hover:opacity-100"}`}
              title="Español (Argentina)"
            >
              <FlagAR /> es
            </button>
            <button 
              onClick={() => handleLangSwitch("en")}
              className={`text-xs px-2.5 py-1 rounded cursor-pointer transition-all flex items-center gap-1.5 ${lang === "en" ? "bg-cv-accent text-cv-white font-medium scale-105" : "opacity-60 hover:opacity-100"}`}
              title="English (US)"
            >
              <FlagUS /> en
            </button>
            <button 
              onClick={() => handleLangSwitch("pt")}
              className={`text-xs px-2.5 py-1 rounded cursor-pointer transition-all flex items-center gap-1.5 ${lang === "pt" ? "bg-cv-accent text-cv-white font-medium scale-105" : "opacity-60 hover:opacity-100"}`}
              title="Português (Brasil)"
            >
              <FlagBR /> pt
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-12 pt-20 border-b border-cv-line">
        
        {/* Left Side Info */}
        <div className="lg:col-span-7 px-6 sm:px-12 py-12 lg:py-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-cv-line bg-cv-bg">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            {/* Guillermo Professional Portrait */}
            <div 
              onClick={() => setIsPhotoModalOpen(true)}
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-cv-accent2 flex-shrink-0 bg-cv-black shadow-lg cursor-zoom-in hover:scale-105 active:scale-95 transition-transform duration-300 group/avatar"
              title={lang === "es" ? "Ampliar foto de perfil" : lang === "pt" ? "Ampliar foto de perfil" : "Expand profile picture"}
            >
              <img 
                src={guillermoPhoto} 
                alt="Guillermo Cañete" 
                className="w-full h-full object-cover rounded-full group-hover/avatar:opacity-90 transition-opacity" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-1 right-1 bg-green-600 w-3.5 h-3.5 rounded-full border-2 border-cv-white" title="Active"></div>
            </div>

            <div className="flex-1">
              <span className="inline-block font-mono text-[10px] sm:text-xs tracking-widest uppercase text-cv-accent border border-cv-accent px-2.5 py-1 rounded mb-3">
                {lang === "es" ? "Disponible para relocalización" : lang === "pt" ? "Disponível para relocação" : "Available for relocation"}
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl tracking-tight leading-none text-cv-ink">
                Guillermo <br />
                <span className="italic text-cv-accent font-normal">Cañete</span>
              </h1>
            </div>
          </div>

          <div className="mb-8">
            <span className="block font-mono text-xs sm:text-sm text-cv-accent font-bold uppercase tracking-wider mb-2">
              {lang === "es" ? "ESPECIALISTA EN CALIDAD Y MEJORA DE PROCESOS" : lang === "pt" ? "ESPECIALISTA EM QUALIDADE E MELHORIA DE PROCESSOS" : "QUALITY & PROCESS IMPROVEMENT SPECIALIST"}
            </span>
            <span className="block font-serif text-lg sm:text-xl text-cv-ink italic font-normal mb-4">
              {lang === "es" 
                ? "Resuelvo problemas operativos mediante datos, simplificación y herramientas digitales" 
                : lang === "pt" 
                  ? "Resolvo problemas operacionais por meio de dados, simplificação e ferramentas digitais" 
                  : "Solving operational problems through data, simplification & digital tools"}
            </span>
            <p className="text-base sm:text-lg text-cv-ink2 max-w-xl leading-relaxed">
              {lang === "es" ? (
                <>
                  Identifico problemas, simplifico procesos, elimino trabajo innecesario y construyo soluciones prácticas. Con 14+ años en manufactura compleja y alta confiabilidad (Motorola, Samsung, Huawei, Sony, Alcatel), actúo como puente directo entre Calidad, Ingeniería y Producción en planta. <strong>ISO 9001 / 14001 / 45001 Internal Auditor</strong> y conocimientos de <strong>TS16949, ANSI/ESD S20.20</strong>, aplico herramientas Lean prácticas (balanceo de líneas, trabajo estándar, VSM) y construyo herramientas digitales propias para resolver cuellos de botella, reducir costos, reducir defectos y mejorar la confiabilidad del proceso. Disponible para relocalización.
                </>
              ) : lang === "pt" ? (
                <>
                  Identifico problemas, simplifico processos, elimino trabalho desnecessário e construo soluções práticas. Com mais de 14 anos na manufatura complexa e de alta confiabilidade (Motorola, Samsung, Huawei, Sony, Alcatel), atuo como ponte direta entre Qualidade, Engenharia e Produção na fábrica. <strong>Auditor Interno ISO 9001 / 14001 / 45001</strong> e conhecimentos de <strong>TS16949, ANSI/ESD S20.20</strong>, aplico ferramentas Lean práticas (balanceamento de linha, trabalho padrão, VSM) e desenvolvo ferramentas digitais próprias para resolver gargalos, reduzir custos, reduzir defeitos e melhorar a confiabilidade do processo. Disponível para relocação.
                </>
              ) : (
                <>
                  I identify problems, simplify processes, eliminate unnecessary work and build practical solutions. With 14+ years in complex, high-reliability manufacturing (Motorola, Samsung, Huawei, Sony, Alcatel), I bridge Quality, Engineering, and Production on the plant floor. <strong>ISO 9001 / 14001 / 45001 Internal Auditor</strong> & working knowledge of <strong>TS16949, ANSI/ESD S20.20</strong>, applying practical Lean tools (Line Balancing, Standard Work, VSM) and building custom digital tools to resolve bottlenecks, lower costs, reduce defects and improve process reliability. Open to relocation and international assignments.
                </>
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => scrollToSection("contact")}
              className="px-6 py-3 bg-cv-ink text-cv-bg text-xs font-bold tracking-wider uppercase rounded-sm hover:bg-cv-accent hover:text-cv-white transition-all cursor-pointer shadow-sm active:scale-95"
            >
              {lang === "es" ? "Hablemos" : lang === "pt" ? "Fale comigo" : "Let's talk"}
            </button>
            <a 
              href={
                lang === "es" 
                  ? "/cv/Guillermo_Canete_CV_es.pdf" 
                  : lang === "pt" 
                    ? "/cv/Guillermo_Canete_CV_pt.pdf" 
                    : "/cv/Guillermo_Canete_CV_en.pdf"
              }
              download={
                lang === "es" 
                  ? "Guillermo_Canete_CV_es.pdf" 
                  : lang === "pt" 
                    ? "Guillermo_Canete_CV_pt.pdf" 
                    : "Guillermo_Canete_CV_en.pdf"
              }
              className="px-6 py-3 border border-cv-ink text-cv-ink text-xs font-bold tracking-wider uppercase rounded-sm hover:bg-cv-ink hover:text-cv-bg transition-all inline-flex items-center gap-2"
              title={
                lang === "es" 
                  ? "Descargar CV en PDF" 
                  : lang === "pt" 
                    ? "Baixar CV em PDF" 
                    : "Download CV in PDF"
              }
            >
              <Download className="w-4 h-4" />
              {lang === "es" ? "Descargar CV" : lang === "pt" ? "Baixar CV" : "Download CV"}
            </a>
            <a 
              href="https://linkedin.com/in/guillermo-canete" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 border border-cv-ink text-cv-ink text-xs font-bold tracking-wider uppercase rounded-sm hover:bg-cv-ink hover:text-cv-bg transition-all inline-flex items-center gap-2" title={lang === "pt" ? "Disposição para relocalização no Brasil" : ""}
            >
              LinkedIn <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Side Highlight Stats */}
        <div className="lg:col-span-5 px-6 sm:px-12 py-10 lg:py-16 bg-cv-bg2/30 flex flex-col justify-center gap-4 sm:gap-5">
          {STATS.map((stat, idx) => (
            <div key={idx} className="bg-cv-white p-5 sm:p-6 rounded border border-cv-line shadow-sm hover:border-cv-accent hover:shadow-md transition-all duration-300">
              <div className="font-serif text-4xl sm:text-5xl text-cv-accent leading-none mb-2">
                <AnimatedCounter value={stat.number} />
              </div>
              <div className="text-sm font-semibold text-cv-ink leading-tight mb-1">
                {lang === "es" ? stat.label.es : lang === "pt" ? stat.label.pt : stat.label.en}
              </div>
              <div className="text-xs text-cv-ink3">
                {lang === "es" ? stat.sub.es : lang === "pt" ? stat.sub.pt : stat.sub.en}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section className="px-6 sm:px-12 py-16 sm:py-24 max-w-7xl mx-auto" id="about">
        <div className="flex items-center gap-4 mb-12 border-b border-cv-line pb-4">
          <span className="font-mono text-xs sm:text-sm text-cv-accent font-semibold">01</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-cv-ink">
            {lang === "es" ? "Sobre mí" : lang === "pt" ? "Sobre mim" : "About me"}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-5 text-sm sm:text-base text-cv-ink2 leading-relaxed">
            {lang === "es" ? (
              <>
                <p className="text-base sm:text-lg font-medium text-cv-ink">
                  Resuelvo problemas de manufactura y calidad combinando experiencia práctica en planta, análisis de causa raíz, mejora de procesos y herramientas digitales útiles.
                </p>
                <p>
                  A lo largo de más de 14 años en <strong>Grupo BGH</strong> entregando resultados para marcas globales de primer nivel (Motorola, Samsung, Huawei, Sony, Alcatel), aprendí que la mejora real no surge detrás de un escritorio: se logra recorriendo la línea, entendiendo dónde se pierde tiempo o material, encontrando la causa raíz y dejando el sistema mejor que antes.
                </p>
                <p>
                  En lugar de sumar burocracia documental, diseño flujos de trabajo claros y construyo herramientas digitales para automatizar tareas repetitivas, asegurar cumplimiento normativo (<strong>ISO 9001 / 14001 / 45001 Internal Auditor</strong> y conocimientos de <strong>TS16949, ANSI/ESD S20.20</strong>) y brindar visibilidad inmediata tanto al operario como a la gerencia.
                </p>
              </>
            ) : lang === "pt" ? (
              <>
                <p className="text-base sm:text-lg font-medium text-cv-ink">
                  Resolvo problemas de manufatura e qualidade combinando experiência prática na fábrica, análise de causa raiz, melhoria de processos e ferramentas digitais práticas.
                </p>
                <p>
                  Ao longo de mais de 14 anos no <strong>Grupo BGH</strong> entregando resultados para marcas globais líderes (Motorola, Samsung, Huawei, Sony, Alcatel), aprendi que a melhoria real não acontece atrás de uma mesa: acontece no chão de fábrica, entendendo onde se perde tempo ou material, encontrando a causa raiz e deixando o sistema melhor do que antes.
                </p>
                <p>
                  Em vez de acrescentar burocracia, desenho fluxos de trabalho ágeis e desenvolvo ferramentas digitais para automatizar tarefas repetitivas, assegurar conformidade normativa (<strong>Auditor Interno ISO 9001 / 14001 / 45001</strong> e conhecimentos de <strong>TS16949, ANSI/ESD S20.20</strong>) e fornecer visibilidade imediata para operadores e liderança.
                </p>
              </>
            ) : (
              <>
                <p className="text-base sm:text-lg font-medium text-cv-ink">
                  I solve manufacturing and quality problems by combining hands-on plant experience, root cause analysis, process improvement, and practical digital tools.
                </p>
                <p>
                  Over 14+ years at <strong>Grupo BGH</strong> delivering for top global brands (Motorola, Samsung, Huawei, Sony, Alcatel), I learned that real improvement doesn't happen from behind a desk: it happens by walking the line, understanding where time and material are wasted, finding the root cause, and leaving the system better than before.
                </p>
                <p>
                  Instead of adding layers of paperwork, I design streamlined workflows and build lightweight digital tools to automate repetitive tasks, ensure compliance (<strong>ISO 9001 / 14001 / 45001 Internal Auditor</strong> & working knowledge of <strong>TS16949, ANSI/ESD S20.20</strong>), and give operators and managers clear, actionable visibility.
                </p>
              </>
            )}
          </div>

          <div className="lg:col-span-6 space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-widest text-cv-accent font-bold block">
              {lang === "es" ? "// Capacidades demostradas en 4 pilares" : lang === "pt" ? "// Capacidades demonstradas em 4 pilares" : "// Demonstrated capabilities in 4 pillars"}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.id} className="bg-cv-white border border-cv-line p-4 rounded shadow-sm hover:border-cv-accent transition-all">
                  <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-cv-accent mb-2.5 pb-1 border-b border-cv-line/60">
                    {lang === "es" ? cat.category.es : lang === "pt" ? cat.category.pt : cat.category.en}
                  </h4>
                  <ul className="space-y-1.5">
                    {cat.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-center justify-between gap-2 text-xs">
                        <span className="font-medium text-cv-ink leading-tight">{skill.name}</span>
                        <span className="font-mono text-[9px] bg-cv-bg2/80 text-cv-ink2 px-1.5 py-0.5 rounded uppercase flex-shrink-0">
                          {lang === "es" ? skill.tag.es : lang === "pt" ? skill.tag.pt : skill.tag.en}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS / ACHIEVEMENTS */}
      <section className="bg-cv-ink text-cv-bg py-16 sm:py-24" id="achievements">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-12 border-b border-cv-bg2/10 pb-4">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs sm:text-sm text-cv-accent font-semibold">02</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-cv-white">
                {lang === "es" ? "Qué he mejorado" : lang === "pt" ? "O que melhorei" : "What I have improved"}
              </h2>
            </div>
            <span className="font-mono text-xs text-cv-accent uppercase tracking-wider">
              {lang === "es" ? "Problema → Acción → Resultado medible" : lang === "pt" ? "Problema → Ação → Resultado mensurável" : "Problem → Action → Measurable outcome"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {ACHIEVEMENTS.map((ach, index) => (
              <motion.div 
                key={ach.id} 
                initial={{ scale: 0.8, opacity: 0, boxShadow: "0px 0px 0px transparent" }}
                whileInView={{ 
                  scale: [0.8, 1.05, 1], 
                  opacity: 1, 
                  boxShadow: ["0px 0px 0px transparent", "0px 0px 30px rgba(226,204,153, 0.8)", "0px 0px 0px transparent"]
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.5, ease: "easeOut" }}
                className="group relative border border-cv-bg2/10 hover:border-cv-accent rounded-sm p-6 sm:p-8 flex flex-col justify-between transition-all duration-300"
              >
                {ach.accent && (
                  <span className="absolute top-4 right-6 font-serif text-3xl sm:text-4xl text-cv-accent opacity-90 drop-shadow-[0_0_8px_rgba(226,204,153,0.5)] group-hover:opacity-100 group-hover:drop-shadow-[0_0_15px_rgba(226,204,153,0.9)] group-hover:scale-110 transition-all duration-300">
                    {ach.accent}
                  </span>
                )}
                <div>
                  <div className="text-3xl mb-4 text-cv-accent group-hover:scale-110 transition-transform origin-left w-fit select-none">
                    {ach.icon}
                  </div>
                  <p className="text-xs sm:text-sm text-cv-bg2 leading-relaxed opacity-90 pr-12">
                    {lang === "es" ? ach.text.es : lang === "pt" ? ach.text.pt : ach.text.en}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="px-6 sm:px-12 py-16 sm:py-24 max-w-7xl mx-auto" id="experience">
        <div className="flex items-center gap-4 mb-12 border-b border-cv-line pb-4">
          <span className="font-mono text-xs sm:text-sm text-cv-accent font-semibold">03</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-cv-ink">
            {lang === "es" ? "Experiencia consolidada" : lang === "pt" ? "Experiência consolidada" : "Proven career path"}
          </h2>
        </div>

        <div className="space-y-12">
          {EXPERIENCES.map((exp) => (
            <div 
              key={exp.id} 
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 pb-8 border-b border-cv-line last:border-0 hover:bg-cv-bg2/10 p-4 rounded-md transition-all duration-200"
            >
              <div className="lg:col-span-3">
                <span className="font-mono text-xs text-cv-ink3 block mb-1">
                  {lang === "es" ? exp.dates.es : lang === "pt" ? exp.dates.pt : exp.dates.en}
                </span>
                <span className="text-sm font-bold text-cv-ink2 block">
                  {exp.company}
                </span>
              </div>
              <div className="lg:col-span-9 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl text-cv-ink mb-2">
                    {lang === "es" ? exp.role.es : lang === "pt" ? exp.role.pt : exp.role.en}
                  </h3>
                  <p className="text-xs sm:text-sm text-cv-ink2 leading-relaxed">
                    <span dangerouslySetInnerHTML={{ __html: lang === "es" ? exp.desc.es : lang === "pt" ? exp.desc.pt : exp.desc.en }} />
                  </p>
                </div>
                {exp.highlight && (
                  <span className="mt-4 self-start font-mono text-[10px] bg-cv-accent text-cv-white px-2 py-0.5 rounded font-bold uppercase">
                    {lang === "es" ? exp.highlight.es : lang === "pt" ? exp.highlight.pt : exp.highlight.en}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION with Interactive Sandboxes */}
      <section className="bg-cv-bg2 py-16 sm:py-24" id="projects">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="flex items-center gap-4 mb-4 border-b border-cv-line pb-4">
            <span className="font-mono text-xs sm:text-sm text-cv-accent font-semibold">04</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-cv-ink">
              {lang === "es" ? "Herramientas digitales para operaciones" : lang === "pt" ? "Ferramentas digitais para operações" : "Digital tools for operations"}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-cv-ink2 max-w-xl mb-12 leading-relaxed">
            {lang === "es" ? 
              "Construyo herramientas para eliminar trabajo innecesario, simplificar procesos y reducir burocracia. Pruebe los prototipos interactivos integrados a continuación:" : 
             lang === "pt" ?
              "Desenvolvo ferramentas para eliminar trabalho desnecessário, simplificar processos e reduzir burocracia. Teste os protótipos interativos integrados abaixo:" :
              "I build tools to remove unnecessary work, simplify processes and reduce bureaucracy. Interact with the sandbox components below:"
            }
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Interactive PCB Defect Recorder Card */}
            <div className="bg-cv-white rounded border border-cv-line overflow-hidden flex flex-col justify-between shadow-md">
              <div className="bg-cv-ink p-4 text-cv-bg2 flex items-center justify-between border-b border-cv-line">
                <span className="font-mono text-[10px] sm:text-xs tracking-widest text-[#8a857c] uppercase font-bold">
                  PROTOTYPE SANDBOX // PCB DEFECT RECORDER
                </span>
                <span className="px-2 py-0.5 bg-cv-accent text-cv-white rounded font-mono text-[9px] font-bold">
                  LIVE SIMULATOR
                </span>
              </div>

              {/* Interactive Solder Area */}
              <div className="relative bg-[#111] p-4 flex flex-col items-center justify-center border-b border-cv-line select-none w-full">
                <span className="font-mono text-[9px] text-[#8a857c] tracking-wider mb-2 text-center select-none uppercase">
                  {lang === "es" ? "📦 CLICKEA EN EL PCB REAL PARA REGISTRAR DEFECTOS EN COORDENADAS" : lang === "pt" ? "📦 CLIQUE DIRETAMENTE NO PCB REAL PARA REGISTRAR DEFEITOS EM COORDENADAS" : "📦 CLICK DIRECTLY ON THE ACTUAL PCB TO LOG DEFECT DETAILS"}
                </span>
                
                <div className="relative w-full max-w-sm aspect-video rounded overflow-hidden shadow-lg border border-emerald-500/20 group">
                  {/* Background Board Image */}
                  <img 
                    src={pcbBoard} 
                    alt="PCB Board for inspection" 
                    className="w-full h-full object-cover select-none pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Absolute Sized Interactive Overlay */}
                  <svg 
                    className="absolute inset-0 w-full h-full cursor-crosshair"
                    onClick={handlePcbClick}
                    viewBox="0 0 100 60"
                  >
                    {/* Simulated defects pins */}
                    {simulatedDefects.map((defect) => (
                      <g key={defect.id}>
                        <circle 
                          cx={defect.x} 
                          cy={defect.y} 
                          r="4.5" 
                          className="fill-cv-accent stroke-cv-white stroke-1 animate-ping opacity-75" 
                        />
                        <circle 
                          cx={defect.x} 
                          cy={defect.y} 
                          r="2.5" 
                          className="fill-cv-accent stroke-cv-white stroke-[0.5]" 
                        />
                        <title>{defect.type} ({defect.x}%, {defect.y}%)</title>
                      </g>
                    ))}
                  </svg>
                </div>

                {/* Controls inside simulator */}
                <div className="w-full flex flex-wrap items-center justify-between gap-4 mt-3 px-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-[#8a857c] uppercase">Defect:</span>
                    <select 
                      value={selectedDefectType}
                      onChange={(e) => setSelectedDefectType(e.target.value)}
                      className="bg-cv-black text-cv-white border border-cv-line text-[10px] px-2 py-0.5 rounded font-mono focus:outline-none focus:border-cv-accent"
                    >
                      <option value="Solder Bridge">{lang === "es" ? "Puente de Soldadura" : lang === "pt" ? "Ponte de Solda" : "Solder Bridge"}</option>
                      <option value="Missing Component">{lang === "es" ? "Componente Faltante" : lang === "pt" ? "Componente Faltante" : "Missing Component"}</option>
                      <option value="Polarity Inversion">{lang === "es" ? "Inversión de Polaridad" : lang === "pt" ? "Inversão de Polaridade" : "Polarity Inversion"}</option>
                      <option value="Solder Void">{lang === "es" ? "Falta de Soldadura" : lang === "pt" ? "Falta de Solda" : "Solder Void"}</option>
                    </select>
                  </div>

                  <button 
                    onClick={clearSimulatedDefects}
                    className="font-mono text-[9px] bg-red-950/40 text-red-500 border border-red-500/30 px-2 py-0.5 rounded hover:bg-cv-accent hover:text-cv-white hover:border-cv-accent transition-colors cursor-pointer"
                  >
                    {lang === "es" ? "LIMPIAR INDICE" : lang === "pt" ? "LIMPAR REGISTRO" : "CLEAR LEDGER"} ({simulatedDefects.length})
                  </button>
                </div>

                {/* Live Telemetry Log Feed */}
                {simulatedDefects.length > 0 && (
                  <div className="w-full max-w-sm mt-3 bg-cv-black border border-cv-line rounded p-2 max-h-24 overflow-y-auto font-mono text-[9px] text-cv-ink2 space-y-1">
                    <div className="text-[#8a857c] border-b border-cv-line pb-1 mb-1 font-bold">
                      {lang === "es" ? "REGISTRO DE FALLAS TIEMPO REAL:" : lang === "pt" ? "REGISTRO DE FALHAS EM TEMPO REAL:" : "REAL-TIME DEFECT REGISTRATION LOG:"}
                    </div>
                    {simulatedDefects.map((def, idx) => (
                      <div key={def.id} className="flex justify-between items-center bg-cv-bg2/5 px-1.5 py-0.5 rounded border border-cv-line/10">
                        <span>[{idx + 1}] <strong className="text-cv-accent">{def.type}</strong> at ({def.x}%, {def.y}%)</span>
                        <span className="text-[8px] text-emerald-500 font-bold">LOGGED</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Project Body details */}
              <div className="p-6">
                <div className="font-mono text-[10px] tracking-wider uppercase text-cv-accent mb-2">
                  {lang === "es" ? PROJECTS[0].tag.es : lang === "pt" ? PROJECTS[0].tag.pt : PROJECTS[0].tag.en}
                </div>
                <h3 className="font-serif text-2xl mb-3">{PROJECTS[0].title}</h3>
                <p className="text-xs sm:text-sm text-cv-ink2 leading-relaxed mb-6">
                  {lang === "es" ? PROJECTS[0].desc.es : lang === "pt" ? PROJECTS[0].desc.pt : PROJECTS[0].desc.en}
                </p>

                <div className="space-y-2 mb-6 text-xs text-cv-ink2">
                  {PROJECTS[0].features.map((feat, index) => (
                    <div key={index} className="flex gap-2.5 items-start">
                      <span className="text-cv-accent font-bold">→</span>
                      <span>{lang === "es" ? feat.es : lang === "pt" ? feat.pt : feat.en}</span>
                    </div>
                  ))}
                </div>

                <a 
                  href={PROJECTS[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-cv-accent text-cv-white text-xs font-bold uppercase tracking-wider rounded inline-flex items-center gap-2 hover:bg-cv-ink hover:-translate-y-0.5 transition-all w-fit active:translate-y-0"
                >
                  {lang === "es" ? "Probar en vivo" : lang === "pt" ? "Testar ao vivo" : "Try the Live App"} <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Interactive ISO Compliance Analyzer Card */}
            <div className="bg-cv-white rounded border border-cv-line overflow-hidden flex flex-col justify-between shadow-md">
              <div className="bg-cv-ink p-4 text-cv-bg2 flex items-center justify-between border-b border-cv-line">
                <span className="font-mono text-[10px] sm:text-xs tracking-widest text-[#8a857c] uppercase font-bold">
                  PROTOTYPE SANDBOX // ISO ANALYZER (WIP)
                </span>
                <span className="px-2 py-0.5 bg-[#4a8a4a] text-cv-white rounded font-mono text-[9px] font-bold">
                  COMPLIANCE TRACKER
                </span>
              </div>

              {/* Interactive Dashboard Area */}
              <div className="relative bg-[#1a2218] p-6 flex flex-col gap-4 border-b border-cv-line select-none">
                <span className="font-mono text-[9px] text-[#6a8a6a] tracking-wider block">
                  {lang === "es" ? "SIMULAR PORCENTAJES EN VIVO" : lang === "pt" ? "SIMULAR PORCENTAGENS AO VIVO" : "CLIK SLIDERS TO ADJUST COMPLIANCE METRICS"}
                </span>

                {/* Vertical compliance sliders */}
                <div className="space-y-3.5">
                  {[
                    { key: "c41", clause: "ISO 4.1", desc: "Context of the Org.", val: simulatedISOProgress.c41 },
                    { key: "c62", clause: "ISO 6.2", desc: "Quality Objectives", val: simulatedISOProgress.c62 },
                    { key: "c85", clause: "ISO 8.5", desc: "Production Service", val: simulatedISOProgress.c85 },
                    { key: "c91", clause: "ISO 9.1", desc: "Monitoring & Measurement", val: simulatedISOProgress.c91 },
                  ].map((slider) => (
                    <div key={slider.key} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                        <span className="font-semibold">{slider.clause} - <span className="text-[#6a8a6a]">{slider.desc}</span></span>
                        <span>{slider.val}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={slider.val}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          setSimulatedISOProgress(prev => ({ ...prev, [slider.key]: value }));
                        }}
                        className="w-full h-1 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-cv-accent focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Project description body */}
              <div className="p-6">
                <div className="font-mono text-[10px] tracking-wider uppercase text-cv-accent mb-2">
                  {lang === "es" ? PROJECTS[1].tag.es : lang === "pt" ? PROJECTS[1].tag.pt : PROJECTS[1].tag.en}
                </div>
                <h3 className="font-serif text-2xl mb-3">{PROJECTS[1].title}</h3>
                <p className="text-xs sm:text-sm text-cv-ink2 leading-relaxed mb-6">
                  {lang === "es" ? PROJECTS[1].desc.es : lang === "pt" ? PROJECTS[1].desc.pt : PROJECTS[1].desc.en}
                </p>

                <div className="space-y-2 mb-6 text-xs text-cv-ink2">
                  {PROJECTS[1].features.map((feat, index) => (
                    <div key={index} className="flex gap-2.5 items-start">
                      <span className="text-cv-accent font-bold">→</span>
                      <span>{lang === "es" ? feat.es : lang === "pt" ? feat.pt : feat.en}</span>
                    </div>
                  ))}
                </div>

                <span className="px-5 py-2.5 border border-cv-line text-cv-ink3 bg-cv-bg2 text-xs font-bold uppercase tracking-wider rounded select-none">
                  {lang === "es" ? "En desarrollo activo" : lang === "pt" ? "Em desenvolvimento ativo" : "Active Development"}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="px-6 sm:px-12 py-16 sm:py-24 max-w-7xl mx-auto" id="certs">
        <div className="flex items-center gap-4 mb-12 border-b border-cv-line pb-4">
          <span className="font-mono text-xs sm:text-sm text-cv-accent font-semibold">05</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-cv-ink">
            {lang === "es" ? "Certificaciones" : lang === "pt" ? "Certificações" : "Specialist Certifications"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTS.map((cert, index) => {
            if (cert.thumbnail) {
              return (
                <div 
                  key={index} 
                  className="group bg-cv-white border border-cv-line rounded-lg shadow-sm hover:border-cv-accent hover:shadow-md transition-all duration-300 flex overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div 
                    className="relative w-36 sm:w-48 p-2 flex-shrink-0 bg-cv-bg2/5 border-r border-cv-line cursor-pointer overflow-hidden flex items-center justify-center"
                    onClick={() => setCertModalImage(cert.thumbnail!)}
                  >
                    <img 
                      src={cert.thumbnail} 
                      alt={lang === "es" ? cert.name.es : lang === "pt" ? cert.name.pt : cert.name.en}
                      className="w-full h-auto max-h-full object-contain hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-cv-black/0 hover:bg-cv-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                      <span className="bg-cv-black/60 text-white text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded">
                        {lang === "es" ? "Ver" : lang === "pt" ? "Ver" : "View"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 flex flex-col justify-center min-w-0">
                    <div className="flex items-start gap-2 mb-1">
                      <span className="text-lg flex-shrink-0">{cert.icon}</span>
                      <h4 className="text-sm font-bold text-cv-ink group-hover:text-cv-accent transition-colors leading-tight">
                        {lang === "es" ? cert.name.es : lang === "pt" ? cert.name.pt : cert.name.en}
                      </h4>
                    </div>
                    <p className="font-mono text-[10px] text-cv-ink3 uppercase tracking-wide mb-2 pl-7">
                      {lang === "es" ? cert.org.es : lang === "pt" ? cert.org.pt : cert.org.en}
                    </p>
                    {cert.description && (
                      <p className="text-xs text-cv-ink2 leading-relaxed pl-7 line-clamp-3">
                        {lang === "es" ? cert.description.es : lang === "pt" ? cert.description.pt : cert.description.en}
                      </p>
                    )}
                    {cert.link && (
                      <a 
                        href={cert.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1.5 mt-2 pl-7 text-[10px] font-mono uppercase tracking-wider text-cv-accent hover:text-cv-ink transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {lang === "es" ? "Ver certificado" : lang === "pt" ? "Ver certificado" : "View certificate"}
                      </a>
                    )}
                  </div>
                </div>
              );
            }

            // Fallback for certs without thumbnails (compact card)
            return (
              <div 
                key={index} 
                className="bg-cv-white border border-cv-line p-6 rounded-lg shadow-sm hover:border-cv-accent transition-all duration-300"
              >
                <div className="text-2xl mb-3">{cert.icon}</div>
                <h4 className="text-sm font-bold text-cv-ink mb-1">
                  {lang === "es" ? cert.name.es : lang === "pt" ? cert.name.pt : cert.name.en}
                </h4>
                <p className="font-mono text-[11px] text-cv-ink3 uppercase">
                  {lang === "es" ? cert.org.es : lang === "pt" ? cert.org.pt : cert.org.en}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* WRITING / THINKING OUT LOUD */}
      <section className="px-6 sm:px-12 py-16 sm:py-24 border-t border-cv-line max-w-7xl mx-auto" id="writing">
        <div className="flex items-center gap-4 mb-12 border-b border-cv-line pb-4">
          <span className="font-mono text-xs sm:text-sm text-cv-accent font-semibold">06</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-cv-ink">
            {lang === "es" ? "Insights & Perspectiva Práctica" : lang === "pt" ? "Insights & Perspectiva Prática" : "Insights & Practical Perspective"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          
          {ARTICLES.map((article) => (
            <div 
              key={article.id}
              onClick={() => handleOpenArticle(article)}
              className="group bg-cv-white border border-cv-line p-8 rounded-md hover:border-cv-accent transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[10px] sm:text-xs tracking-wider uppercase text-cv-accent block mb-3">
                  {lang === "es" ? article.category.es : lang === "pt" ? article.category.pt : article.category.en}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-cv-ink mb-4 group-hover:text-cv-accent transition-colors line-clamp-2">
                  {lang === "es" ? article.title.es : lang === "pt" ? article.title.pt : article.title.en}
                </h3>
                <p className="text-xs sm:text-sm text-cv-ink2 leading-relaxed mb-6 line-clamp-3">
                  {lang === "es" ? article.excerpt.es : lang === "pt" ? article.excerpt.pt : article.excerpt.en}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-cv-line/45 pt-4 mt-auto">
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-cv-ink group-hover:text-cv-accent transition-colors inline-flex items-center gap-1.5">
                  {lang === "es" ? "Leer artículo" : lang === "pt" ? "Ler artigo" : "Read article"} <ChevronRight className="w-4 h-4" />
                </span>
                <div className="flex gap-1 text-[10px] font-mono font-medium text-cv-ink3">
                  <span className="border border-cv-line px-1.5 py-0.5 rounded">ES</span>
                  <span className="border border-cv-line px-1.5 py-0.5 rounded">EN</span>
                </div>
              </div>
            </div>
          ))}

          {/* Linkedin plug card */}
          <div className="border border-dashed border-cv-line bg-transparent p-8 rounded-md flex flex-col justify-between items-start">
            <div className="pt-2">
              <span className="text-3xl mb-4 block">✍️</span>
              <h3 className="font-serif text-xl text-cv-ink mb-2">
                {lang === "es" ? "Más artículos en camino" : lang === "pt" ? "Mais artigos a caminho" : "More articles on the horizon"}
              </h3>
              <p className="text-xs sm:text-sm text-cv-ink3 leading-relaxed">
                {lang === "es" ? 
                  "Reflexiones constantes sobre programas CAPA, auditorías eficaces, IA aplicada en la gestión de calidad y la evolución industrial." : 
                 lang === "pt" ?
                  "Reflexões constantes sobre programas CAPA, auditorias eficazes, IA aplicada na gestão de qualidade e a evolução industrial." :
                  "Ongoing reflections on modern CAPA design, meaningful audits, AI in operations, and the future of industrial governance."}
              </p>
            </div>
            
            <a 
              href="https://linkedin.com/in/guillermo-canete" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-mono text-xs font-bold text-cv-accent hover:underline flex items-center gap-1 mt-6"
            >
              {lang === "es" ? "Seguime en LinkedIn" : lang === "pt" ? "Conectar no LinkedIn" : "Connect on LinkedIn"} →
            </a>
          </div>

        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-cv-ink text-cv-white px-6 sm:px-12 py-20 text-center" id="contact">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl leading-tight mb-4">
            {lang === "es" ? (
              <>
                Construyamos algo <br />
                <span className="italic text-cv-accent font-normal">que realmente funcione</span>
              </>
            ) : lang === "pt" ? (
              <>
                Construamos algo <br />
                <span className="italic text-cv-accent font-normal">que realmente funcione</span>
              </>
            ) : (
              <>
                Let's build systems <br />
                <span className="italic text-cv-accent font-normal">that actually deliver</span>
              </>
            )}
          </h2>
          
          <p className="text-sm sm:text-base text-cv-bg2/80 max-w-xl mx-auto mb-12 leading-relaxed">
            {lang === "es" ? 
              "Disponible para oportunidades en Calidad, Mejora de Procesos, Excelencia Operacional y Transformación Digital (presencial o remoto) con total disponibilidad para relocalización nacional e internacional." : 
             lang === "pt" ?
              "Disponível para oportunidades em Qualidade, Melhoria de Processos, Excelência Operacional e Transformação Digital (presencial ou remoto) com total disponibilidade para relocação nacional e internacional." :
              "Open to opportunities in Quality, Process Improvement, Operational Excellence and Digital Transformation (on-site or remote) with relocation availability."}
          </p>

          <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
            <a 
              href="mailto:guillermo.canete@hotmail.com" 
              className="px-6 py-4 bg-cv-bg/5 hover:bg-cv-accent hover:border-cv-accent border border-cv-bg2/20 rounded inline-flex items-center gap-3 text-xs sm:text-sm font-bold text-cv-white uppercase tracking-wider transition-all shadow-sm"
            >
              <Mail className="w-4 h-4 text-cv-accent group-hover:text-cv-white" /> guillermo.canete@hotmail.com
            </a>
            <a 
              href="https://linkedin.com/in/guillermo-canete" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-4 bg-cv-bg/5 hover:bg-cv-accent hover:border-cv-accent border border-cv-bg2/20 rounded inline-flex items-center gap-3 text-xs sm:text-sm font-bold text-cv-white uppercase tracking-wider transition-all shadow-sm"
            >
              <Linkedin className="w-4 h-4 text-cv-accent group-hover:text-cv-white" /> linkedin.com/in/guillermo-canete
            </a>
            <a 
              href="https://wa.me/5492964413910" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-4 bg-cv-bg/5 hover:bg-[#25D366]/20 hover:border-[#25D366] border border-cv-bg2/20 rounded inline-flex items-center gap-3 text-xs sm:text-sm font-bold text-cv-white uppercase tracking-wider transition-all shadow-sm"
            >
              <svg className="w-4 h-4 text-[#25D366] fill-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.008 0C5.397 0 .06 5.348.06 12.008c0 2.097.546 4.14 1.587 5.945L0 24l6.163-1.687a11.953 11.953 0 005.724 1.455c6.613 0 11.949-5.34 11.953-11.953.002-3.204-1.243-6.216-3.509-8.484A11.905 11.905 0 0012.008 0zm6.59 16.822c-.27.76-1.56 1.402-2.146 1.49-.58.09-1.32.16-3.69-.73-3.14-1.18-5.14-4.38-5.3-4.59-.16-.21-1.32-1.76-1.32-3.34 0-1.58.82-2.36 1.11-2.67.29-.31.64-.39.85-.39h.61c.19 0 .45-.07.7.53.27.65.92 2.26.99 2.42.08.16.14.35.03.56-.11.21-.19.34-.37.56-.18.22-.38.49-.55.66-.19.19-.39.4-.17.78.22.38.99 1.63 2.13 2.65 1.46 1.3 2.69 1.7 3.07 1.88.38.18.61.16.84-.1.23-.26.99-1.15 1.25-1.54.26-.39.53-.32.89-.19.36.13 2.27 1.07 2.65 1.26.38.19.64.28.73.44.09.16.09.93-.18 1.69z" />
              </svg>
              <span>+54 9 2964 413910</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-cv-ink border-t border-cv-bg2/10 text-cv-ink3 text-center py-6 font-mono text-[10px] sm:text-xs">
        <div>
          Guillermo A. Cañete Ferreyra — Quality &amp; Process Improvement Specialist — Tierra del Fuego, Argentina
        </div>
        <div className="mt-1.5 opacity-60">
          {lang === "es" ? "Última actualización: 2026" : lang === "pt" ? "Última atualização: 2026" : "Last update: 2026"}
        </div>
      </footer>

      {/* ARTICLE READER MODAL */}
      {activeArticle && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-cv-ink/80 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleCloseArticle}
        >
          <div 
            className="bg-cv-white border border-cv-line rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col justify-between overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-cv-line bg-cv-bg2/15 flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-cv-accent block mb-2">
                  {modalLang === "es" ? activeArticle.category.es : modalLang === "pt" ? activeArticle.category.pt : activeArticle.category.en}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl text-cv-ink leading-tight">
                  {modalLang === "es" ? activeArticle.title.es : modalLang === "pt" ? activeArticle.title.pt : activeArticle.title.en}
                </h2>
              </div>
              <button 
                onClick={handleCloseArticle}
                className="p-1.5 hover:bg-cv-bg2 rounded text-cv-ink2 hover:text-cv-accent transition-colors cursor-pointer"
                title="Close Window"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Language Selection Bar Inside Modal */}
            <div className="px-6 py-2.5 bg-cv-bg/80 border-b border-cv-line flex gap-2">
              <button 
                onClick={() => setModalLang("es")}
                className={`font-mono text-[10px] px-3 py-1 rounded border cursor-pointer transition-all flex items-center gap-1.5 ${modalLang === "es" ? "bg-cv-accent text-cv-white border-cv-accent" : "border-cv-line text-cv-ink3 hover:text-cv-ink"}`}
              >
                <FlagAR /> Español
              </button>
              <button 
                onClick={() => setModalLang("en")}
                className={`font-mono text-[10px] px-3 py-1 rounded border cursor-pointer transition-all flex items-center gap-1.5 ${modalLang === "en" ? "bg-cv-accent text-cv-white border-cv-accent" : "border-cv-line text-cv-ink3 hover:text-cv-ink"}`}
              >
                <FlagUS /> English
              </button>
              <button 
                onClick={() => setModalLang("pt")}
                className={`font-mono text-[10px] px-3 py-1 rounded border cursor-pointer transition-all flex items-center gap-1.5 ${modalLang === "pt" ? "bg-cv-accent text-cv-white border-cv-accent" : "border-cv-line text-cv-ink3 hover:text-cv-ink"}`}
              >
                <FlagBR /> Português
              </button>
            </div>

            {/* Modal Post Body */}
            <div 
              className="p-6 sm:p-8 overflow-y-auto max-h-[60vh] prose prose-sm max-w-none text-cv-ink2 text-xs sm:text-sm space-y-4"
              dangerouslySetInnerHTML={{ 
                __html: (modalLang === "es" ? activeArticle.content.es : modalLang === "pt" ? activeArticle.content.pt : activeArticle.content.en)
                  .replace("IMAGE_PLACEHOLDER", activeArticle.id === "spacex" ? spacexPhoto : "")
              }}
            />

            {/* Modal Footer */}
            <div className="p-4 bg-cv-bg2/30 border-t border-cv-line text-right">
              <button 
                onClick={handleCloseArticle}
                className="px-4 py-2 bg-cv-ink text-cv-bg text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-cv-accent hover:text-cv-white transition-colors cursor-pointer"
              >
                {lang === "es" ? "Cerrar" : lang === "pt" ? "Fechar" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROFILE PHOTO LIGHTBOX MODAL */}
      {isPhotoModalOpen && (
        <div 
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-all duration-300 cursor-zoom-out animate-in fade-in duration-250"
          onClick={() => setIsPhotoModalOpen(false)}
        >
          {/* Close button at top corner of the screen */}
          <button 
            onClick={() => setIsPhotoModalOpen(false)}
            className="absolute top-4 right-4 z-[160] p-2.5 bg-cv-black/45 border border-cv-line/30 rounded-full text-white hover:text-cv-accent hover:border-cv-accent hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg"
            title={lang === "es" ? "Cerrar" : lang === "pt" ? "Fechar" : "Close"}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Large portrait wrapper with border, nice shadow, and smooth enter effect */}
          <div 
            className="relative max-w-full max-h-[85vh] md:max-w-3xl flex flex-col items-center justify-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={guillermoPhoto} 
              alt="Guillermo Cañete - Professional Portrait" 
              className="max-h-[70vh] md:max-h-[75vh] w-auto max-w-full rounded-lg border-2 border-cv-accent2/50 shadow-2xl object-contain bg-cv-black cursor-zoom-out"
              referrerPolicy="no-referrer"
              onClick={() => setIsPhotoModalOpen(false)}
            />
            
            {/* Elegant contextual descriptor footer */}
            <div className="mt-4 text-center select-none">
              <h3 className="font-serif text-lg sm:text-xl text-white">
                Guillermo Cañete
              </h3>
              <p className="font-mono text-[10px] sm:text-xs text-cv-accent uppercase tracking-wider mt-1">
                {lang === "es" ? "Gestión de Calidad e Ingeniería de Procesos" : lang === "pt" ? "Gestão de Qualidade e Engenharia de Processos" : "Quality Management & Process Engineering"}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Certificate Lightbox Modal */}
      {certModalImage && (
        <div 
          className="fixed inset-0 z-[150] bg-cv-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setCertModalImage(null)}
        >
          <button 
            onClick={() => setCertModalImage(null)}
            className="absolute top-4 right-4 z-[160] p-2.5 bg-cv-black/45 border border-cv-line/30 rounded-full text-white hover:text-cv-accent hover:border-cv-accent hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg"
            title={lang === "es" ? "Cerrar" : lang === "pt" ? "Fechar" : "Close"}
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            className="relative max-w-full max-h-[85vh] md:max-w-4xl flex flex-col items-center justify-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={certModalImage} 
              alt="Certificate" 
              className="max-h-[80vh] md:max-h-[85vh] w-auto max-w-full rounded-lg border-2 border-cv-accent2/50 shadow-2xl object-contain bg-cv-white cursor-zoom-out"
              onClick={() => setCertModalImage(null)}
            />
          </div>
        </div>
      )}

    </div>
  );
}
