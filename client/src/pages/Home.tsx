import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Boxes,
  Cable,
  ChartNoAxesCombined,
  Check,
  CircleDot,
  Database,
  Gauge,
  Mail,
  Package,
  Radio,
  ScanLine,
  ServerCog,
  ShieldCheck,
  Warehouse,
  Waypoints,
  Zap,
  Clock,
  AlertTriangle,
  Truck
} from "lucide-react";

// Dados para os versos dos cartões
const modules = [
  {
    id: "intercompany",
    index: "01",
    tag: "OPERAÇÃO & VISIBILIDADE",
    title: "Painel\nIntercompany",
    color: "blue",
    icon: Boxes,
    image: "/painelic.png",
    metrics: [
      ["Atualizações", "04x / dia"],
      ["Saídas", "E-mail + BI"],
      ["Histórico", "Completo"],
    ],
    bullets: [
      "Paletes livres, quarentena e cargas disponíveis",
      "Destino, placa, transportadora e quantidade",
      "Pedido → faturado → embarque → lead time",
      "Negativos: pedido feito sem mercadoria disponível",
      "Causas: transporte, faturamento e NF",
    ],
  },
  {
    id: "samples",
    index: "02",
    tag: "PLANEJAMENTO & CONTROLE",
    title: "Torre de\nAmostra Grátis",
    color: "cyan",
    icon: Warehouse,
    image: "/torreag.png",
    metrics: [
      ["Entregues", "860 mil+ cx"],
      ["Reentrega", "120.832 cx"],
      ["Atrasos", "832 cargas"],
    ],
    bullets: [
      "Livre, quarentena, restrito e bloqueado",
      "OCT, FNE, reentrega e carro dedicado",
      "Shelf life, carteira e cobertura de estoque",
      "Filtros por ocorrência, período e representante",
      "NFs atrasadas × no prazo × total",
    ],
  },
];

function NexusMark({ small = false }: { small?: boolean }) {
  return (
    <div className={small ? "nexus-mark nexus-mark--small" : "nexus-mark"} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

function RobotCore({ final = false }: { final?: boolean }) {
  return (
    <div className={`robot-core ${final ? "robot-core--final" : ""}`} aria-label={final ? "Robô Nexus acenando em despedida" : "Robô Nexus de monitoramento operacional"}>
      <div className="robot-orbit robot-orbit--one" />
      <div className="robot-orbit robot-orbit--two" />
      <div className="robot-antenna">
        <span />
      </div>
      <div className="robot-head">
        <div className="robot-brow" />
        <div className="robot-eyes">
          <i />
          <i />
        </div>
        <div className="robot-mouth">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="robot-neck" />
      <div className="robot-chest">
        <img src="/logo-hypera-pharma-1536.png" alt="Hypera" className="robot-logo-estampa" />
        <div className="robot-chest-line" />
        <div className="robot-chest-core"><CircleDot size={16} /></div>
        <div className="robot-chest-line robot-chest-line--short" />
      </div>
      <div className="robot-shoulder robot-shoulder--left" />
      <div className="robot-shoulder robot-shoulder--right" />
      <div className="robot-arm robot-arm--left"><span /><b /></div>
      <div className="robot-arm robot-arm--right"><span /><b /></div>
      <div className="robot-signal robot-signal--one"><Activity size={13} /></div>
      <div className="robot-signal robot-signal--two"><Zap size={13} /></div>
    </div>
  );
}

function FlowNode({ icon: Icon, label, detail, active = false }: { icon: typeof Database; label: string; detail: string; active?: boolean }) {
  return (
    <div className={`flow-node ${active ? "flow-node--active" : ""}`}>
      <div className="flow-node__icon"><Icon size={17} strokeWidth={1.8} /></div>
      <div>
        <strong>{label}</strong>
        <span>{detail}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [booting, setBooting] = useState(() => !new URLSearchParams(window.location.search).has("skipboot"));
  
  const [flipIC, setFlipIC] = useState(false);
  const [flipAG, setFlipAG] = useState(false);

  const IconIC = modules[0].icon;
  const IconAG = modules[1].icon;

  useEffect(() => {
    const bootTimer = window.setTimeout(() => setBooting(false), 2450);
    const updateScrollProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--scroll-progress", `${maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0}%`);
    };
    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14 },
    );
    document.querySelectorAll(".reveal-on-scroll").forEach((element) => revealObserver.observe(element));
    
    return () => {
      window.clearTimeout(bootTimer);
      window.removeEventListener("scroll", updateScrollProgress);
      revealObserver.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const springTransition = { duration: 0.9, ease: [0.16, 1, 0.3, 1] };

  return (
    <main className="nexus-page bg-slate-50">
      <div className="scroll-rail" aria-hidden="true"><span /></div>
      
      <div className={`boot-sequence ${booting ? "boot-sequence--active" : "boot-sequence--done"}`} aria-hidden={!booting}>
        <div className="boot-flash" />
        <div className="boot-rays"><i /><i /><i /><i /><i /><i /></div>
        <div className="boot-logotype"><NexusMark /><span>PROJETO <b>NEXUS</b></span></div>
        <div className="boot-progress"><span /><b>INITIALIZING CORE / 001</b></div>
      </div>
      
      <section className="command-stage command-stage--opening reveal-on-scroll" aria-label="Abertura Projeto Nexus">
        <div className="command-stage__noise" />
        <div className="command-stage__marquee command-stage__marquee--top"><span>PROJECT NEXUS / HYPERA LOGÍSTICA / INTELLIGENCE / PROJECT NEXUS / HYPERA LOGÍSTICA /</span></div>
        <div className="command-stage__marquee command-stage__marquee--bottom"><span>AUTOMATION / CONNECTED OPERATION / AUTOMATION / CONNECTED OPERATION /</span></div>
        <div className="command-stage__crosshair command-stage__crosshair--horizontal" /><div className="command-stage__crosshair command-stage__crosshair--vertical" />
        <div className="command-stage__opening-content"><h1>PROJETO<br /><em>NEXUS</em></h1></div>
        <div className="command-stage__robot"><RobotCore final /></div>
      </section>

      <div className="top-signal"><span /><span /><span /> NEXUS / OPERAÇÃO INTELIGENTE <span className="top-signal__right">SYSTEM STATUS <b>ONLINE</b></span></div>

      <header className="site-header">
        <a href="#top" className="brand" aria-label="Projeto Nexus início">
          <NexusMark />
          <span>PROJETO <strong>NEXUS</strong></span>
        </a>
        <nav className="site-nav" aria-label="Navegação principal">
          <button onClick={() => scrollTo("nucleo")}>O conceito</button>
          <button onClick={() => scrollTo("intercompany")}>Intercompany</button>
          <button onClick={() => scrollTo("amostras")}>Amostras</button>
        </nav>
        <button className="header-index" onClick={() => scrollTo("ritmo")}>
          <span>VER O FUTURO</span><ArrowUpRight size={15} />
        </button>
      </header>

      <section className="hero-shell reveal-on-scroll" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> GUILHERME DE PAULA / 24 ANOS</div>
          <h1>
            <span className="text-reveal-mask">Inteligência e</span><br />
            <em><span className="text-reveal-mask">automação logística.</span></em>
          </h1>
          <p className="hero-lede">Estágio em Engenharia de Software. Objetivo: Apresentar a evolução dos projetos de automação e inteligência logística desenvolvidos na Hypera.</p>
          <div className="hero-actions">
            <button className="button button--primary" onClick={() => scrollTo("nucleo")}>Conhecer o ecossistema <ArrowRight size={16} /></button>
            <button className="button button--text" onClick={() => scrollTo("intercompany")}>Ver soluções <ArrowDownRight size={16} /></button>
          </div>
          <div className="hero-footnote"><ShieldCheck size={15} /> Estrutura pensada para operação contínua e escalável.</div>
        </div>

        <div className="hero-visual" aria-label="Visualização do núcleo Nexus">
          <div className="visual-marquee visual-marquee--one"><span>NEXUS / CONTROL / AUTOMATION / NEXUS / CONTROL / AUTOMATION /</span></div>
          <div className="visual-marquee visual-marquee--two"><span>DATA IN MOTION — 100% TRACEABLE — DATA IN MOTION — 100% TRACEABLE —</span></div>
          <div className="visual-scanner" />
          <div className="visual-grid" />
          <div className="visual-label visual-label--top"><span className="pulse-dot" /> LIVE CORE <b>04.0</b></div>
          <div className="visual-label visual-label--left"><span>NODE / 01</span><b>CONTROL</b></div>
          <div className="visual-label visual-label--right"><span>SYNC RATE</span><b>99.8%</b></div>
          
          <div className="robot-stage container-interativo">
            <RobotCore />
          </div>

          <div className="visual-data visual-data--one"><span>SAP</span><ArrowRight size={12} /><span>BI</span><b>CONNECTED</b></div>
          <div className="visual-data visual-data--two"><span>LAST PULSE</span><b>08:40:21</b></div>
          <div className="visual-axis visual-axis--x" /><div className="visual-axis visual-axis--y" />
        </div>
      </section>

      <div className="system-strip" aria-label="Tecnologias conectadas">
        <span className="system-strip__label">ONE CORE / MANY SIGNALS</span>
        <div className="system-strip__items"><span><Database size={14} /> SAP</span><i>→</i><span><ScanLine size={14} /> EXCEL</span><i>→</i><span><ChartNoAxesCombined size={14} /> BI</span><i>→</i><span><Mail size={14} /> E-MAIL</span></div>
        <span className="system-strip__status"><span className="pulse-dot" /> FLUXO ATIVO</span>
      </div>

      <section className="intro-section container reveal-on-scroll" id="nucleo">
        <div className="section-kicker">/ O CONCEITO NEXUS</div>
        <div className="intro-grid">
          <h2>
            <span className="text-reveal-mask">Ecossistema de</span><br />
            <span><span className="text-reveal-mask">automação</span></span><br />
            <span className="text-reveal-mask">logística.</span>
          </h2>
          <div className="intro-note"><p>Nome e conceito criado para agrupar os projetos desenvolvidos, unificando as soluções em um ecossistema focado na melhoria contínua dos processos logísticos da Hypera.</p></div>
        </div>
        <div className="principle-row">
          <div><span>01</span><strong>Concluído</strong><p>Painel Intercompany.</p></div>
          <div><span>02</span><strong>Concluído</strong><p>Torre de Amostra Grátis.</p></div>
          <div><span>03</span><strong>Em desenvolvimento</strong><p>Projeto Ritmo.</p></div>
        </div>
      </section>

      {/* ========================================= */}
      {/* 1. SEÇÃO: PAINEL INTERCOMPANY */}
      {/* ========================================= */}
      <section id="intercompany" className="relative pt-24 pb-24 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="section-heading mb-12 reveal-on-scroll">
            <div>
              <div className="section-kicker text-blue-600">/ NXS-01 : AUTOMAÇÃO & GOVERNANÇA</div>
              <h2>
                <span className="text-reveal-mask">Painel</span><br />
                <em><span className="text-reveal-mask text-blue-900">Intercompany.</span></em>
              </h2>
            </div>
            <span className="heading-index text-blue-800">ATUALIZAÇÃO<br /><b>04X / DIA</b></span>
          </div>

          <div className="flex flex-col gap-10">
            
            {/* CARTÕES SUPERIORES LADO A LADO COM ANIMAÇÃO */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ ...springTransition, delay: 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4 text-blue-700">
                  <Boxes size={24} strokeWidth={2} />
                  <h3 className="text-xl font-bold text-slate-900">O que é o Painel?</h3>
                </div>
                <div className="text-slate-600 text-[15px] leading-relaxed space-y-3">
                  <p><strong>Conceito & Automação:</strong> Ferramenta automática de cargas intercompany.</p>
                  <p><strong>Funcionamento:</strong> Sistema 100% automático, atualiza 4 vezes ao dia, com envio por e-mail, integração ao Power BI e histórico completo.</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ ...springTransition, delay: 0.25 }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4 text-blue-700">
                  <AlertTriangle size={24} strokeWidth={2} />
                  <h3 className="text-xl font-bold text-slate-900">O Problema</h3>
                </div>
                <ul className="text-slate-600 text-[14px] leading-relaxed list-disc pl-5 space-y-2">
                  <li><strong>Falta de Padronização no SAP:</strong> Não existia um relatório pronto que consolidasse todas as informações necessárias para a equipe logística.</li>
                  <li><strong>Trabalho Manual e Lento:</strong> Exigia tempo e esforço operacional para extrair múltiplos arquivos e cruzar dados.</li>
                </ul>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ ...springTransition, delay: 0.4 }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200 border-t-4 border-t-blue-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4 text-blue-700">
                  <ShieldCheck size={24} strokeWidth={2} />
                  <h3 className="text-xl font-bold text-slate-900">A Solução e Impacto</h3>
                </div>
                <ul className="text-slate-600 text-[14px] leading-relaxed list-disc pl-5 space-y-2">
                  <li><strong>Automação:</strong> O analista já começa a jornada com a informação completa.</li>
                  <li><strong>Rastreabilidade de Prazos:</strong> Pedido ➔ Faturado ➔ Embarque ➔ Trânsito ➔ Entrega.</li>
                  <li><strong>Detecção Preventiva:</strong> Permite antecipar os atrasos de entrega antes que aconteçam, identificando gargalos para evitar o desabastecimento.</li>
                </ul>
              </motion.div>

            </div>

            {/* CARTÃO INFERIOR GIGANTE: IMAGEM + EFEITO FLIP */}
            <motion.div 
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ ...springTransition, delay: 0.2 }}
              className="w-full"
            >
              <div 
                className="w-full relative transition-transform duration-700 ease-in-out shadow-2xl rounded-2xl cursor-pointer min-h-[400px] md:min-h-[500px] xl:min-h-[700px]"
                style={{
                  perspective: "2000px",
                  transformStyle: "preserve-3d",
                  transform: flipIC ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
                onClick={() => setFlipIC(!flipIC)}
              >
                {/* FRENTE: IMAGEM */}
                <div style={{ backfaceVisibility: "hidden" }} className="absolute inset-0 w-full h-full bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex flex-col">
                  <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-2 shrink-0">
                     <div className="w-3 h-3 rounded-full bg-red-400"></div>
                     <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                     <div className="w-3 h-3 rounded-full bg-green-400"></div>
                     <span className="ml-4 text-xs font-mono text-slate-500">nexus/intercompany/dashboard</span>
                  </div>
                  <div className="relative flex-1 p-2 flex items-center justify-center bg-slate-50">
                    <img src={modules[0].image} alt="Painel Intercompany" className="w-full h-full object-contain rounded-lg shadow-sm border border-slate-200/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none rounded-b-2xl"></div>
                    <div className="absolute bottom-8 w-full flex justify-center pointer-events-none">
                       <span className="px-6 py-3 bg-white/95 backdrop-blur text-xs uppercase font-bold tracking-widest text-blue-700 rounded-full shadow-2xl border border-blue-100 animate-pulse">
                        CLIQUE PARA VER INFORMAÇÕES
                       </span>
                    </div>
                  </div>
                </div>

                {/* VERSO: CARTÃO DE DADOS */}
                <article 
                  className={`module-detail module-detail--${modules[0].color} absolute inset-0 w-full h-full m-0 overflow-y-auto no-scrollbar rounded-2xl shadow-2xl flex flex-col`}
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", boxSizing: "border-box" }}
                >
                  <div className="module-detail__top shrink-0">
                    <span className="module-detail__tag">{modules[0].tag}</span>
                    <span className="module-detail__id">NXS / {modules[0].index}</span>
                  </div>
                  
                  <div className="module-detail__title-row shrink-0">
                    <div>
                      <IconIC size={32} strokeWidth={1.5} />
                      <h3 className="text-4xl">{modules[0].title.split("\n").map((line, i) => <span key={i}>{line}</span>)}</h3>
                    </div>
                  </div>

                  <p className="module-detail__description text-lg mt-4 shrink-0">{modules[0].description}</p>
                  
                  <div className="module-readout mt-6 shrink-0">
                    <div><span>LEITURA PRINCIPAL</span><strong>Antecipar o atraso antes que ele vire problema.</strong></div>
                    <div><span>IMPACTO OPERACIONAL</span><strong>Causas mapeadas e histórico para consulta.</strong></div>
                  </div>
                  
                  <div className="metric-grid mt-6 mb-6 shrink-0">
                    {modules[0].metrics.map(([label, value]) => (
                      <div key={label}><span>{label}</span><strong>{value}</strong></div>
                    ))}
                  </div>
                  
                  <div className="module-detail__bottom mt-auto shrink-0">
                    <div className="detail-bullets">
                      {modules[0].bullets.map((bullet) => (
                        <span key={bullet} className="text-[15px]"><Check size={16} /> {bullet}</span>
                      ))}
                    </div>
                    <div className="detail-visual">
                      <div className="mini-bars"><i /><i /><i /><i /><i /><i /><i /></div>
                      <div className="mini-line"><span /><span /><span /><span /><span /><span /><span /></div>
                    </div>
                  </div>
                </article>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ========================================= */}
      {/* 2. SEÇÃO: TORRE DE AMOSTRAS */}
      {/* ========================================= */}
      <section id="amostras" className="relative pt-24 pb-24 bg-gradient-to-b from-white via-cyan-50/40 to-white overflow-visible">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="section-heading mb-12 reveal-on-scroll">
            <div>
              <div className="section-kicker text-cyan-600">/ NXS-02 : RASTREABILIDADE TOTAL</div>
              <h2>
                <span className="text-reveal-mask">Torre de</span><br />
                <em><span className="text-reveal-mask text-cyan-900">Amostra Grátis.</span></em>
              </h2>
            </div>
            <span className="heading-index text-cyan-800">DISTRIBUIÇÃO<br /><b>860 MIL+ CX</b></span>
          </div>

          <div className="flex flex-col gap-12 items-start relative">
            
            {/* CARTÕES SUPERIORES LADO A LADO COM ANIMAÇÃO */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ ...springTransition, delay: 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4 text-cyan-700">
                  <Warehouse size={24} strokeWidth={2} />
                  <h3 className="text-xl font-bold text-slate-900">O que é a Torre de AG?</h3>
                </div>
                <div className="text-slate-600 text-[15px] leading-relaxed space-y-3">
                  <p>Ferramenta de controle para acompanhamento de boa parte do ciclo de vida do produto de Amostra Grátis, da fábrica ao representante.</p>
                  <p><strong>Abas:</strong> Visão Cajamar (armazenagem), Estoque nos CDs, Distribuição/Atendimento e FNE (Faturado Não Entregue).</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ ...springTransition, delay: 0.25 }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4 text-cyan-700">
                  <AlertTriangle size={24} strokeWidth={2} />
                  <h3 className="text-xl font-bold text-slate-900">O Problema</h3>
                </div>
                <ul className="text-slate-600 text-[14px] leading-relaxed list-disc pl-5 space-y-2">
                  <li>Não existia uma ferramenta ou indicador consolidado que trouxesse visibilidade sobre as amostras grátis.</li>
                  <li><strong>Desconhecimento de Gargalos:</strong> Dificuldade em monitorar tempos de retenção, ocupação de Cajamar e falhas na distribuição.</li>
                </ul>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ ...springTransition, delay: 0.4 }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200 border-t-4 border-t-cyan-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4 text-cyan-700">
                  <ChartNoAxesCombined size={24} strokeWidth={2} />
                  <h3 className="text-xl font-bold text-slate-900">A Solução e Impacto</h3>
                </div>
                <ul className="text-slate-600 text-[13px] leading-relaxed list-disc pl-5 space-y-1">
                  <li><strong>Visibilidade:</strong> Status do estoque, shelf life, cobertura e gestão do OCT.</li>
                  <li><strong>Retenção em Quarentena:</strong> Mapeamento de lotes retidos por até 252 dias.</li>
                  <li><strong>Ineficiências:</strong> Identificação de 120.832 caixas em reentrega e localização de 832 cargas em atraso.</li>
                </ul>
              </motion.div>

            </div>

            {/* CARTÃO INFERIOR GIGANTE: IMAGEM + EFEITO FLIP */}
            <motion.div 
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ ...springTransition, delay: 0.2 }}
              className="w-full"
            >
              <div 
                className="w-full relative transition-transform duration-700 ease-in-out shadow-2xl rounded-2xl cursor-pointer min-h-[400px] md:min-h-[500px] xl:min-h-[700px]"
                style={{
                  perspective: "2000px",
                  transformStyle: "preserve-3d",
                  transform: flipAG ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
                onClick={() => setFlipAG(!flipAG)}
              >
                {/* FRENTE: IMAGEM */}
                <div style={{ backfaceVisibility: "hidden" }} className="absolute inset-0 w-full h-full bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex flex-col">
                  <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-2 shrink-0">
                     <div className="w-3 h-3 rounded-full bg-red-400"></div>
                     <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                     <div className="w-3 h-3 rounded-full bg-green-400"></div>
                     <span className="ml-4 text-xs font-mono text-slate-500">nexus/amostras/dashboard</span>
                  </div>
                  <div className="relative flex-1 p-2 flex items-center justify-center bg-slate-50">
                    <img src={modules[1].image} alt="Torre de Amostras Grátis" className="w-full h-full object-contain rounded-lg shadow-sm border border-slate-200/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none rounded-b-2xl"></div>
                    <div className="absolute bottom-8 w-full flex justify-center pointer-events-none">
                       <span className="px-6 py-3 bg-white/95 backdrop-blur text-xs uppercase font-bold tracking-widest text-cyan-700 rounded-full shadow-2xl border border-cyan-100 animate-pulse">
                        CLIQUE PARA VER INFORMAÇÕES
                       </span>
                    </div>
                  </div>
                </div>

                {/* VERSO: CARTÃO DE DADOS */}
                <article 
                  className={`module-detail module-detail--${modules[1].color} absolute inset-0 w-full h-full m-0 overflow-y-auto no-scrollbar rounded-2xl shadow-2xl flex flex-col`}
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", boxSizing: "border-box" }}
                >
                  <div className="module-detail__top shrink-0">
                    <span className="module-detail__tag">{modules[1].tag}</span>
                    <span className="module-detail__id">NXS / {modules[1].index}</span>
                  </div>
                  
                  <div className="module-detail__title-row shrink-0">
                    <div>
                      <IconAG size={32} strokeWidth={1.5} />
                      <h3 className="text-4xl">{modules[1].title.split("\n").map((line, i) => <span key={i}>{line}</span>)}</h3>
                    </div>
                  </div>

                  <p className="module-detail__description text-lg mt-4 shrink-0">{modules[1].description}</p>
                  
                  <div className="module-readout mt-6 shrink-0">
                    <div><span>LEITURA PRINCIPAL</span><strong>Visibilidade completa, do estoque até a entrega.</strong></div>
                    <div><span>IMPACTO OPERACIONAL</span><strong>Monitoramento de OCT, NFs em atraso e redução de reentregas.</strong></div>
                  </div>
                  
                  <div className="metric-grid mt-8 mb-8 shrink-0">
                    {modules[1].metrics.map(([label, value]) => (
                      <div key={label}><span>{label}</span><strong>{value}</strong></div>
                    ))}
                  </div>
                  
                  <div className="module-detail__bottom mt-auto shrink-0">
                    <div className="detail-bullets">
                      {modules[1].bullets.map((bullet) => (
                        <span key={bullet} className="text-[15px]"><Check size={16} /> {bullet}</span>
                      ))}
                    </div>
                    <div className="detail-visual">
                      <div className="mini-bars"><i /><i /><i /><i /><i /><i /><i /></div>
                      <div className="mini-line"><span /><span /><span /><span /><span /><span /><span /></div>
                    </div>
                  </div>
                </article>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* IMPACTO CONSOLIDADO */}
      <section className="flow-section container reveal-on-scroll" id="fluxo">
        <div className="section-heading"><div><div className="section-kicker">/ IMPACTO CONSOLIDADO</div>
        <h2>
          <span className="text-reveal-mask">Múltiplos projetos,</span><br />
          <em><span className="text-reveal-mask">um mesmo efeito.</span></em>
        </h2>
        </div><p className="heading-description">Decisão mais rápida para o Comercial, Financeiro, Qualidade e Logística — com dado confiável em uma única visão sistêmica.</p></div>
        <div className="flow-map">
          <div className="flow-line"><span /><span /><span /><span /></div>
          <FlowNode icon={Database} label="SAP" detail="fonte operacional" active />
          <FlowNode icon={Cable} label="NEXUS CORE" detail="orquestra & valida" active />
          <FlowNode icon={ChartNoAxesCombined} label="BI" detail="indicadores vivos" active />
          <FlowNode icon={Mail} label="E-MAIL" detail="alertas e reports" />
        </div>
        <div className="flow-callout"><div className="flow-callout__icon"><Radio size={19} /></div><div><strong>Comercial, Financeiro, Qualidade e Logística.</strong><span>Um mesmo efeito: decisão mais rápida, com dado confiável.</span></div><span className="flow-callout__code">NXS_IMPACT / 002</span></div>
      </section>

      {/* PROJETO RITMO */}
      <section className="signal-section reveal-on-scroll" id="ritmo">
        <div className="container signal-grid" style={{ alignItems: 'center' }}>
          <div>
            <div className="section-kicker">/ VISÃO DE FUTURO</div>
            <h2>
              <span className="text-reveal-mask">O próximo passo</span><br />
              <em><span className="text-reveal-mask">do Nexus.</span></em>
            </h2>
            <p>Com o Painel Intercompany e a Torre de AG 100% concluídos, o foco atual está no desenvolvimento do <strong>Projeto Ritmo</strong>.</p>
            <button className="button button--dark" onClick={() => scrollTo("top")}>Voltar ao início <ArrowUpRight size={16} /></button>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', paddingLeft: '2rem' }}>
            <img 
              src="/Ritmo.png" 
              alt="Plataforma Ritmo" 
              style={{ width: '100%', maxWidth: '750px', borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
            />
          </div>
        </div>
      </section>

      {/* VÍDEO DEMONSTRAÇÃO */}
      <section className="video-section container reveal-on-scroll" style={{ padding: '6rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '900px' }}>
          <div className="section-kicker" style={{ marginBottom: '2rem' }}>/ DEMONSTRAÇÃO</div>
          <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', backgroundColor: '#000' }}>
            <video 
              width="100%" 
              controls 
              className="w-full object-cover"
            >
              <source src="/video-apresentacao.mp4" type="video/mp4" />
              Seu navegador não suporta a reprodução de vídeos.
            </video>
          </div>
        </div>
      </section>

      {/* FECHAMENTO E ROBÔ FINAL */}
      <section className="farewell-section reveal-on-scroll" aria-label="Encerramento do Projeto Nexus">
        <div className="farewell-backdrop">NEXUS / NEXUS / NEXUS / NEXUS /</div>
        <div className="farewell-robot"><RobotCore final /></div>
        <div className="farewell-copy"><span className="section-kicker">/ FECHAMENTO</span>
        
        <h2>
          <span className="text-reveal-mask">Comece pelo</span><br />
          <em><span className="text-reveal-mask">necessário.</span></em>
        </h2>
        
        <p>“Comece fazendo o que é necessário, depois o que é possível, e de repente você estará fazendo o impossível.”<br /><small>— São Francisco de Assis</small></p><span className="farewell-status"><i /> PROJETO NEXUS / GUILHERME DE PAULA</span></div>
      </section>

      <footer className="site-footer container reveal-on-scroll"><a href="#top" className="brand"><NexusMark small /><span>PROJETO <strong>NEXUS</strong></span></a><span className="footer-center">ESTRUTURA PARA O QUE VEM A SEGUIR.</span><span className="footer-right">© 2026 / HYPERA / INTERNAL SYSTEM <ArrowUpRight size={14} /></span></footer>
      <div className="system-end"><span className="system-end__line" /><span>END OF TRANSMISSION / NEXUS CORE STABLE</span><span className="system-end__line" /></div>
    </main>
  );
}

function IconPlaceholder() {
  return <Bot size={16} />;
}

void IconPlaceholder;
void Gauge;
void Package;
void ServerCog;
void Waypoints;