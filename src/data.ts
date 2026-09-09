export interface MultilingualText {
  es: string;
  en: string;
  pt: string;
}

export interface StatItem {
  number: string;
  label: MultilingualText;
  sub: MultilingualText;
}

export interface SkillItem {
  id: string;
  name: string;
  tag: MultilingualText;
}

export interface AchievementItem {
  id: string;
  accent?: string;
  icon: string;
  text: MultilingualText;
}

export interface ExperienceItem {
  id: string;
  company: string;
  dates: MultilingualText;
  role: MultilingualText;
  desc: MultilingualText;
  highlight?: MultilingualText;
}



export interface ProjectItem {
  id: string;
  tag: MultilingualText;
  title: string;
  desc: MultilingualText;
  features: MultilingualText[];
  link?: string;
  wip?: boolean;
}

export interface CertItem {
  icon: string;
  name: MultilingualText;
  org: MultilingualText;
  link?: string;
  description?: MultilingualText;
  thumbnail?: string;
}

export interface Article {
  id: string;
  category: MultilingualText;
  title: MultilingualText;
  excerpt: MultilingualText;
  content: MultilingualText;
}

export const STATS: StatItem[] = [
  {
    number: "14+",
    label: { 
      es: "Años en Calidad y Mejora de Procesos", 
      en: "Years in Quality & Process Improvement", 
      pt: "Anos em Qualidade e Melhoria de Processos" 
    },
    sub: { 
      es: "Electrónica compleja, electrodomésticos e industria", 
      en: "Complex electronics, appliances & industry", 
      pt: "Eletrônicos complexos, eletrodomésticos e indústria" 
    }
  },
  {
    number: "5+",
    label: { 
      es: "Marcas globales coordinadas en planta", 
      en: "Global brands delivered on plant floor", 
      pt: "Marcas globais coordenadas na planta" 
    },
    sub: { 
      es: "Motorola · Samsung · Huawei · Sony · Alcatel", 
      en: "Motorola · Samsung · Huawei · Sony · Alcatel", 
      pt: "Motorola · Samsung · Huawei · Sony · Alcatel" 
    }
  },
  {
    number: "+17%",
    label: { 
      es: "Aumento de producción entregado", 
      en: "Production increase delivered", 
      pt: "Aumento de produção alcançado" 
    },
    sub: { 
      es: "Línea Alcatel 4007 · Balanceo Lean y ergonomía", 
      en: "Alcatel 4007 line · Lean balancing & ergonomics", 
      pt: "Linha Alcatel 4007 · Balanceamento Lean e ergonomia" 
    }
  },
  {
    number: "−2d",
    label: { 
      es: "Reducción en tiempo de onboarding", 
      en: "Onboarding time reduction", 
      pt: "Redução no tempo de onboarding" 
    },
    sub: { 
      es: "Capacitación peer-to-peer 1-a-1 entre turnos", 
      en: "Peer-to-peer 1-on-1 cross-shift training", 
      pt: "Treinamento peer-to-peer 1-a-1 entre turnos" 
    }
  }
];

export interface SkillCategory {
  id: string;
  category: MultilingualText;
  skills: { name: string; tag: MultilingualText }[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "cat_problem_solving",
    category: { es: "Problem Solving", en: "Problem Solving", pt: "Problem Solving" },
    skills: [
      { name: "Root Cause Analysis (RCA)", tag: { es: "5 Whys · 8D", en: "5 Whys · 8D", pt: "5 Whys · 8D" } },
      { name: "Closed-Loop CAPA", tag: { es: "Uso diario", en: "Daily use", pt: "Uso diário" } },
      { name: "Failure Analysis", tag: { es: "Zero Defect", en: "Zero Defect", pt: "Zero Defect" } },
      { name: "Data Analysis & Diagnostics", tag: { es: "Práctico", en: "Practical", pt: "Prático" } }
    ]
  },
  {
    id: "cat_process_improvement",
    category: { es: "Process Improvement", en: "Process Improvement", pt: "Process Improvement" },
    skills: [
      { name: "Line Balancing", tag: { es: "+17% prod", en: "+17% prod", pt: "+17% prod" } },
      { name: "Standard Work & Ergonomics", tag: { es: "En planta", en: "Shop floor", pt: "Na fábrica" } },
      { name: "Value Stream Mapping (VSM)", tag: { es: "Lean", en: "Lean", pt: "Lean" } },
      { name: "Kaizen & Workplace Optimization", tag: { es: "Probado", en: "Proven", pt: "Provado" } }
    ]
  },
  {
    id: "cat_quality_systems",
    category: { es: "Quality Systems", en: "Quality Systems", pt: "Quality Systems" },
    skills: [
      { name: "ISO 9001 · 14001 · 45001", tag: { es: "Auditor", en: "Auditor", pt: "Auditor" } },
      { name: "APQP & Control Plans", tag: { es: "NPI", en: "NPI", pt: "NPI" } },
      { name: "PFMEA / DFMEA", tag: { es: "Prevención", en: "Prevention", pt: "Prevenção" } },
      { name: "Metrología & ISO 17025", tag: { es: "Trazabilidad", en: "Traceability", pt: "Rastreabilidade" } }
    ]
  },
  {
    id: "cat_digital_solutions",
    category: { es: "Digital Solutions & Applied AI", en: "Digital Solutions & Applied AI", pt: "Soluções Digitais & IA Aplicada" },
    skills: [
      { name: "Custom Web Apps for Operations", tag: { es: "Cero burocracia", en: "Zero bureaucracy", pt: "Zero burocracia" } },
      { name: "Applied AI for Operations", tag: { es: "Utilidad real", en: "Real utility", pt: "Utilidade real" } },
      { name: "Workflow Automation", tag: { es: "Productividad", en: "Productivity", pt: "Produtividade" } },
      { name: "English — B2", tag: { es: "Working Prof.", en: "Working Prof.", pt: "Working Prof." } }
    ]
  }
];

export const SKILLS: SkillItem[] = [
  { 
    id: "s1", 
    name: "Root Cause Analysis (RCA) · CAPA", 
    tag: { es: "Uso diario", en: "Daily use", pt: "Uso diário" } 
  },
  { 
    id: "s2", 
    name: "Line Balancing & Workstation Ergonomics", 
    tag: { es: "+17% prod", en: "+17% prod", pt: "+17% prod" } 
  },
  { 
    id: "s3", 
    name: "Value Stream Mapping · Standard Work", 
    tag: { es: "Lean", en: "Lean", pt: "Lean" } 
  },
  { 
    id: "s4", 
    name: "ISO 9001 / 14001 / 45001", 
    tag: { es: "Auditor", en: "Auditor", pt: "Auditor" } 
  },
  { 
    id: "s5", 
    name: "APQP · PFMEA · Control Plans", 
    tag: { es: "NPI", en: "NPI", pt: "NPI" } 
  },
  { 
    id: "s6", 
    name: "Digital Tools & Applied AI for Operations", 
    tag: { es: "Utilidad real", en: "Real utility", pt: "Utilidade real" } 
  },
  { 
    id: "s7", 
    name: "English — B2 | Professional Working Proficiency", 
    tag: { es: "B2", en: "B2", pt: "B2" } 
  },
  { 
    id: "s8", 
    name: "Português — Inicial / Básico", 
    tag: { es: "Inicial", en: "Basic", pt: "Relocação Brasil" } 
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "a1",
    accent: "+17%",
    icon: "⚙️",
    text: {
      es: "Línea Alcatel 4007 — Problema: cuello de botella en ensamble y desbalance entre estaciones. Acción: rediseñé el balanceo de operaciones y optimicé la ergonomía de los puestos. Impacto: aumento del 17% en producción, superando además los objetivos de First Pass Yield.",
      en: "Alcatel 4007 Line — Problem: assembly-line bottlenecks and station cycle time imbalances. Action: rebalanced Lean line operations and optimized workstation ergonomics. Impact: 17% production increase delivered while simultaneously exceeding First Pass Yield targets.",
      pt: "Linha Alcatel 4007 — Problema: gargalos na montagem e desbalanceamento entre postos. Ação: redesenhei o balanceamento Lean e otimizei a ergonomia dos postos. Impacto: aumento de 17% na produção, superando as metas de First Pass Yield."
    }
  },
  {
    id: "a5",
    accent: "+10%",
    icon: "📈",
    text: {
      es: "Línea Alcatel 4015 — Problema: restricciones de flujo táctico durante la rampa de producción. Acción: estabilicé el flujo continuo de proceso y controlé tiempos de ciclo. Impacto: superé en un 10% la producción planificada manteniendo estricta estabilidad y cero defectos catastróficos.",
      en: "Alcatel 4015 Line — Problem: tactical flow constraints during production ramp-up. Action: stabilized continuous process flow and cycle times. Impact: exceeded planned production by 10% while maintaining strict process stability and zero catastrophic defects.",
      pt: "Linha Alcatel 4015 — Problema: restrições de fluxo tático na rampa de produção. Ação: estabilizei o fluxo contínuo e tempos de ciclo. Impacto: superei em 10% a produção planejada mantendo estrita estabilidade e zero defeitos catastróficos."
    }
  },
  {
    id: "a6",
    accent: "-3 op",
    icon: "📉",
    text: {
      es: "Línea Microondas Samsung — Problema: exceso de carga operativa y altos costos de fabricación. Acción: apliqué rebalanceo Lean y redistribución de tareas estándar. Impacto: reasignación eficiente de 3 puestos de operarios, reduciendo costos laborales sin comprometer la confiabilidad.",
      en: "Samsung Microwave Line — Problem: excess labor cost and uneven workstation loading. Action: applied Lean line rebalancing and standard task reallocation. Impact: successfully reallocated 3 operator roles, lowering manufacturing labor costs without compromising reliability.",
      pt: "Linha Micro-ondas Samsung — Problema: excesso de postos e custos de fabricação elevados. Ação: apliquei rebalanceamento Lean e redistribuição de tarefas padrão. Impacto: realocação eficiente de 3 operadores, reduzindo custos sem comprometer a confiabilidade."
    }
  },
  {
    id: "a2",
    accent: "−2d",
    icon: "🎯",
    text: {
      es: "Capacitación en Lanzamientos — Problema: curva de aprendizaje lenta para personal nuevo en lanzamientos de producto. Acción: diseñé un programa peer-to-peer 1-a-1 donde operarios experimentados acompañaban al personal entrante entre turnos. Impacto: reduje 2 días el tiempo de onboarding alcanzando la calidad requerida desde el inicio.",
      en: "Launch Training Model — Problem: slow operator learning curve during rapid product launches. Action: designed a peer-to-peer 1-on-1 coaching program between experienced and incoming shift workers. Impact: cut onboarding time by 2 days while achieving full required quality from day one.",
      pt: "Treinamento em Lançamentos — Problema: curva lenta de aprendizado de novos operadores. Ação: desenhei um programa peer-to-peer 1-a-1 de acompanhamento entre turnos. Impacto: reduzi o onboarding em 2 dias atingindo o padrão de qualidade logo no início."
    }
  },
  {
    id: "a3",
    accent: "CAPA",
    icon: "🔬",
    text: {
      es: "Programas CAPA de Ciclo Cerrado — Problema: fallas repetitivas en manufactura electrónica compleja. Acción: lideré análisis profundos de causa raíz (Ishikawa, 5 Porqués) e implementé intervenciones correctivas y preventivas robustas. Impacto: eliminación total de la recurrencia de defectos críticos en múltiples líneas.",
      en: "Closed-Loop CAPA Programs — Problem: repetitive defect patterns in complex electronics manufacturing. Action: led deep root-cause investigations (Ishikawa, 5 Whys) and implemented robust preventive controls. Impact: permanently eliminated recurrence of critical defects across multiple production lines.",
      pt: "Programas CAPA de Ciclo Fechado — Problema: falhas repetitivas na manufatura eletrônica complexa. Ação: liderei análises de causa raiz (Ishikawa, 5 Porquês) e implementei ações preventivas robustas. Impacto: eliminação total da reincidência de defeitos críticos em múltiplas linhas."
    }
  },
  {
    id: "a4",
    accent: "5+ OEM",
    icon: "🌍",
    text: {
      es: "Conformidad para Marcas Globales — Problema: exigentes y diversos estándares de calidad de clientes internacionales. Acción: coordiné especificaciones con proveedores en Asia/China, audité procesos e implementé planes de control APQP. Impacto: 100% de cumplimiento de calidad para Motorola, Samsung, Huawei, Sony y Alcatel.",
      en: "Global Brands Compliance — Problem: demanding, diverse technical quality requirements from international clients. Action: coordinated specifications with Asian suppliers, audited process lines, and enforced APQP control plans. Impact: 100% quality compliance delivered for Motorola, Samsung, Huawei, Sony, and Alcatel.",
      pt: "Conformidade para Marcas Globais — Problema: padrões técnicos exigentes e diversos de clientes globais. Ação: coordenei especificações com fornecedores na Ásia, auditei processos e executei planos de controle APQP. Impacto: 100% de conformidade de qualidade para Motorola, Samsung, Huawei, Sony e Alcatel."
    }
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "e1",
    company: "Grupo BGH",
    dates: { 
      es: "Mayo 2025 – Presente · Jornada completa · Presencial", 
      en: "May 2025 – Present · Full-time · On-site", 
      pt: "Maio de 2025 – Presente · Tempo integral · Presencial" 
    },
    role: { 
      es: "Gestión de Calidad y Mejora Continua", 
      en: "Quality Management & Continuous Improvement", 
      pt: "Gestão de Qualidade e Melhoria Contínua" 
    },
    desc: {
      es: "Responsable de resolver problemas operativos y elevar la confiabilidad en 2–3 líneas de producción activas mediante datos y análisis de causa raíz. Mis responsabilidades incluyen:<br/>● Liderar <strong>ANÁLISIS DE FALLAS (RCA)</strong> para encontrar causas raíz y eliminar defectos repetitivos.<br/>● Diseñar e implementar un ciclo cerrado de <strong>ACCIONES CORRECTIVAS Y PREVENTIVAS (CAPA)</strong> con seguimiento real.<br/>● Asegurar el control y <strong>TRAZABILIDAD</strong> de componentes críticos en todo el flujo de producción.<br/>● Liderar la <strong>VERIFICACIÓN Y VALIDACIÓN</strong> práctica de soluciones en planta.<br/>● Coordinar con <strong>PROVEEDORES INTERNACIONALES</strong> (Asia) el cumplimiento de especificaciones y resolución de no conformidades.<br/>● Construir herramientas digitales ligeras para agilizar diagnósticos y eliminar planillas innecesarias.",
      en: "Responsible for solving operational problems and driving product reliability across 2–3 active production lines through data and root cause analysis. Key responsibilities include:<br/>● Leading <strong>FAILURE ANALYSIS (RCA)</strong> to uncover root causes and eliminate repetitive defects.<br/>● Designing and implementing closed-loop <strong>CORRECTIVE AND PREVENTIVE ACTIONS (CAPA)</strong> with tracked outcomes.<br/>● Managing control and <strong>TRACEABILITY</strong> of critical components throughout the production flow.<br/>● Leading hands-on <strong>VERIFICATION AND VALIDATION</strong> of implemented solutions on the shop floor.<br/>● Coordinating with <strong>INTERNATIONAL SUPPLIERS</strong> (Asia) for quality compliance and non-conformity resolution.<br/>● Building lightweight digital tools to speed up diagnostics and eliminate unnecessary manual paperwork.",
      pt: "Responsável por solucionar problemas operacionais e elevar a confiabilidade em 2–3 linhas de produção ativas por meio de dados e análise de causa raiz. Principais responsabilidades:<br/>● Liderar <strong>ANÁLISE DE FALHAS (RCA)</strong> para descobrir causas raízes e eliminar defeitos repetitivos.<br/>● Projetar e implementar ciclo fechado de <strong>AÇÕES CORRETIVAS E PREVENTIVAS (CAPA)</strong> com acompanhamento real.<br/>● Gerenciar controle e <strong>RASTREABILIDADE</strong> de componentes críticos ao longo do fluxo de produção.<br/>● Liderar a <strong>VERIFICAÇÃO E VALIDAÇÃO</strong> prática de soluções na fábrica.<br/>● Coordenar com <strong>FORNECEDORES INTERNACIONAIS</strong> (Ásia) para conformidade de requisitos e resolução de não conformidades.<br/>● Desenvolver ferramentas digitais ágeis para acelerar diagnósticos e eliminar planilhas desnecessárias."
    },
    highlight: { es: "Mejora Continua", en: "Continuous Improvement", pt: "Melhoria Contínua" }
  },
  {
    id: "e2",
    company: "Grupo BGH",
    dates: { 
      es: "Octubre 2022 – Presente (Función parcial / paralela)", 
      en: "October 2022 – Present (Part-time / parallel function)", 
      pt: "Outubro de 2022 – Presente (Função parcial / paralela)" 
    },
    role: { 
      es: "Auditor Integrado (ISO 9001 / 14001 / 45001)", 
      en: "Integrated ISO Auditor (9001 / 14001 / 45001)", 
      pt: "Auditor Integrado (ISO 9001 / 14001 / 45001)" 
    },
    desc: {
      es: "Realización de 2–4 auditorías integradas anuales según el plan corporativo, verificando la conformidad real de los procesos en paralelo a mis funciones principales. Responsabilidades clave:<br/>● Verificar la <strong>CONFORMIDAD CON REQUISITOS</strong> y expectativas del cliente bajo la norma <strong>ISO 9001</strong>.<br/>● Evaluar la <strong>GESTIÓN AMBIENTAL</strong> y el cumplimiento normativo estricto bajo <strong>ISO 14001</strong>.<br/>● Auditar condiciones de <strong>SALUD Y SEGURIDAD OCUPACIONAL</strong> y prevención de riesgos bajo <strong>ISO 45001</strong>.<br/>● Detectar desviaciones, redactar informes claros y acordar planes de acción correctiva efectivos.",
      en: "Conducting 2–4 integrated audits per year according to corporate plan, verifying real process compliance in parallel with my main role. Key responsibilities include:<br/>● Ensuring <strong>CONFORMITY WITH CUSTOMER REQUIREMENTS</strong> and expectations under <strong>ISO 9001</strong>.<br/>● Evaluating <strong>ENVIRONMENTAL MANAGEMENT</strong> and regulatory compliance under <strong>ISO 14001</strong>.<br/>● Auditing <strong>OCCUPATIONAL HEALTH AND SAFETY</strong> conditions and risk prevention under <strong>ISO 45001</strong>.<br/>● Identifying deviations, drafting clear audit reports, and agreeing on effective corrective action plans.",
      pt: "Realização de 2–4 auditorias integradas anuais conforme o plano corporativo, verificando a conformidade real dos processos em paralelo com minhas funções. Principais responsabilidades:<br/>● Garantir a <strong>CONFORMIDADE COM REQUISITOS</strong> e expectativas do cliente sob <strong>ISO 9001</strong>.<br/>● Avaliar a <strong>GESTÃO AMBIENTAL</strong> e o cumprimento regulatório sob <strong>ISO 14001</strong>.<br/>● Auditar condições de <strong>SAÚDE E SEGURANÇA OCUPACIONAL</strong> e prevenção de riscos sob <strong>ISO 45001</strong>.<br/>● Identificar desvios, redigir relatórios claros e acordar planos de ação corretiva eficazes."
    }
  },
  {
    id: "e3",
    company: "Grupo BGH",
    dates: { 
      es: "Agosto 2019 – Febrero de 2024", 
      en: "August 2019 – February 2024", 
      pt: "Agosto de 2019 – Fevereiro de 2024" 
    },
    role: { 
      es: "Ingeniero de Procesos Senior", 
      en: "Senior Process Engineer", 
      pt: "Engenheiro de Processos Sênior" 
    },
    desc: {
      es: "Diseño y estabilización de procesos de fabricación para una línea multi-producto, eliminando ineficiencias de ensamble y asegurando repetibilidad. Responsabilidades clave:<br/>● Diseñar el <strong>FLUJO DE PROCESO</strong> completo y aplicar <strong>CONTROL ESTADÍSTICO (SPC)</strong> para estabilizar variables críticas.<br/>● Facilitar <strong>TALLERES DE CAPACITACIÓN PRÁCTICA</strong> al personal sobre estándares de manufactura y trabajo estandarizado.<br/>● Realizar <strong>ANÁLISIS DE FALLAS DE PROCESO</strong> enfocado en prevenir desvíos y paradas no programadas.<br/>● Desarrollar <strong>INSTRUCCIONES DE TRABAJO CLARAS</strong> y documentación operativa sin ambigüedades.",
      en: "Design and stabilization of manufacturing processes for a multi-product line, removing assembly waste and ensuring repeatability. Key responsibilities:<br/>● Designing complete <strong>PROCESS FLOWS</strong> and applying <strong>STATISTICAL PROCESS CONTROL (SPC)</strong> to stabilize critical variables.<br/>● Facilitating <strong>HANDS-ON TRAINING WORKSHOPS</strong> for shop floor staff on manufacturing standards and standardized work.<br/>● Conducting <strong>PROCESS FAILURE ANALYSIS</strong> to prevent production deviations and unscheduled downtime.<br/>● Developing <strong>CLEAR WORK INSTRUCTIONS</strong> and straightforward operational documentation.",
      pt: "Projeto e estabilização de processos de fabricação para linha multi-produto, eliminando desperdícios de montagem e garantindo repetibilidade. Principais responsabilidades:<br/>● Projetar <strong>FLUXOS DE PROCESSO</strong> completos e aplicar <strong>CONTROLE ESTATÍSTICO DE PROCESSO (SPC)</strong>.<br/>● Facilitar <strong>WORKSHOPS PRÁTICOS</strong> para a equipe sobre padrões de manufatura e trabalho padronizado.<br/>● Realizar <strong>ANÁLISE DE FALHAS DE PROCESSO</strong> para prevenir desvios e paradas não programadas.<br/>● Elaborar <strong>INSTRUÇÕES DE TRABALHO CLARAS</strong> e documentação operacional sem ambiguidades."
    }
  },
  {
    id: "e4",
    company: "Grupo BGH",
    dates: { 
      es: "Febrero 2017 – Agosto 2019", 
      en: "February 2017 – August 2019", 
      pt: "Fevereiro de 2017 – Agosto de 2019" 
    },
    role: { 
      es: "Técnico Metrólogo / Laboratorio de Ingeniería", 
      en: "Metrology & Engineering Laboratory Specialist", 
      pt: "Técnico Metrologista / Laboratório de Engenharia" 
    },
    desc: {
      es: "Calibración de 50–100 instrumentos anuales de medición críticos para la manufactura de hardware electrónico, asegurando trazabilidad metrológica ininterrumpida. Responsabilidades clave:<br/>● Ejecutar calibraciones de alta precisión bajo los principios de la norma <strong>ISO 17025</strong>.<br/>● Asegurar la <strong>TRAZABILIDAD METROLÓGICA</strong> ininterrumpida de equipos de prueba en planta.<br/>● Calibrar instrumentación compleja: <strong>GENERADORES DE RADIOFRECUENCIA (RF)</strong> y <strong>SISTEMAS GPS</strong>.<br/>● Certificar dispositivos de prueba de seguridad funcional (ej. <strong>HI-POT TESTERS</strong>) con tolerancia cero a desviaciones.",
      en: "Calibration of 50–100 critical measurement instruments per year for electronic hardware manufacturing, ensuring uninterrupted metrological traceability. Key responsibilities:<br/>● Executing high-precision calibrations under <strong>ISO 17025</strong> principles.<br/>● Ensuring uninterrupted <strong>METROLOGICAL TRACEABILITY</strong> for production test equipment.<br/>● Calibrating complex instrumentation: <strong>RADIO FREQUENCY (RF) GENERATORS</strong> and <strong>GPS SYSTEMS</strong>.<br/>● Certifying functional safety test devices (e.g., <strong>HI-POT TESTERS</strong>) with zero tolerance for deviations.",
      pt: "Calibração de 50–100 instrumentos críticos de medição por ano para fabricação eletrônica, garantindo rastreabilidade metrológica ininterrupta. Principais responsabilidades:<br/>● Executar calibrações de alta precisão sob os princípios da norma <strong>ISO 17025</strong>.<br/>● Garantir a <strong>RASTREABILIDADE METROLÓGICA</strong> ininterrupta para equipamentos de teste na fábrica.<br/>● Calibrar instrumentação complexa: <strong>GERADORES DE RADIOFREQUÊNCIA (RF)</strong> e <strong>SISTEMAS GPS</strong>.<br/>● Certificar dispositivos de teste de segurança funcional (ex. <strong>TESTADORES HI-POT</strong>) com tolerância zero a desvios."
    }
  },
  {
    id: "e5",
    company: "Grupo BGH",
    dates: { 
      es: "Marzo 2014 – Febrero de 2017", 
      en: "March 2014 – February 2017", 
      pt: "Março de 2014 – Fevereiro de 2017" 
    },
    role: { 
      es: "Ingeniero de Procesos — Telefonía Móvil (Marcas Globales)", 
      en: "Process Engineer — Mobile Business Unit (Global Brands)", 
      pt: "Engenheiro de Processos — Telefonia Móvel (Marcas Globais)" 
    },
    desc: {
      es: "Diseño del proceso de fabricación de celulares para 5+ marcas globales de primer nivel como Motorola, Huawei, ZTE, Alcatel y Sony. Lideré el lanzamiento en planta de la marca Alcatel, superando los objetivos de producción y calidad desde el primer modelo. Responsabilidades clave:<br/>● Aplicar metodologías de <strong>PLANIFICACIÓN DE CALIDAD (APQP)</strong> y herramientas <strong>CORE TOOLS</strong> (FMEA, Control Plan).<br/>● Realizar el <strong>BALANCEO DE OPERACIONES</strong> de línea para maximizar throughput y estabilidad.<br/>● Coordinar con <strong>PROVEEDORES INTERNACIONALES</strong> (China) el cumplimiento de estándares y resolución de no conformidades en componentes.<br/>● Disminuir los <strong>COSTOS DE MANUFACTURA</strong> mediante mejoras prácticas en puestos de ensamble.<br/>● Confeccionar <strong>INSTRUCCIONES DE TRABAJO</strong> visuales y dar soporte técnico directo en línea.<br/><br/><strong>⚡ Logros destacados en este rol:</strong><br/>● <strong>+17%</strong> de producción en Alcatel 4007 mediante rebalanceo Lean y optimización ergonómica, superando el First Pass Yield.<br/>● <strong>+10%</strong> sobre la producción planificada en Alcatel 4015 con cero defectos catastróficos.<br/>● <strong>−2 días</strong> de onboarding mediante programa de capacitación peer-to-peer 1-a-1 entre turnos.<br/>● <strong>−3 puestos</strong> optimizados en microondas Samsung a través del rebalanceo Lean.",
      en: "Design of mobile phone manufacturing processes for 5+ top-tier global brands such as Motorola, Huawei, ZTE, Alcatel, and Sony. Led the manufacturing launch of the Alcatel brand on the plant floor, exceeding production and quality targets from the first model. Key responsibilities:<br/>● Applying <strong>QUALITY PLANNING (APQP)</strong> methodologies and <strong>CORE TOOLS</strong> (FMEA, Control Plan).<br/>● Performing assembly <strong>LINE BALANCING</strong> to maximize throughput and process stability.<br/>● Coordinating with <strong>INTERNATIONAL SUPPLIERS</strong> (China) on quality compliance and component non-conformity resolution.<br/>● Lowering <strong>MANUFACTURING COSTS</strong> through practical improvements at assembly stations.<br/>● Drafting visual <strong>WORK INSTRUCTIONS</strong> and providing direct on-line technical support.<br/><br/><strong>⚡ Key achievements in this role:</strong><br/>● <strong>+17%</strong> production increase on Alcatel 4007 through Lean rebalancing and ergonomics, exceeding First Pass Yield.<br/>● <strong>+10%</strong> above planned production on Alcatel 4015 with zero catastrophic defects.<br/>● <strong>−2 days</strong> onboarding reduction through a peer-to-peer 1-on-1 cross-shift training program.<br/>● <strong>−3 operator roles</strong> reallocated on Samsung microwave line through Lean rebalancing.",
      pt: "Projeto do processo de fabricação de celulares para 5+ marcas globais de grande porte como Motorola, Huawei, ZTE, Alcatel e Sony. Liderei o lançamento da marca Alcatel na fábrica, superando as metas de produção e qualidade desde o primeiro modelo. Principais responsabilidades:<br/>● Aplicar metodologias de <strong>PLANEJAMENTO DE QUALIDADE (APQP)</strong> e ferramentas <strong>CORE TOOLS</strong> (FMEA, Control Plan).<br/>● Realizar o <strong>BALANCEAMENTO DE LINHA</strong> para maximizar produtividade e estabilidade.<br/>● Coordenar com <strong>FORNECEDORES INTERNACIONAIS</strong> (China) o cumprimento de padrões e resolução de não conformidades em componentes.<br/>● Reduzir <strong>CUSTOS DE MANUFATURA</strong> por meio de melhorias práticas nos postos de montagem.<br/>● Elaborar <strong>INSTRUÇÕES DE TRABALHO</strong> visuais e dar suporte técnico direto na linha.<br/><br/><strong>⚡ Conquistas destacadas neste cargo:</strong><br/>● <strong>+17%</strong> de produção no Alcatel 4007 por meio de rebalanceamento Lean e ergonomia, superando o First Pass Yield.<br/>● <strong>+10%</strong> acima da produção planejada no Alcatel 4015 com zero defeitos catastróficos.<br/>● <strong>−2 dias</strong> de onboarding por meio de treinamento peer-to-peer 1-a-1 entre turnos.<br/>● <strong>−3 postos</strong> otimizados na linha Samsung através do rebalanceamento Lean."
    },
    highlight: { 
      es: "Lanzamiento Alcatel · +17% producción · Motorola · Sony · Huawei · ZTE", 
      en: "Alcatel Brand Launch · +17% production · Motorola · Sony · Huawei · ZTE", 
      pt: "Lançamento Alcatel · +17% produção · Motorola · Sony · Huawei · ZTE" 
    }
  },
  {
    id: "e6",
    company: "Grupo BGH",
    dates: { 
      es: "Mayo 2012 – Febrero de 2014", 
      en: "May 2012 – February 2014", 
      pt: "Maio de 2012 – Fevereiro de 2014" 
    },
    role: { 
      es: "Analista de Calidad NPI (Nuevos Lanzamientos)", 
      en: "NPI Quality Analyst (New Product Introduction)", 
      pt: "Analista de Qualidade NPI (Novos Lançamentos)" 
    },
    desc: {
      es: "Aseguramiento de la calidad en 11–15 lanzamientos de Nuevos Productos (NPI) en fases de industrialización. Responsabilidades clave:<br/>● Auditar actividades de cada lanzamiento para verificar la conformidad con <strong>ISO 9001</strong> e <strong>ISO/TS 16949</strong>.<br/>● Elaborar <strong>PLANES DE CONTROL</strong> e instrucciones de inspección de nuevos componentes.<br/>● Participar activamente en la confección de <strong>FMEAs DE DISEÑO Y PROCESO</strong>.<br/>● Coordinar con <strong>PROVEEDORES INTERNACIONALES</strong> (China) el cumplimiento de requisitos de calidad en componentes entrantes.<br/>● Realizar la <strong>TRADUCCIÓN TÉCNICA</strong> de inglés a español de especificaciones corporativas.<br/>● Confeccionar <strong>INFORMES TÉCNICOS DE LANZAMIENTO</strong> claros para la gerencia y clientes globales.",
      en: "Quality assurance across 11–15 New Product Introduction (NPI) launches during industrialization phases. Key responsibilities:<br/>● Auditing launch activities to verify compliance with <strong>ISO 9001</strong> and <strong>ISO/TS 16949</strong> standards.<br/>● Developing <strong>CONTROL PLANS</strong> and inspection instructions for new components.<br/>● Participating actively in the development of <strong>DESIGN AND PROCESS FMEAs</strong>.<br/>● Coordinating with <strong>INTERNATIONAL SUPPLIERS</strong> (China) on incoming component quality requirements compliance.<br/>● Performing <strong>TECHNICAL TRANSLATION</strong> (English to Spanish) of corporate specifications.<br/>● Drafting clear <strong>LAUNCH TECHNICAL REPORTS</strong> for management and global clients.",
      pt: "Garantia de qualidade em 11–15 lançamentos de Novos Produtos (NPI) em fases de industrialização. Principais responsabilidades:<br/>● Auditar atividades de lançamento para verificar conformidade com as normas <strong>ISO 9001</strong> e <strong>ISO/TS 16949</strong>.<br/>● Elaborar <strong>PLANOS DE CONTROLE</strong> e instruções de inspeção para novos componentes.<br/>● Participar ativamente na elaboração de <strong>FMEAs DE PROJETO E PROCESSO</strong>.<br/>● Coordenar com <strong>FORNECEDORES INTERNACIONAIS</strong> (China) o cumprimento de requisitos de qualidade em componentes recebidos.<br/>● Realizar a <strong>TRADUÇÃO TÉCNICA</strong> (inglês para espanhol) de especificações corporativas.<br/>● Elaborar <strong>RELATÓRIOS TÉCNICOS DE LANÇAMENTO</strong> claros para a gerência e clientes globais."
    }
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "defect-recorder",
    tag: { 
      es: "Herramienta Operativa · Cero Burocracia · 2025", 
      en: "Operations Tool · Zero Bureaucracy · 2025", 
      pt: "Ferramenta Operacional · Zero Burocracia · 2025" 
    },
    title: "PCB Defect Recorder",
    desc: {
      es: "Problema: carga manual lenta de defectos en planillas con poca visibilidad espacial. Solución: registro visual instantáneo sobre la imagen del PCB. Impacto: menor tiempo de carga para el operario y mapa de calor en tiempo real para ingeniería.",
      en: "Problem: slow manual defect logging on spreadsheets with zero spatial visibility. Solution: instant visual logging directly on the PCB image. Impact: less data-entry time for operators and real-time heatmap visibility for process engineers.",
      pt: "Problema: inserção manual lenta de defeitos em planilhas sem visibilidade espacial. Solução: registro visual instantâneo na imagem da placa PCB. Impacto: menos tempo de digitação para o operador e mapa de calor em tempo real para a engenharia."
    },
    features: [
      { es: "Problema resuelto: elimina planillas manuales de carga de fallas", en: "Problem solved: eliminates manual spreadsheet defect entry", pt: "Problema resolvido: elimina planilhas manuais de registro de falhas" },
      { es: "Solución práctica: clic directo sobre la placa y registro en coordenadas", en: "Practical solution: click coordinates directly on board image", pt: "Solução prática: clique direto na placa e registro em coordenadas" },
      { es: "Impacto operativo: estadísticas automáticas y mapa de calor en vivo", en: "Operational impact: automated live statistics & defect heatmap", pt: "Impacto operacional: estatísticas automáticas e mapa de calor ao vivo" },
      { es: "100% local y seguro — sin servidores externos ni latencia", en: "100% local and secure — no external servers or latency", pt: "100% local e seguro — sem servidores externos ou latência" }
    ],
    link: "https://guillermocanete.github.io/DefectRecorder/"
  },
  {
    id: "iso-analyzer",
    tag: { 
      es: "Herramienta Digital con IA · Auditorías Ágiles · En desarrollo", 
      en: "AI Digital Tool · Agile Auditing · In Development", 
      pt: "Ferramenta Digital com IA · Auditorias Ágeis · Em desenvolvimento" 
    },
    title: "ISO Compliance Analyzer",
    desc: {
      es: "Problema: auditorías documentales lentas y detección tardía de gaps normativos. Solución: escaneo asistido por IA frente a cláusulas ISO 9001/14001/45001. Impacto: detección inmediata de no conformidades potenciales y reducción de burocracia documental.",
      en: "Problem: slow manual document reviews and late compliance gap detection. Solution: AI-assisted scanning against ISO 9001/14001/45001 clauses. Impact: immediate detection of potential non-conformities and reduction of redundant paperwork.",
      pt: "Problema: revisões documentais manuais lentas e detecção tardia de lacunas. Solução: análise com IA cruzando procedimentos com cláusulas ISO 9001/14001/45001. Impacto: detecção imediata de não conformidades e corte de burocracia documental."
    },
    features: [
      { es: "Problema resuelto: revisiones manuales de cientos de páginas de procedimientos", en: "Problem solved: manual review of hundreds of procedure pages", pt: "Problema resolvido: revisão manual de centenas de páginas de procedimentos" },
      { es: "Solución práctica: cruce inteligente de texto contra puntos de la norma", en: "Practical solution: intelligent text mapping against standard clauses", pt: "Solução prática: cruzamento inteligente de texto com os requisitos da norma" },
      { es: "Impacto operativo: identificación de cláusulas no cubiertas y duplicadas", en: "Operational impact: identifies uncovered clauses and redundant text", pt: "Impacto operacional: identifica cláusulas não cobertas e textos duplicados" },
      { es: "Sistemas cubiertos: ISO 9001 · 14001 · 45001", en: "Covered standards: ISO 9001 · 14001 · 45001", pt: "Normas cobertas: ISO 9001 · 14001 · 45001" }
    ],
    wip: true
  }
];

export const CERTS: CertItem[] = [
  { 
    icon: "🏅", 
    name: { 
      es: "ISO 9001 / 14001 / 45001 Auditor", 
      en: "ISO 9001 / 14001 / 45001 Auditor", 
      pt: "Auditor ISO 9001 / 14001 / 45001" 
    }, 
    org: { 
      es: "BGH S.A. / IGS Consulting · 2022", 
      en: "BGH S.A. / IGS Consulting · 2022", 
      pt: "BGH S.A. / IGS Consulting · 2022" 
    },
    description: {
      es: "Formación de Auditor Interno en Normas ISO 9001:2015, 14001:2015 y 45001:2018. Curso de 26 hs. dictado por IGS Consulting en BGH S.A.",
      en: "Internal Auditor Training in ISO 9001:2015, 14001:2015 & 45001:2018 Standards. 26-hour course delivered by IGS Consulting at BGH S.A.",
      pt: "Formação de Auditor Interno em Normas ISO 9001:2015, 14001:2015 e 45001:2018. Curso de 26 hs. ministrado pela IGS Consulting na BGH S.A."
    },
    thumbnail: "/cv/certificates/thumbs/auditor_iso.jpeg"
  },
  { 
    icon: "📊", 
    name: { 
      es: "Análisis de Negocios y Gestión de Procesos", 
      en: "Business Analysis & Process Management", 
      pt: "Análise de Negócios e Gestão de Processos" 
    }, 
    org: { 
      es: "Coursera · BPMN / Lucidchart · Nov 2025", 
      en: "Coursera · BPMN / Lucidchart · Nov 2025", 
      pt: "Coursera · BPMN / Lucidchart · Nov 2025" 
    },
    description: {
      es: "Analizar procesos de negocio y encontrar soluciones a problemas existentes. Definir procesos, sus objetivos y cómo fluyen dentro del contexto organizacional. Evaluar el negocio desde una vista de procesos y encontrar soluciones aplicables.",
      en: "Analyze business processes and find solutions to existing problems. Define processes, their objectives and how they flow within the organizational context. Evaluate the business from a process view and find applicable solutions.",
      pt: "Analisar processos de negócio e encontrar soluções para problemas existentes. Definir processos, seus objetivos e como fluem dentro do contexto organizacional. Avaliar o negócio desde uma visão de processos e encontrar soluções aplicáveis."
    },
    link: "/cv/certificates/cert_business_analysis.pdf",
    thumbnail: "/cv/certificates/thumbs/business_analysis.png"
  },
  { 
    icon: "🤖", 
    name: { 
      es: "GenAI in Data Analytics (IA Generativa en Análisis de Datos)", 
      en: "GenAI in Data Analytics", 
      pt: "GenAI in Data Analytics" 
    }, 
    org: { 
      es: "Meta · Credencial Jun 2026", 
      en: "Meta · Credential Jun 2026", 
      pt: "Meta · Credential Jun 2026" 
    },
    description: {
      es: "Qué es la IA generativa y sus implicaciones en el contexto de análisis de datos. Estrategias básicas para incorporar herramientas de IA generativa en tareas de análisis de datos.",
      en: "What generative AI is and its implication in the data analytics context. Basic strategies for incorporating generative AI tools in data analytics tasks.",
      pt: "O que é a IA generativa e suas implicações no contexto de análise de dados. Estratégias básicas para incorporar ferramentas de IA generativa em tarefas de análise de dados."
    },
    link: "/cv/certificates/cert_genai_data_analytics.pdf",
    thumbnail: "/cv/certificates/thumbs/genai_data.png"
  },
  { 
    icon: "👑", 
    name: { 
      es: "Autoridad, Dirección y Liderazgo", 
      en: "Authority, Management & Leadership", 
      pt: "Autoridade, Direção e Liderança" 
    }, 
    org: { 
      es: "UNAM · Habilidades Gerenciales · Jun 2026", 
      en: "UNAM · Managerial Skills · Jun 2026", 
      pt: "UNAM · Habilidades Gerenciais · Jun 2026" 
    },
    description: {
      es: "Parte del Programa Especializado: Habilidades Gerenciales (actualmente en curso). Desarrollo de competencias en autoridad, dirección y liderazgo organizacional.",
      en: "Part of the Managerial Skills Specialization Program (currently in progress). Development of competencies in authority, management and organizational leadership.",
      pt: "Parte do Programa Especializado: Habilidades Gerenciais (atualmente em andamento). Desenvolvimento de competências em autoridade, direção e liderança organizacional."
    },
    link: "/cv/certificates/cert_liderazgo_unam.pdf",
    thumbnail: "/cv/certificates/thumbs/liderazgo.png"
  },
  { 
    icon: "🧑‍💼", 
    name: { 
      es: "Gestión del Talento Humano", 
      en: "Human Talent Management", 
      pt: "Gestão de Talento Humano" 
    }, 
    org: { 
      es: "UNAM · Habilidades Gerenciales · 2026", 
      en: "UNAM · Managerial Skills · 2026", 
      pt: "UNAM · Habilidades Gerenciais · 2026" 
    },
    description: {
      es: "Parte del Programa Especializado: Habilidades Gerenciales (actualmente en curso). Gestión estratégica del capital humano en organizaciones.",
      en: "Part of the Managerial Skills Specialization Program (currently in progress). Strategic management of human capital in organizations.",
      pt: "Parte do Programa Especializado: Habilidades Gerenciais (atualmente em andamento). Gestão estratégica do capital humano em organizações."
    },
    link: "/cv/certificates/cert_talento_humano.pdf",
    thumbnail: "/cv/certificates/thumbs/talento_humano.png"
  },
  { 
    icon: "🚀", 
    name: { 
      es: "Agentes de IA Generativa con Vertex AI y Flutter", 
      en: "Generative AI Agents with Vertex AI & Flutter", 
      pt: "Agentes de IA Generativa com Vertex AI e Flutter" 
    }, 
    org: { 
      es: "Coursera / Google Cloud · 2026", 
      en: "Coursera / Google Cloud · 2026", 
      pt: "Coursera / Google Cloud · 2026" 
    },
    description: {
      es: "Describir la IA generativa y el uso de modelos y herramientas para crear aplicaciones. Implementar funciones basadas en IA generativa en una app de Flutter integrando Gemini y un agente de Reasoning Engine.",
      en: "Describe generative AI and the use of models and tools to build applications. Implement generative AI features in a Flutter app integrating Gemini and a Reasoning Engine agent.",
      pt: "Descrever a IA generativa e o uso de modelos e ferramentas para criar aplicações. Implementar funcionalidades baseadas em IA generativa em um aplicativo Flutter integrando Gemini e um agente de Reasoning Engine."
    },
    link: "https://www.coursera.org/account/accomplishments/verify/S42LKC9UBWWO",
    thumbnail: "/cv/certificates/thumbs/vertex_ai_flutter.png"
  },
  { 
    icon: "🤖", 
    name: { 
      es: "Claude 101 — Uso Profesional con IA", 
      en: "Claude 101 — AI Professional Use", 
      pt: "Claude 101 — Uso Profissional com IA" 
    }, 
    org: { 
      es: "Anthropic Education · Abr 2026", 
      en: "Anthropic Education · Apr 2026", 
      pt: "Anthropic Education · Abr 2026" 
    },
    description: {
      es: "Fundamentos del uso profesional de Claude como asistente de IA. Técnicas de prompting, flujos de trabajo y mejores prácticas para maximizar la productividad.",
      en: "Fundamentals of professional use of Claude as an AI assistant. Prompting techniques, workflows and best practices to maximize productivity.",
      pt: "Fundamentos do uso profissional do Claude como assistente de IA. Técnicas de prompting, fluxos de trabalho e melhores práticas para maximizar a produtividade."
    },
    link: "/cv/certificates/cert_claude_101.pdf",
    thumbnail: "/cv/certificates/thumbs/claude_101.png"
  },
  { 
    icon: "⚡", 
    name: { 
      es: "Claude Code 101", 
      en: "Claude Code 101", 
      pt: "Claude Code 101" 
    }, 
    org: { 
      es: "Anthropic Education · 2026", 
      en: "Anthropic Education · 2026", 
      pt: "Anthropic Education · 2026" 
    },
    description: {
      es: "Desarrollo asistido por IA con Claude Code. Creación de aplicaciones, debugging y automatización de flujos de desarrollo.",
      en: "AI-assisted development with Claude Code. Application creation, debugging and development workflow automation.",
      pt: "Desenvolvimento assistido por IA com Claude Code. Criação de aplicações, debugging e automação de fluxos de desenvolvimento."
    },
    link: "/cv/certificates/cert_claude_code_101.pdf",
    thumbnail: "/cv/certificates/thumbs/claude_code_101.png"
  },
  { 
    icon: "🧠", 
    name: { 
      es: "Marco de Competencia y Fundamentos de IA", 
      en: "AI Fluency Framework & Foundations", 
      pt: "Estrutura de Competência e Fundamentos de IA" 
    }, 
    org: { 
      es: "Anthropic · Certificado de Finalización", 
      en: "Anthropic · Certificate of Completion", 
      pt: "Anthropic · Certificado de Conclusão" 
    },
    description: {
      es: "Marco de competencia en IA y fundamentos para la adopción responsable de inteligencia artificial en contextos profesionales.",
      en: "AI competency framework and foundations for responsible AI adoption in professional contexts.",
      pt: "Estrutura de competência em IA e fundamentos para a adoção responsável de inteligência artificial em contextos profissionais."
    },
    link: "/cv/certificates/cert_ai_fluency.pdf",
    thumbnail: "/cv/certificates/thumbs/ai_fluency.png"
  },
  { 
    icon: "🔧", 
    name: { 
      es: "APQP con Énfasis en FMEA y Plan de Control", 
      en: "APQP with Emphasis on FMEA & Control Plan", 
      pt: "APQP com Ênfase em FMEA e Plano de Controle" 
    }, 
    org: { 
      es: "Shinka Ingeniería · Jul 2012", 
      en: "Shinka Engineering · Jul 2012", 
      pt: "Shinka Engenharia · Jul 2012" 
    },
    description: {
      es: "Planificación Anticipada de la Calidad del Producto (APQP) con énfasis en Análisis de Modos y Efectos de Falla (FMEA) y Plan de Control.",
      en: "Advanced Product Quality Planning (APQP) with emphasis on Failure Mode & Effects Analysis (FMEA) and Control Plan.",
      pt: "Planejamento Avançado da Qualidade do Produto (APQP) com ênfase em Análise de Modos e Efeitos de Falha (FMEA) e Plano de Controle."
    },
    thumbnail: "/cv/certificates/thumbs/apqp.png"
  },
  { 
    icon: "🎓", 
    name: { 
      es: "Experto en Project Management", 
      en: "Project Management Expert", 
      pt: "Especialista em Gestão de Projetos" 
    }, 
    org: { 
      es: "UTN FRBA · Certificación Profesional · Ene 2016", 
      en: "UTN FRBA · Professional Certification · Jan 2016", 
      pt: "UTN FRBA · Certificação Profissional · Jan 2016" 
    },
    description: {
      es: "Análisis profundo y aplicación práctica del estándar PMI® y el PMBOK® Guide para la gestión efectiva de proyectos.",
      en: "In-depth analysis and practical application of the PMI® standard and PMBOK® Guide for effective project management.",
      pt: "Análise aprofundada e aplicação prática do padrão PMI® e PMBOK® Guide para uma gestão eficaz de projetos."
    },
    link: "https://validator.centrodeelearning.com/validator/A1jHOzkl0I",
    thumbnail: "/cv/certificates/thumbs/project_management.png"
  }
];

export const ARTICLES: Article[] = [
  {
    id: "titanic",
    category: { 
      es: "Gestión · Agilidad · Mayo 2025", 
      en: "Management · Agility · May 2025", 
      pt: "Gestão · Agilidade · Maio 2025" 
    },
    title: { 
      es: "El Timón de la Agilidad: Cómo evitar el destino del Titanic", 
      en: "The Helm of Agility: Avoiding the Titanic's fate", 
      pt: "O Leme da Agilidade: Como evitar o destino do Titanic" 
    },
    excerpt: {
      es: "El Titanic no se hundió por ser grande. Se hundió porque su timón era demasiado pequeño para girar a tiempo. Un análisis sobre burocracia, Jidoka y el costo real de no empoderar a quien más sabe.",
      en: "The Titanic didn't sink because it was big. It sank because its rudder was too small to turn in time. An analysis of bureaucracy, Jidoka, and the real cost of not empowering those who know best.",
      pt: "O Titanic não afundou por ser grande. Afundou porque seu leme era muito pequeno para virar a tempo. Uma análise sobre burocracia, Jidoka e o custo real de não empoderar quem mais sabe."
    },
    content: {
      es: `<h2>El Titanic no se hundió por ser grande.</h2>
<p>Se hundió porque su timón era demasiado pequeño para girar a tiempo.</p>
<p>No por un único error, sino por la acumulación de varios: exceso de confianza, advertencias ignoradas y —el detalle que más me impacta como especialista en procesos— un timón desproporcionadamente pequeño para el tamaño del buque. <strong>Un gigante que no podía girar a tiempo.</strong></p>
<p>Cuando escuché esta analogía por primera vez, pensé de inmediato en las empresas donde trabajé. ¿Cuántas organizaciones conozco que son enormes en recursos pero lentas para reaccionar? ¿Cuántas veces vi cómo una buena idea moría en el quinto nivel de aprobación?</p>
<hr/>
<h2>El problema no es la burocracia. Es lo que la genera.</h2>
<p>La burocracia, en su origen, tiene sentido. Yo trabajo con ISO 9001 hace más de una década y entiendo el valor de los procesos bien definidos.</p>
<p>Pero existe un punto de quiebre en el que el proceso deja de servir al negocio y empieza a servirse a sí mismo. Conozco empresas donde firmar un contrato requería la aprobación del gerente general: un trámite que tardaba semanas. Mientras tanto, el cliente se iba con la competencia. <strong>Eso es un timón pequeño.</strong></p>
<p>Lo que genera esa burocracia excesiva, en el fondo, es miedo: miedo a delegar. Un sistema que penaliza el error produce capas de aprobaciones para que nadie quede expuesto.</p>
<hr/>
<h2>El mando medio no es el villano.</h2>
<p>El problema no es el mando medio, sino el rol que se le asignó. In un modelo jerárquico, el gerente intermedio actúa como un policía. En un modelo ágil, ese mismo rol puede convertirse en un catalizador. <strong>La diferencia no está en la persona, sino en el sistema que la rodea.</strong></p>
<hr/>
<h2>Lo que Toyota entendió hace setenta años.</h2>
<p>El <strong>Jidoka</strong> —uno de los pilares del Sistema de Producción Toyota— consiste en darle al operario de línea el poder de detener la producción cuando detecta un defecto. No al supervisor. No al gerente. <strong>Al operario.</strong></p>
<p>Eso es empoderamiento real. El problema se resuelve en el origen, antes de que se propague. La persona que más sabe de ese punto del proceso es quien lo vive todos los días.</p>
<p>Cuando diseño procesos siempre me pregunto: ¿quién tiene la información más fresca? ¿Está habilitada para actuar? Si la respuesta es no, tenemos un timón pequeño.</p>
<hr/>
<h2>Fallar rápido está bien. Aprender rápido es mejor.</h2>
<p>El valor no reside en el fallo en sí, sino en la velocidad del aprendizaje que se deriva de él. En manufactura, una no conformidad detectada tarde cuesta diez veces más que una detectada en el origen. El costo real no es el defecto: es todo lo que se procesó encima de él.</p>
<p>Para que ese ciclo funcione hace falta <strong>seguridad psicológica</strong>: la certeza de que equivocarse en el proceso de aprender no le va a costar la carrera a nadie.</p>
<hr/>
<h2>El nuevo timón.</h2>
<p>El Titanic no necesitaba ser más pequeño. Necesitaba un timón a la altura de su tamaño. Las organizaciones de hoy no necesitan achicarse, sino desarrollar la capacidad de girar: estructuras más planas que distribuyan la autoridad, empleados empoderados que actúen como sensores del sistema y una cultura donde el aprendizaje sea más rápido que el error.</p>
<p>Zappos intentó eliminar la jerarquía de golpe con la Holacracy y perdió el 29 % de su plantilla en el primer año. La transformación no se logra con un decreto: se consigue rediseñando el sistema de navegación completo. Toyota lleva décadas demostrándolo. Spotify, también.</p>
<p>La pregunta para cualquier líder hoy no es "¿somos suficientemente grandes?"</p>
<p><strong>Es: "¿podemos girar a tiempo?"</strong></p>
<div class="closing">¿Qué tan grande es el timón en tu organización?</div>`,
      en: `<h2>The Titanic didn't sink because it was big.</h2>
<p>It sank because its rudder was too small to turn in time.</p>
<p>Not from a single mistake, but from an accumulation: overconfidence, ignored warnings, and —the detail that strikes me most as a process specialist— a rudder disproportionately small for the vessel's size. <strong>A giant that couldn't steer in time.</strong></p>
<p>When I first heard this analogy, I immediately thought of organizations I've worked in. How many companies do I know that are enormous in resources but slow to react? How many times did I watch a good idea die in the fifth approval layer?</p>
<hr/>
<h2>The problem isn't bureaucracy. It's what generates it.</h2>
<p>Bureaucracy at its core makes sense. I've worked with ISO 9001 for over a decade and I understand the value of well-defined processes.</p>
<p>But there's a breaking point where the process stops serving the business and starts serving itself. I know companies where signing a contract required CEO approval — a process that took weeks. Meanwhile, the client walked out. <strong>That's a small rudder.</strong></p>
<p>What generates excessive bureaucracy, at its root, is fear: fear of delegating. A system that penalizes mistakes produces layer after layer of approvals so nobody is exposed.</p>
<hr/>
<h2>Middle management isn't the villain.</h2>
<p>The problem isn't the middle manager, but the role they were assigned. In a traditional hierarchy, they act as a cop. In an agile model, that same role can become a catalyst. <strong>The difference isn't the person — it's the system around them.</strong></p>
<hr/>
<h2>What Toyota understood seventy years ago.</h2>
<p><strong>Jidoka - a pillar of the Toyota Production System - means giving the line operator the power to stop production when they detect a defect. Not the supervisor. Not the manager. The operator.</strong></p>
<p>That's real empowerment. The problem gets solved at the source, before it spreads. The person who knows most about that process point is the one living it every day.</p>
<p>When I design processes I always ask: who has the freshest information? Are they enabled to act? If the answer is no — we have a small rudder.</p>
<hr/>
<h2>Failing fast is fine. Learning fast is better.</h2>
<p>The value isn't in the failure itself, but in the speed of learning derived from it. In manufacturing, a non-conformity detected late costs ten times more than one caught at the source. The real cost isn't the defect — it's everything built on top of it.</p>
<p>For that to work you need <strong>psychological safety</strong>: the certainty that making mistakes while learning won't cost anyone their career.</p>
<hr/>
<h2>The new rudder.</h2>
<p>The Titanic didn't need to be smaller. It needed a rudder proportional to its size. Today's organizations don't need to shrink — they need to develop the ability to turn: flatter structures that distribute authority, empowered employees who act as the system's sensors, and a culture where learning is faster than error.</p>
<p>Zappos tried to eliminate hierarchy overnight with Holacracy and lost 29% of its staff in year one. Transformation doesn't happen by decree — it happens by re-engineering the entire system. Toyota has been proving it for decades. Spotify too.</p>
<p>The question for any leader today isn't "are we big enough?"</p>
<p><strong>It's: "can we turn in time?"</strong></p>
<div class="closing">How big is the rudder in your organization?</div>`,
      pt: `<h2>O Titanic não afundou por ser grande.</h2>
<p>Afundou porque seu leme era muito pequeno para virar a tempo.</p>
<p>Não por um único erro, mas pelo acúmulo de vários: excesso de confiança, avisos ignorados e —o detalhe que mais me impacta como especialista em processos— um leme desproporcionalmente pequeno para o tamanho do navio. <strong>Um gigante que não conseguia girar a tempo.</strong></p>
<p>Quando ouvi essa analogia pela primeira vez, pensei imediatamente nas empresas onde trabalhei. Quantas organizações conheço que têm recursos enormes, mas são lentas para reagir? Quantas vezes vi uma boa ideia morrer no quinto nível de aprovação?</p>
<hr/>
<h2>O problema não é a burocracia. É o que a gera.</h2>
<p>A burocracia, em sua origem, faz sentido. Trabalho com a ISO 9001 há mais de uma década e entendo o valor de processos bem definidos.</p>
<p>Mas há um ponto de ruptura em que o processo deixa de servir ao negócio e começa a servir a si mesmo. Conheço empresas onde assinar um contrato exigia a aprovação do diretor geral: um trâmite que demorava semanas. Enquanto isso, o cliente ia para a concorrência. <strong>Isso é um leme pequeno.</strong></p>
<p>O que gera essa burocracia excessiva, no fundo, é o medo: medo de delegar. Um sistema que pune o erro produz camadas de aprovação para que ninguém fique exposto.</p>
<hr/>
<h2>O gerente médio não é o vilão.</h2>
<p>O problema não é o gerente médio, mas o papel que lhe foi atribuído. Em um modelo hierárquico, ele atua como um policial. Em um modelo ágil, esse mesmo papel pode se tornar um catalisador. <strong>A diferença não está na pessoa, mas no sistema que a envolve.</strong></p>
<hr/>
<h2>O que a Toyota entendeu há setenta anos.</h2>
<p>O <strong>Jidoka</strong> —um dos pilares do Sistema Toyota de Produção— consiste em dar ao operador de linha o poder de parar a produção quando detecta um defeito. Não ao supervisor. Não ao gerente. <strong>Ao operador.</strong></p>
<p>Isso é empoderamento real. O problema é resolvido na origem, antes que se espalhe. A pessoa que mais conhece esse ponto do processo é quem o vivencia todos os dias.</p>
<p>Quando desenho processos, sempre me pergunto: quem tem a informação mais fresca? Está habilitado para agir? Se a resposta for não, temos um leme pequeno.</p>
<hr/>
<h2>Falhar rápido é bom. Aprender rápido é melhor.</h2>
<p>O valor não está na falha em si, mas na velocidade do aprendizado que dela deriva. Na manufatura, uma não conformidade detectada tardiamente custa dez vezes mais do que uma detectada na origem. O custo real não é o defeito: é tudo o que foi processado em cima dele.</p>
<p>Para que esse ciclo funcione, é necessária **segurança psicológica**: a certeza de que errar no processo de aprendizagem não custará a carreira de ninguém.</p>
<hr/>
<h2>O novo leme.</h2>
<p>O Titanic não precisava ser menor. Precisava de um leme à altura do seu tamanho. As organizações de hoje não precisam encolher, mas sim desenvolver a capacidade de girar: estruturas mais planas que distribuem autoridade, colaboradores empoderados que atuam como sensores do sistema e uma cultura onde o aprendizado seja mais rápido que o erro.</p>
<p>A Zappos tentou eliminar a hierarquia de uma vez com a Holacracy e perdeu 29% da sua equipe no primeiro ano. A transformação não se consegue por decreto: consegue-se redesenhando o sistema de navegação completo. A Toyota demonstra isso há décadas. O Spotify também.</p>
<p>A pergunta para qualquer líder hoje não é "somos grandes o suficiente?"</p>
<p><strong>É: "conseguimos girar a tempo?"</strong></p>
<div class="closing">Quão grande é o leme na sua organização?</div>`
    }
  },
  {
    id: "spacex",
    category: { 
      es: "Liderazgo · Innovación · Junio 2026", 
      en: "Leadership · Innovation · June 2026", 
      pt: "Liderança · Inovação · Junho 2026" 
    },
    title: { 
      es: 'EL MITO DE LA PERFECCIÓN: Cómo el paradigma de SpaceX está transformando el liderazgo y los mandos medios en la industria', 
      en: 'THE MYTH OF PERFECTION: How the SpaceX Paradigm is Transforming Leadership and Middle Management in Industry', 
      pt: 'O MITO DA PERFEIÇÃO: Como o paradigma da SpaceX está transformando a liderança e a gerência média na indústria' 
    },
    excerpt: {
      es: '¿Es el "fallo controlado" el verdadero secreto de la innovación industrial moderna? Un análisis de la velocidad de escape de la información, el framing de riesgo y el rol de los mandos medios como mentores.',
      en: 'Is "controlled failure" the true secret of modern industrial innovation? An analysis of information escape velocity, risk framing, and middle managers as technical mentors.',
      pt: 'Será a "falha controlada" o verdadeiro segredo da inovação industrial moderna? Uma análise da velocidade de escape da informação, delimitação de risco e gerentes médios como mentores.'
    },
    content: {
      es: `<div class="article-image-container mb-6">
  <img src="IMAGE_PLACEHOLDER" alt="SpaceX Starship launch and explosion" class="w-full h-auto rounded border border-cv-line object-cover" />
</div>
<p><strong>¿Es el "fallo controlado" el verdadero secreto de la innovación industrial moderna?</strong></p>
<p>Durante décadas, la manufactura y la ingeniería pesada operaron bajo un dogma estricto: <em>"El fallo no es una opción"</em>. El enfoque tradicional exige meses de simulaciones, comités de revisión y parálisis por análisis para asegurar que todo sea "seguro y perfecto" antes del primer intento.</p>
<p>Pero organizaciones hiperdinámicas como SpaceX han reescrito las reglas del juego con el desarrollo iterativo de la Starship. Ver explotar un prototipo en vivo no es un fracaso; es la aceleración deliberada del ciclo de aprendizaje.</p>
<p>¿Por qué este enfoque está desplazando a la gestión tradicional? Aquí 4 claves de diseño organizacional:</p>
<hr/>
<h2>1️⃣ Velocidad de Escape de la Información</h2>
<p>Tres minutos de vuelo real y telemetría empírica aportan más datos puros que tres años de simulaciones por computadora. El conocimiento adquirido vale más que el costo del prototipo.</p>
<h2>2️⃣ Gestión del Riesgo (Risk Framing)</h2>
<p>Esto no es imprudencia. El fallo se permite bajo límites estrictos: en fase de prototipado, con materiales optimizados en costos y sin comprometer la seguridad humana. Se calcula el impacto frente al <em>Cost of Delay</em> (Costo del Retraso).</p>
<h2>3️⃣ Seguridad Psicológica</h2>
<p>Para que la agilidad funcione, la cultura debe cambiar. El personal operativo no debe temer al error, sino dominar su diagnóstico y corrección en ciclos de horas, no de semanas (como propone la profesora Amy Edmondson de Harvard).</p>
<h2>4️⃣ Mandos Medios como Mentores Técnicos</h2>
<p>En entornos ágiles, los jefes de área dejan de ser "policías del cumplimiento" de estándares rígidos. Se convierten en coaches que delimitan las fronteras de experimentación y guían al equipo mediante análisis de causa raíz tras cada iteración.</p>
<hr/>
<p><strong>La gran lección industrial:</strong> En entornos de alta incertidumbre, el liderazgo moderno no radica en diseñar sistemas infalibles de entrada, sino en construir organizaciones con una velocidad de aprendizaje y resiliencia superior a la de sus competidores. El metal retorcido de hoy es la ciencia del mañana.</p>
<div class="closing mt-6 pt-4 border-t border-cv-line/45">
  <p><em>(Inspirado en los principios de Product Development Flow de Don Reinertsen y la cultura de diseño de SpaceX).</em></p>
  <p>👇 ¿En tu organización se penaliza el error o se utiliza metodológicamente como combustible para innovar? Házmelo saber en LinkedIn.</p>
</div>`,
      en: `<div class="article-image-container mb-6">
  <img src="IMAGE_PLACEHOLDER" alt="SpaceX Starship launch and explosion" class="w-full h-auto rounded border border-cv-line object-cover" />
</div>
<p><strong>Is "controlled failure" the true secret of modern industrial innovation?</strong></p>
<p>For decades, manufacturing and heavy engineering operated under a strict dogma: <em>"Failure is not an option."</em> The traditional approach demands months of simulations, review committees, and analysis paralysis to ensure everything is "safe and perfect" before the first attempt.</p>
<p>But hyper-dynamic organizations like SpaceX have rewritten the rules of the game with the iterative development of Starship. Watching a prototype explode live is not a failure; it is the deliberate acceleration of the learning curve.</p>
<p>Why is this approach displacing traditional management? Here are 4 organizational design keys:</p>
<hr/>
<h2>1️⃣ Information Escape Velocity</h2>
<p>Three minutes of real flight and empirical telemetry provide more pure data than three years of computer simulations. The knowledge acquired is worth more than the cost of the prototype.</p>
<h2>2️⃣ Risk Management (Risk Framing)</h2>
<p>This is not recklessness. Failure is permitted under strict limits: in the prototyping phase, with cost-optimized materials, and without compromising human safety. The impact is calculated against the <em>Cost of Delay</em>.</p>
<h2>3️⃣ Psychological Safety</h2>
<p>For agility to work, the culture must change. Operational staff must not fear error; instead, they must master its diagnosis and correction in cycles of hours, not weeks (as proposed by Harvard Professor Amy Edmondson).</p>
<h2>4️⃣ Middle Managers as Technical Mentors</h2>
<p>In agile environments, department heads stop being "compliance cops" of rigid standards. They become coaches who define the boundaries of experimentation and guide the team through root-cause analysis after each iteration.</p>
<hr/>
<p><strong>The great industrial lesson:</strong> In high-uncertainty environments, modern leadership is not about designing infallible systems from the start, but about building organizations with a learning speed and resilience superior to their competitors. Today's twisted metal is tomorrow's science.</p>
<div class="closing mt-6 pt-4 border-t border-cv-line/45">
  <p><em>(Inspired by the principles of Product Development Flow by Don Reinertsen and SpaceX's design culture).</em></p>
  <p>👇 In your organization, is error penalized or is it methodologically used as fuel to innovate? Let me know on LinkedIn.</p>
</div>`,
      pt: `<div class="article-image-container mb-6">
  <img src="IMAGE_PLACEHOLDER" alt="SpaceX Starship launch and explosion" class="w-full h-auto rounded border border-cv-line object-cover" />
</div>
<p><strong>Será a "falha controlada" o verdadeiro segredo da inovação industrial moderna?</strong></p>
<p>Durante décadas, a manufatura e a engenharia pesada operaram sob um dogma estrito: <em>"A falha não é uma opção"</em>. A abordagem tradicional exige meses de simulações, comitês de revisão e paralisia por análise para garantir que tudo seja "seguro e perfeito" antes da primeira tentativa.</p>
<p>Mas organizações hiperdinâmicas como a SpaceX reescreveram as regras do jogo com o desenvolvimento iterativo da Starship. Ver um protótipo explodir ao vivo não é um fracasso; é a aceleração deliberada da curva de aprendizado.</p>
<p>Por que esta abordagem está deslocando a gestão tradicional? Aqui estão 4 chaves de design organizacional:</p>
<hr/>
<h2>1️⃣ Velocidade de Escape da Informação</h2>
<p>Três minutos de voo real e telemetria empírica fornecem mais dados puros do que três anos de simulações computadorizadas. O conhecimento adquirido vale mais do que o custo do protótipo.</p>
<h2>2️⃣ Gestão do Risco (Risk Framing)</h2>
<p>Isso não é imprudência. A falha é permitida sob limites estritos: na fase de prototipagem, com materiais otimizados em custos e sem comprometer a segurança humana. O impacto é calculado frente ao <em>Cost of Delay</em> (Custo do Atraso).</p>
<h2>3️⃣ Segurança Psicológica</h2>
<p>Para que a agilidade funcione, a cultura deve mudar. A equipe operacional não deve temer o erro, mas dominar seu diagnóstico e correção em ciclos de horas, não de semanas (como proposto pela professora Amy Edmondson de Harvard).</p>
<h2>4️⃣ Gerentes Médios como Mentores Técnicos</h2>
<p>Em ambientes ágeis, os gerentes médios deixam de ser "policiais de conformidade" de padrões rígidos. Tornam-se coaches que delimitam as fronteiras de experimentação e guiam a equipe por meio de análises de causa raiz após cada iteração.</p>
<hr/>
<p><strong>A grande lição industrial:</strong> Em ambientes de alta incerteza, a liderança moderna não está em projetar sistemas infalíveis de início, mas em construir organizações com uma velocidade de aprendizado e resiliência superior à de seus concorrentes. O metal retorcido de hoje é a ciência de amanhã.</p>
<div class="closing mt-6 pt-4 border-t border-cv-line/45">
  <p><em>(Inspirado nos princípios de Product Development Flow de Don Reinertsen e na cultura de design da SpaceX).</em></p>
  <p>👇 Na sua organização, o erro é penalizado ou é utilizado metodologicamente como combustível para inovar? Deixe-me saber no LinkedIn.</p>
</div>`
    }
  }
];
