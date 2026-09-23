import { useEffect, useState } from "react";
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
  ChevronRight,
  CircleDot,
  Database,
  Gauge,
  Mail,
  Package,
  Radio,
  ScanLine,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Warehouse,
  Waypoints,
  Zap,
} from "lucide-react";

// Adicionámos a propriedade "image" a cada módulo com os nomes exatos que configuraste
const modules = [
  {
    id: "intercompany",
    index: "01",
    tag: "OPERAÇÃO & VISIBILIDADE",
    title: "Painel\nIntercompany",
    description:
      "Painel 100% automático, atualizado 4x ao dia e disponível por e-mail e Power BI para antecipar o atraso antes que ele vire problema.",
    color: "blue",
    icon: Boxes,
    image: "/painelic.png",
    metrics: [
      ["Atualizações", "04x / dia"],
      ["Saídas", "E-mail + BI"],
      ["Histórico", "Completo"],
    ],
    bullets: ["Paletes livres, quarentena e cargas disponíveis", "Destino, placa, transportadora e quantidade", "Pedido → faturado → embarque → lead time", "Negativos: pedido feito sem mercadoria disponível", "Causas: transporte, faturamento e NF"],
  },
  {
    id: "samples",
    index: "02",
    tag: "PLANEJAMENTO & CONTROLE",
    title: "Torre de\nAmostra Grátis",
    description:
      "Visibilidade completa, do estoque até a entrega, acompanhando quarentena, shelf life, distribuição, reentrega e FNE.",
    color: "cyan",
    icon: Warehouse,
    image: "/torreag.png",
    metrics: [
      ["Entregues", "860 mil+ caixas"],
      ["Reentrega", "120.832 caixas"],
      ["Atrasos", "832 cargas"],
    ],
    bullets: ["Livre, quarentena, restrito e bloqueado", "OCT, FNE, reentrega e carro dedicado", "Shelf life, carteira e cobertura de estoque", "Filtros por ocorrência, período e representante", "NFs atrasadas × no prazo × total"],
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
  const [selectedModule, setSelectedModule] = useState("intercompany");
  const [booting, setBooting] = useState(() => !new URLSearchParams(window.location.search).has("skipboot"));
  
  // Estado que controla o giro do cartão
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const currentModule = modules.find((module) => module.id === selectedModule) ?? modules[0];
  const CurrentIcon = currentModule.icon;

  // Fecha o cartão automaticamente caso ele esteja girado e o utilizador mude de aba (ex: do IC para Amostras)
  useEffect(() => {
    setIsCardFlipped(false);
  }, [selectedModule]);

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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="nexus-page">
      <div className="scroll-rail" aria-hidden="true"><span /></div>
      <div className={`boot-sequence ${booting ? "boot-sequence--active" : "boot-sequence--done"}`} aria-hidden={!booting}>
        <div className="boot-flash" />
        <div className="boot-rays"><i /><i /><i /><i /><i /><i /></div>
        <div className="boot-logotype"><NexusMark /><span>PROJETO <b>NEXUS</b></span></div>
        <div className="boot-progress"><span /><b>INITIALIZING CORE / 001</b></div>
      </div>
      <section className="command-stage command-stage--opening reveal-on-scroll" aria-label="Abertura Projeto Nexus">
        <div className="command-stage__noise" />
        <div className="command-stage__marquee command-stage__marquee--top"><span>PROJECT NEXUS / DATA CONTROL / INTELLIGENCE / PROJECT NEXUS / DATA CONTROL / INTELLIGENCE /</span></div>
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
          <a href="#nucleo">O núcleo</a>
          <a href="#sistemas">Sistemas</a>
          <a href="#fluxo">Fluxo de dados</a>
        </nav>
        <button className="header-index" onClick={() => scrollTo("sistemas")}>
          <span>INDEXAR PROJETO</span><ArrowUpRight size={15} />
        </button>
      </header>

      <section className="hero-shell reveal-on-scroll" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> ECOSSISTEMA OPERACIONAL / 001</div>
          
          <h1>
            <span className="text-reveal-mask">Dado disperso</span><br />
            <em><span className="text-reveal-mask">vira decisão automática.</span></em>
          </h1>
          
          <p className="hero-lede">Guilherme de Paula · Projeto Nexus. Uma frente, vários projetos, um objetivo: transformar dados confiáveis em decisão mais rápida.</p>
          <div className="hero-actions">
            <button className="button button--primary" onClick={() => scrollTo("nucleo")}>Conhecer o núcleo <ArrowRight size={16} /></button>
            <button className="button button--text" onClick={() => scrollTo("fluxo")}>Ver como flui <ArrowDownRight size={16} /></button>
          </div>
          <div className="hero-footnote"><ShieldCheck size={15} /> Estrutura pensada para operação contínua, não para apresentações.</div>
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
        <div className="section-kicker">/ O NÚCLEO</div>
        <div className="intro-grid">
          
          <h2>
            <span className="text-reveal-mask">Nexus: uma frente,</span><br />
            <span><span className="text-reveal-mask">vários projetos.</span></span><br />
            <span className="text-reveal-mask">Um objetivo.</span>
          </h2>
          
          <div className="intro-note"><p>Automação de processos antes manuais, confiabilidade de dados — uma fonte única de verdade — facilidade no dia a dia operacional e uma estrutura pensada para crescer.</p><a href="#fluxo">Ver visão sistêmica <ArrowUpRight size={15} /></a></div>
        </div>
        <div className="principle-row">
          <div><span>01</span><strong>Concluído</strong><p>Painel Intercompany em operação.</p></div>
          <div><span>02</span><strong>Concluído</strong><p>Torre de Amostra Grátis em operação.</p></div>
          <div><span>03</span><strong>Em andamento</strong><p>Ritmo: o próximo passo do Nexus.</p></div>
        </div>
      </section>

      <section className="problem-section container reveal-on-scroll" aria-label="O problema">
        <div className="section-kicker">/ O PROBLEMA</div>
        <div className="problem-grid">
          
          <h2>
            <span className="text-reveal-mask">A logística tomava decisão</span><br />
            <em><span className="text-reveal-mask">sem enxergar o problema a tempo.</span></em>
          </h2>
          
          <div className="problem-list"><div><span>01</span><p>Não tinha todas as informações em um lugar só.</p></div><div><span>02</span><p>Atrasos e gargalos só eram descobertos depois de acontecer.</p></div><div><span>03</span><p>Faltava um lugar único, confiável e atualizado automaticamente.</p></div></div></div>
      </section>

      <section className="modules-section reveal-on-scroll" id="sistemas">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="section-kicker">/ SISTEMAS DO ECOSSISTEMA</div>
              <h2>
                <span className="text-reveal-mask">Operações que</span><br />
                <em><span className="text-reveal-mask">não perdem o fio.</span></em>
              </h2>
            </div>
            <span className="heading-index">NXS—02<br /><b>2026 / ACTIVE</b></span>
          </div>
          
          <div className="modules-layout">
            {/* Lista de Abas à esquerda */}
            <div className="module-list">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <button 
                    key={module.id} 
                    className={`module-tab ${selectedModule === module.id ? `module-tab--${module.color}` : ""}`} 
                    onClick={() => setSelectedModule(module.id)}
                  >
                    <span className="module-tab__number">{module.index}</span>
                    <span className="module-tab__icon"><Icon size={19} /></span>
                    <span className="module-tab__name">{module.title.replace("\n", " ")}</span>
                    <ChevronRight size={17} />
                  </button>
                );
              })}
              <div className="module-list__hint"><Sparkles size={14} /> Selecione um sistema para revelar a camada.</div>
            </div>

            {/* CONTAINER GIRATÓRIO (FLIP CARD) */}
            <div 
              className="w-full relative cursor-pointer" 
              style={{ perspective: "2000px" }}
              onClick={() => setIsCardFlipped(!isCardFlipped)}
            >
              <div 
                className="w-full relative transition-transform duration-700 ease-in-out h-full"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isCardFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                
                {/* FRENTE: INFORMAÇÕES DO MÓDULO */}
                <article 
                  className={`module-detail module-detail--${currentModule.color}`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="module-detail__top">
                    <span className="module-detail__tag">{currentModule.tag}</span>
                    <span className="module-detail__id">NXS / {currentModule.index}</span>
                  </div>
                  
                  <div className="module-detail__title-row">
                    <div>
                      <CurrentIcon size={24} strokeWidth={1.5} />
                      <h3>{currentModule.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3>
                    </div>
                    {/* Indicador visual sugerindo clique */}
                    <span className="px-3 py-1 bg-gray-100 text-[10px] uppercase font-bold tracking-widest text-gray-500 rounded-full animate-pulse border border-gray-200">
                      CLIQUE PARA VER A TELA
                    </span>
                  </div>
                  
                  <p className="module-detail__description">{currentModule.description}</p>
                  
                  <div className="module-readout">
                    <div><span>LEITURA PRINCIPAL</span><strong>{selectedModule === "intercompany" ? "Antecipar o atraso antes que ele vire problema." : "Visibilidade completa, do estoque até a entrega."}</strong></div>
                    <div><span>IMPACTO OPERACIONAL</span><strong>{selectedModule === "intercompany" ? "Causas mapeadas e histórico para consulta." : "Mais controle sobre cobertura, reentrega e FNE."}</strong></div>
                  </div>
                  
                  <div className="metric-grid">
                    {currentModule.metrics.map(([label, value]) => (
                      <div key={label}><span>{label}</span><strong>{value}</strong></div>
                    ))}
                  </div>
                  
                  <div className="module-detail__bottom">
                    <div className="detail-bullets">
                      {currentModule.bullets.map((bullet) => (
                        <span key={bullet}><Check size={13} /> {bullet}</span>
                      ))}
                    </div>
                    <div className="detail-visual">
                      <div className="mini-bars"><i /><i /><i /><i /><i /><i /><i /></div>
                      <div className="mini-line"><span /><span /><span /><span /><span /><span /><span /></div>
                    </div>
                  </div>
                </article>

                {/* VERSO: IMAGEM DO PAINEL */}
                <article 
                  className={`module-detail module-detail--${currentModule.color} absolute top-0 left-0 w-full h-full`}
                  style={{ 
                    backfaceVisibility: "hidden", 
                    transform: "rotateY(180deg)",
                    padding: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f8fafc"
                  }}
                >
                  <img 
                    src={currentModule.image} 
                    alt={`Interface do ${currentModule.title}`} 
                    className="w-full h-full object-contain rounded-xl"
                  />
                  <span className="absolute bottom-4 right-6 px-3 py-1 bg-white/80 backdrop-blur text-[10px] uppercase font-bold tracking-widest text-gray-600 rounded-full shadow-sm border border-gray-200">
                    CLIQUE PARA VOLTAR
                  </span>
                </article>

              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="flow-section container reveal-on-scroll" id="fluxo">
        <div className="section-heading"><div><div className="section-kicker">/ IMPACTO CONSOLIDADO</div>
        
        <h2>
          <span className="text-reveal-mask">Dois projetos,</span><br />
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

      {/* SECÇÃO ATUALIZADA - RITMO COMO NA IMAGEM */}
      <section className="signal-section reveal-on-scroll">
        <div className="container signal-grid" style={{ alignItems: 'center' }}>
          <div>
            <div className="section-kicker">/ PRÓXIMO PASSO</div>
            <h2>
              <span className="text-reveal-mask">O Nexus</span><br />
              <em><span className="text-reveal-mask">continua.</span></em>
            </h2>
            <p>Conheça o Ritmo: uma plataforma para o gestor acompanhar atividades em tempo real, com formato gamificado e ranking dos analistas mais bem colocados.</p>
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
      {/* FIM DA SECÇÃO ATUALIZADA */}

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

      <footer className="site-footer container reveal-on-scroll"><a href="#top" className="brand"><NexusMark small /><span>PROJETO <strong>NEXUS</strong></span></a><span className="footer-center">ESTRUTURA PARA O QUE VEM A SEGUIR.</span><span className="footer-right">© 2026 / INTERNAL SYSTEM <ArrowUpRight size={14} /></span></footer>
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