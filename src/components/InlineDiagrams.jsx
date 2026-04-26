// ═══════════════════════════════════════════════════════════════
//  BI Study Hub — Inline SVG Diagrams
//  Auto-injected based on lesson content context
// ═══════════════════════════════════════════════════════════════

// ── Star Schema Diagram ──
export function StarSchemaDiagram() {
  return (
    <div className="diagram-container">
      <div className="diagram-title">⭐ Modelo Star Schema — Visão Conceitual</div>
      <svg viewBox="0 0 520 320" width="100%" style={{ maxWidth: 520 }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="factGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2962FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2962FF" stopOpacity="0.05" />
          </radialGradient>
          <radialGradient id="dimGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.03" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(41,98,255,0.5)" />
          </marker>
        </defs>

        {/* Lines from fact to dims */}
        <line x1="260" y1="160" x2="100" y2="75"  stroke="rgba(41,98,255,0.35)" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arrow)" />
        <line x1="260" y1="160" x2="420" y2="75"  stroke="rgba(41,98,255,0.35)" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arrow)" />
        <line x1="260" y1="160" x2="90"  y2="248" stroke="rgba(41,98,255,0.35)" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arrow)" />
        <line x1="260" y1="160" x2="430" y2="248" stroke="rgba(41,98,255,0.35)" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arrow)" />
        <line x1="260" y1="160" x2="260" y2="30"  stroke="rgba(41,98,255,0.35)" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arrow)" />

        {/* Fact table — center */}
        <rect x="185" y="115" width="150" height="90" rx="12" fill="url(#factGrad)" stroke="#2962FF" strokeWidth="1.5" filter="url(#glow)" />
        <text x="260" y="148" textAnchor="middle" fill="#82B1FF" fontSize="10" fontWeight="800" letterSpacing="1">fVENDAS</text>
        <text x="260" y="163" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8.5">ID_Data · ID_Produto</text>
        <text x="260" y="176" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8.5">ID_Cliente · ID_Loja</text>
        <text x="260" y="191" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">Qtd · Valor · Custo</text>
        <text x="260" y="125" textAnchor="middle" fill="rgba(130,177,255,0.5)" fontSize="7.5" fontWeight="700" letterSpacing="0.5">TABELA FATO</text>

        {/* dCalendario — top */}
        <rect x="200" y="5" width="120" height="60" rx="10" fill="url(#dimGrad)" stroke="rgba(0,229,255,0.5)" strokeWidth="1.2" />
        <text x="260" y="28" textAnchor="middle" fill="#00E5FF" fontSize="9.5" fontWeight="800">dCALENDARIO</text>
        <text x="260" y="42" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">Data · Mês · Ano</text>
        <text x="260" y="55" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7.5">Trimestre · Dia Útil</text>

        {/* dProdutos — top-left */}
        <rect x="30" y="40" width="120" height="60" rx="10" fill="url(#dimGrad)" stroke="rgba(0,229,255,0.5)" strokeWidth="1.2" />
        <text x="90" y="63" textAnchor="middle" fill="#00E5FF" fontSize="9.5" fontWeight="800">dPRODUTOS</text>
        <text x="90" y="77" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">Produto · Categoria</text>
        <text x="90" y="90" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7.5">Marca · Preço</text>

        {/* dClientes — top-right */}
        <rect x="370" y="40" width="120" height="60" rx="10" fill="url(#dimGrad)" stroke="rgba(0,229,255,0.5)" strokeWidth="1.2" />
        <text x="430" y="63" textAnchor="middle" fill="#00E5FF" fontSize="9.5" fontWeight="800">dCLIENTES</text>
        <text x="430" y="77" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">Cliente · Segmento</text>
        <text x="430" y="90" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7.5">Região · UF</text>

        {/* dVendedores — bottom-left */}
        <rect x="25" y="220" width="120" height="60" rx="10" fill="url(#dimGrad)" stroke="rgba(0,229,255,0.5)" strokeWidth="1.2" />
        <text x="85" y="243" textAnchor="middle" fill="#00E5FF" fontSize="9.5" fontWeight="800">dVENDEDORES</text>
        <text x="85" y="257" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">Vendedor · Equipe</text>
        <text x="85" y="270" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7.5">Gerência · Regional</text>

        {/* dLojas — bottom-right */}
        <rect x="375" y="220" width="120" height="60" rx="10" fill="url(#dimGrad)" stroke="rgba(0,229,255,0.5)" strokeWidth="1.2" />
        <text x="435" y="243" textAnchor="middle" fill="#00E5FF" fontSize="9.5" fontWeight="800">dLOJAS</text>
        <text x="435" y="257" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">Loja · Cidade · UF</text>
        <text x="435" y="270" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7.5">Formato · Bandeira</text>

        {/* Legend */}
        <rect x="10" y="295" width="12" height="12" rx="3" fill="#2962FF" fillOpacity="0.5" stroke="#2962FF" strokeWidth="1" />
        <text x="26" y="305" fill="rgba(255,255,255,0.4)" fontSize="8">Tabela Fato</text>
        <rect x="110" y="295" width="12" height="12" rx="3" fill="rgba(0,229,255,0.15)" stroke="rgba(0,229,255,0.5)" strokeWidth="1" />
        <text x="126" y="305" fill="rgba(255,255,255,0.4)" fontSize="8">Tabela Dimensão</text>
        <line x1="230" y1="301" x2="260" y2="301" stroke="rgba(41,98,255,0.5)" strokeWidth="1.5" strokeDasharray="4,2" />
        <text x="265" y="305" fill="rgba(255,255,255,0.4)" fontSize="8">Relacionamento 1:N</text>
      </svg>
    </div>
  );
}

// ── Power BI Architecture Diagram ──
export function PowerBIArchDiagram() {
  return (
    <div className="diagram-container">
      <div className="diagram-title">🏗️ Arquitetura do Power BI — Os 3 Pilares</div>
      <svg viewBox="0 0 520 180" width="100%" style={{ maxWidth: 520 }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="desktopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F2C811" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F2C811" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="serviceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2962FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2962FF" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="mobileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E676" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00E676" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Desktop */}
        <rect x="15" y="20" width="145" height="130" rx="12" fill="url(#desktopGrad)" stroke="#F2C811" strokeWidth="1.5" />
        <text x="87" y="48" textAnchor="middle" fill="#F2C811" fontSize="11" fontWeight="800">💻 DESKTOP</text>
        <text x="87" y="66" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">Grátis · Local</text>
        <rect x="30" y="76" width="115" height="16" rx="4" fill="rgba(242,200,17,0.1)" />
        <text x="87" y="88" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7.5">Modelagem de Dados</text>
        <rect x="30" y="98" width="115" height="16" rx="4" fill="rgba(242,200,17,0.1)" />
        <text x="87" y="110" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7.5">Criação DAX</text>
        <rect x="30" y="120" width="115" height="16" rx="4" fill="rgba(242,200,17,0.1)" />
        <text x="87" y="132" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7.5">Construção de Visuais</text>

        {/* Arrow */}
        <path d="M 165 85 L 185 85" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="175" y="78" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7">Publica</text>

        {/* Service */}
        <rect x="188" y="20" width="145" height="130" rx="12" fill="url(#serviceGrad)" stroke="#2962FF" strokeWidth="1.5" />
        <text x="260" y="48" textAnchor="middle" fill="#82B1FF" fontSize="11" fontWeight="800">☁️ SERVICE</text>
        <text x="260" y="66" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">Pro/Premium · Nuvem</text>
        <rect x="203" y="76" width="115" height="16" rx="4" fill="rgba(41,98,255,0.15)" />
        <text x="260" y="88" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7.5">Compartilhamento</text>
        <rect x="203" y="98" width="115" height="16" rx="4" fill="rgba(41,98,255,0.15)" />
        <text x="260" y="110" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7.5">Scheduled Refresh</text>
        <rect x="203" y="120" width="115" height="16" rx="4" fill="rgba(41,98,255,0.15)" />
        <text x="260" y="132" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7.5">Dashboards Pinados</text>

        {/* Arrow */}
        <path d="M 338 85 L 358 85" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="348" y="78" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7">Consome</text>

        {/* Mobile */}
        <rect x="361" y="20" width="145" height="130" rx="12" fill="url(#mobileGrad)" stroke="#00E676" strokeWidth="1.5" />
        <text x="433" y="48" textAnchor="middle" fill="#00E676" fontSize="11" fontWeight="800">📱 MOBILE</text>
        <text x="433" y="66" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">iOS · Android · Grátis</text>
        <rect x="376" y="76" width="115" height="16" rx="4" fill="rgba(0,230,118,0.1)" />
        <text x="433" y="88" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7.5">Consumo de Reports</text>
        <rect x="376" y="98" width="115" height="16" rx="4" fill="rgba(0,230,118,0.1)" />
        <text x="433" y="110" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7.5">Alertas e KPIs</text>
        <rect x="376" y="120" width="115" height="16" rx="4" fill="rgba(0,230,118,0.1)" />
        <text x="433" y="132" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7.5">Offline (limitado)</text>
      </svg>
    </div>
  );
}

// ── Import Mode Comparison ──
export function ImportModesDiagram() {
  return (
    <div className="diagram-container">
      <div className="diagram-title">⚙️ Modos de Conexão — Import vs DirectQuery</div>
      <svg viewBox="0 0 520 140" width="100%" style={{ maxWidth: 520 }} xmlns="http://www.w3.org/2000/svg">
        {/* Import */}
        <rect x="15" y="15" width="230" height="110" rx="10" fill="rgba(41,98,255,0.08)" stroke="rgba(41,98,255,0.4)" strokeWidth="1.5" />
        <text x="130" y="40" textAnchor="middle" fill="#82B1FF" fontSize="10.5" fontWeight="800">📥 IMPORT MODE</text>
        <text x="130" y="58" textAnchor="middle" fill="rgba(0,230,118,0.8)" fontSize="8" fontWeight="700">✓ Performance máxima</text>
        <text x="130" y="73" textAnchor="middle" fill="rgba(0,230,118,0.8)" fontSize="8" fontWeight="700">✓ Todas funções DAX</text>
        <text x="130" y="88" textAnchor="middle" fill="rgba(255,196,0,0.7)" fontSize="8" fontWeight="600">~ Dados via Refresh</text>
        <text x="130" y="103" textAnchor="middle" fill="rgba(255,196,0,0.7)" fontSize="8" fontWeight="600">~ Limite 1GB .pbix</text>
        <text x="130" y="118" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7">→ Recomendado para 90% dos casos</text>

        {/* DirectQuery */}
        <rect x="275" y="15" width="230" height="110" rx="10" fill="rgba(255,196,0,0.05)" stroke="rgba(255,196,0,0.35)" strokeWidth="1.5" />
        <text x="390" y="40" textAnchor="middle" fill="#FFC400" fontSize="10.5" fontWeight="800">⚡ DIRECTQUERY</text>
        <text x="390" y="58" textAnchor="middle" fill="rgba(0,230,118,0.8)" fontSize="8" fontWeight="700">✓ Dados sempre ao vivo</text>
        <text x="390" y="73" textAnchor="middle" fill="rgba(0,230,118,0.8)" fontSize="8" fontWeight="700">✓ Sem limite de tamanho</text>
        <text x="390" y="88" textAnchor="middle" fill="rgba(255,0,60,0.7)" fontSize="8" fontWeight="600">✗ DAX limitado</text>
        <text x="390" y="103" textAnchor="middle" fill="rgba(255,0,60,0.7)" fontSize="8" fontWeight="600">✗ Mais lento p/ usuário</text>
        <text x="390" y="118" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7">→ Use apenas quando necessário</text>
      </svg>
    </div>
  );
}

// ── DAX Context Diagram ──
export function DAXContextDiagram() {
  return (
    <div className="diagram-container">
      <div className="diagram-title">🔮 Os 2 Contextos do DAX</div>
      <svg viewBox="0 0 520 160" width="100%" style={{ maxWidth: 520 }} xmlns="http://www.w3.org/2000/svg">
        {/* Filter Context */}
        <rect x="15" y="15" width="230" height="130" rx="10" fill="rgba(41,98,255,0.08)" stroke="rgba(41,98,255,0.4)" strokeWidth="1.5" />
        <text x="130" y="40" textAnchor="middle" fill="#82B1FF" fontSize="10" fontWeight="800">🔵 CONTEXTO DE FILTRO</text>
        <text x="130" y="57" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">Criado por → Visuais · Slicers · Filtros</text>
        <rect x="30" y="67" width="200" height="22" rx="5" fill="rgba(41,98,255,0.12)" />
        <text x="130" y="82" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8">Slicer: Ano = 2024</text>
        <rect x="30" y="95" width="200" height="22" rx="5" fill="rgba(41,98,255,0.12)" />
        <text x="130" y="110" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8">Tabela: Produto = "X" (por linha)</text>
        <text x="130" y="133" textAnchor="middle" fill="rgba(130,177,255,0.6)" fontSize="7.5">SUM() responde a este contexto</text>

        {/* Row Context */}
        <rect x="275" y="15" width="230" height="130" rx="10" fill="rgba(0,230,118,0.06)" stroke="rgba(0,230,118,0.4)" strokeWidth="1.5" />
        <text x="390" y="40" textAnchor="middle" fill="#00E676" fontSize="10" fontWeight="800">🟢 CONTEXTO DE LINHA</text>
        <text x="390" y="57" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">Criado por → SUMX · FILTER · Colunas Calc.</text>
        <rect x="290" y="67" width="200" height="22" rx="5" fill="rgba(0,230,118,0.08)" />
        <text x="390" y="82" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8">SUMX(fVendas, [Qtd] * [Preco])</text>
        <rect x="290" y="95" width="200" height="22" rx="5" fill="rgba(0,230,118,0.08)" />
        <text x="390" y="110" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8">IF([Valor] &gt; 1000, "Alto", "Baixo")</text>
        <text x="390" y="133" textAnchor="middle" fill="rgba(0,230,118,0.5)" fontSize="7.5">Itera linha por linha da tabela</text>
      </svg>
    </div>
  );
}

// ── Map of lesson IDs to diagrams ──
export const LESSON_DIAGRAMS = {
  'pbi_t1_l1': [PowerBIArchDiagram, ImportModesDiagram],
  'pbi_t2_l1': [StarSchemaDiagram],
  'pbi_t3_l1': [DAXContextDiagram],
};
